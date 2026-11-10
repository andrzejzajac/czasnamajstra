"use client";

import Image from "next/image";
import { useState } from "react";
import { PACKAGES as packages } from "../lib/packages";

export const PICK_PACKAGE_EVENT = "pick-package";

// Два пакети як картки проєктів: велике фото, назва, ціна за м² і дві кнопки.
// Дані пакетів — у app/lib/packages.ts.
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
                  loading="lazy"
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
