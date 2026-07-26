import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { TutorialMeta } from "@/lib/tutorials";
import { DifficultyBadge } from "@/components/ui";
import { cn } from "@/lib/utils";

export function TutorialCard({
  tutorial,
  index,
}: {
  tutorial: TutorialMeta;
  index?: number;
}) {
  return (
    <Link
      href={`/tutorials/${tutorial.slug}`}
      className="group card card-hover flex flex-col p-5"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {typeof index === "number" && (
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-500/12 text-xs font-bold text-brand-600 dark:text-brand-300">
              {String(index).padStart(2, "0")}
            </span>
          )}
          <DifficultyBadge level={tutorial.difficulty} />
        </div>
        <span className="inline-flex items-center gap-1 text-xs text-ink-400 dark:text-ink-500">
          <Clock className="h-3.5 w-3.5" />
          {tutorial.duration}
        </span>
      </div>

      <h3 className="mt-4 text-base font-semibold text-ink-900 transition-colors group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-300">
        {tutorial.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500 dark:text-ink-400">
        {tutorial.description}
      </p>

      <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-brand-600 dark:text-brand-300">
        Read tutorial
        <ArrowRight
          className={cn(
            "h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          )}
        />
      </div>
    </Link>
  );
}
