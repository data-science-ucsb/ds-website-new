import { ReactNode, RefObject } from "react";

type Props = {
  statsRef: RefObject<HTMLDivElement>;
  countLabel: string;
  count: number;
  total: number;
  mean: number;
  variance: number;
  lastLabel: string;
  last: string;
  suffix?: ReactNode;
};

/** Mono readout under a board: running count, mean, variance, last result. */
export default function BoardStats({
  statsRef,
  countLabel,
  count,
  total,
  mean,
  variance,
  lastLabel,
  last,
  suffix,
}: Props) {
  return (
    <div
      ref={statsRef}
      className="mt-3 max-w-full space-y-1.5 border-t border-ink/10 pt-3 font-mono text-[11px] tabular-nums text-ink-muted"
    >
      <p className="flex items-center justify-between gap-4">
        <span>
          {countLabel} <span className="text-ink">{String(count).padStart(3, "0")}</span>/{total}
        </span>
        <span>
          x̄ <span className="text-ink">{mean.toFixed(2)}</span>
        </span>
        <span>
          s² <span className="text-ink">{variance.toFixed(2)}</span>
        </span>
      </p>
      <p className="whitespace-nowrap">
        {lastLabel}: <span className="text-ink">{last}</span>
        {suffix}
      </p>
    </div>
  );
}
