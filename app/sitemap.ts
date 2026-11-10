import type { MetadataRoute } from "next";

const SITE_URL = "https://czasnamajstra.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/uslugi"].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
