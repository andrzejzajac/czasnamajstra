import type { Metadata } from "next";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Payment from "../components/Payment";
import Pricing from "../components/Pricing";
import Services from "../components/Services";
import { jsonLdHtml, repairsJsonLd } from "../lib/seo";

export const metadata: Metadata = {
  title: "Usługi — drobne naprawy, składanie mebli i kamery",
  description:
    "Złota rączka w Warszawie: drobne naprawy, składanie mebli, montaż kamer. Opisz problem, dodaj zdjęcie — oddzwonimy.",
  alternates: { canonical: "/uslugi" },
  openGraph: {
    url: "/uslugi",
    title: "Usługi — drobne naprawy, składanie mebli i kamery — Czas na Majstra",
    description:
      "Złota rączka w Warszawie: drobne naprawy, składanie mebli, montaż kamer. Opisz problem, dodaj zdjęcie — oddzwonimy.",
  },
};

export default function NaprawyPage() {
  return (
    <>
      {/* послуги для Google (schema.org) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(repairsJsonLd)} />
      <Header />
      <main id="main">
        <Hero />
        <Services />
        <Pricing />
        <Payment />
      </main>
      <Footer />
    </>
  );
}
