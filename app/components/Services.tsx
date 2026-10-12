"use client";

import Image, { type StaticImageData } from "next/image";
import drobneNaprawyImage from "../../public/services/drobne-naprawy.png";
import kameryImage from "../../public/services/kamery.webp";
import skladanieMebliImage from "../../public/services/skladanie-mebli.png";

export const PICK_SERVICE_EVENT = "pick-service";

// zoom — збільшення картинки всередині кружечка, якщо на ній багато порожнього місця
const services: {
  label: string;
  color: string;
  image?: StaticImageData;
  zoom?: number;
}[] = [
  { label: "Drobne naprawy", color: "#ff5636", image: drobneNaprawyImage, zoom: 1.45 },
  { label: "Składanie mebli", color: "#3a77ff", image: skladanieMebliImage, zoom: 1.15 },
  { label: "Kamery", color: "#ffce32", image: kameryImage },
];

export default function Services() {
  // натискання на категорію підставляє її в поле опису в hero
  const pick = (label: string) => {
    window.dispatchEvent(new CustomEvent(PICK_SERVICE_EVENT, { detail: label }));
  };

  return (
    <section id="uslugi" className="services" aria-labelledby="services-title">
      <div className="services-inner">
        <h2 id="services-title" className="services-title">
          Usługi
        </h2>
        <ul className="services-list">
          {services.map((s) => (
            <li key={s.label}>
              <button type="button" className="service" onClick={() => pick(s.label)}>
                <span
                  className="service-icon"
                  style={{ background: s.color }}
                  aria-hidden="true"
                >
                  {s.image && (
                    <Image
                      src={s.image}
                      alt=""
                      sizes="140px"
                      className="service-image"
                      style={s.zoom ? { transform: `scale(${s.zoom})` } : undefined}
                    />
                  )}
                </span>
                <span className="service-label">{s.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
