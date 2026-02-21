import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Prompt Input",
    short_name: "Prompt Input",
    description:
      "A production-ready prompt input with agent selector, sources, file attach, and research mode.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#17181A",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
        purpose: "any",
      },
    ],
  };
}
