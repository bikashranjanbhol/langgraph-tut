import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChevronRight,
  Clock,
  ListChecks,
} from "lucide-react";
import {
  syllabus,
  getChapter,
  getAdjacentChapters,
} from "@/lib/syllabus";
import { getChapterContent } from "@/lib/curriculum";
import { mdxOptions } from "@/lib/mdx-options";
import { mdxComponents } from "@/components/mdx";
import { TableOfContents } from "@/components/toc";
import { DifficultyBadge } from "@/components/ui";
import { siteConfig } from "@/lib/site";
import { formatDate } from "@/lib/utils";
import type { TocItem } from "@/lib/tutorials";

export function generateStaticParams() {
  return syllabus.flatMap((part) =>
    part.chapters.map((chapter) => ({
      part: part.slug,
      chapter: chapter.slug,
    }))
  );
}

export function generateMetadata({
  params,
}: {
  params: { part: string; chapter: string };
}): Metadata {
  const found = getChapter(params.part, params.chapter);
  if (!found) return {};
  const { part, chapter } = found;
  const title = `${chapter.title}`;
  const description = `Part ${part.roman}, Chapter ${chapter.number} of the LangGraph curriculum. Covers: ${chapter.sections
    .slice(0, 6)
    .map((s) => s.title)
    .join(", ")}.`;
  return {
    title,
    description,
    alternates: { canonical: `/curriculum/${part.slug}/${chapter.slug}` },
    openGraph: {
      type: "article",
      title: `${title} — LangGraph Curriculum`,
      description,
      url: `${siteConfig.url}/curriculum/${part.slug}/${chapter.slug}`,
    },
  };
}

