// Спільні дані фірми для SEO: адреса сайту, контакти і розмітка schema.org (JSON-LD),
// з якої Google розуміє, що це місцева ремонтна фірма у Варшаві.

export const SITE_URL = "https://czasnamajstra.com";
export const SITE_NAME = "Czas na Majstra";
export const PHONE = "+48 793 651 242";

// Райони Варшави, де працюємо.
export const DISTRICTS = [
  "Śródmieście",
  "Wola",
  "Żoliborz",
  "Bemowo",
  "Ochota",
  "Mokotów",
  "Włochy",
  "Ursus",
  "Praga-Północ",
  "Praga-Południe",
];

const BUSINESS_ID = `${SITE_URL}/#business`;

// Фірма — додається на всі сторінки (через layout).
export const businessJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HomeAndConstructionBusiness",
      "@id": BUSINESS_ID,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/icon.png`,
      image: `${SITE_URL}/opengraph-image.jpg`,
      description:
        "Remonty i wykończenia mieszkań pod klucz oraz drobne naprawy w Warszawie.",
      telephone: "+48793651242",
      priceRange: "od 1000 zł/m²",
      currenciesAccepted: "PLN",
      address: {
        "@type": "PostalAddress",
        // TODO: додати номер будинку й поштовий індекс, коли будуть
        streetAddress: "ul. Jana Kazimierza",
        addressLocality: "Warszawa",
        addressRegion: "mazowieckie",
        addressCountry: "PL",
      },
      areaServed: DISTRICTS.map((name) => ({
        "@type": "AdministrativeArea",
        name: `${name}, Warszawa`,
        containedInPlace: { "@type": "City", name: "Warszawa" },
      })),
      sameAs: ["https://www.instagram.com/czasnamajstra"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "pl-PL",
      publisher: { "@id": BUSINESS_ID },
    },
  ],
};

// Ремонт під ключ і пакети з ціною за м² — для головної.
export function renovationJsonLd(packages: { name: string; text: string; price: number }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/#remonty`,
    name: "Remonty i wykończenia mieszkań pod klucz",
    serviceType: "Remont mieszkania",
    provider: { "@id": BUSINESS_ID },
    areaServed: { "@type": "City", name: "Warszawa" },
    url: SITE_URL,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Pakiety wykończenia",
      itemListElement: packages.map((p) => ({
        "@type": "Offer",
        name: `Pakiet ${p.name}`,
        description: p.text,
        priceCurrency: "PLN",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          minPrice: p.price,
          priceCurrency: "PLN",
          unitCode: "MTK",
          unitText: "m²",
        },
      })),
    },
  };
}

// Дрібні послуги — для сторінки /uslugi.
export const repairsJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/uslugi#uslugi`,
  name: "Złota rączka — drobne naprawy w Warszawie",
  serviceType: "Złota rączka",
  provider: { "@id": BUSINESS_ID },
  areaServed: { "@type": "City", name: "Warszawa" },
  url: `${SITE_URL}/uslugi`,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Usługi",
    itemListElement: ["Drobne naprawy", "Składanie mebli", "Montaż kamer"].map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
    })),
  },
};

// Вставка JSON-LD у сторінку: екрануємо «<», щоб текст не зміг закрити тег <script>.
export function jsonLdHtml(data: object) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}

// Часті запитання — розмітка FAQPage для головної.
export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
