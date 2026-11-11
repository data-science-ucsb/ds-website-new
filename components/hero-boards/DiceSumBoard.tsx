"use client";

import { useEffect, useRef, useState } from "react";
import BoardStats from "./BoardStats";
import { gridToHtml, observeVisibility, useAsciiFit } from "./useAsciiFit";
import {
  DICE,
  DIE_H,
  DIE_W,
  FACE_SWAP_MS,
  HOLD_MS,
  ROLLS,
  d6,
  drawDie,
  nextShown,
  rollMs,
  settledCount,
} from "./dice";

/**
 * Dice v1: six dice are rolled 100 times and their sum (6..36) drops into a
 * bin. One die is flat, but the sum of six is close to normal, so the stacks
 * build up a bell curve (the central limit theorem).
 */

const MIN_SUM = DICE;
const MAX_SUM = DICE * 6;
const BINS = MAX_SUM - MIN_SUM + 1; // 31
const COL = 2; // chars per bin column
const DEFAULT_BIN_LINES = 16; // grows on desktop to fill the hero height
const MIN_BIN_LINES = 16; // peak bins expect ~9.5, so this leaves headroom
const MIN_ROLL_MS = 260;
const TUMBLE_SHARE = 0.45;
const FALL_SHARE = 0.4; // the rest is a pause

const DICE_GAP = 2;
const WIDTH = BINS * COL + 1; // 63
const DICE_LEFT = Math.floor((WIDTH - (DICE * DIE_W + (DICE - 1) * DICE_GAP)) / 2);
const SUM_LINE = DIE_H + 1;
const BIN_TOP = SUM_LINE + 2;
const FOOT_LINES = 4; // floor, ticks, labels, caption
const heightFor = (binLines: number) => BIN_TOP + binLines + FOOT_LINES;

type Cls = "" | "die" | "rolling" | "pip" | "token" | "stack" | "ghost" | "frame" | "label" | "sum";
type Cell = { ch: string; cls: Cls };

// distribution of the sum of six dice, by convolution
const EXPECTED = (() => {
  let p = [1];
  for (let d = 0; d < DICE; d++) {
    const next = Array(p.length + 6).fill(0);
    p.forEach((v, i) => {
      for (let f = 1; f <= 6; f++) next[i + f] += v / 6;
    });
    p = next;
  }
  return p.slice(MIN_SUM, MAX_SUM + 1).map((q) => q * ROLLS);
})();

const binX = (s: number) => (s - MIN_SUM) * COL + 1;

type Roll = {
  faces: number[];
  sum: number;
  restLine: number;
  binLines: number; // histogram height this roll was laid out for
  duration: number;
};

function newRoll(index: number, counts: number[], binLines: number): Roll {
  const faces = Array.from({ length: DICE }, d6);
  const sum = faces.reduce((a, c) => a + c, 0);
  const stack = Math.min(counts[sum - MIN_SUM] + 1, binLines);
  return { faces, sum, restLine: binLines - stack, binLines, duration: rollMs(index, MIN_ROLL_MS) };
}

function phase(roll: Roll, t: number) {
  const tumble = roll.duration * TUMBLE_SHARE;
  const fall = roll.duration * FALL_SHARE;
  const fallSteps = roll.restLine + 1;
  const fallStep =
    t < tumble ? -1 : Math.min(fallSteps, Math.floor(((t - tumble) / fall) * fallSteps));
  return { settled: settledCount(t, tumble), fallStep, landed: fallStep >= fallSteps };
}

function render(
  counts: number[],
  roll: Roll | null,
  t: number,
  shown: number[],
  binLines: number
): string {
  const FLOOR = BIN_TOP + binLines;
  const HEIGHT = heightFor(binLines);
  const g: Cell[][] = Array.from({ length: HEIGHT }, () =>
    Array.from({ length: WIDTH }, () => ({ ch: " ", cls: "" as Cls }))
  );
  const put = (x: number, y: number, ch: string, cls: Cls) => {
    if (y >= 0 && y < HEIGHT && x >= 0 && x < WIDTH) g[y][x] = { ch, cls };
  };
  const text = (x: number, y: number, s: string, cls: Cls) => {
    for (let i = 0; i < s.length; i++) put(x + i, y, s[i], cls);
  };

  const ph = roll ? phase(roll, t) : null;

  for (let d = 0; d < DICE; d++) {
    const rolling = !!ph && d >= ph.settled;
    drawDie(put, DICE_LEFT + d * (DIE_W + DICE_GAP), 0, shown[d], rolling ? "rolling" : "die", rolling ? "rolling" : "pip");
  }

  // sum line, once every die has settled
  if (roll && ph && ph.settled >= DICE) {
    const s = `${roll.faces.join(" + ")} = ${roll.sum}`;
    text(Math.floor((WIDTH - s.length) / 2), SUM_LINE, s, "sum");
  }

  // stacks + expected bell curve
  for (let i = 0; i < BINS; i++) {
    const x = binX(MIN_SUM + i);
    for (let l = 0; l < Math.min(counts[i], binLines); l++) put(x, FLOOR - 1 - l, "o", "stack");
    const e = Math.round(EXPECTED[i]);
    if (e > 0 && e > counts[i] && e <= binLines) put(x, FLOOR - e, "-", "ghost");
  }

  // floor, ticks and labels at 6 and every 5
  for (let x = 0; x < WIDTH; x++) put(x, FLOOR, "=", "frame");
  for (let s = MIN_SUM; s <= MAX_SUM; s++) {
    if (s % 5 !== 0 && s !== MIN_SUM) continue;
    const x = binX(s);
    put(x, FLOOR + 1, "|", "frame");
    const lab = String(s);
    text(x - (lab.length > 1 ? 1 : 0), FLOOR + 2, lab, "label");
  }
  const cap = `sum of ${DICE} dice`;
  text(Math.floor((WIDTH - cap.length) / 2), FLOOR + 3, cap, "label");

  // the falling token
  if (roll && ph && ph.fallStep >= 0 && !ph.landed) {
    const x = binX(roll.sum);
    put(x, BIN_TOP - 1, "v", "sum");
    put(x, BIN_TOP + ph.fallStep, "o", "token");
  }

  return gridToHtml(g, "db");
}

