import type { Metadata } from "next";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Payment from "../components/Payment";
import Pricing from "../components/Pricing";
import Services from "../components/Services";

export const metadata: Metadata = {
  title: "Usługi — drobne naprawy, składanie mebli i kamery",
  description:
    "Złota rączka w Warszawie: drobne naprawy, składanie mebli, montaż kamer. Opisz problem, dodaj zdjęcie — oddzwonimy.",
  alternates: { canonical: "/uslugi" },
};

export default function NaprawyPage() {
  return (
    <>
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
