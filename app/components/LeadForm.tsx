"use client";

import { useEffect, useState } from "react";
import { PICK_PACKAGE_EVENT } from "./Packages";

const PHONE = "+48 793 651 242";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// або e-mail, або номер із мінімум 9 цифр (дозволені пробіли, +, дужки й дефіс)
const isContact = (v: string) =>
  EMAIL_RE.test(v) || (v.replace(/\D/g, "").length >= 9 && /^[+\d\s()-]+$/.test(v));

// Фінальна заявка — мінімалістичний чорний блок: білий заголовок по центру,
// під ним в один ряд ім'я, телефон або e-mail і червона кнопка.
// Кнопка неактивна, доки не вписані ім'я і правильний телефон чи e-mail.
// Надсилається на /api/order, а сервер пересилає її в Telegram-бот.
export default function LeadForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const ready = name.trim().length > 0 && isContact(contact.trim());
  // пакет, обраний кнопкою в блоці «Pakiety», непомітно додається до заявки
  const [pack, setPack] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const onPick = (e: Event) => setPack((e as CustomEvent<string>).detail);
    window.addEventListener(PICK_PACKAGE_EVENT, onPick);
    return () => window.removeEventListener(PICK_PACKAGE_EVENT, onPick);
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ready) return;
    setSending(true);
    setError("");
    try {
      const problem = ["Remont mieszkania", pack && `Pakiet: ${pack}`]
        .filter(Boolean)
        .join("\n");
      const body = new FormData();
      body.append("problem", problem);
      body.append("name", name.trim());
      body.append("phone", contact.trim());
      const res = await fetch("/api/order", { method: "POST", body });
      if (!res.ok) throw new Error(String(res.status));
      setSent(true);
    } catch {
      setError(`Nie udało się wysłać. Zadzwoń do nas: ${PHONE}`);
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="wycena"
      className="lead"
      aria-labelledby="lead-title"
    >
      <div className="lead-inner">
        {sent ? (
          // після відправки — лише велика подяка
          <h2 id="lead-title" className="home-title lead-title" role="status">
            Dziękujemy!
            <br />
            Wkrótce się odezwiemy.
          </h2>
        ) : (
          <>
            <h2 id="lead-title" className="home-title lead-title">
              Skontaktuj się z nami
            </h2>
            <form className="lead-form" onSubmit={submit}>
              <label className="lead-field">
                <span className="visually-hidden">Imię</span>
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="Imię"
                  required
                  maxLength={80}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <label className="lead-field">
                <span className="visually-hidden">Telefon lub e-mail</span>
                <input
                  type="text"
                  name="contact"
                  autoComplete="tel"
                  placeholder="Telefon lub e-mail"
                  required
                  value={contact}
                  onChange={(e) => {
                    setContact(e.target.value);
                    e.target.setCustomValidity(isContact(e.target.value.trim()) ? "" : "Wpisz poprawny numer telefonu lub e-mail");
                  }}
                />
              </label>
              <button type="submit" className="button lead-submit" disabled={!ready || sending}>
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
