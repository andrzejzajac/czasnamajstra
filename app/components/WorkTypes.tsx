"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";
import design3Photo from "../../public/design3.avif";
import pomiarPhoto from "../../public/pomiar.webp";
import meblePhoto from "../../public/meble.webp";
import remontPhoto from "../../public/remont.webp";

// «4 kroki» — 4 етапи роботи як 4 вертикальні фото впритул на всю ширину,
// на кожному знизу зліва лише номер і назва. При наведенні (ПК) або натисканні (телефон)
// фото розмивається, а по центру з'являється короткий опис етапу.
// TODO: замінити тимчасові фото на фото з відповідних етапів (замір, проєкт, ремонт, меблі).
const works: { title: string; text: string; photo: StaticImageData; alt: string }[] = [
  { title: "Pomiar", text: "Mierzymy całe mieszkanie.", photo: pomiarPhoto, alt: "Rozwinięta żółta miarka w dłoni" },
  {
    title: "Projekt",
    text: "Tworzymy wizualizacje, rysunki techniczne i kosztorys.",
    photo: design3Photo,
    alt: "Ciemny salon z podświetlonymi półkami",
  },
  { title: "Remont", text: "Wykonujemy wszystkie prace wykończeniowe.", photo: remontPhoto, alt: "Mieszkanie w trakcie remontu: drabina, wiadra i deski pod ścianą" },
  { title: "Meble", text: "Dobieramy, zamawiamy i montujemy meble.", photo: meblePhoto, alt: "Fotel z pomarańczową poduszką, pufa i szafka RTV w salonie" },
];

export default function WorkTypes() {
  // відкритий етап на телефоні (на ПК опис показується при наведенні)
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="rodzaje-pracy" className="works" aria-labelledby="works-title">
      {/* заголовок по центру — як у блоку пакетів */}
      <div className="grid-head">
        <h2 id="works-title" className="home-title">
          4 kroki
        </h2>
      </div>
      <ol className="works-list">
        {works.map((work, i) => (
          <li
            key={work.title}
            className={open === i ? "work work-open" : "work"}
            onClick={() => setOpen(open === i ? null : i)}
          >
            <Image
              src={work.photo}
              alt={work.alt}
              fill
              unoptimized
              loading="lazy"
              sizes="(max-width: 900px) 50vw, 25vw"
              className="work-photo"
            />
            <p className="work-text">{work.text}</p>
            <div className="work-body">
              <span className="work-num">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="work-title">{work.title}</h3>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