type Stats = { rolled: number; mean: number; variance: number; last: string; sum: number | null };

export default function DiceSumBoard() {
  const preRef = useRef<HTMLPreElement>(null);
  const areaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const redraw = useRef<() => void>(() => {});
  const [stats, setStats] = useState<Stats>({
    rolled: 0,
    mean: 0,
    variance: 0,
    last: "· · · · · ·",
    sum: null,
  });

  const binLinesRef = useAsciiFit({
    areaRef,
    preRef,
    statsRef,
    width: WIDTH,
    heightFor,
    minLines: MIN_BIN_LINES,
    defaultLines: DEFAULT_BIN_LINES,
    onLinesChange: () => redraw.current(),
  });

  useEffect(() => {
    let counts = Array(BINS).fill(0) as number[];
    let launched = 0;
    let roll: Roll | null = null;
    let shown: number[] = Array.from({ length: DICE }, d6);
    let elapsed = 0;
    let sinceSwap = 0;
    let holding = false;
    let landedThis = false;
    let lastKey = "";
    let raf = 0;
    let prev = 0;
    let visible = true;
    const bl = () => binLinesRef.current;

    const report = (settled: number, landed: boolean) => {
      if (!roll) return;
      const last = roll.faces.map((f, i) => (i < settled ? String(f) : "·")).join(" ");
      const key = `${launched}:${last}:${landed}`;
      if (key === lastKey) return;
      lastKey = key;
      const n = counts.reduce((a, c) => a + c, 0);
      const mean = n ? counts.reduce((a, c, i) => a + c * (i + MIN_SUM), 0) / n : 0;
      const variance = n
        ? counts.reduce((a, c, i) => a + c * (i + MIN_SUM - mean) ** 2, 0) / n
        : 0;
      setStats({ rolled: n, mean, variance, last, sum: settled >= DICE ? roll.sum : null });
    };

    const draw = () => {
      if (preRef.current) preRef.current.innerHTML = render(counts, roll, elapsed, shown, roll?.binLines ?? bl());
    };
    redraw.current = draw;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      let last: Roll | null = null;
      for (let i = 0; i < ROLLS; i++) {
        last = newRoll(i, counts, bl());
        counts[last.sum - MIN_SUM]++;
        launched++;
      }
      shown = last!.faces;
      roll = null;
      draw();
      roll = last;
      report(DICE, true);
      roll = null;
      return;
    }

    const launch = () => {
      roll = newRoll(launched, counts, bl());
      launched++;
      elapsed = 0;
      sinceSwap = FACE_SWAP_MS;
      landedThis = false;
    };

    const frame = (now: number) => {
      const dt = prev ? Math.min(now - prev, 100) : 16;
      prev = now;
      elapsed += dt;
      sinceSwap += dt;

      if (holding) {
        if (elapsed >= HOLD_MS) {
          holding = false;
          counts = Array(BINS).fill(0);
          launched = 0;
          lastKey = "";
          launch();
        }
      } else if (roll) {
        const ph = phase(roll, elapsed);
        const swap = sinceSwap >= FACE_SWAP_MS;
        if (swap) sinceSwap = 0;
        shown = nextShown(shown, roll.faces, ph.settled, swap);
        if (ph.landed && !landedThis) {
          counts[roll.sum - MIN_SUM]++;
          landedThis = true;
        }
        draw();
        report(ph.settled, ph.landed);

        if (elapsed >= roll.duration) {
          if (!landedThis) counts[roll.sum - MIN_SUM]++;
          if (launched < ROLLS) launch();
          else {
            // show the finished dice, not a fresh tumble, during the hold
            roll = null;
            draw();
            holding = true;
            elapsed = 0;
          }
        }
      }

      if (visible) raf = requestAnimationFrame(frame);
    };

    const start = () => {
      prev = 0;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(frame);
    };

    const stopObserving = observeVisibility(wrapRef.current, (v) => {
      const was = visible;
      visible = v;
      if (visible && !was) start();
    });

    launch();
    draw();
    start();
    return () => {
      cancelAnimationFrame(raf);
      stopObserving();
    };
  }, [binLinesRef]);

  return (
    <div ref={wrapRef} className="dice-board flex w-full flex-col items-center text-ink lg:h-full">
      <div ref={areaRef} className="flex min-h-0 w-full flex-1 items-end justify-center overflow-hidden">
        <pre ref={preRef} aria-hidden="true" className="m-0 select-none font-mono leading-[1.15]" />
      </div>
      <BoardStats
        statsRef={statsRef}
        countLabel="n"
        count={stats.rolled}
        total={ROLLS}
        mean={stats.mean}
        variance={stats.variance}
        lastLabel="last roll"
        last={stats.last}
        suffix={stats.sum !== null && <span> → {stats.sum}</span>}
      />
      <p className="sr-only">
        Animated ASCII dice: six dice are rolled 100 times and each total drops into a histogram,
        which builds up a bell-shaped curve.
      </p>
    </div>
  );
}
