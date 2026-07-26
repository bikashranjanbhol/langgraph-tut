import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, ArrowRight, Clock, Calendar, ChevronRight } from "lucide-react";
import {
  getAdjacentTutorials,
  getTutorial,
  getTutorialSlugs,
  extractToc,
} from "@/lib/tutorials";
import { mdxOptions } from "@/lib/mdx-options";
import { mdxComponents } from "@/components/mdx";
import { TableOfContents } from "@/components/toc";
import { DifficultyBadge, Pill } from "@/components/ui";
import { siteConfig } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return getTutorialSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const tutorial = getTutorial(params.slug);
  if (!tutorial) return {};

  const url = `${siteConfig.url}/tutorials/${tutorial.slug}`;
  const ogImage = `/tutorials/${tutorial.slug}/og`;

  return {
    title: tutorial.title,
    description: tutorial.description,
    keywords: tutorial.tags,
    alternates: { canonical: `/tutorials/${tutorial.slug}` },
    openGraph: {
      type: "article",
      title: tutorial.title,
      description: tutorial.description,
      url,
      publishedTime: tutorial.updated,
      modifiedTime: tutorial.updated,
      authors: [siteConfig.author],
      tags: tutorial.tags,
      images: [{ url: ogImage, width: 1200, height: 630, alt: tutorial.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: tutorial.title,
      description: tutorial.description,
      images: [ogImage],
    },
  };
}

export default function TutorialPage({
  params,
}: {
  params: { slug: string };
}) {
  const tutorial = getTutorial(params.slug);
  if (!tutorial) notFound();

  const toc = extractToc(tutorial.content);
  const { prev, next } = getAdjacentTutorials(tutorial.slug);
  const url = `${siteConfig.url}/tutorials/${tutorial.slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: tutorial.title,
    description: tutorial.description,
    datePublished: tutorial.updated,
    dateModified: tutorial.updated,
    author: { "@type": "Organization", name: siteConfig.author },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    keywords: tutorial.tags.join(", "),
    articleSection: tutorial.category,
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
        name: "Learning Path",
        item: `${siteConfig.url}/tutorials`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: tutorial.title,
        item: url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-sm text-ink-500 dark:text-ink-400"
        >
          <Link href="/" className="hover:text-brand-600 dark:hover:text-brand-300">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link
            href="/tutorials"
            className="hover:text-brand-600 dark:hover:text-brand-300"
          >
            Learning Path
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="truncate text-ink-700 dark:text-ink-200">
            {tutorial.title}
          </span>
        </nav>

        <div className="mt-8 lg:grid lg:grid-cols-[1fr_240px] lg:gap-12">
          {/* Article */}
          <article className="min-w-0">
            <header className="border-b border-ink-200/70 pb-8 dark:border-ink-800/70">
              <div className="flex flex-wrap items-center gap-2">
                <DifficultyBadge level={tutorial.difficulty} />
                <Pill>{tutorial.category}</Pill>
              </div>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900 dark:text-white sm:text-4xl">
                {tutorial.title}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-ink-600 dark:text-ink-300">
                {tutorial.description}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-400 dark:text-ink-500">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {tutorial.duration} read
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  Updated {formatDate(tutorial.updated)}
                </span>
              </div>
            </header>

            {/* Mobile TOC */}
            {toc.length > 0 && (
              <details className="mt-6 rounded-xl border border-ink-200/70 bg-[rgb(var(--bg-subtle))] p-4 lg:hidden dark:border-ink-800/70">
                <summary className="cursor-pointer text-sm font-semibold text-ink-900 dark:text-white">
                  On this page
                </summary>
                <div className="mt-3">
                  <TableOfContents items={toc} />
                </div>
              </details>
            )}

            <div className="prose prose-slate mt-8 max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-headings:font-bold prose-h2:mt-12 prose-h2:border-b prose-h2:border-ink-200/60 prose-h2:pb-2 prose-h2:text-2xl dark:prose-h2:border-ink-800/60 prose-h3:text-xl prose-a:font-medium prose-strong:text-ink-900 dark:prose-strong:text-white prose-img:rounded-xl">
              <MDXRemote
                source={tutorial.content}
                components={mdxComponents}
                options={mdxOptions}
              />
            </div>

            {/* Tags */}
            {tutorial.tags.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-2 border-t border-ink-200/70 pt-6 dark:border-ink-800/70">
                {tutorial.tags.map((tag) => (
                  <Pill key={tag}>#{tag}</Pill>
                ))}
              </div>
            )}

            {/* Prev / Next */}
            <nav className="mt-10 grid gap-4 sm:grid-cols-2">
              {prev ? (
                <Link
                  href={`/tutorials/${prev.slug}`}
                  className="card card-hover group flex flex-col p-5"
                >
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-ink-400">
                    <ArrowLeft className="h-3.5 w-3.5" /> Previous
                  </span>
                  <span className="mt-1 font-semibold text-ink-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-300">
                    {prev.title}
                  </span>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link
                  href={`/tutorials/${next.slug}`}
                  className="card card-hover group flex flex-col p-5 text-right sm:items-end"
                >
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-ink-400">
                    Next <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                  <span className="mt-1 font-semibold text-ink-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-300">
                    {next.title}
                  </span>
                </Link>
              ) : (
                <span />
              )}
            </nav>
          </article>

          {/* Desktop TOC sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents items={toc} />
              <div className="mt-8 border-t border-ink-200/70 pt-6 dark:border-ink-800/70">
                <Link
                  href="/tutorials"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-brand-600 dark:text-ink-400 dark:hover:text-brand-300"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to all tutorials
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
