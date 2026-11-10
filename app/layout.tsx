import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { businessJsonLd, jsonLdHtml, SITE_NAME, SITE_URL } from "./lib/seo";

const helveticaNeue = localFont({
  // лише накреслення, які є на сайті — браузер вантажить менше файлів шрифту
  src: [
    { path: "./fonts/HelveticaNeueRoman.otf", weight: "400", style: "normal" },
    { path: "./fonts/HelveticaNeueMedium.otf", weight: "500", style: "normal" },
    { path: "./fonts/HelveticaNeueBold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-helvetica-neue",
  display: "swap",
});

const DESCRIPTION =
  "Remonty i wykończenia mieszkań pod klucz w Warszawie. Pomiar, wycena przed rozpoczęciem prac, realizacja i odbiór. Zadzwoń: +48 793 651 242.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Czas na Majstra — remonty i wykończenia mieszkań w Warszawie",
    template: "%s — Czas na Majstra",
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: true, email: false, address: false },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Czas na Majstra — remonty i wykończenia mieszkań w Warszawie",
    description: DESCRIPTION,
  },
};

const APP_HEIGHT_SCRIPT = `(function(){var d=document.documentElement,w=0;function set(){if(window.innerWidth===w)return;w=window.innerWidth;d.style.setProperty("--app-h",window.innerHeight+"px")}set();window.addEventListener("resize",set)})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl" className={helveticaNeue.variable} suppressHydrationWarning>
      <body>
        {/* фіксуємо висоту екрана в --app-h ще до показу сторінки й оновлюємо лише при зміні ширини
            (поворот телефона), а не коли браузер ховає чи показує адресний рядок */}
        <script dangerouslySetInnerHTML={{ __html: APP_HEIGHT_SCRIPT }} />
        {/* дані фірми для Google (schema.org) */}
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(businessJsonLd)} />
        {children}
      </body>
    </html>
  );
}
