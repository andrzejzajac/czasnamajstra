import Image, { type StaticImageData } from "next/image";
import paymentPhoto from "../../public/payment.png";
import pricingPhoto from "../../public/wycena-wkretarka.webp";

// Пояснення для сторінки «Usługi» — у стилі пакетів на головній:
// два окремі великі блоки на всю ширину, один під одним (без заголовка),
// на фото знизу по центру: велика назва, короткий текст і кнопка.
const items: {
  id: string;
  title: string;
  text: string;
  photo: StaticImageData;
  alt: string;
  // contain — картинка з прозорим фоном (логотипи), не обрізається, а стоїть по центру на чорному
  contain?: boolean;
}[] = [
  {
    id: "ceny",
    title: "Wycena",
    text: "Cenę ustalamy na podstawie złożoności pracy, potrzebnych materiałów i czasu. Za dojazd zazwyczaj nie pobieramy opłat.",
    photo: pricingPhoto,
    alt: "Akumulatorowa wkrętarka z bliska na ciemnym tle",
  },
  {
    id: "oplata",
    title: "Opłata",
    text: "Gotówka, przelew lub BLIK.",
    photo: paymentPhoto,
    alt: "Gotówka, Mastercard, Visa i BLIK",
    contain: true,
  },
];

export default function HowWeWork() {
  return (
    <section className="packages" aria-label="Wycena i opłata">
      <ul className="packages-list packages-list-stacked">
        {items.map((item) => (
          <li key={item.id} id={item.id} className={item.contain ? "package package-graphic" : "package"}>
            <Image
              src={item.photo}
              alt={item.alt}
              fill
              loading="lazy"
              sizes="100vw"
              className={item.contain ? "package-photo package-photo-contain" : "package-photo"}
            />
            <div className="package-body">
              <h3 className="package-name">{item.title}</h3>
              <p className="package-text">{item.text}</p>
              <a href="#kontakt" className="button">
                <span>Kontakt</span>
              </a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
