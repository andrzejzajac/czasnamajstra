import designPhoto from "../public/design.avif";
import design3Photo from "../public/design3.avif";
import design4Photo from "../public/design4.avif";
import design5Photo from "../public/design5.avif";
import heroPhoto from "../public/hero.avif";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeHero from "./components/HomeHero";
import LeadForm from "./components/LeadForm";
import Packages from "./components/Packages";
import PhotoReveal from "./components/PhotoReveal";
import Statement from "./components/Statement";
import WorkTypes from "./components/WorkTypes";
import { FAQ } from "./lib/faq";
import { PACKAGES } from "./lib/packages";
import { faqJsonLd, jsonLdHtml, renovationJsonLd } from "./lib/seo";

// Головна — ремонти помешкань.
// Порядок: hero з кнопкою заявки → фото робіт → що робимо → пакети → форма заявки → часті запитання.
export default function Home() {
  return (
    <>
      {/* послуга ремонту й ціни пакетів для Google (schema.org) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(renovationJsonLd(PACKAGES))} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(faqJsonLd(FAQ))} />
      <Header />
      <main id="main">
        <HomeHero
          first
          id="intro-title"
          photo={heroPhoto}
          alt="Wyremontowana sypialnia z łóżkiem i lampką na szafce nocnej"
          title="Wykończenia wnętrz pod klucz"
          text="Zajmujemy się całym remontem — od pierwszego pomiaru po gotowe mieszkanie."
          cta={{ label: "Umów pomiar", href: "#wycena" }}
        />
        <div className="hide-header-zone">
          <Statement />
          <PhotoReveal
            base={{ src: designPhoto, alt: "Przestronny salon z jadalnią i widokiem na ogród" }}
            panels={[
              { src: design3Photo, alt: "Ciemny salon z podświetlonymi półkami i telewizorem na ścianie" },
              { src: design4Photo, alt: "Sypialnia z dużym łóżkiem i podświetloną ścianą z fakturą" },
            ]}
          />
          <HomeHero photo={design5Photo} alt="Kuchnia z jadalnią, drewnianym stołem i panoramicznymi oknami" />
        </div>
        <WorkTypes />
        <Packages />
        <LeadForm />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
