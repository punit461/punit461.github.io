import { FaArrowUp } from "react-icons/fa6";
import { personalInfo } from "../../../constants/data";
import { getLenis } from "../../../hooks/useLenis";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.top}>
          <a href="#top" className={styles.logo} onClick={(e) => { e.preventDefault(); scrollToTop(); }}>
            {personalInfo.firstName}
            <span className={styles.logoDot}>.</span>
            {personalInfo.lastName}
          </a>

          <button className={styles.backToTop} onClick={scrollToTop} aria-label="Back to top" data-cursor="interactive">
            <FaArrowUp />
          </button>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {year} {personalInfo.name}. All rights reserved.
          </p>
          <div className={styles.socials}>
            {personalInfo.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                data-cursor="interactive"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
