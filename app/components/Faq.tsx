"use client";

import { useState } from "react";
import { FAQ } from "../lib/faq";

// Часті запитання — рядки між лініями.
// Натискання на питання плавно розгортає відповідь; відповіді завжди є в HTML (для Google).
export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="faq" aria-labelledby="faq-title">
      <div className="faq-inner">
        <h2 id="faq-title" className="home-title section-head">
          Częste pytania
        </h2>
        <div className="faq-list">
          {FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.question} className={isOpen ? "faq-item faq-open" : "faq-item"}>
                <h3 className="faq-heading">
                  <button
                    type="button"
                    className="faq-question"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span>{item.question}</span>
                    <span className="faq-icon" aria-hidden="true" />
                  </button>
                </h3>
                {/* висота анімується через grid-рядок 0fr → 1fr */}
                <div id={`faq-answer-${i}`} className="faq-panel" role="region" aria-hidden={!isOpen}>
                  <div className="faq-panel-inner">
                    <p className="faq-answer">{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
