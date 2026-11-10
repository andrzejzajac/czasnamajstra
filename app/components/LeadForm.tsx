"use client";

import { useEffect, useRef, useState } from "react";
import { PICK_PACKAGE_EVENT } from "./Packages";

const PHONE = "+48 793 651 242";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Фінальна заявка: лише контакт (телефон або e-mail) і коментар — менше полів, більше заявок.
// Пакет, обраний кнопкою в блоці «Pakiety», непомітно додається до заявки.
// Надсилається на /api/order, а сервер пересилає її в Telegram-бот.
export default function LeadForm() {
  const [contact, setContact] = useState("");
  const [pack, setPack] = useState("");
  const [details, setDetails] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  // висота блоку до відправки — подяка займає рівно стільки ж, щоб сторінка не стрибала
  const [doneHeight, setDoneHeight] = useState<number>();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onPick = (e: Event) => setPack((e as CustomEvent<string>).detail);
    window.addEventListener(PICK_PACKAGE_EVENT, onPick);
    return () => window.removeEventListener(PICK_PACKAGE_EVENT, onPick);
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const problem = ["Remont mieszkania", pack && `Pakiet: ${pack}`, details && `Komentarz: ${details}`]
        .filter(Boolean)
        .join("\n");
      const body = new FormData();
      body.append("problem", problem);
      body.append("phone", contact.trim());
      const res = await fetch("/api/order", { method: "POST", body });
      if (!res.ok) throw new Error(String(res.status));
      setDoneHeight(sectionRef.current?.offsetHeight);
      setSent(true);
    } catch {
      setError(`Nie udało się wysłać. Zadzwoń do nas: ${PHONE}`);
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="wycena"
      className={sent ? "lead lead-sent" : "lead"}
      style={sent ? { minHeight: doneHeight } : undefined}
      aria-labelledby="lead-title"
    >
      <div className="lead-inner">
        {sent ? (
          // після відправки весь чорний блок — лише велика подяка
          <h2 id="lead-title" className="home-title lead-done" role="status">
            Dziękujemy!
            <br />
            Wkrótce się odezwiemy.
          </h2>
        ) : (
          <>
            <h2 id="lead-title" className="home-title section-head">
              Umów pomiar
            </h2>
          {/* одна лінія на сітці сайту: контакт | коментар | кнопка (на телефоні — стовпчиком) */}
          <form className="lead-form" onSubmit={submit}>
            <label className="lead-field">
              <span className="lead-label">Telefon lub e-mail</span>
              <input
                type="text"
                name="contact"
                autoComplete="tel"
                placeholder="+48 000 000 000"
                required
                value={contact}
                onChange={(e) => {
                  setContact(e.target.value);
                  // або e-mail, або номер із мінімум 9 цифр (дозволені пробіли, +, дужки й дефіс)
                  const v = e.target.value.trim();
                  const phoneOk = v.replace(/\D/g, "").length >= 9 && /^[+\d\s()-]+$/.test(v);
                  e.target.setCustomValidity(
                    phoneOk || EMAIL_RE.test(v) ? "" : "Wpisz poprawny numer telefonu lub e-mail",
                  );
                }}
              />
            </label>
            <label className="lead-field">
              <span className="lead-label">Komentarz</span>
              <input
                type="text"
                name="details"
                maxLength={400}
                placeholder="np. mieszkanie 54 m²"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
            </label>
            <button type="submit" className="button lead-submit" disabled={sending}>
              <span>{sending ? "Wysyłanie…" : "Wyślij"}</span>
            </button>
            {error && (
              <p className="lead-error" role="alert">
                {error}
              </p>
            )}
          </form>
          </>
        )}
      </div>
    </section>
  );
}
