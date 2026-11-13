/** Shared pieces for the ASCII dice boards. */

export const DICE = 6;
export const ROLLS = 100;
export const DIE_W = 7;
export const DIE_H = 5;
export const HOLD_MS = 4500;
export const FACE_SWAP_MS = 70;

// time per roll: the first few are slow enough to follow, then it speeds up
const FIRST_ROLL_MS = 3600;
const DECAY = 0.7;
export const rollMs = (i: number, min: number) => Math.max(min, FIRST_ROLL_MS * DECAY ** i);

export const d6 = () => 1 + Math.floor(Math.random() * 6);

// pip positions on a 3x3 grid (row, col)
const PIPS: Record<number, [number, number][]> = {
  1: [[1, 1]],
  2: [[0, 0], [2, 2]],
  3: [[0, 0], [1, 1], [2, 2]],
  4: [[0, 0], [0, 2], [2, 0], [2, 2]],
  5: [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]],
  6: [[0, 0], [0, 2], [1, 0], [1, 2], [2, 0], [2, 2]],
};

/** Draws a 7x5 die with its top-left corner at (x0, y0). */
export function drawDie<C extends string>(
  put: (x: number, y: number, ch: string, cls: C) => void,
  x0: number,
  y0: number,
  face: number,
  frameCls: C,
  pipCls: C
) {
  const row = (y: number, s: string) => {
    for (let i = 0; i < s.length; i++) put(x0 + i, y, s[i], frameCls);
  };
  row(y0, "+-----+");
  for (let r = 0; r < 3; r++) row(y0 + 1 + r, "|     |");
  row(y0 + DIE_H - 1, "+-----+");
  if (face) for (const [r, c] of PIPS[face]) put(x0 + 1 + c * 2, y0 + 1 + r, "o", pipCls);
}

/** How many dice have stopped tumbling: they settle left to right over the
 * second half of the tumble. */
export function settledCount(t: number, tumble: number) {
  if (t >= tumble) return DICE;
  return Math.max(0, Math.min(DICE, Math.floor(((t - tumble * 0.5) / (tumble * 0.5)) * DICE)));
}

/** Faces to draw this frame: settled dice show their result, the rest
 * get a new random face every FACE_SWAP_MS. */
export function nextShown(shown: number[], faces: number[], settled: number, swap: boolean) {
  return shown.map((f, i) => (i < settled ? faces[i] : swap ? d6() : f));
}
