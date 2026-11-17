import type { StaticImageData } from "next/image";
import fullPhoto from "../../public/design.avif";
import noDemolitionPhoto from "../../public/design4.avif";

// Пакети ремонту — одне джерело для блоку «Pakiety», FAQ і SEO-розмітки цін.
// TODO: замінити тимчасові фото на фото відповідних робіт.
export const PACKAGES: {
  name: string;
  text: string;
  /** ціна «від» за м² */
  price: number;
  photo: StaticImageData;
  alt: string;
}[] = [
  {
    name: "Bez demontażu",
    text: "Wykończenie bez skuwania starych warstw — np. mieszkanie od dewelopera.",
    price: 1000,
    photo: noDemolitionPhoto,
    alt: "Przykładowe wnętrze po remoncie bez demontażu",
  },
  {
    name: "Pełny remont",
    text: "Kompleksowy remont z demontażem — od skucia po gotowe mieszkanie.",
    price: 1450,
    photo: fullPhoto,
    alt: "Przykładowe wnętrze po pełnym remoncie",
  },
];
