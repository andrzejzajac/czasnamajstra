"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";
import bazowyPhoto from "../../public/design.avif";
import premiumPhoto from "../../public/design4.avif";

export const PICK_PACKAGE_EVENT = "pick-package";

// Два пакети як картки проєктів: велике фото, назва, ціна за м² і дві кнопки.
// «Materiały i komponenty» відкриває файл з переліком матеріалів (materials).
// Поки файлу немає, кнопка «заблокована»: при натисканні коротко червоніє й трясеться.
// TODO: замінити тимчасові фото на фото відповідних пакетів
// і вписати materials, коли файли з'являться в public/ (наприклад "/pakiet-bazowy.pdf").
const packages: {
  name: string;
  text: string;
  price: number;
  photo: StaticImageData;
  alt: string;
  materials?: string;
}[] = [
  {
    name: "Bazowy",
    text: "Solidne wykończenie pod klucz w stałej cenie.",
    price: 1000,
    photo: bazowyPhoto,
    alt: "Przykładowe wnętrze wykończone w pakiecie Bazowy",
  },
  {
    name: "Premium",
    text: "Wykończenie z materiałów wyższej klasy.",
    price: 1500,
    photo: premiumPhoto,
    alt: "Przykładowe wnętrze wykończone w pakiecie Premium",
  },
];

export default function Packages() {
  // пакет, чия «заблокована» кнопка зараз грає анімацію
  const [blocked, setBlocked] = useState<string | null>(null);

  // кнопка пакета підставляє його в заявку нижче
  const pick = (name: string) => {
    window.dispatchEvent(new CustomEvent(PICK_PACKAGE_EVENT, { detail: name }));
  };

  return (
    <section id="pakiety" className="packages" aria-labelledby="packages-title">
      <div className="packages-inner">
        <h2 id="packages-title" className="home-title section-head">
          Pakiety wykończenia
        </h2>
        <ul className="packages-list">
          {packages.map((p) => (
            <li key={p.name} className="package">
              <div className="package-photo">
                <Image
                  src={p.photo}
                  alt={p.alt}
                  fill
                  unoptimized
                  loading="eager"
                  sizes="(max-width: 900px) 100vw, 530px"
                />
              </div>
              <h3 className="package-name">{p.name}</h3>
              <p className="package-text">{p.text}</p>
              <p className="package-price">
                od {p.price} zł/m<sup>2</sup>
              </p>
              <div className="package-actions">
                <a href="#wycena" className="button" onClick={() => pick(p.name)}>
                  <span>Zapytaj o wycenę</span>
                </a>
                {p.materials ? (
                  <a href={p.materials} target="_blank" rel="noopener" className="button button-outline">
                    <span>Materiały i komponenty</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    aria-disabled="true"
                    className={
                      blocked === p.name
                        ? "button button-outline button-blocked is-shaking"
                        : "button button-outline button-blocked"
                    }
                    onClick={() => setBlocked(p.name)}
                    onAnimationEnd={() => setBlocked(null)}
                  >
                    <span>Materiały i komponenty</span>
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
