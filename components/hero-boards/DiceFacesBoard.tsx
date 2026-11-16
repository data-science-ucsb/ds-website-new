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
 * Dice v2: six dice are rolled at once, 100 times. Every die is its own data
 * point: when the dice settle, six tokens fall at the same time, each from
 * its die into the bin for its face (1-6). Over the run the bins even out
 * toward a flat (uniform) distribution.
 */

const FACES = 6;
const SPACING = 9; // chars per bin
const PER_LINE = 7; // tokens per text line inside a bin
const DEFAULT_BIN_LINES = 18; // grows on desktop to fill the hero height
const MIN_BIN_LINES = 17;
const MIN_ROLL_MS = 300;
const TUMBLE_SHARE = 0.4;
const FALL_SHARE = 0.45; // the rest is a pause

const DICE_GAP = 2;
const WIDTH = FACES * SPACING + 1; // 55
const DICE_LEFT = Math.floor((WIDTH - (DICE * DIE_W + (DICE - 1) * DICE_GAP)) / 2);
const DROP_LINES = 5; // gap between the dice and the bins where tokens fan out
const BIN_TOP = DIE_H + DROP_LINES;
const FOOT_LINES = 3; // floor, labels, caption
const heightFor = (binLines: number) => BIN_TOP + binLines + FOOT_LINES;

type Cls = "" | "die" | "rolling" | "pip" | "token" | "stack" | "ghost" | "frame" | "label";
type Cell = { ch: string; cls: Cls };

const EXPECTED_PER_BIN = (ROLLS * DICE) / FACES; // 100

const binX = (face: number) => (face - 1) * SPACING + Math.floor(SPACING / 2); // bin centre
const dieX = (d: number) => DICE_LEFT + d * (DIE_W + DICE_GAP) + Math.floor(DIE_W / 2);
const slots = [0, -1, 1, -2, 2, -3, 3]; // fill a bin line from the centre out

type Token = {
  face: number;
  sx: number; // start column (under its die)
  ex: number; // end column (its slot in the bin)
  steps: number; // lines from under the dice to its resting line
  counted: boolean;
};

type Roll = {
  faces: number[];
  tokens: Token[];
  maxSteps: number;
  binLines: number; // histogram height this roll was laid out for
  duration: number;
};

function newRoll(index: number, counts: number[], binLines: number): Roll {
  const faces = Array.from({ length: DICE }, d6);
  const tmp = counts.slice();
  const tokens = faces.map((face, d) => {
    const n = tmp[face - 1]++; // position of this token in its bin
    const line = Math.min(Math.floor(n / PER_LINE), binLines - 1);
    const restY = BIN_TOP + binLines - 1 - line;
    return {
      face,
      sx: dieX(d),
      ex: binX(face) + slots[n % PER_LINE],
      steps: restY - DIE_H,
      counted: false,
    };
  });
  return {
    faces,
    tokens,
    maxSteps: Math.max(...tokens.map((t) => t.steps)),
    binLines,
    duration: rollMs(index, MIN_ROLL_MS),
  };
}

function phase(roll: Roll, t: number) {
  const tumble = roll.duration * TUMBLE_SHARE;
  const fall = roll.duration * FALL_SHARE;
  // all six tokens fall together at the same speed
  const fallStep = t < tumble ? -1 : Math.floor(((t - tumble) / fall) * roll.maxSteps);
  return { settled: settledCount(t, tumble), fallStep };
}

/** a token's cell at a given fall step: it fans out to its column, then drops */
function tokenPos(tok: Token, step: number) {
  const p = Math.min(1, step / (DROP_LINES - 1));
  return { x: Math.round(tok.sx + (tok.ex - tok.sx) * p), y: DIE_H + step };
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

  // stacks, expected level, walls, labels
  const eLine = Math.round(EXPECTED_PER_BIN / PER_LINE);
  for (let f = 1; f <= FACES; f++) {
    const cx = binX(f);
    const c = counts[f - 1];
    const lines = Math.ceil(c / PER_LINE);
    for (let l = 0; l < Math.min(lines, binLines); l++) {
      const inLine = Math.min(PER_LINE, c - l * PER_LINE);
      for (let i = 0; i < inLine; i++) put(cx + slots[i], FLOOR - 1 - l, "o", "stack");
    }
    if (eLine > lines && eLine <= binLines)
      for (const dx of slots) put(cx + dx, FLOOR - eLine, "-", "ghost");
    const wx = cx - Math.floor(SPACING / 2);
    for (let y = BIN_TOP; y < FLOOR; y++) put(wx, y, "|", "frame");
    if (f === FACES) for (let y = BIN_TOP; y < FLOOR; y++) put(wx + SPACING, y, "|", "frame");
    put(cx, FLOOR + 1, String(f), "label");
  }
  for (let x = 0; x < WIDTH; x++) put(x, FLOOR, "=", "frame");
  const cap = "die face";
  text(Math.floor((WIDTH - cap.length) / 2), FLOOR + 2, cap, "label");

  // the six falling tokens, each showing its face
  if (roll && ph && ph.fallStep >= 0) {
    for (const tok of roll.tokens) {
      if (ph.fallStep >= tok.steps) continue; // landed
      const { x, y } = tokenPos(tok, ph.fallStep);
      put(x, y, String(tok.face), "token");
    }
  }

  return gridToHtml(g, "db");
}

