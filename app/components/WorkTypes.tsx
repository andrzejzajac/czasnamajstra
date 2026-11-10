"use client";

import { useState } from "react";

// «Co robimy?» — великі рядки на тій самій сітці, що й текст на hero:
// назва займає дві колонки, опис — третю.
// Порядок як у реальній роботі: замір → дизайн (як виглядатиме) → проєкт (як це збудувати й скільки коштує)
// → ремонт → меблі. Дизайн іде перед проєктом, бо креслення й кошторис залежать від обраного вигляду.
// Описи однієї довжини, щоб усі рядки були однакової висоти.
// На телефоні видно лише назви: натискання робить рядок чорним і замінює назву описом.
// Клік ловить увесь рядок, тож закрити можна, натиснувши і на опис.
const works = [
  { title: "Pomiar", text: "Przyjeżdżamy i mierzymy całe mieszkanie." },
  { title: "Design", text: "Projektujemy wygląd każdego pomieszczenia." },
  { title: "Projekt", text: "Przygotowujemy rysunki techniczne i kosztorys." },
  { title: "Realizacja remontu", text: "Wykonujemy wszystkie prace wykończeniowe." },
  { title: "Meble", text: "Dobieramy, zamawiamy i montujemy meble." },
];

export default function WorkTypes() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="rodzaje-pracy" className="works" aria-labelledby="works-title">
      <div className="works-inner">
        <h2 id="works-title" className="home-title section-head">
          Co robimy?
        </h2>
        <ol className="works-list">
          {works.map((work, i) => (
            <li
              key={work.title}
              className={open === i ? "work work-open" : "work"}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <h3 className="work-title">
                <button
                  type="button"
                  className="work-toggle"
                  aria-expanded={open === i}
                  aria-controls={`work-text-${i}`}
                >
                  {work.title}
                </button>
              </h3>
              <p id={`work-text-${i}`} className="work-text">
                {work.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
