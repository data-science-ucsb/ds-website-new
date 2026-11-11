"use client";

import { useEffect, useRef, useState } from "react";
import BoardStats from "./BoardStats";
import { gridToHtml, observeVisibility, useAsciiFit } from "./useAsciiFit";

/**
 * ASCII Galton board. 100 coins go through it one at a time. Each coin is
 * flipped ROWS times: every peg row is one flip, heads sends it right and
 * tails sends it left, and the peg it hit is relabelled H or T so the path
 * reads as the flip sequence. The bin it lands in is its number of heads, so
 * the stacks build up a Binomial(ROWS, 0.5) histogram.
 */

const ROWS = 10; // flips per coin -> bins 0..ROWS
const COINS = 100;
const SPACING = 4; // chars between neighbouring bins
const PER_LINE = 3; // coins per text line inside a bin
const BIN_LINES = 12;
const HOLD_MS = 4500;

// time per coin: the first few are slow enough to follow, then it speeds up
const FIRST_COIN_MS = 3400;
const DECAY = 0.72;
const MIN_COIN_MS = 200;
const TRAVEL_SHARE = 0.85; // rest of each coin's slot is a short pause

const BINS = ROWS + 1;
const CENTER = Math.floor(((BINS - 1) * SPACING) / 2) + 3;
const WIDTH = CENTER * 2 + 1;
const PEG_TOP = 2; // below the hopper
const PEG_LINES = ROWS * 2;
const BIN_TOP = PEG_TOP + PEG_LINES;
const FLOOR = BIN_TOP + BIN_LINES;
const HEIGHT = FLOOR + 3;

type Cls = "" | "peg" | "coin" | "flip" | "stack" | "ghost" | "frame" | "label";
type Cell = { ch: string; cls: Cls };

type Coin = {
  flips: number[]; // 1 = heads (right), 0 = tails (left)
  heads: number;
  pathLen: number;
  duration: number;
};

const choose = (n: number, k: number) => {
  let r = 1;
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i;
  return r;
};
const EXPECTED = Array.from({ length: BINS }, (_, k) => (COINS * choose(ROWS, k)) / 2 ** ROWS);

const binX = (k: number) => CENTER + (2 * k - ROWS) * (SPACING / 2);
const pegX = (row: number, heads: number) => CENTER + (2 * heads - row) * (SPACING / 2);
const coinMs = (i: number) => Math.max(MIN_COIN_MS, FIRST_COIN_MS * DECAY ** i);

function newCoin(index: number, counts: number[]): Coin {
  const flips: number[] = Array.from({ length: ROWS }, () => (Math.random() < 0.5 ? 1 : 0));
  const heads = flips.reduce((a, c) => a + c, 0);
  const stackLines = Math.min(Math.ceil((counts[heads] + 1) / PER_LINE), BIN_LINES);
  const restLine = BIN_LINES - stackLines;
  return { flips, heads, pathLen: PEG_LINES + restLine + 1, duration: coinMs(index) };
}

/** how many flips a coin at path step `step` has already made */
const flipsDone = (step: number) => Math.min(ROWS, Math.ceil(step / 2));

function render(counts: number[], coin: Coin | null, step: number, launched: number): string {
  const g: Cell[][] = Array.from({ length: HEIGHT }, () =>
    Array.from({ length: WIDTH }, () => ({ ch: " ", cls: "" as Cls }))
  );
  const put = (x: number, y: number, ch: string, cls: Cls) => {
    if (y >= 0 && y < HEIGHT && x >= 0 && x < WIDTH) g[y][x] = { ch, cls };
  };

  // hopper with the coins still waiting
  const waiting = COINS - launched;
  put(CENTER - 2, 0, "\\", "frame");
  put(CENTER + 2, 0, "/", "frame");
  for (let i = 0; i < Math.min(3, waiting); i++) put(CENTER - 1 + i, 0, "o", "stack");
  put(CENTER - 1, 1, "\\", "frame");
  put(CENTER + 1, 1, "/", "frame");

  // pegs
  for (let r = 0; r < ROWS; r++) {
    for (let i = 0; i <= r; i++) put(pegX(r, i), PEG_TOP + r * 2, "·", "peg");
  }

  // bin walls + floor
  for (let k = 0; k <= BINS; k++) {
    const wx = binX(k) - SPACING / 2;
    for (let y = BIN_TOP; y < FLOOR; y++) put(wx, y, "|", "frame");
  }
  for (let x = binX(0) - 2; x <= binX(ROWS) + 2; x++) put(x, FLOOR, "=", "frame");

  // stacks, expected-height ghost marks, axis
  for (let k = 0; k < BINS; k++) {
    const cx = binX(k);
    const lines = Math.ceil(counts[k] / PER_LINE);
    for (let l = 0; l < Math.min(lines, BIN_LINES); l++) {
      const inLine = Math.min(PER_LINE, counts[k] - l * PER_LINE);
      const slots = [0, -1, 1]; // fill center, left, right
      for (let s = 0; s < inLine; s++) put(cx + slots[s], FLOOR - 1 - l, "o", "stack");
    }
    const eLine = Math.round(EXPECTED[k] / PER_LINE);
    if (eLine > 0 && eLine > lines) {
      for (const dx of [-1, 0, 1]) put(cx + dx, FLOOR - eLine, "-", "ghost");
    }
    const lab = String(k);
    put(cx - (lab.length > 1 ? 1 : 0), FLOOR + 1, lab[0], "label");
    if (lab.length > 1) put(cx, FLOOR + 1, lab[1], "label");
  }
  const axis = "number of heads";
  for (let i = 0; i < axis.length; i++)
    put(CENTER - Math.floor(axis.length / 2) + i, FLOOR + 2, axis[i], "label");

  if (coin) {
    // the pegs this coin has already hit show its flips: H went right, T left
    const done = flipsDone(step);
    let h = 0;
    for (let r = 0; r < done; r++) {
      put(pegX(r, h), PEG_TOP + r * 2, coin.flips[r] ? "H" : "T", "flip");
      h += coin.flips[r];
    }

    // the coin itself
    if (step < PEG_LINES) {
      const row = Math.floor(step / 2);
      const hBefore = coin.flips.slice(0, row).reduce((a, c) => a + c, 0);
      const x =
        step % 2 === 0 ? pegX(row, hBefore) : pegX(row, hBefore) + (coin.flips[row] ? 1 : -1);
      // on a peg line the coin sits just above the peg it is about to hit
      put(x, PEG_TOP + step - (step % 2 === 0 ? 1 : 0), "o", "coin");
    } else if (step < coin.pathLen) {
      put(binX(coin.heads), BIN_TOP + (step - PEG_LINES), "o", "coin");
    }
  }

  return gridToHtml(g, "gb");
}

