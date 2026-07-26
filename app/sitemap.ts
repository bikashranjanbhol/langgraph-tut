import type { MetadataRoute } from "next";
import { getAllTutorials } from "@/lib/tutorials";
import { syllabus } from "@/lib/syllabus";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    {
      url: `${base}/curriculum`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/tutorials`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const tutorialRoutes: MetadataRoute.Sitemap = getAllTutorials().map((t) => ({
    url: `${base}/tutorials/${t.slug}`,
    lastModified: new Date(t.updated),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const partRoutes: MetadataRoute.Sitemap = syllabus.map((part) => ({
    url: `${base}/curriculum/${part.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const chapterRoutes: MetadataRoute.Sitemap = syllabus.flatMap((part) =>
    part.chapters.map((chapter) => ({
      url: `${base}/curriculum/${part.slug}/${chapter.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  return [...staticRoutes, ...partRoutes, ...chapterRoutes, ...tutorialRoutes];
}
