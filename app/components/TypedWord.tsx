"use client";

import { useEffect, useState } from "react";

const TYPE_MS = 90;
const DELETE_MS = 50;
const HOLD_MS = 1600;
const PAUSE_MS = 300;

// Друкує слова по літері, стирає й переходить до наступного — по колу.
// Ширина зарезервована під найдовше слово, щоб заголовок не «стрибав».
export default function TypedWord({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(words[0].length);
  const [deleting, setDeleting] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(query.matches);
    const onChange = () => setReduceMotion(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const word = words[index];
    let delay: number;
    let next: () => void;

    if (!deleting && length === word.length) {
      delay = HOLD_MS;
      next = () => setDeleting(true);
    } else if (deleting && length === 0) {
      delay = PAUSE_MS;
      next = () => {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      };
    } else {
      delay = deleting ? DELETE_MS : TYPE_MS;
      next = () => setLength((l) => l + (deleting ? -1 : 1));
    }

    const timer = setTimeout(next, delay);
    return () => clearTimeout(timer);
  }, [index, length, deleting, reduceMotion, words]);

  const visible = reduceMotion ? words[0] : words[index].slice(0, length);

  return (
    <span className="typed" aria-hidden="true">
      {words.map((w) => (
        <span key={w} className="typed-sizer">
          {w}
        </span>
      ))}
      <span className="typed-text">
        {visible}
        {!reduceMotion && <span className="typed-caret" />}
      </span>
    </span>
  );
}
