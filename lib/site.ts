/**
 * Central site configuration. Kept in one place so metadata, SEO tags,
 * structured data, sitemap and UI all stay in sync.
 */
export const siteConfig = {
  name: "LangGraph Academy",
  shortName: "LG Academy",
  description:
    "A free, community-built learning portal for LangGraph. Master stateful, multi-agent AI applications with hands-on tutorials — from your first StateGraph to production-ready multi-agent systems.",
  tagline: "Learn to build stateful, multi-agent AI applications.",
  // Update this to your deployed origin (used for canonical URLs, OG images, sitemap).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://langgraph-academy.dev",
  ogImage: "/og",
  author: "LangGraph Academy",
  keywords: [
    "LangGraph",
    "LangGraph tutorial",
    "LangChain",
    "AI agents",
    "multi-agent systems",
    "stateful agents",
    "LLM orchestration",
    "agentic workflows",
    "ReAct agent",
    "Python AI",
    "graph-based agents",
    "human-in-the-loop AI",
  ],
  nav: [
    { title: "Home", href: "/" },
    { title: "Learning Path", href: "/tutorials" },
    { title: "Concepts", href: "/tutorials#concepts" },
    { title: "About", href: "/about" },
  ],
  links: {
    langgraphDocs: "https://langchain-ai.github.io/langgraph/",
    langchain: "https://www.langchain.com/",
    github: "https://github.com/langchain-ai/langgraph",
  },
} as const;

export type SiteConfig = typeof siteConfig;
