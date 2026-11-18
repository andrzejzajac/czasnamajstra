"use client";

import { useEffect, useRef } from "react";

// Частка швидкості прокрутки, на яку блок відстає, коли вже їде вгору (0.5 — удвічі повільніше).
const LAG = 0.5;

// Ширина плавного переходу на межі чорного — частка радіуса блоку (більше — плавніше).
const SOFT = 1.2;

// Розмір кола з градієнтом у пікселях: воно маленьке й лише масштабується —
// так телефон не перемальовує весь екран на кожен кадр, а просто збільшує готову картинку.
const GLOW_SIZE = 400;

// Велика фраза на весь екран. Блок закріплюється, поки під час прокрутки
// круговий чорний градієнт повільно росте від низу й поступово затемнює весь блок,
// а текст стає білим;
// потім блок повільно їде вгору, а наступне фото наїжджає на нього.
export default function Statement() {
  const wrapperRef = useRef<HTMLElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const wrapper = wrapperRef.current;
    const pinned = pinnedRef.current;
    const glow = glowRef.current;
    if (!wrapper || !pinned || !glow) return;

    // розміри міряємо лише при зміні вікна, а не на кожен кадр прокрутки
    let distance = 0;
    let stickyTop = 0;
    let height = 0;
    let maxRadius = 0;
    let soft = 0;
    const measure = () => {
      height = pinned.offsetHeight;
      distance = wrapper.offsetHeight - height;
      stickyTop = parseFloat(getComputedStyle(pinned).top) || 0;
      // відстань від низу по центру до верхнього кута — радіус повного покриття
      maxRadius = Math.hypot(pinned.offsetWidth / 2, height);
      soft = maxRadius * SOFT;
    };

    let frame = 0;
    let dark: boolean | null = null;
    const update = () => {
      frame = 0;
      const scrolled = stickyTop - wrapper.getBoundingClientRect().top;
      const progress = distance > 0 ? Math.min(Math.max(scrolled / distance, 0), 1) : 0;
      const past = Math.max(scrolled - distance, 0);
      pinned.style.transform = past > 0 ? `translate3d(0, ${past * LAG}px, 0)` : "";
      // повільний старт: спочатку чорного майже не видно, далі він набирає швидкість
      const eased = progress * progress;
      // зовнішній край переходу; чорне ядро — на (радіус) усередині нього
      const outer = eased * (maxRadius + soft);
      glow.style.transform = `translate3d(-50%, -50%, 0) scale(${(outer * 2) / GLOW_SIZE})`;
      // текст міняє колір, коли середина переходу доходить до центру блоку
      const nowDark = outer - soft / 2 >= height / 2;
      if (nowDark !== dark) {
        dark = nowDark;
        pinned.style.color = dark ? "#fff" : "#000";
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section ref={wrapperRef} className="statement">
      <div ref={pinnedRef} className="statement-pinned">
        <div ref={glowRef} className="statement-glow" aria-hidden="true" />
        <p className="home-title">Zamień swoje marzenia w rzeczywistość</p>
      </div>
    </section>
  );
}
