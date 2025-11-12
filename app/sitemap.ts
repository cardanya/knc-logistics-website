import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.knclogistics.com";
  const lastmod = "2025-11-07";

  const pages: Array<{ url: string; priority: number; changeFrequency: "yearly" | "monthly" | "weekly" | "daily" }> = [
    { url: "/", priority: 1.0, changeFrequency: "weekly" },
    { url: "/warehousing-services", priority: 0.9, changeFrequency: "weekly" },
    { url: "/trucking", priority: 0.9, changeFrequency: "weekly" },
    { url: "/supply-chain-solutions", priority: 0.9, changeFrequency: "weekly" },
    { url: "/truck-parking", priority: 0.9, changeFrequency: "weekly" },
    { url: "/cross-docking", priority: 0.9, changeFrequency: "weekly" },
    { url: "/about", priority: 0.8, changeFrequency: "monthly" },
    { url: "/contact", priority: 0.8, changeFrequency: "monthly" },
    { url: "/faq", priority: 0.7, changeFrequency: "monthly" },
    { url: "/privacy-policy", priority: 0.5, changeFrequency: "yearly" },
    { url: "/terms-of-service", priority: 0.5, changeFrequency: "yearly" },
  ];

  return pages.map((p) => ({
    url: `${base}${p.url}`,
    lastModified: lastmod,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
