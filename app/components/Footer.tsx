import Link from "next/link";
import Logo from "./Logo";
import SocialIcons from "./SocialIcons";

const PHONE = "+48 793 651 242";
const PHONE_HREF = "tel:+48793651242";

// ті самі пункти, що й у шапці
const links = [
  { label: "Remonty", href: "/" },
  { label: "Usługi", href: "/uslugi" },
];

export default function Footer() {
  return (
    <footer id="kontakt" className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="footer-home" aria-label="Czas na Majstra — strona główna">
              <Logo mark />
            </Link>
            <SocialIcons />
          </div>

          <nav className="footer-col" aria-label="Меню у футері">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="footer-link">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="footer-col">
            <a href={PHONE_HREF} className="footer-link">
              {PHONE}
            </a>
            <span className="footer-text">Warszawa</span>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} czasnamajstra.com. Wszelkie prawa zastrzeżone.
        </div>
      </div>
    </footer>
  );
}
