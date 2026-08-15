import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { personalInfo } from "../../constants/data";
import { getLenis } from "../../hooks/useLenis";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
];

const TOOLZONEX_URL = "https://toolzonex.com";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.2, ease: "power3.out" }
    );

    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (menuOpen) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
    return () => {
      lenis?.start();
    };
  }, [menuOpen]);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (!el) return;
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.4 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      ref={navRef}
      className={`${styles.nav} ${scrolled ? styles.scrolled : ""} ${menuOpen ? styles.menuOpen : ""}`}
    >
      <div className={styles.inner}>
        <a
          href="#top"
          className={styles.logo}
          data-cursor="interactive"
          onClick={(e) => handleNavClick(e, "#top")}
        >
          PB<span className={styles.logoDot}>.</span>
        </a>

        <nav className={styles.links} aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.link}
              data-cursor="interactive"
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {personalInfo.resumeUrl ? (
          <a
            href={personalInfo.resumeUrl}
            className={styles.cta}
            data-cursor="interactive"
            download
          >
            Resume
          </a>
        ) : (
          <a
            href={TOOLZONEX_URL}
            className={styles.cta}
            data-cursor="interactive"
            target="_blank"
            rel="noreferrer"
          >
            ToolZoneX
          </a>
        )}

        <button
          className={styles.burger}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      <div className={styles.mobileMenu}>
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)}>
            {link.label}
          </a>
        ))}
        {personalInfo.resumeUrl ? (
          <a href={personalInfo.resumeUrl} download className={styles.mobileCta}>
            Download Resume
          </a>
        ) : (
          <a
            href={TOOLZONEX_URL}
            target="_blank"
            rel="noreferrer"
            className={styles.mobileCta}
          >
            Explore ToolZoneX
          </a>
        )}
      </div>
    </header>
  );
}
