"use client";

export const PICK_SERVICE_EVENT = "pick-service";

// TODO: замінити кольорові кружечки на картинки категорій
const services = [
  { label: "Drobne naprawy", color: "#ffce32" },
  { label: "Składanie mebli", color: "#3a77ff" },
  { label: "Kamery", color: "#23e5db" },
  { label: "Komputery", color: "#ff5636" },
  { label: "Umeblowanie", color: "#ffd6c9" },
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
                />
                <span className="service-label">{s.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
