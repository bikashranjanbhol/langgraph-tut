import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookMarked, Layers, Route } from "lucide-react";
import {
  syllabus,
  getSyllabusStats,
  partChapterCount,
  partSectionCount,
} from "@/lib/syllabus";
import { DifficultyBadge } from "@/components/ui";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Full Curriculum — The Complete LangGraph Course",
  description:
    "A comprehensive four-part LangGraph curriculum — from beginner foundations to intermediate applications, advanced systems, and shipping agents in the workplace. 66 chapters covering every aspect of building production AI agents.",
  alternates: { canonical: "/curriculum" },
  openGraph: {
    title: "The Complete LangGraph Curriculum",
    description:
      "Four parts, 66 chapters — from your first graph to enterprise-grade multi-agent systems.",
    url: `${siteConfig.url}/curriculum`,
  },
};

export default function CurriculumPage() {
  const stats = getSyllabusStats();

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "The Complete LangGraph Curriculum",
    description: metadata.description,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      sameAs: siteConfig.url,
    },
    hasPart: syllabus.map((part) => ({
      "@type": "Course",
      name: `Part ${part.roman}: ${part.title}`,
      url: `${siteConfig.url}/curriculum/${part.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />

      {/* Header */}
      <section className="relative overflow-hidden border-b border-ink-200/70 dark:border-ink-800/70">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 left-1/2 h-80 w-[700px] -translate-x-1/2 rounded-full bg-brand-500/15 blur-[120px]"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/10 px-3 py-1 text-xs font-medium text-brand-700 dark:text-brand-300">
            <BookMarked className="h-3.5 w-3.5" />
            Full course · {stats.parts} parts · {stats.chapters} chapters
          </span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-ink-900 dark:text-white sm:text-5xl">
            The Complete <span className="gradient-text">LangGraph</span> Curriculum
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-600 dark:text-ink-300">
            A structured path from your first graph to production, enterprise-grade
            agent systems — organized into four parts and {stats.chapters} chapters.
          </p>

          <dl className="mt-8 grid max-w-lg grid-cols-3 gap-6">
            <Stat icon={Layers} value={stats.parts} label="Parts" />
            <Stat icon={BookMarked} value={stats.chapters} label="Chapters" />
            <Stat icon={Route} value={stats.sections} label="Lessons" />
          </dl>
        </div>
      </section>

      {/* Parts */}
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {syllabus.map((part) => (
            <Link
              key={part.slug}
              href={`/curriculum/${part.slug}`}
              className="group card card-hover flex flex-col p-6 sm:p-7"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500/12 font-mono text-sm font-bold text-brand-600 dark:text-brand-300">
                    {part.roman}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-ink-400 dark:text-ink-500">
                    Part {part.roman} · {part.focus}
                  </span>
                </span>
                <DifficultyBadge level={part.level} />
              </div>

              <h2 className="mt-4 text-xl font-bold tracking-tight text-ink-900 transition-colors group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-300">
                {part.title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500 dark:text-ink-400">
                {part.subtitle}
              </p>

              <div className="mt-5 flex items-center justify-between border-t border-ink-200/70 pt-4 text-sm dark:border-ink-800/70">
                <span className="text-ink-500 dark:text-ink-400">
                  {partChapterCount(part)} chapters · {partSectionCount(part)} lessons
                </span>
                <span className="inline-flex items-center gap-1.5 font-medium text-brand-600 dark:text-brand-300">
                  Explore
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

function Stat({
  icon: Icon,
  value,
  label,
}: {
  icon: typeof Layers;
  value: number;
  label: string;
}) {
  return (
    <div>
      <dt className="flex items-center gap-1.5 text-brand-500">
        <Icon className="h-4 w-4" />
      </dt>
      <dd className="mt-1 text-2xl font-bold text-ink-900 dark:text-white">
        {value}
        <span className="ml-1.5 text-xs font-normal text-ink-500 dark:text-ink-400">
          {label}
        </span>
      </dd>
    </div>
  );
}
