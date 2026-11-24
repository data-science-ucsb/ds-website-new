// Fetches the club's public Google Calendar iCal feed and turns it into a list
// of upcoming events. Handles the subset of iCal that Google emits for this
// calendar: timed and all-day events, TZID times, DAILY/WEEKLY RRULEs with
// UNTIL/COUNT/BYDAY, EXDATE, and single-instance overrides (RECURRENCE-ID).

export const CALENDAR_ID =
  "f44e628eb7e3164e7bba074d1d4ccdadaf6dba92c45bca0ca446b55b8b9ae1f4@group.calendar.google.com";
export const CALENDAR_TZ = "America/Los_Angeles";

const ICS_URL = `https://calendar.google.com/calendar/ical/${encodeURIComponent(
  CALENDAR_ID
)}/public/basic.ics`;

export interface CalendarEvent {
  id: string;
  uid: string; // shared by every instance of a recurring series
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  location?: string;
  description?: string;
  recurring: boolean;
}

interface Prop {
  params: Record<string, string>;
  value: string;
}
type RawEvent = Record<string, Prop[]>;

// ---------- ICS parsing ----------

function unfold(text: string): string[] {
  return text.replace(/\r\n/g, "\n").replace(/\n[ \t]/g, "").split("\n");
}

function unescapeText(v: string): string {
  return v
    .replace(/\\n/gi, "\n")
    .replace(/\\,/g, ",")
    .replace(/\\;/g, ";")
    .replace(/\\\\/g, "\\");
}

function parseRawEvents(ics: string): RawEvent[] {
  const events: RawEvent[] = [];
  let current: RawEvent | null = null;
  let depth = 0; // ignore nested components like VALARM
  for (const line of unfold(ics)) {
    if (line === "BEGIN:VEVENT") {
      current = {};
      depth = 0;
      continue;
    }
    if (line === "END:VEVENT") {
      if (current) events.push(current);
      current = null;
      continue;
    }
    if (!current) continue;
    if (line.startsWith("BEGIN:")) depth++;
    if (line.startsWith("END:")) depth--;
    if (depth > 0 || line.startsWith("END:")) continue;

    const colon = line.indexOf(":");
    if (colon < 0) continue;
    const [name, ...paramParts] = line.slice(0, colon).split(";");
    const params: Record<string, string> = {};
    for (const p of paramParts) {
      const [k, v] = p.split("=");
      if (k && v) params[k.toUpperCase()] = v;
    }
    const key = name.toUpperCase();
    (current[key] ||= []).push({ params, value: line.slice(colon + 1) });
  }
  return events;
}

// ---------- time zone helpers ----------

// Offset (ms) of `tz` from UTC at the given instant.
function tzOffset(date: Date, tz: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(date);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  const asUtc = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"), get("second"));
  return asUtc - date.getTime();
}

// Wall-clock time in `tz` -> UTC instant.
function zonedToUtc(y: number, mo: number, d: number, h: number, mi: number, s: number, tz: string): Date {
  const guess = Date.UTC(y, mo, d, h, mi, s);
  let ts = guess - tzOffset(new Date(guess), tz);
  ts = guess - tzOffset(new Date(ts), tz); // second pass settles DST edges
  return new Date(ts);
}

interface LocalTime {
  y: number;
  mo: number; // 0-based
  d: number;
  h: number;
  mi: number;
  s: number;
  utc: boolean;
  tz: string;
  allDay: boolean;
}

function parseIcsDate(prop: Prop): LocalTime {
  const v = prop.value;
  const allDay = prop.params.VALUE === "DATE" || v.length === 8;
  return {
    y: +v.slice(0, 4),
    mo: +v.slice(4, 6) - 1,
    d: +v.slice(6, 8),
    h: allDay ? 0 : +v.slice(9, 11),
    mi: allDay ? 0 : +v.slice(11, 13),
    s: allDay ? 0 : +v.slice(13, 15),
    utc: v.endsWith("Z"),
    tz: prop.params.TZID || CALENDAR_TZ,
    allDay,
  };
}

function toInstant(t: LocalTime): Date {
  if (t.utc) return new Date(Date.UTC(t.y, t.mo, t.d, t.h, t.mi, t.s));
  return zonedToUtc(t.y, t.mo, t.d, t.h, t.mi, t.s, t.allDay ? CALENDAR_TZ : t.tz);
}

// Shift a wall-clock time by whole days (keeps local time across DST).
function addDays(t: LocalTime, days: number): LocalTime {
  const d = new Date(Date.UTC(t.y, t.mo, t.d + days));
  return { ...t, y: d.getUTCFullYear(), mo: d.getUTCMonth(), d: d.getUTCDate() };
}

// ---------- recurrence expansion ----------

const DAY_CODES = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

