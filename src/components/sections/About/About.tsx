import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { personalInfo, stats, milestones } from "../../../constants/data";
import SectionHeading from "../../common/SectionHeading";
import StatCard from "../../common/StatCard";
import Monogram from "../../common/Monogram";
import { useScrollReveal } from "../../../hooks/useScrollReveal";
import styles from "./About.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const contentRef = useScrollReveal<HTMLDivElement>({
    type: "up",
    selector: `.${styles.animItem}`,
    y: 40,
    stagger: 0.12,
  });

  const statsRef = useScrollReveal<HTMLDivElement>({
    type: "scale",
    selector: `.${styles.statItem}`,
    stagger: 0.1,
    start: "top 88%",
  });

  const milestonesRef = useScrollReveal<HTMLDivElement>({
    type: "up",
    selector: `.${styles.milestone}`,
    y: 24,
    stagger: 0.14,
    start: "top 85%",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { clipPath: "inset(15% 15% 15% 15% round 24px)", scale: 1.15 },
        {
          clipPath: "inset(0% 0% 0% 0% round 24px)",
          scale: 1,
          duration: 1.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 75%",
            end: "bottom 90%",
            scrub: 0.6,
          },
        }
      );

      gsap.to(imageRef.current, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className={styles.about}>
      <div className="container">
        <SectionHeading
          index="01"
          eyebrow="About Me"
          title="Engineering with intent, not just output."
        />

        <div className={styles.grid}>
          <div className={styles.imageCol}>
            <div ref={imageRef} className={styles.imageFrame}>
              {personalInfo.aboutImage ? (
                <img
                  src={personalInfo.aboutImage}
                  alt={personalInfo.name}
                  className={styles.image}
                />
              ) : (
                <Monogram
                  initials={`${personalInfo.firstName[0]}${personalInfo.lastName[0]}`}
                  label={personalInfo.name}
                />
              )}
            </div>
            <div className={styles.badge}>
              <span className={styles.badgeValue}>AI</span>
              <span className={styles.badgeLabel}>
                agents, computer vision, and the infrastructure to run them
              </span>
            </div>
          </div>

          <div ref={contentRef} className={styles.contentCol}>
            {personalInfo.longBio.map((paragraph, i) => (
              <p key={i} className={`${styles.paragraph} ${styles.animItem}`}>
                {paragraph}
              </p>
            ))}

            <div ref={milestonesRef} className={styles.milestones}>
              <div ref={lineRef} className={styles.milestoneLine} />
              {milestones.map((m) => (
                <div key={`${m.year}-${m.label}`} className={styles.milestone}>
                  <span className={styles.milestoneDot} />
                  <span className={styles.milestoneYear}>{m.year}</span>
                  <span className={styles.milestoneLabel}>{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div ref={statsRef} className={styles.statsGrid}>
          {stats.map((stat) => (
            <div key={stat.id} className={styles.statItem}>
              <StatCard stat={stat} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
