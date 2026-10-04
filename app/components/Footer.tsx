import Logo from "./Logo";
import SocialIcons from "./SocialIcons";

const PHONE = "+48 793 651 242";
const PHONE_HREF = "tel:+48793651242";

const links = [
  { label: "Usługi", href: "#uslugi" },
  { label: "Ceny", href: "#ceny" },
  { label: "Opłata", href: "#oplata" },
];

export default function Footer() {
  return (
    <footer id="kontakt" className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="/" className="footer-home" aria-label="Czas na Majstra — strona główna">
              <Logo />
            </a>
            <SocialIcons />
          </div>

          <nav className="footer-col" aria-label="Меню у футері">
            <span className="footer-label">Menu</span>
            {links.map((link) => (
              <a key={link.href} href={link.href} className="footer-link">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="footer-col">
            <span className="footer-label">Kontakt</span>
            <a href={PHONE_HREF} className="footer-link">
              {PHONE}
            </a>
            <span className="footer-text">Warszawa i okolice</span>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} Czas na Majstra
        </div>
      </div>
    </footer>
  );
}
