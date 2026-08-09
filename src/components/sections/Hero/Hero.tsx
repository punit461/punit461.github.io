import { lazy, Suspense, useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { FaArrowDown, FaDownload } from "react-icons/fa6";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import { personalInfo } from "../../../constants/data";
import { useTypewriter } from "../../../hooks/useTypewriter";
import { useSplitReveal } from "../../../hooks/useSplitReveal";
import { useIsMobile } from "../../../hooks/useIsMobile";
import MagneticButton from "../../common/MagneticButton";
import Monogram from "../../common/Monogram";
import styles from "./Hero.module.css";

const HeroScene = lazy(() => import("../../../three/HeroScene"));

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  const nameRef = useSplitReveal<HTMLHeadingElement>({
    type: "chars",
    duration: 1.1,
    stagger: 0.025,
    delay: 0.5,
  });

  const typedRole = useTypewriter(personalInfo.roles, { pause: 2000 });
  const isMobile = useIsMobile();

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      eyebrowRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.8 },
      0.15
    )
      .fromTo(
        bioRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9 },
        1.1
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9 },
        1.25
      )
      .fromTo(
        socialsRef.current,
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.9 },
        1.3
      )
      .fromTo(
        imageWrapRef.current,
        { opacity: 0, scale: 0.85, y: 40, rotate: -3 },
        { opacity: 1, scale: 1, y: 0, rotate: 0, duration: 1.3 },
        0.5
      )
      .fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        1.6
      );

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.6,
      },
    });

    scrollTl
      .to(imageWrapRef.current, { yPercent: 18, scale: 1.05, ease: "none" }, 0)
      .to(
        sectionRef.current?.querySelector(`.${styles.textCol}`) ?? [],
        { yPercent: -12, opacity: 0.4, ease: "none" },
        0
      );

    gsap.to(scrollIndicatorRef.current, {
      y: 10,
      duration: 1.1,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    return () => {
      tl.kill();
      scrollTl.kill();
    };
  }, []);

  return (
    <section id="top" ref={sectionRef} className={styles.hero}>
      <div className={styles.canvasLayer} aria-hidden="true">
        {!isMobile && (
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        )}
      </div>
      <div className={styles.vignette} aria-hidden="true" />

      <div ref={socialsRef} className={styles.socials}>
        {personalInfo.socials.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            aria-label={social.label}
            data-cursor="interactive"
            className={styles.socialLink}
          >
            <social.icon />
          </a>
        ))}
        <span className={styles.socialLine} />
      </div>

      <div className={`${styles.inner} container`}>
        <div className={styles.textCol}>
          <p ref={eyebrowRef} className={styles.eyebrow}>
            <span className={styles.pulse} />
            {personalInfo.location
              ? `Available for select engagements — ${personalInfo.location}`
              : "Available for select engagements"}
          </p>

          <h1 ref={nameRef} className={styles.name}>
            {personalInfo.firstName}
            <br />
            {personalInfo.lastName}
          </h1>

          <div className={styles.roleRow}>
            <span className={styles.roleLabel}>I build as a</span>
            <span className={styles.typedRole}>
              {typedRole}
              <span className={styles.caret} />
            </span>
          </div>

          <p ref={bioRef} className={styles.bio}>
            {personalInfo.bio}
          </p>

          <div ref={ctaRef} className={styles.ctaRow}>
            {personalInfo.resumeUrl ? (
              <>
                <MagneticButton
                  as="a"
                  href={personalInfo.resumeUrl}
                  download
                  variant="solid"
                >
                  Download Resume <FaDownload />
                </MagneticButton>
                <MagneticButton as="a" href="#contact" variant="outline">
                  Contact Me <HiOutlineArrowUpRight />
                </MagneticButton>
              </>
            ) : (
              <>
                <MagneticButton as="a" href="#projects" variant="solid">
                  View My Work <HiOutlineArrowUpRight />
                </MagneticButton>
                <MagneticButton as="a" href="#contact" variant="outline">
                  Contact Me <HiOutlineArrowUpRight />
                </MagneticButton>
              </>
            )}
          </div>
        </div>

        <div className={styles.imageCol}>
          <div ref={imageWrapRef} className={styles.imageWrap}>
            {personalInfo.avatar ? (
              <img
                src={personalInfo.avatar}
                alt={personalInfo.name}
                className={styles.image}
              />
            ) : (
              <Monogram
                initials={`${personalInfo.firstName[0]}${personalInfo.lastName[0]}`}
                label={personalInfo.name}
              />
            )}
            <div className={styles.imageGlow} aria-hidden="true" />
            <div className={styles.imageFrame} aria-hidden="true" />
          </div>
        </div>
      </div>

      <div ref={scrollIndicatorRef} className={styles.scrollIndicator}>
        <span>Scroll</span>
        <FaArrowDown />
      </div>
    </section>
  );
}
