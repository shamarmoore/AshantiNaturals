import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { SITE_URL } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/shop`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // Category filter pages — these are valuable SEO landing pages
  const categoryPages: MetadataRoute.Sitemap = [
    "Wig",
    "Bundle",
    "Closure",
    "Frontal",
  ].map((category) => ({
    url: `${SITE_URL}/shop?category=${category}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Texture filter pages
  const texturePages: MetadataRoute.Sitemap = [
    "straight",
    "body-wave",
    "deep-wave",
    "kinky-curly",
    "loose-wave",
    "water-wave",
  ].map((texture) => ({
    url: `${SITE_URL}/shop?texture=${texture}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Method filter pages
  const methodPages: MetadataRoute.Sitemap = [
    "sew-in",
    "tape-in",
    "clip-in",
    "glueless-wig",
    "lace-front",
    "full-lace",
  ].map((method) => ({
    url: `${SITE_URL}/shop?method=${method}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Dynamic product pages
  let productPages: MetadataRoute.Sitemap = [];
  try {
    const products = await prisma.product.findMany({
      select: { id: true, updatedAt: true },
    });

    productPages = products.map((product) => ({
      url: `${SITE_URL}/products/${product.id}`,
      lastModified: product.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch {
    // If DB is unavailable, continue with static pages only
  }

  return [
    ...staticPages,
    ...categoryPages,
    ...texturePages,
    ...methodPages,
    ...productPages,
  ];
}
