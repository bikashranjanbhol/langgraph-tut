import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { extractToc, type TocItem } from "./tutorials";

const CURRICULUM_DIR = path.join(process.cwd(), "content", "curriculum");

export interface ChapterContent {
  content: string;
  toc: TocItem[];
  updated?: string;
  readingTime: number;
}

/**
 * Load authored MDX for a chapter if it exists at
 * content/curriculum/<partSlug>/<chapterSlug>.mdx. Returns null when the
 * chapter has no content yet, so the page can fall back to the syllabus outline.
 */
export function getChapterContent(
  partSlug: string,
  chapterSlug: string
): ChapterContent | null {
  const fullPath = path.join(CURRICULUM_DIR, partSlug, `${chapterSlug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const words = content.trim().split(/\s+/).length;

  return {
    content,
    toc: extractToc(content),
    updated: typeof data.updated === "string" ? data.updated : undefined,
    readingTime: Math.max(1, Math.round(words / 200)),
  };
}

/** True if a chapter has authored content (vs. outline only). */
export function chapterHasContent(
  partSlug: string,
  chapterSlug: string
): boolean {
  return fs.existsSync(
    path.join(CURRICULUM_DIR, partSlug, `${chapterSlug}.mdx`)
  );
}
