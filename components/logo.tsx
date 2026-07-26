import { cn } from "@/lib/utils";

/** A small node-graph mark evoking LangGraph's state graphs. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={cn("h-7 w-7", className)}
    >
      <defs>
        <linearGradient id="lg-grad" x1="0" y1="0" x2="32" y2="32">
          <stop offset="0%" stopColor="#34d39e" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>
      {/* edges */}
      <path
        d="M9 8.5 L23 8.5 M9 8.5 L9 23 M9 23 L23 23 M23 8.5 L9 23"
        stroke="url(#lg-grad)"
        strokeWidth="1.75"
        strokeLinecap="round"
        opacity="0.55"
      />
      {/* nodes */}
      <circle cx="9" cy="8.5" r="3.4" fill="url(#lg-grad)" />
      <circle cx="23" cy="8.5" r="3.4" fill="url(#lg-grad)" />
      <circle cx="9" cy="23" r="3.4" fill="url(#lg-grad)" />
      <circle cx="23" cy="23" r="3.4" fill="url(#lg-grad)" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark />
      <span className="text-[15px] font-semibold tracking-tight text-ink-900 dark:text-white">
        LangGraph
        <span className="ml-1 rounded-md bg-brand-500/15 px-1.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-300">
          Academy
        </span>
      </span>
    </span>
  );
}
