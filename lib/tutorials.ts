import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "tutorials");

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export interface TutorialFrontmatter {
  title: string;
  description: string;
  order: number;
  difficulty: Difficulty;
  duration: string; // e.g. "12 min"
  category: string; // e.g. "Foundations"
  tags: string[];
  updated: string; // ISO date
}

export interface Tutorial extends TutorialFrontmatter {
  slug: string;
  content: string;
  readingTime: number;
}

export interface TutorialMeta extends TutorialFrontmatter {
  slug: string;
  readingTime: number;
}

function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

/** All tutorial slugs (filenames without extension). */
export function getTutorialSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

/** Load a single tutorial by slug, including its raw MDX body. */
export function getTutorial(slug: string): Tutorial | null {
  const fullPath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const fm = data as TutorialFrontmatter;

  return {
    ...fm,
    slug,
    content,
    readingTime: estimateReadingTime(content),
  };
}

/** All tutorials, ordered by `order`, without body content. */
export function getAllTutorials(): TutorialMeta[] {
  return getTutorialSlugs()
    .map((slug) => {
      const t = getTutorial(slug);
      if (!t) return null;
      const { content, ...meta } = t;
      void content;
      return meta;
    })
    .filter((t): t is TutorialMeta => t !== null)
    .sort((a, b) => a.order - b.order);
}

/** Tutorials grouped by category, preserving order within each group. */
export function getTutorialsByCategory(): { category: string; items: TutorialMeta[] }[] {
  const all = getAllTutorials();
  const groups: Record<string, TutorialMeta[]> = {};
  const orderSeen: string[] = [];

  for (const t of all) {
    if (!groups[t.category]) {
      groups[t.category] = [];
      orderSeen.push(t.category);
    }
    groups[t.category].push(t);
  }

  return orderSeen.map((category) => ({ category, items: groups[category] }));
}

/** Previous / next tutorial in the learning path. */
export function getAdjacentTutorials(slug: string): {
  prev: TutorialMeta | null;
  next: TutorialMeta | null;
} {
  const all = getAllTutorials();
  const idx = all.findIndex((t) => t.slug === slug);
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null,
  };
}

/** Extract h2/h3 headings for an on-page table of contents. */
export interface TocItem {
  level: number;
  text: string;
  id: string;
}

export function extractToc(content: string): TocItem[] {
  const lines = content.split("\n");
  const toc: TocItem[] = [];
  let inCodeBlock = false;

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const match = /^(#{2,3})\s+(.*)$/.exec(line);
    if (match) {
      const level = match[1].length;
      const text = match[2].replace(/[*`]/g, "").trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
      toc.push({ level, text, id });
    }
  }

  return toc;
}
