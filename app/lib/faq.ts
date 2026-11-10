// Часті запитання на головній — одне джерело і для блоку FAQ, і для розмітки FAQPage для Google.
// Ціни беруться з пакетів, щоб не розходились із блоком «Pakiety».
import { PACKAGES } from "./packages";
import { DISTRICTS } from "./seo";

const prices = PACKAGES.map((p) => `${p.name} — od ${p.price} zł/m²`).join(", ");

export const FAQ: { question: string; answer: string }[] = [
  {
    question: "Ile kosztuje remont mieszkania?",
    answer: `Mamy dwa pakiety z ceną za metr kwadratowy: ${prices}. Dokładną cenę podajemy po pomiarze i omówieniu zakresu prac.`,
  },
  {
    question: "Czy cena za m² obejmuje materiały?",
    answer:
      "Tak, w pakietach Bazowy i Premium materiały są wliczone w cenę. Różnią się klasą materiałów — szczegóły pokazujemy przed rozpoczęciem prac.",
  },
  {
    question: "Jak wygląda współpraca?",
    answer:
      "Zaczynamy od pomiaru mieszkania i rozmowy o Twoich oczekiwaniach. Potem przygotowujemy wizualizacje, rysunki i kosztorys, a po akceptacji wykonujemy wszystkie prace wykończeniowe i pomagamy dobrać meble.",
  },
  {
    question: "Ile trwa remont?",
    answer:
      "To zależy od metrażu i zakresu prac. Harmonogram podajemy razem z kosztorysem — jeszcze przed rozpoczęciem remontu.",
  },
  {
    question: "Gdzie pracujecie?",
    answer: `W Warszawie, w dzielnicach: ${DISTRICTS.join(", ")}.`,
  },
];
