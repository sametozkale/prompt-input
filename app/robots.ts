import type { MetadataRoute } from "next";

const BASE_URL = "https://prompt-input.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [],
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: [],
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: [],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: [],
      },
      {
        userAgent: "Claude-Web",
        allow: "/",
        disallow: [],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
