// Часті запитання на головній — одне джерело і для блоку FAQ, і для розмітки FAQPage для Google.
import { PACKAGES } from "./packages";
import { DISTRICTS } from "./seo";

const prices = PACKAGES.map((p) => `${p.name.toLowerCase()} — od ${p.price} zł/m²`).join(", ");

export const FAQ: { question: string; answer: string }[] = [
  {
    question: "Ile kosztuje remont mieszkania?",
    answer: `Ceny za metr kwadratowy: ${prices}. Dokładną cenę podajemy po pomiarze i rozmowie o zakresie prac i materiałach — kosztorys dostajesz przed rozpoczęciem remontu.`,
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
