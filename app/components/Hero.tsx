"use client";

import { useEffect, useMemo, useRef, useState } from "react";

function UploadIcon() {
  return (
    <svg
      className="hero-file-icon"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
      aria-hidden="true"
    >
      <path d="M12 15V4M7 9l5-5 5 5M4 15v5h16v-5" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="square"
      aria-hidden="true"
    >
      <path d="M15 5l-7 7 7 7" />
    </svg>
  );
}

// 1 plik, 2–4 pliki, 5+ plików (ale 12–14 plików)
function filesLabel(n: number) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (n === 1) return "1 plik";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${n} pliki`;
  return `${n} plików`;
}

const MAX_FILES = 10;
const PHONE = "+48 793 651 242";

export default function Hero() {
  const [step, setStep] = useState(0);
  const [problem, setProblem] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [phone, setPhone] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const fieldRef = useRef<HTMLInputElement>(null);
  const isFirstRender = useRef(true);

  // після переходу на новий крок ставимо курсор у поле
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (fieldRef.current) fieldRef.current.focus();
    else document.getElementById("hero-title")?.focus();
  }, [step]);

  const previews = useMemo(
    () =>
      files.map((file) => ({
        name: file.name,
        isVideo: file.type.startsWith("video/"),
        url: URL.createObjectURL(file),
      })),
    [files]
  );

  useEffect(() => {
    return () => previews.forEach((p) => URL.revokeObjectURL(p.url));
  }, [previews]);

  // надсилає заявку на /api/order, а сервер пересилає її в Telegram-бот
  const submit = async () => {
    setSending(true);
    setError("");
    try {
      const body = new FormData();
      body.append("problem", problem);
      body.append("phone", phone);
      files.forEach((file) => body.append("files", file));
      const res = await fetch("/api/order", { method: "POST", body });
      if (!res.ok) throw new Error(String(res.status));
      setStep(3);
    } catch {
      setError(`Nie udało się wysłać zgłoszenia. Zadzwoń do nas: ${PHONE}`);
    } finally {
      setSending(false);
    }
  };

  const reset = () => {
    setProblem("");
    setFiles([]);
    setPhone("");
    setStep(0);
  };

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-block">
        {step === 0 && (
          <>
            <h1 id="hero-title" className="hero-title">
              Opisz, co trzeba naprawić
            </h1>
            <form
              className="hero-form"
              onSubmit={(e) => {
                e.preventDefault();
                if (problem.trim()) setStep(1);
              }}
            >
              <input
                ref={fieldRef}
                type="text"
                name="problem"
                className="hero-input"
                placeholder="Np. cieknie kran w kuchni"
                aria-label="Opisz, co trzeba naprawić"
                autoComplete="off"
                required
                value={problem}
                maxLength={700}
                onChange={(e) => setProblem(e.target.value)}
              />
              <button type="submit" className="hero-submit">
                <span>Dalej</span>
              </button>
            </form>
          </>
        )}

        {step === 1 && (
          <>
            <h1 id="hero-title" className="hero-title">
              Dodaj zdjęcie lub wideo
            </h1>
            <form
              className="hero-form"
              onSubmit={(e) => {
                e.preventDefault();
                setStep(2);
              }}
            >
              <label className="hero-file">
                <input
                  ref={fieldRef}
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  className="visually-hidden"
                  onChange={(e) =>
                  setFiles(Array.from(e.target.files ?? []).slice(0, MAX_FILES))
                }
                />
                <UploadIcon />
                <span className={files.length ? "" : "hero-file-placeholder"}>
                  {files.length
                    ? `Wybrano: ${filesLabel(files.length)}`
                    : "Wybierz zdjęcia lub wideo"}
                </span>
              </label>
              <button
                type="button"
                className="hero-back"
                aria-label="Wstecz"
                onClick={() => setStep(0)}
              >
                <BackIcon />
              </button>
              <button type="submit" className="hero-submit">
                <span>{files.length ? "Dalej" : "Pomiń"}</span>
              </button>
            </form>

            {previews.length > 0 && (
              <ul className="hero-previews">
                {previews.map((p) => (
                  <li key={p.url} className="hero-preview">
                    {p.isVideo ? (
                      <video src={p.url} muted playsInline />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.url} alt={p.name} />
                    )}
                  </li>
                ))}
              </ul>
            )}

          </>
        )}

        {step === 2 && (
          <>
            <h1 id="hero-title" className="hero-title">
              Jak się z Tobą skontaktować?
            </h1>
            <form
              className="hero-form"
              onSubmit={(e) => {
                e.preventDefault();
                submit();
              }}
            >
              <input
                ref={fieldRef}
                type="tel"
                name="phone"
                className="hero-input"
                placeholder="+48 000 000 000"
                aria-label="Numer telefonu"
                autoComplete="tel"
                inputMode="tel"
                required
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  // мінімум 9 цифр, дозволені пробіли, +, дужки й дефіс
                  const digits = e.target.value.replace(/\D/g, "").length;
                  const valid = digits >= 9 && /^[+\d\s()-]+$/.test(e.target.value);
                  e.target.setCustomValidity(valid ? "" : "Wpisz poprawny numer telefonu");
                }}
              />
              <button
                type="button"
                className="hero-back"
                aria-label="Wstecz"
                disabled={sending}
                onClick={() => setStep(1)}
              >
                <BackIcon />
              </button>
              <button type="submit" className="hero-submit" disabled={sending}>
                <span>{sending ? "Wysyłanie…" : "Wyślij"}</span>
              </button>
            </form>
            {error && (
              <p className="hero-error" role="alert">
                {error}
              </p>
            )}
          </>
        )}

        {step === 3 && (
          <>
            <h1 id="hero-title" className="hero-title" tabIndex={-1}>
              Dziękujemy! Zgłoszenie przyjęte
            </h1>
            <p className="hero-hint hero-hint-lg">
              Majster odezwie się do Ciebie zwykle w ciągu od 10 minut do 2
              godzin.
            </p>
            <div className="hero-links">
              <button type="button" className="hero-link" onClick={reset}>
                Wyślij nowe zgłoszenie
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
