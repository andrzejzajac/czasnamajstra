import Logo from "./Logo";

const links = [
  { label: "Usługi", href: "#uslugi" },
  { label: "Ceny", href: "#ceny" },
  { label: "Opłata", href: "#oplata" },
];

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <a href="/" className="header-home" aria-label="Czas na Majstra — strona główna">
          <Logo />
        </a>
        <nav className="header-nav" aria-label="Головне меню">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="header-link">
              {link.label}
            </a>
          ))}
        </nav>
        <a href="#kontakt" className="header-button">
          <span>Kontakt</span>
        </a>
      </div>
    </header>
  );
}
