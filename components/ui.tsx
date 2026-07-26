import { cn } from "@/lib/utils";
import type { Difficulty } from "@/lib/tutorials";

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
        className
      )}
    >
      {children}
    </span>
  );
}

const difficultyStyles: Record<Difficulty, string> = {
  Beginner:
    "bg-emerald-500/12 text-emerald-700 dark:text-emerald-300 ring-1 ring-inset ring-emerald-500/20",
  Intermediate:
    "bg-amber-500/12 text-amber-700 dark:text-amber-300 ring-1 ring-inset ring-amber-500/20",
  Advanced:
    "bg-rose-500/12 text-rose-700 dark:text-rose-300 ring-1 ring-inset ring-rose-500/20",
};

export function DifficultyBadge({ level }: { level: Difficulty }) {
  return <Badge className={difficultyStyles[level]}>{level}</Badge>;
}

export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <Badge className="bg-ink-100 text-ink-600 dark:bg-ink-800/70 dark:text-ink-300">
      {children}
    </Badge>
  );
}