function expand(start: LocalTime, rrule: string, rangeEnd: Date): LocalTime[] {
  const rule: Record<string, string> = {};
  for (const part of rrule.split(";")) {
    const [k, v] = part.split("=");
    rule[k] = v;
  }
  const freq = rule.FREQ;
  const interval = Number(rule.INTERVAL || 1);
  const count = rule.COUNT ? Number(rule.COUNT) : Infinity;
  const until = rule.UNTIL ? toInstant(parseIcsDate({ params: {}, value: rule.UNTIL })) : null;
  if (freq !== "DAILY" && freq !== "WEEKLY") return [start]; // unsupported: first instance only

  const weekday = (t: LocalTime) => new Date(Date.UTC(t.y, t.mo, t.d)).getUTCDay();
  const byDay =
    freq === "WEEKLY"
      ? (rule.BYDAY?.split(",").map((c) => DAY_CODES.indexOf(c.slice(-2))) ?? [weekday(start)])
      : null;

  const out: LocalTime[] = [];
  const weekStart = addDays(start, -weekday(start));
  for (let i = 0; i < 2000 && out.length < count; i++) {
    let candidates: LocalTime[];
    if (freq === "DAILY") {
      candidates = [addDays(start, i * interval)];
    } else {
      const base = addDays(weekStart, i * 7 * interval);
      candidates = byDay!
        .slice()
        .sort((a, b) => a - b)
        .map((wd) => addDays(base, wd))
        .filter((c) => toInstant(c) >= toInstant(start));
    }
    for (const c of candidates) {
      const instant = toInstant(c);
      if ((until && instant > until) || instant > rangeEnd || out.length >= count) return out;
      out.push(c);
    }
  }
  return out;
}

// ---------- public API ----------

// `collapseRecurring` keeps only the next instance of each recurring series so
// weekly meetings don't crowd out one-off key events.
export async function getUpcomingEvents(
  opts: { days?: number; limit?: number; collapseRecurring?: boolean } = {}
): Promise<CalendarEvent[]> {
  const { days = 120, limit = 8, collapseRecurring = true } = opts;
  let ics: string;
  try {
    const res = await fetch(ICS_URL, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    ics = await res.text();
  } catch {
    return [];
  }

  const now = new Date();
  const rangeEnd = new Date(now.getTime() + days * 86400000);
  const raw = parseRawEvents(ics);
  const text = (e: RawEvent, k: string) => (e[k]?.[0] ? unescapeText(e[k][0].value) : undefined);

  // Single-instance overrides, keyed by UID + original start instant.
  const overrides = new Map<string, RawEvent>();
  for (const e of raw) {
    if (e["RECURRENCE-ID"]) {
      const key = `${text(e, "UID")}|${toInstant(parseIcsDate(e["RECURRENCE-ID"][0])).getTime()}`;
      overrides.set(key, e);
    }
  }

  const build = (e: RawEvent, startT: LocalTime, recurring: boolean): CalendarEvent | null => {
    if (text(e, "STATUS") === "CANCELLED") return null;
    const start = toInstant(startT);
    const dtStart = toInstant(parseIcsDate(e.DTSTART[0]));
    const duration = e.DTEND ? toInstant(parseIcsDate(e.DTEND[0])).getTime() - dtStart.getTime() : 0;
    return {
      id: `${text(e, "UID")}-${start.getTime()}`,
      uid: text(e, "UID") || "",
      title: text(e, "SUMMARY") || "Untitled event",
      start,
      end: new Date(start.getTime() + duration),
      allDay: startT.allDay,
      location: text(e, "LOCATION"),
      description: text(e, "DESCRIPTION"),
      recurring,
    };
  };

  const events: CalendarEvent[] = [];
  for (const e of raw) {
    if (!e.DTSTART || e["RECURRENCE-ID"]) continue;
    const start = parseIcsDate(e.DTSTART[0]);
    const rrule = e.RRULE?.[0]?.value;
    const instances = rrule ? expand(start, rrule, rangeEnd) : [start];
    const exdates = new Set(
      (e.EXDATE ?? []).flatMap((p) =>
        p.value.split(",").map((v) => toInstant(parseIcsDate({ params: p.params, value: v })).getTime())
      )
    );
    for (const inst of instances) {
      const t = toInstant(inst).getTime();
      if (exdates.has(t)) continue;
      const override = overrides.get(`${text(e, "UID")}|${t}`);
      const ev = override
        ? build(override, parseIcsDate(override.DTSTART[0]), !!rrule)
        : build(e, inst, !!rrule);
      if (ev) events.push(ev);
    }
  }

  const seen = new Set<string>();
  return events
    .filter((ev) => ev.end > now && ev.start <= rangeEnd)
    .sort((a, b) => a.start.getTime() - b.start.getTime())
    .filter((ev) => {
      if (!collapseRecurring || !ev.recurring) return true;
      if (seen.has(ev.uid)) return false;
      seen.add(ev.uid);
      return true;
    })
    .slice(0, limit);
}
