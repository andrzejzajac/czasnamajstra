import heroPhoto from "../public/hero-kuchnia-lampy.webp";
import kuchniaWyspaPhoto from "../public/kuchnia-wyspa.webp";
import lazienkaPhoto from "../public/lazienka.webp";
import salonOknaPhoto from "../public/salon-okna.webp";
import salonWieczorPhoto from "../public/salon-wieczor.webp";
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
import { faqJsonLd, jsonLdHtml, PRICE_FROM, renovationJsonLd } from "./lib/seo";

// Головна — ремонти помешкань.
// Порядок: hero з кнопкою заявки → фото робіт → що робимо → пакети → форма заявки → часті запитання.
export default function Home() {
  return (
    <>
      {/* послуга ремонту для Google (schema.org) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(renovationJsonLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(faqJsonLd(FAQ))} />
      <Header />
      <main id="main">
        <HomeHero
          first
          id="intro-title"
          photo={heroPhoto}
          alt="Biała kuchnia z wiszącymi lampami nad stołem i drewnianą podłogą"
          title="Wykończenia wnętrz pod klucz"
          price={
            <>
              od {PRICE_FROM} zł/m<sup>2</sup>
            </>
          }
          cta={{ label: "Umów się", href: "#wycena" }}
        />
        <div className="hide-header-zone">
          <Statement />
          <PhotoReveal
            base={{ src: salonWieczorPhoto, alt: "Salon wieczorem z jasną sofą, marmurowym stolikiem i świecami" }}
            panels={[
              { src: lazienkaPhoto, alt: "Łazienka z kabiną walk-in, podświetlanym lustrem i drewnianym sufitem" },
              { src: kuchniaWyspaPhoto, alt: "Kuchnia z kamienną wyspą, ciemnymi krzesłami i szklaną lampą" },
            ]}
          />
          <HomeHero photo={salonOknaPhoto} alt="Jasny salon z narożną sofą i dużymi oknami z widokiem na góry" />
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
