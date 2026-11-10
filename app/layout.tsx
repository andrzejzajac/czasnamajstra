import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const helveticaNeue = localFont({
  src: [
    { path: "./fonts/HelveticaNeueUltraLight.otf", weight: "100", style: "normal" },
    { path: "./fonts/HelveticaNeueUltraLightItalic.otf", weight: "100", style: "italic" },
    { path: "./fonts/HelveticaNeueThin.otf", weight: "200", style: "normal" },
    { path: "./fonts/HelveticaNeueThinItalic.otf", weight: "200", style: "italic" },
    { path: "./fonts/HelveticaNeueLight.otf", weight: "300", style: "normal" },
    { path: "./fonts/HelveticaNeueLightItalic.otf", weight: "300", style: "italic" },
    { path: "./fonts/HelveticaNeueRoman.otf", weight: "400", style: "normal" },
    { path: "./fonts/HelveticaNeueItalic.ttf", weight: "400", style: "italic" },
    { path: "./fonts/HelveticaNeueMedium.otf", weight: "500", style: "normal" },
    { path: "./fonts/HelveticaNeueMediumItalic.otf", weight: "500", style: "italic" },
    { path: "./fonts/HelveticaNeueBold.otf", weight: "700", style: "normal" },
    { path: "./fonts/HelveticaNeueBoldItalic.otf", weight: "700", style: "italic" },
    { path: "./fonts/HelveticaNeueHeavy.otf", weight: "800", style: "normal" },
    { path: "./fonts/HelveticaNeueHeavyItalic.otf", weight: "800", style: "italic" },
    { path: "./fonts/HelveticaNeueBlack.otf", weight: "900", style: "normal" },
    { path: "./fonts/HelveticaNeueBlackItalic.otf", weight: "900", style: "italic" },
  ],
  variable: "--font-helvetica-neue",
  display: "swap",
});

const SITE_URL = "https://czasnamajstra.com";
const DESCRIPTION =
  "Remonty i wykończenia mieszkań pod klucz w Warszawie i okolicach. Pomiar, wycena przed rozpoczęciem prac, realizacja i odbiór. Zadzwoń: +48 793 651 242.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Czas na Majstra — remonty i wykończenia mieszkań w Warszawie",
    template: "%s — Czas na Majstra",
  },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: SITE_URL,
    siteName: "Czas na Majstra",
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
        {children}
      </body>
    </html>
  );
}
