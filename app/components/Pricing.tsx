import Image from "next/image";
import pricingPhoto from "../../public/pricing.webp";

export default function Pricing() {
  return (
    <section id="ceny" className="section" aria-labelledby="pricing-title">
      <div className="section-card">
        <div className="section-body">
          <h2 id="pricing-title" className="section-title">
            Jak wyceniamy pracę
          </h2>
          <p className="section-text">
            Cenę wyceniamy na podstawie złożoności pracy, potrzebnych
            materiałów i czasu pracy. Za dojazd zazwyczaj nie pobieramy opłat.
          </p>
          <a href="#kontakt" className="button">
            <span>Kontakt</span>
          </a>
        </div>
        <Image
          src={pricingPhoto}
          alt="Wiertarka, młotek i narzędzia majstra"
          sizes="(max-width: 900px) 100vw, 480px"
          className="section-photo section-photo-cover"
        />
      </div>
    </section>
  );
}
