"use client";

import { useEffect, useState } from "react";
import CoinBoard from "./CoinBoard";
import DiceSumBoard from "./DiceSumBoard";
import DiceFacesBoard from "./DiceFacesBoard";

const BOARDS = [CoinBoard, DiceSumBoard, DiceFacesBoard];
const KEY = "ds-hero-board";

/**
 * Shows one of the ASCII boards, picked at random on each page load and never
 * the same one twice in a row. Chosen after mount so server and client HTML
 * match.
 */
export default function HeroBoard() {
  const [pick, setPick] = useState<number | null>(null);

  useEffect(() => {
    let last = -1;
    try {
      last = Number(localStorage.getItem(KEY) ?? -1);
    } catch {}
    const options = BOARDS.map((_, i) => i).filter((i) => i !== last);
    const next = options[Math.floor(Math.random() * options.length)];
    try {
      localStorage.setItem(KEY, String(next));
    } catch {}
    setPick(next);
  }, []);

  if (pick === null) return <div className="h-[420px] w-full lg:h-full" aria-hidden="true" />;
  const Board = BOARDS[pick];
  return <Board />;
}
