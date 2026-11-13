import Link from "./Link";
import { ReactNode } from "react";

type Variant = "primary" | "outline" | "gold" | "ghost-light";

const styles: Record<Variant, { btn: string; dot: string }> = {
  primary: {
    btn: "bg-navy text-paper hover:bg-navy-deep",
    dot: "bg-gold",
  },
  outline: {
    btn: "border border-ink/15 bg-white/60 text-ink hover:border-ink/30 hover:bg-white",
    dot: "bg-navy",
  },
  gold: {
    btn: "bg-gold text-navy-deep hover:bg-gold-soft",
    dot: "bg-navy-deep",
  },
  "ghost-light": {
    btn: "border border-white/25 text-paper hover:bg-white/10",
    dot: "bg-gold",
  },
};

type Props = {
  children: ReactNode;
  variant?: Variant;
  href?: string;
  onClick?: () => void;
  className?: string;
};

/** Reflection-style pill: label on the left, a small dot on the right. */
export default function PillButton({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
}: Props) {
  const s = styles[variant];
  const cls = `group inline-flex min-w-[10.5rem] items-center justify-between gap-6 rounded-full py-3 pl-5 pr-4 text-sm font-medium transition-all duration-200 hover:-translate-y-px active:translate-y-0 active:scale-[0.98] ${s.btn} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 rounded-full transition-transform duration-300 group-hover:scale-[1.8] ${s.dot}`}
      />
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

