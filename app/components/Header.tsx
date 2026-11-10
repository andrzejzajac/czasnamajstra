"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import Logo from "./Logo";

// Remonty — головна сторінка, Usługi (/uslugi) — окрема сторінка
const links = [
  { label: "Remonty", href: "/" },
  { label: "Usługi", href: "/uslugi" },
];

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);

  // у зоні .hide-header-zone (фраза й фото) шапка ховається вгору,
  // а коли з'являється наступний блок — повертається
  useEffect(() => {
    const header = headerRef.current;
    const zone = document.querySelector(".hide-header-zone");
    if (!header || !zone) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const { top, bottom } = zone.getBoundingClientRect();
      const hidden = top <= header.offsetHeight && bottom > window.innerHeight;
      header.classList.toggle("header-hidden", hidden);
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
    <header ref={headerRef} className="header">
      <div className="header-inner">
        <a href="/" className="header-home" aria-label="Czas na Majstra — strona główna">
          <Logo />
        </a>
        <nav className="header-nav" aria-label="Головне меню">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="header-link">
              {link.label}
            </Link>
          ))}
        </nav>
        <a href="#kontakt" className="header-button">
          <span>Kontakt</span>
        </a>
      </div>
    </header>
  );
}
