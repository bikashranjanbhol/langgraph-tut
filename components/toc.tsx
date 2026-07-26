"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/tutorials";
import { cn } from "@/lib/utils";

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="mb-3 font-semibold text-ink-900 dark:text-white">
        On this page
      </p>
      <ul className="space-y-1 border-l border-ink-200 dark:border-ink-800">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "-ml-px block border-l-2 py-1 transition-colors",
                item.level === 3 ? "pl-6" : "pl-4",
                activeId === item.id
                  ? "border-brand-500 font-medium text-brand-600 dark:text-brand-300"
                  : "border-transparent text-ink-500 hover:border-ink-300 hover:text-ink-800 dark:text-ink-400 dark:hover:text-ink-100"
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
