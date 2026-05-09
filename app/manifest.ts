import type { MetadataRoute } from "next";

import { siteContent } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteContent.name,
    short_name: siteContent.name,
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    theme_color: "#2c3a6e",
    background_color: "#2c3a6e",
    display: "standalone",
  };
}
