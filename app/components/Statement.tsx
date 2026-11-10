"use client";

import { useEffect, useRef } from "react";

// Частка швидкості прокрутки, на яку блок відстає, коли вже їде вгору (0.5 — удвічі повільніше).
const LAG = 0.5;

// Ширина плавного переходу на межі чорного — частка радіуса блоку (більше — плавніше).
const SOFT = 1.2;

// Велика фраза на весь екран. Блок закріплюється, поки під час прокрутки
// круговий чорний градієнт повільно росте від низу й поступово затемнює весь блок,
// а текст стає білим;
// потім блок повільно їде вгору, а наступне фото наїжджає на нього.
export default function Statement() {
  const wrapperRef = useRef<HTMLElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const wrapper = wrapperRef.current;
    const pinned = pinnedRef.current;
    if (!wrapper || !pinned) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const distance = wrapper.offsetHeight - pinned.offsetHeight;
      const stickyTop = parseFloat(getComputedStyle(pinned).top) || 0;
      const scrolled = stickyTop - wrapper.getBoundingClientRect().top;
      const progress = distance > 0 ? Math.min(Math.max(scrolled / distance, 0), 1) : 0;
      const past = Math.max(scrolled - distance, 0);
      pinned.style.transform = past > 0 ? `translateY(${past * LAG}px)` : "";
      const { width, height } = pinned.getBoundingClientRect();
      // відстань від низу по центру до верхнього кута — радіус повного покриття
      const maxRadius = Math.hypot(width / 2, height);
      const soft = maxRadius * SOFT;
      // повільний старт: спочатку чорного майже не видно, далі він набирає швидкість
      const eased = progress * progress;
      const edge = eased * (maxRadius + soft) - soft;
      pinned.style.background = `radial-gradient(circle at 50% 100%, #000 ${edge}px, rgba(0, 0, 0, 0.7) ${edge + soft * 0.3}px, rgba(0, 0, 0, 0.3) ${edge + soft * 0.65}px, rgba(0, 0, 0, 0) ${edge + soft}px), #fff`;
      // текст міняє колір, коли середина переходу доходить до центру блоку
      pinned.style.color = edge + soft / 2 < height / 2 ? "#000" : "#fff";
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
    <section ref={wrapperRef} className="statement">
      <div ref={pinnedRef} className="statement-pinned">
        <p className="home-title">Zamień swoje marzenia w rzeczywistość</p>
      </div>
    </section>
  );
}
