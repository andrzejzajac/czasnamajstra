import Image, { type StaticImageData } from "next/image";

// Фото вже стиснуті (AVIF), тож віддаємо оригінал без перетискання сервером.
// Блок-фото на всю ширину. Якщо є текст — знизу на фото заголовок і короткий опис.
// first — перший блок сторінки: заголовок h1, фото вантажиться одразу.
export default function HomeHero({
  id,
  photo,
  alt,
  title,
  text,
  cta,
  first = false,
}: {
  id?: string;
  photo: StaticImageData;
  alt: string;
  title?: string;
  text?: string;
  cta?: { label: string; href: string };
  first?: boolean;
}) {
  const Heading = first ? "h1" : "h2";
  return (
    <section
      className={title ? "home-hero home-hero-text" : "home-hero"}
      aria-labelledby={title ? id : undefined}
    >
      <Image
        src={photo}
        alt={alt}
        fill
        unoptimized
        preload={first}
        loading={first ? undefined : "eager"}
        className="home-hero-photo"
      />
      {title && (
        <div className="intro">
          <Heading id={id} className="home-title">
            {title}
          </Heading>
          <div className="intro-side">
            <p className="intro-text">{text}</p>
            {cta && (
              <a href={cta.href} className="button">
                <span>{cta.label}</span>
              </a>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
