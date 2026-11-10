import type { MetadataRoute } from "next";

// Опис сайту для телефонів (додавання на головний екран) і пошуковиків.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Czas na Majstra — remonty i wykończenia mieszkań",
    short_name: "Czas na Majstra",
    description: "Remonty i wykończenia mieszkań pod klucz w Warszawie.",
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    lang: "pl",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
