import Image from "next/image";
import paymentPhoto from "../../public/payment.png";

export default function Payment() {
  return (
    <section id="oplata" className="section" aria-labelledby="payment-title">
      <div className="section-card">
        <div className="section-body">
          <h2 id="payment-title" className="section-title">
            Opłata
          </h2>
          <p className="section-text">
            Przyjmujemy płatność gotówką, przelewem na numer konta, BLIK-iem
            oraz na karty ukraińskich banków.
          </p>
          <a href="#kontakt" className="button">
            <span>Kontakt</span>
          </a>
        </div>
        <Image
          src={paymentPhoto}
          alt="Gotówka, Mastercard, Visa i BLIK"
          sizes="(max-width: 900px) 100vw, 480px"
          className="section-photo"
        />
      </div>
    </section>
  );
}
