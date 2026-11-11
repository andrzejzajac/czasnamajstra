import type { StaticImageData } from "next/image";
import standardPhoto from "../../public/design.avif";
import premiumPhoto from "../../public/design4.avif";

// Пакети ремонту — одне джерело і для блоку «Pakiety», і для SEO-розмітки цін.
// «Materiały i komponenty» відкриває файл з переліком матеріалів (materials).
// Поки файлу немає, кнопка «заблокована»: при натисканні коротко червоніє й трясеться.
// TODO: замінити тимчасові фото на фото відповідних пакетів
// і вписати materials, коли файли з'являться в public/ (наприклад "/pakiet-standard.pdf").
export const PACKAGES: {
  name: string;
  text: string;
  price: number;
  photo: StaticImageData;
  alt: string;
  materials?: string;
}[] = [
  {
    name: "Standard",
    text: "Solidne wykończenie pod klucz w stałej cenie.",
    price: 1000,
    photo: standardPhoto,
    alt: "Przykładowe wnętrze wykończone w pakiecie Standard",
  },
  {
    name: "Premium",
    text: "Wykończenie z materiałów wyższej klasy.",
    price: 1500,
    photo: premiumPhoto,
    alt: "Przykładowe wnętrze wykończone w pakiecie Premium",
  },
];
