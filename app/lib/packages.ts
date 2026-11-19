import type { StaticImageData } from "next/image";
import noDemolitionPhoto from "../../public/pakiet-bez-demontazu.webp";
import fullPhoto from "../../public/pakiet-pelny-remont.webp";

// Пакети ремонту — одне джерело для блоку «Pakiety», FAQ і SEO-розмітки цін.
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
    alt: "Biała kuchnia z marmurowymi blatami i drewnianą podłogą",
  },
  {
    name: "Pełny remont",
    text: "Kompleksowy remont z demontażem — od skucia po gotowe mieszkanie.",
    price: 1450,
    photo: fullPhoto,
    alt: "Salon z ciemną sofą, marmurową podłogą i dużymi oknami",
  },
];
