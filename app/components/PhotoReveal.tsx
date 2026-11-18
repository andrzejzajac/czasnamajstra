"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef } from "react";

// Фото вже стиснуті (AVIF), тож віддаємо оригінали без перетискання сервером.
type Photo = { src: StaticImageData; alt: string };

// На телефоні й без анімацій у системі фото просто стоять одне під одним.
const ANIMATED = "(prefers-reduced-motion: no-preference) and (min-width: 641px)";

// Частини прокрутки блоку, на яких виїжджає кожне фото: ліве раніше, праве із запізненням.
const RANGES = [
  [0.125, 0.75],
  [0.3125, 0.9375],
];

// Частина прокрутки, за яку фонове фото віддаляється, і наскільки воно зменшується.
const BASE_RANGE = [0, 0.6];
const BASE_MIN_SCALE = 0.84;
// поки віддаляється, фонове фото все сильніше розмивається й біліє — до повністю білого,
// коли обидва нові фото стали на місце
const BASE_MAX_BLUR = 16;
const BASE_FADE_START = 0.35;

const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);

// На комп'ютері фото на весь екран затримується, а поверх нього знизу по черзі виїжджають два інші.
// Коли вони закрили екран, сторінка гортається далі.
export default function PhotoReveal({ base, panels }: { base: Photo; panels: [Photo, Photo] }) {
  const wrapperRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animated = window.matchMedia(ANIMATED);
    const wrapper = wrapperRef.current;
    const stage = stageRef.current;
    if (!wrapper || !stage) return;
    const items = Array.from(stage.querySelectorAll<HTMLElement>(".reveal-panel"));
    const baseEl = stage.querySelector<HTMLElement>(".reveal-base");

    let frame = 0;
    const update = () => {
      frame = 0;
      if (!animated.matches) {
        items.forEach((item) => {
          item.style.transform = "";
        });
        if (baseEl) {
          baseEl.style.transform = "";
          baseEl.style.visibility = "";
          baseEl.style.filter = "";
          baseEl.style.opacity = "";
        }
        return;
      }
      const distance = wrapper.offsetHeight - stage.offsetHeight;
      const scrolled = -wrapper.getBoundingClientRect().top;
      const progress = distance > 0 ? Math.min(Math.max(scrolled / distance, 0), 1) : 0;
      // фонове фото віддаляється — навколо з'являється біла рамка
      if (baseEl) {
        const [bs, be] = BASE_RANGE;
        const t = clamp01((progress - bs) / (be - bs));
        baseEl.style.transform = `scale(${1 - (1 - BASE_MIN_SCALE) * t})`;
        // спершу фото лише віддаляється, розмиватися й біліти починає згодом
        const fade = clamp01((progress - BASE_FADE_START) / (RANGES[1][1] - BASE_FADE_START)) ** 2;
        baseEl.style.filter = fade > 0 ? `blur(${BASE_MAX_BLUR * fade}px)` : "";
        baseEl.style.opacity = String(1 - fade);
        // коли обидва фото на місці, фонове ховаємо — щоб у білому проміжку між ними не визирало
        baseEl.style.visibility = progress >= RANGES[1][1] ? "hidden" : "";
      }
      items.forEach((item, i) => {
        const [start, end] = RANGES[i];
        const local = clamp01((progress - start) / (end - start));
        // від низу екрана до свого місця (на телефоні фото стоять одне під одним)
        const offset = (1 - local) * (stage.offsetHeight - item.offsetTop);
        item.style.transform = `translateY(${offset}px)`;
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={wrapperRef} className="reveal">
      <div ref={stageRef} className="reveal-stage">
        <div className="reveal-base">
          <Image src={base.src} alt={base.alt} fill unoptimized loading="eager" className="reveal-photo" />
        </div>
        <div className="reveal-panels">
          {panels.map((photo) => (
            <div key={photo.alt} className="reveal-panel">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                unoptimized
                loading="eager"
                className="reveal-photo"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
