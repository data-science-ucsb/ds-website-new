import { RefObject, useEffect, useRef } from "react";

export const CHAR_W = 0.6; // monospace advance width in em
export const LINE_H = 1.15;

type Options = {
  areaRef: RefObject<HTMLDivElement>;
  preRef: RefObject<HTMLPreElement>;
  statsRef: RefObject<HTMLDivElement>;
  /** board width in characters */
  width: number;
  /** board height in lines for a given number of stretchable lines */
  heightFor: (lines: number) => number;
  /** stretchable lines: the minimum, and what to use below lg */
  minLines?: number;
  defaultLines?: number;
  /** called when the stretchable line count changes, to redraw */
  onLinesChange?: () => void;
};

/**
 * Scales an ASCII <pre> to fill its box. On lg the box is as tall as the hero
 * text column, so the font is sized to fit both ways and any spare height is
 * handed back as extra stretchable lines; below lg it just fits the width.
 * Returns a ref holding the current stretchable line count.
 */
export function useAsciiFit({
  areaRef,
  preRef,
  statsRef,
  width,
  heightFor,
  minLines = 0,
  defaultLines = minLines,
  onLinesChange,
}: Options) {
  const linesRef = useRef(defaultLines);
  const onChange = useRef(onLinesChange);
  onChange.current = onLinesChange;

  useEffect(() => {
    const area = areaRef.current;
    const pre = preRef.current;
    if (!area || !pre) return;
    const lg = window.matchMedia("(min-width: 1024px)");
    const fit = () => {
      const byWidth = area.clientWidth / (width * CHAR_W);
      let size = Math.min(byWidth, 14);
      let lines = defaultLines;
      let lineHeight = "";
      if (lg.matches) {
        const h = area.clientHeight - 1;
        size = Math.min(byWidth, h / (heightFor(minLines) * LINE_H));
        lines = Math.max(minLines, Math.floor(h / (size * LINE_H)) - heightFor(0));
        // stretch line spacing a touch so the board fills the box exactly
        const lh = h / heightFor(lines);
        if (lh <= size * 1.6) lineHeight = `${lh.toFixed(3)}px`;
      }
      pre.style.lineHeight = lineHeight;
      const changed = linesRef.current !== lines;
      linesRef.current = lines;
      pre.style.fontSize = `${Math.max(5, size).toFixed(2)}px`;
      if (changed) onChange.current?.();
      // keep the readout exactly as wide as the board
      if (statsRef.current) statsRef.current.style.width = `${pre.offsetWidth}px`;
    };
    const ro = new ResizeObserver(fit);
    ro.observe(area);
    lg.addEventListener("change", fit);
    fit();
    return () => {
      ro.disconnect();
      lg.removeEventListener("change", fit);
    };
    // sizing constants are fixed per board
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return linesRef;
}

/** Turns a grid of classed cells into HTML with one span per colour run. */
export function gridToHtml<C extends string>(
  grid: { ch: string; cls: C | "" }[][],
  prefix: string
): string {
  let html = "";
  for (const row of grid) {
    let cur: C | "" = "";
    let buf = "";
    const flush = () => {
      if (!buf) return;
      html += cur ? `<span class="${prefix}-${cur}">${buf}</span>` : buf;
      buf = "";
    };
    for (const c of row) {
      if (c.cls !== cur) {
        flush();
        cur = c.cls;
      }
      buf += c.ch;
    }
    flush();
    html += "\n";
  }
  return html;
}

/** Pauses an animation loop while its element is off screen. */
export function observeVisibility(el: Element | null, onChange: (visible: boolean) => void) {
  if (!el) return () => {};
  const io = new IntersectionObserver(([entry]) => onChange(entry.isIntersecting));
  io.observe(el);
  return () => io.disconnect();
}
