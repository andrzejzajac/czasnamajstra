"use client";

import Image from "next/image";
import { PACKAGES as packages } from "../lib/packages";

export const PICK_PACKAGE_EVENT = "pick-package";

// Два пакети — великі фото впритул на всю ширину, на фото знизу по центру: велика назва, ціна «від» за м² і кнопка.
// Опис пакета (text) не показується, але йде в дані для Google.
// Дані пакетів — у app/lib/packages.ts.
export default function Packages() {
  // кнопка пакета підставляє його в заявку нижче
  const pick = (name: string) => {
    window.dispatchEvent(new CustomEvent(PICK_PACKAGE_EVENT, { detail: name }));
  };

  return (
    <section id="pakiety" className="packages" aria-labelledby="packages-title">
      {/* заголовок по центру над фото */}
      <div className="grid-head">
        <h2 id="packages-title" className="home-title">
          Pakiety wykończenia
        </h2>
      </div>
      {/* два великі фото впритул на всю ширину, текст і кнопка — на фото знизу по центру */}
      <ul className="packages-list">
        {packages.map((p) => (
          <li key={p.name} className="package">
            <Image
              src={p.photo}
              alt={p.alt}
              fill
              unoptimized
              loading="lazy"
              sizes="(max-width: 900px) 100vw, 50vw"
              className="package-photo"
            />
            <div className="package-body">
              <h3 className="package-name">{p.name}</h3>
              <p className="package-price">
                od {p.price} zł/m<sup>2</sup>
              </p>
              <a href="#wycena" className="button package-button" onClick={() => pick(p.name)}>
                <span>Zapytaj o wycenę</span>
              </a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
