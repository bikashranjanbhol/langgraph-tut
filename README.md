# LangGraph Academy

A free, community-built **learning portal for LangGraph** — a polished, SEO-friendly
Next.js site that teaches you to build stateful, multi-agent AI applications through a
structured, hands-on curriculum.

> An independent educational project. Not affiliated with or endorsed by LangChain, Inc.

## Features

- **12-part learning path** — a complete curriculum from your first `StateGraph` to
  production multi-agent systems, written as MDX with runnable code examples.
- **Top-notch design** — responsive, dark/light theme with no flash, gradient hero with
  an animated state-graph motif, sticky table-of-contents with scroll-spy, and polished
  typography.
- **First-class SEO** — per-page metadata, Open Graph & Twitter cards, JSON-LD structured
  data (`EducationalOrganization`, `Course`, `TechArticle`, `BreadcrumbList`), a generated
  `sitemap.xml` and `robots.txt`, canonical URLs, and semantic HTML.
- **Dynamic OG images** — generated at build time with `next/og` for the home page and
  every tutorial.
- **Syntax highlighting** — Shiki via `rehype-pretty-code` with dual light/dark themes.
- **Zero external runtime requests** — self-hosted system font stack; strong Core Web Vitals.

## Tech stack

- [Next.js 14](https://nextjs.org/) (App Router, server components)
- TypeScript
- [Tailwind CSS](https://tailwindcss.com/) + `@tailwindcss/typography`
- MDX content via [`next-mdx-remote`](https://github.com/hashicorp/next-mdx-remote),
  `rehype-pretty-code`, `remark-gfm`, `rehype-slug`, `rehype-autolink-headings`
- [`lucide-react`](https://lucide.dev/) icons

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # tsc --noEmit
npm run lint       # next lint
```

## Configuration

Set your deployed origin so canonical URLs, sitemap, and OG images use the right domain:

```bash
# .env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Site name, description, keywords, and navigation live in [`lib/site.ts`](./lib/site.ts).

## Project structure

```
app/                     # routes (App Router)
  page.tsx               # landing page
  tutorials/             # learning-path index + [slug] tutorial pages
  og/ , tutorials/[slug]/og/   # dynamic Open Graph images
  sitemap.ts , robots.ts # generated SEO endpoints
  layout.tsx             # root layout, metadata, JSON-LD
components/              # header, footer, cards, MDX components, TOC, theme
content/tutorials/*.mdx  # the tutorial content
lib/                     # content loading, MDX options, site config, utils
```

## Adding a tutorial

Create a new `.mdx` file in `content/tutorials/` with frontmatter:

```mdx
---
title: "My New Tutorial"
description: "A one-line summary used for cards and SEO."
order: 13
difficulty: "Intermediate"   # Beginner | Intermediate | Advanced
duration: "10 min"
category: "Advanced Patterns"
tags: ["langgraph", "example"]
updated: "2026-07-26"
---

Your MDX content. Use ## and ### headings (they populate the table of contents),
fenced code blocks (syntax-highlighted), and the <Callout> component:

<Callout type="tip" title="Optional title">Helpful aside.</Callout>
```

It's automatically picked up by the learning path, sitemap, navigation, and gets its own
OG image — no code changes required.

## License

Content is provided under CC BY 4.0. Code is available for reuse; see the repository for
details.