type Stats = { rolls: number; mean: number; variance: number; last: string };

export default function DiceFacesBoard() {
  const preRef = useRef<HTMLPreElement>(null);
  const areaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const redraw = useRef<() => void>(() => {});
  const [stats, setStats] = useState<Stats>({
    rolls: 0,
    mean: 0,
    variance: 0,
    last: "· · · · · ·",
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
    let counts = Array(FACES).fill(0) as number[];
    let launched = 0;
    let finished = 0; // rolls whose tokens have all landed
    let roll: Roll | null = null;
    let shown: number[] = Array.from({ length: DICE }, d6);
    let elapsed = 0;
    let sinceSwap = 0;
    let holding = false;
    let lastKey = "";
    let raf = 0;
    let prev = 0;
    let visible = true;
    const bl = () => binLinesRef.current;

    const report = (faces: number[] | null, settled: number) => {
      const last = faces
        ? faces.map((f, i) => (i < settled ? String(f) : "·")).join(" ")
        : "· · · · · ·";
      const n = counts.reduce((a, c) => a + c, 0);
      const key = `${finished}:${n}:${last}`;
      if (key === lastKey) return;
      lastKey = key;
      const mean = n ? counts.reduce((a, c, i) => a + c * (i + 1), 0) / n : 0;
      const variance = n ? counts.reduce((a, c, i) => a + c * (i + 1 - mean) ** 2, 0) / n : 0;
      setStats({ rolls: finished, mean, variance, last });
    };

    const draw = () => {
      if (preRef.current) preRef.current.innerHTML = render(counts, roll, elapsed, shown, roll?.binLines ?? bl());
    };
    redraw.current = draw;

    const countRemaining = (r: Roll) => {
      for (const tok of r.tokens)
        if (!tok.counted) {
          counts[tok.face - 1]++;
          tok.counted = true;
        }
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      let last: Roll | null = null;
      for (let i = 0; i < ROLLS; i++) {
        last = newRoll(i, counts, bl());
        countRemaining(last);
      }
      finished = ROLLS;
      shown = last!.faces;
      draw();
      report(last!.faces, DICE);
      return;
    }

    const launch = () => {
      roll = newRoll(launched, counts, bl());
      launched++;
      elapsed = 0;
      sinceSwap = FACE_SWAP_MS;
    };

    const frame = (now: number) => {
      const dt = prev ? Math.min(now - prev, 100) : 16;
      prev = now;
      elapsed += dt;
      sinceSwap += dt;

      if (holding) {
        if (elapsed >= HOLD_MS) {
          holding = false;
          counts = Array(FACES).fill(0);
          launched = 0;
          finished = 0;
          lastKey = "";
          launch();
        }
      } else if (roll) {
        const ph = phase(roll, elapsed);
        const swap = sinceSwap >= FACE_SWAP_MS;
        if (swap) sinceSwap = 0;
        shown = nextShown(shown, roll.faces, ph.settled, swap);

        // count each token as it lands
        let allIn = ph.fallStep >= 0;
        for (const tok of roll.tokens) {
          if (ph.fallStep >= tok.steps) {
            if (!tok.counted) {
              counts[tok.face - 1]++;
              tok.counted = true;
            }
          } else allIn = false;
        }
        if (allIn) finished = launched;

        draw();
        report(roll.faces, ph.settled);

        if (elapsed >= roll.duration) {
          countRemaining(roll);
          finished = launched;
          if (launched < ROLLS) launch();
          else {
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
        countLabel="rolls"
        count={stats.rolls}
        total={ROLLS}
        mean={stats.mean}
        variance={stats.variance}
        lastLabel="last roll"
        last={stats.last}
      />
      <p className="sr-only">
        Animated ASCII dice: six dice are rolled at once, 100 times, and each die drops a token into
        the bin for its face, one to six, building up a histogram of every roll.
      </p>
    </div>
  );
}
