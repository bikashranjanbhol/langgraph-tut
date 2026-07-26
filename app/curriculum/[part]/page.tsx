import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ChevronRight, FileText } from "lucide-react";
import { syllabus, getPart, partSectionCount } from "@/lib/syllabus";
import { chapterHasContent } from "@/lib/curriculum";
import { DifficultyBadge } from "@/components/ui";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return syllabus.map((part) => ({ part: part.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { part: string };
}): Metadata {
  const part = getPart(params.part);
  if (!part) return {};
  const title = `Part ${part.roman}: ${part.title}`;
  return {
    title,
    description: part.subtitle,
    alternates: { canonical: `/curriculum/${part.slug}` },
    openGraph: {
      title: `${title} — LangGraph Curriculum`,
      description: part.subtitle,
      url: `${siteConfig.url}/curriculum/${part.slug}`,
    },
  };
}

export default function PartPage({ params }: { params: { part: string } }) {
  const part = getPart(params.part);
  if (!part) notFound();

  const partIndex = syllabus.findIndex((p) => p.slug === part.slug);
  const prevPart = partIndex > 0 ? syllabus[partIndex - 1] : null;
  const nextPart =
    partIndex < syllabus.length - 1 ? syllabus[partIndex + 1] : null;

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
        name: `Part ${part.roman}: ${part.title}`,
        item: `${siteConfig.url}/curriculum/${part.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="relative overflow-hidden border-b border-ink-200/70 dark:border-ink-800/70">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[600px] -translate-x-1/2 rounded-full bg-brand-500/15 blur-[120px]"
        />
        <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-sm text-ink-500 dark:text-ink-400"
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
          </nav>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/12 font-mono text-base font-bold text-brand-600 dark:text-brand-300">
              {part.roman}
            </span>
            <DifficultyBadge level={part.level} />
            <span className="text-xs font-semibold uppercase tracking-wider text-ink-400 dark:text-ink-500">
              {part.chapters.length} chapters · {partSectionCount(part)} lessons
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900 dark:text-white sm:text-4xl">
            {part.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-600 dark:text-ink-300">
            {part.subtitle}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <ol className="space-y-3">
          {part.chapters.map((chapter) => {
            const hasContent = chapterHasContent(part.slug, chapter.slug);
            return (
              <li key={chapter.slug}>
                <Link
                  href={`/curriculum/${part.slug}/${chapter.slug}`}
                  className="group card card-hover flex items-center gap-4 p-4 sm:gap-5 sm:p-5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/12 text-sm font-bold text-brand-600 dark:text-brand-300">
                    {String(chapter.number).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-base font-semibold text-ink-900 transition-colors group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-300">
                        {chapter.title}
                      </h2>
                      {hasContent ? (
                        <span className="rounded-full bg-brand-500/12 px-2 py-0.5 text-[11px] font-medium text-brand-600 dark:text-brand-300">
                          Available
                        </span>
                      ) : (
                        <span className="rounded-full bg-ink-100 px-2 py-0.5 text-[11px] font-medium text-ink-500 dark:bg-ink-800/70 dark:text-ink-400">
                          Outline
                        </span>
                      )}
                    </div>
                    <p className="mt-1 line-clamp-1 text-sm text-ink-500 dark:text-ink-400">
                      {chapter.sections.slice(0, 4).map((s) => s.title).join(" · ")}
                      {chapter.sections.length > 4 ? " …" : ""}
                    </p>
                  </div>
                  <div className="hidden shrink-0 items-center gap-4 sm:flex">
                    <span className="inline-flex items-center gap-1 text-xs text-ink-400">
                      <FileText className="h-3.5 w-3.5" />
                      {chapter.sections.length}
                    </span>
                    <ArrowRight className="h-4 w-4 text-ink-300 transition-all group-hover:translate-x-1 group-hover:text-brand-500" />
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>

        {/* Part-to-part navigation */}
        <nav className="mt-10 grid gap-4 sm:grid-cols-2">
          {prevPart ? (
            <Link
              href={`/curriculum/${prevPart.slug}`}
              className="card card-hover group flex flex-col p-5"
            >
              <span className="inline-flex items-center gap-1 text-xs font-medium text-ink-400">
                <ArrowLeft className="h-3.5 w-3.5" /> Previous part
              </span>
              <span className="mt-1 font-semibold text-ink-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-300">
                Part {prevPart.roman}: {prevPart.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {nextPart ? (
            <Link
              href={`/curriculum/${nextPart.slug}`}
              className="card card-hover group flex flex-col p-5 text-right sm:items-end"
            >
              <span className="inline-flex items-center gap-1 text-xs font-medium text-ink-400">
                Next part <ArrowRight className="h-3.5 w-3.5" />
              </span>
              <span className="mt-1 font-semibold text-ink-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-300">
                Part {nextPart.roman}: {nextPart.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </div>
    </>
  );
}
