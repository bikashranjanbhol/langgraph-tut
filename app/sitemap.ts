import type { MetadataRoute } from "next";
import { getAllTutorials } from "@/lib/tutorials";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/tutorials`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
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
    priority: 0.8,
  }));

  return [...staticRoutes, ...tutorialRoutes];
}
