import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, GraduationCap } from "lucide-react";
import { getAllTutorials, getTutorialsByCategory } from "@/lib/tutorials";
import { DifficultyBadge } from "@/components/ui";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Quickstart Track — Hands-on LangGraph Tutorials",
  description:
    "A focused, fast LangGraph track. Work through hands-on tutorials from core concepts and your first StateGraph to persistence, human-in-the-loop and multi-agent systems. For the full course, see the curriculum.",
  alternates: { canonical: "/tutorials" },
  openGraph: {
    title: "LangGraph Quickstart Track — Hands-on Tutorials",
    description:
      "A focused, fast LangGraph track, from fundamentals to multi-agent systems.",
    url: `${siteConfig.url}/tutorials`,
  },
};

export default function TutorialsPage() {
  const all = getAllTutorials();
  const groups = getTutorialsByCategory();
  const totalMinutes = all.reduce(
    (sum, t) => sum + (parseInt(t.duration, 10) || t.readingTime),
    0
  );

  // ItemList structured data for the whole course
  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "The LangGraph Learning Path",
    description:
      "A complete, structured learning path for LangGraph, covering everything from core concepts to production multi-agent systems.",
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      sameAs: siteConfig.url,
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: `PT${totalMinutes}M`,
    },
    numberOfCredits: all.length,
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: all.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.title,
      url: `${siteConfig.url}/tutorials/${t.slug}`,
    })),
  };

  let counter = 0;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      {/* Header */}
      <section className="relative overflow-hidden border-b border-ink-200/70 dark:border-ink-800/70">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 left-1/2 h-80 w-[700px] -translate-x-1/2 rounded-full bg-brand-500/15 blur-[120px]"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/10 px-3 py-1 text-xs font-medium text-brand-700 dark:text-brand-300">
            <GraduationCap className="h-3.5 w-3.5" />
            Quickstart · {all.length} tutorials · {groups.length} modules
          </span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-ink-900 dark:text-white sm:text-5xl">
            LangGraph <span className="gradient-text">Quickstart</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-600 dark:text-ink-300">
            A fast, hands-on path — follow it top to bottom, or jump to the topic
            you need. Every tutorial includes plain-English explanations and
            runnable code. Want the deep, comprehensive course?{" "}
            <Link
              href="/curriculum"
              className="font-medium text-brand-600 underline decoration-brand-400/40 underline-offset-2 dark:text-brand-300"
            >
              Explore the full curriculum
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Modules */}
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="space-y-16">
          {groups.map((group, gi) => (
            <section
              key={group.category}
              id={group.category.toLowerCase().replace(/\s+/g, "-")}
              className="scroll-mt-24"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-sm font-semibold text-brand-500">
                  {String(gi + 1).padStart(2, "0")}
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-ink-900 dark:text-white">
                  {group.category}
                </h2>
              </div>

              <ol className="mt-6 space-y-3">
                {group.items.map((t) => {
                  counter += 1;
                  const n = counter;
                  return (
                    <li key={t.slug}>
                      <Link
                        href={`/tutorials/${t.slug}`}
                        className="group card card-hover flex items-center gap-4 p-4 sm:gap-5 sm:p-5"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/12 text-sm font-bold text-brand-600 dark:text-brand-300">
                          {String(n).padStart(2, "0")}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-base font-semibold text-ink-900 transition-colors group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-300">
                              {t.title}
                            </h3>
                            <DifficultyBadge level={t.difficulty} />
                          </div>
                          <p className="mt-1 line-clamp-2 text-sm text-ink-500 dark:text-ink-400">
                            {t.description}
                          </p>
                        </div>
                        <div className="hidden shrink-0 items-center gap-4 sm:flex">
                          <span className="inline-flex items-center gap-1 text-xs text-ink-400">
                            <Clock className="h-3.5 w-3.5" />
                            {t.duration}
                          </span>
                          <ArrowRight className="h-4 w-4 text-ink-300 transition-all group-hover:translate-x-1 group-hover:text-brand-500" />
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
