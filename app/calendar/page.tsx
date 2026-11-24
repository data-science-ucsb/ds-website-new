import React from "react";
import { CALENDAR_ID, CALENDAR_TZ, getUpcomingEvents, type CalendarEvent } from "@/lib/calendar";

// Re-fetch the calendar feed at most once an hour.
export const revalidate = 3600;

const EMBED_URL = `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(
  CALENDAR_ID
)}&ctz=${encodeURIComponent(CALENDAR_TZ)}&showPrint=0&showTitle=0`;
// cid is the base64 of CALENDAR_ID.
const SUBSCRIBE_URL =
  "https://calendar.google.com/calendar/u/0?cid=ZjQ0ZTYyOGViN2UzMTY0ZTdiYmEwNzRkMWQ0Y2NkYWRhZjZkYmE5MmM0NWJjYTBjYTQ0NmI1NWI4YjlhZTFmNEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t";

const fmt = (opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-US", { timeZone: CALENDAR_TZ, ...opts });
const monthFmt = fmt({ month: "short" });
const dayFmt = fmt({ day: "numeric" });
const weekdayFmt = fmt({ weekday: "long" });
const timeFmt = fmt({ hour: "numeric", minute: "2-digit" });
const longDateFmt = fmt({ weekday: "short", month: "short", day: "numeric" });

function whenLabel(ev: CalendarEvent): string {
  if (ev.allDay) {
    // All-day DTEND is exclusive, so the last day is one day earlier.
    const last = new Date(ev.end.getTime() - 86400000);
    const sameDay = longDateFmt.format(ev.start) === longDateFmt.format(last);
    return sameDay ? "All day" : `${longDateFmt.format(ev.start)} – ${longDateFmt.format(last)}`;
  }
  return `${weekdayFmt.format(ev.start)}, ${timeFmt.format(ev.start)} – ${timeFmt.format(ev.end)}`;
}

function UpcomingEvent({ ev }: { ev: CalendarEvent }) {
  return (
    <li className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col items-center justify-center w-16 shrink-0 rounded-xl bg-navy text-white py-2">
        <span className="text-xs font-semibold uppercase tracking-wide">{monthFmt.format(ev.start)}</span>
        <span className="text-2xl font-bold leading-none">{dayFmt.format(ev.start)}</span>
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-lg font-semibold text-ink">{ev.title}</h3>
          {ev.recurring && (
            <span className="text-xs font-semibold text-navy bg-navy-soft rounded-full px-2 py-0.5">
              Recurring
            </span>
          )}
        </div>
        <p className="text-sm text-ink-muted">{whenLabel(ev)}</p>
        {ev.location && <p className="text-sm text-ink-muted">📍 {ev.location}</p>}
        {ev.description && <p className="text-sm text-ink-muted mt-1 whitespace-pre-line">{ev.description}</p>}
      </div>
    </li>
  );
}

export default async function Calendar() {
  const events = await getUpcomingEvents({ days: 120, limit: 6 });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-4 text-center text-4xl font-bold">Calendar</h1>
      <p className="mb-12 text-center text-gray-600">
        General meetings, workshops, and club events, all in one place.
      </p>

      <section className="max-w-3xl mx-auto mb-12">
        <h2 className="mb-6 text-2xl font-semibold">Upcoming Events</h2>
        {events.length > 0 ? (
          <ul className="flex flex-col gap-4">
            {events.map((ev) => (
              <UpcomingEvent key={ev.id} ev={ev} />
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No upcoming events right now — check back soon!</p>
        )}
        <a
          href={SUBSCRIBE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-6 font-medium text-navy hover:underline"
        >
          + Add this calendar to Google Calendar
        </a>
      </section>

      <div className="flex justify-center">
        <iframe
          src={EMBED_URL}
          title="UCSB Data Science Club calendar"
          className="w-full max-w-[800px] h-[600px] rounded-2xl border border-gray-200 bg-white shadow-sm"
        ></iframe>
      </div>
    </div>
  );
}