export default function ChapterPage({
  params,
}: {
  params: { part: string; chapter: string };
}) {
  const found = getChapter(params.part, params.chapter);
  if (!found) notFound();
  const { part, chapter } = found;

  const authored = getChapterContent(part.slug, chapter.slug);
  const { prev, next } = getAdjacentChapters(part.slug, chapter.slug);
  const url = `${siteConfig.url}/curriculum/${part.slug}/${chapter.slug}`;

  // TOC comes from MDX headings when authored, else from the section outline.
  const toc: TocItem[] = authored
    ? authored.toc
    : chapter.sections.map((s) => ({ level: 2, text: `${s.number} ${s.title}`, id: s.id }));

  const learningJsonLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: chapter.title,
    learningResourceType: "Chapter",
    educationalLevel: part.level,
    isPartOf: {
      "@type": "Course",
      name: `Part ${part.roman}: ${part.title}`,
      url: `${siteConfig.url}/curriculum/${part.slug}`,
    },
    teaches: chapter.sections.map((s) => s.title),
    url,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Curriculum",
        item: `${siteConfig.url}/curriculum`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `Part ${part.roman}`,
        item: `${siteConfig.url}/curriculum/${part.slug}`,
      },
      { "@type": "ListItem", position: 4, name: chapter.title, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(learningJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-1.5 text-sm text-ink-500 dark:text-ink-400"
        >
          <Link href="/" className="hover:text-brand-600 dark:hover:text-brand-300">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link
            href="/curriculum"
            className="hover:text-brand-600 dark:hover:text-brand-300"
          >
            Curriculum
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link
            href={`/curriculum/${part.slug}`}
            className="hover:text-brand-600 dark:hover:text-brand-300"
          >
            Part {part.roman}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="truncate text-ink-700 dark:text-ink-200">
            {chapter.title}
          </span>
        </nav>

        <div className="mt-8 lg:grid lg:grid-cols-[1fr_240px] lg:gap-12">
          <article className="min-w-0">
            <header className="border-b border-ink-200/70 pb-8 dark:border-ink-800/70">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-500/12 px-2.5 py-0.5 text-xs font-semibold text-brand-600 dark:text-brand-300">
                  Part {part.roman} · Ch. {chapter.number}
                </span>
                <DifficultyBadge level={part.level} />
              </div>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900 dark:text-white sm:text-4xl">
                {chapter.title}
              </h1>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-400 dark:text-ink-500">
                <span className="inline-flex items-center gap-1.5">
                  <ListChecks className="h-4 w-4" />
                  {chapter.sections.length} lessons
                </span>
                {authored && (
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    {authored.readingTime} min read
                  </span>
                )}
                {authored?.updated && (
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    Updated {formatDate(authored.updated)}
                  </span>
                )}
              </div>
            </header>

            {/* Mobile TOC */}
            {toc.length > 0 && (
              <details className="mt-6 rounded-xl border border-ink-200/70 bg-[rgb(var(--bg-subtle))] p-4 lg:hidden dark:border-ink-800/70">
                <summary className="cursor-pointer text-sm font-semibold text-ink-900 dark:text-white">
                  In this chapter
                </summary>
                <div className="mt-3">
                  <TableOfContents items={toc} />
                </div>
              </details>
            )}

            {authored ? (
              <div className="prose prose-slate mt-8 max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-headings:font-bold prose-h2:mt-12 prose-h2:border-b prose-h2:border-ink-200/60 prose-h2:pb-2 prose-h2:text-2xl dark:prose-h2:border-ink-800/60 prose-h3:text-xl prose-a:font-medium prose-strong:text-ink-900 dark:prose-strong:text-white prose-img:rounded-xl">
                <MDXRemote
                  source={authored.content}
                  components={mdxComponents}
                  options={mdxOptions}
                />
              </div>
            ) : (
              <OutlineView chapter={chapter} />
            )}

            {/* Prev / Next chapter */}
            <nav className="mt-12 grid gap-4 sm:grid-cols-2">
              {prev ? (
                <Link
                  href={`/curriculum/${prev.part.slug}/${prev.chapter.slug}`}
                  className="card card-hover group flex flex-col p-5"
                >
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-ink-400">
                    <ArrowLeft className="h-3.5 w-3.5" /> Previous
                  </span>
                  <span className="mt-1 font-semibold text-ink-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-300">
                    {prev.chapter.title}
                  </span>
                  <span className="mt-0.5 text-xs text-ink-400">
                    Part {prev.part.roman}
                  </span>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link
                  href={`/curriculum/${next.part.slug}/${next.chapter.slug}`}
                  className="card card-hover group flex flex-col p-5 text-right sm:items-end"
                >
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-ink-400">
                    Next <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                  <span className="mt-1 font-semibold text-ink-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-300">
                    {next.chapter.title}
                  </span>
                  <span className="mt-0.5 text-xs text-ink-400">
                    Part {next.part.roman}
                  </span>
                </Link>
              ) : (
                <span />
              )}
            </nav>
          </article>

          {/* Sidebar TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents items={toc} />
              <div className="mt-8 border-t border-ink-200/70 pt-6 dark:border-ink-800/70">
                <Link
                  href={`/curriculum/${part.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-brand-600 dark:text-ink-400 dark:hover:text-brand-300"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Part {part.roman}
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

function OutlineView({
  chapter,
}: {
  chapter: NonNullable<ReturnType<typeof getChapter>>["chapter"];
}) {
  return (
    <div className="mt-8">
      <div className="rounded-xl border border-brand-400/20 bg-brand-500/5 p-4 text-sm text-ink-600 dark:bg-brand-500/10 dark:text-ink-300">
        <strong className="text-ink-900 dark:text-white">Chapter outline.</strong>{" "}
        Full written lessons and code for this chapter are being added. Below is
        everything it will cover.
      </div>

      <ol className="mt-8 space-y-2.5">
        {chapter.sections.map((section) => (
          <li
            key={section.id}
            id={section.id}
            className="scroll-mt-24 flex items-start gap-4 rounded-xl border border-ink-200/70 bg-white/60 p-4 dark:border-ink-800/70 dark:bg-ink-900/40"
          >
            <span className="mt-0.5 shrink-0 font-mono text-sm font-semibold text-brand-500">
              {section.number}
            </span>
            <span className="text-[15px] font-medium text-ink-800 dark:text-ink-100">
              {section.title}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
