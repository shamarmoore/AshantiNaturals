import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Luméira Hair Co. — Premium Human Hair",
    short_name: "Luméira Hair Co.",
    description:
      "Shop premium 100% human hair wigs, extensions, bundles & more at Luméira Hair Co.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f3f1",
    theme_color: "#a6a195",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