type Stats = {
  dropped: number;
  mean: number;
  variance: number;
  flips: string; // e.g. "THH·······"
  heads: number | null; // set once the coin has landed
};

const EMPTY_FLIPS = "·".repeat(ROWS);

export default function CoinBoard() {
  const preRef = useRef<HTMLPreElement>(null);
  const areaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [stats, setStats] = useState<Stats>({
    dropped: 0,
    mean: 0,
    variance: 0,
    flips: EMPTY_FLIPS,
    heads: null,
  });

  useAsciiFit({ areaRef, preRef, statsRef, width: WIDTH, heightFor: () => HEIGHT });

  useEffect(() => {
    let counts = Array(BINS).fill(0) as number[];
    let launched = 0;
    let coin: Coin | null = null;
    let elapsed = 0; // ms into the current coin (or the hold)
    let holding = false;
    let lastStep = -1;
    let lastShown = "";
    let raf = 0;
    let prev = 0;
    let visible = true;

    const summary = () => {
      const n = counts.reduce((a, c) => a + c, 0);
      const mean = n ? counts.reduce((a, c, k) => a + c * k, 0) / n : 0;
      const variance = n ? counts.reduce((a, c, k) => a + c * (k - mean) ** 2, 0) / n : 0;
      return { dropped: n, mean, variance };
    };

    const showFlips = (c: Coin | null, step: number, landed: boolean) => {
      const done = c ? (landed ? ROWS : flipsDone(step)) : 0;
      const flips = c
        ? c.flips
            .slice(0, done)
            .map((f) => (f ? "H" : "T"))
            .join("") + "·".repeat(ROWS - done)
        : EMPTY_FLIPS;
      const key = `${launched}:${flips}:${landed}`;
      if (key === lastShown) return;
      lastShown = key;
      setStats({ ...summary(), flips, heads: landed && c ? c.heads : null });
    };

    const draw = (step: number) => {
      if (preRef.current) preRef.current.innerHTML = render(counts, coin, step, launched);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      let last: Coin | null = null;
      for (let i = 0; i < COINS; i++) {
        last = newCoin(i, counts);
        counts[last.heads]++;
        launched++;
      }
      draw(-1);
      showFlips(last, 0, true);
      return;
    }

    const launch = () => {
      coin = newCoin(launched, counts);
      launched++;
      elapsed = 0;
      lastStep = -1;
    };

    const frame = (now: number) => {
      // cap dt so a backgrounded tab doesn't fast-forward a whole run
      const dt = prev ? Math.min(now - prev, 100) : 16;
      prev = now;
      elapsed += dt;

      if (holding) {
        if (elapsed >= HOLD_MS) {
          holding = false;
          counts = Array(BINS).fill(0);
          launched = 0;
          coin = null;
          lastShown = "";
          launch();
        }
      } else if (coin) {
        const travel = coin.duration * TRAVEL_SHARE;
        const step = Math.min(coin.pathLen, Math.floor((elapsed / travel) * coin.pathLen));
        if (step >= coin.pathLen && lastStep < coin.pathLen) {
          counts[coin.heads]++;
          draw(coin.pathLen);
          showFlips(coin, step, true);
          lastStep = coin.pathLen;
        } else if (step !== lastStep && step < coin.pathLen) {
          draw(step);
          showFlips(coin, step, false);
          lastStep = step;
        }
        if (elapsed >= coin.duration) {
          if (launched < COINS) launch();
          else {
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
    draw(0);
    start();
    return () => {
      cancelAnimationFrame(raf);
      stopObserving();
    };
  }, []);

  return (
    <div ref={wrapRef} className="galton flex w-full flex-col items-center text-ink lg:h-full">
      <div ref={areaRef} className="flex min-h-0 w-full flex-1 items-end justify-center overflow-hidden">
        <pre ref={preRef} aria-hidden="true" className="m-0 select-none font-mono leading-[1.15]" />
      </div>
      <BoardStats
        statsRef={statsRef}
        countLabel="n"
        count={stats.dropped}
        total={COINS}
        mean={stats.mean}
        variance={stats.variance}
        lastLabel="last coin"
        last={stats.flips}
        suffix={stats.heads !== null && <span> → {stats.heads} heads</span>}
      />
      <p className="sr-only">
        Animated ASCII Galton board: 100 coins go through ten rows of pegs one at a time. Each peg
        is a coin flip, heads to the right and tails to the left, and each coin lands in the bin for
        its number of heads, building up a binomial distribution.
      </p>
    </div>
  );
}
