import { FAQ } from "../lib/faq";

// Часті запитання — рядки між лініями, як «Co robimy?».
// Натискання на питання розгортає відповідь (звичайні <details>, працює і без JavaScript).
export default function Faq() {
  return (
    <section id="faq" className="faq" aria-labelledby="faq-title">
      <div className="faq-inner">
        <h2 id="faq-title" className="home-title section-head">
          Częste pytania
        </h2>
        <div className="faq-list">
          {FAQ.map((item) => (
            <details key={item.question} className="faq-item">
              <summary className="faq-question">
                <h3>{item.question}</h3>
                <span className="faq-icon" aria-hidden="true" />
              </summary>
              <p className="faq-answer">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
