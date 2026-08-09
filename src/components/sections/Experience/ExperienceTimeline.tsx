import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { experiences } from "../../../constants/data";
import EmptyState from "./EmptyState";
import styles from "./ExperienceTimeline.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceTimeline() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top 70%",
            end: "bottom 75%",
            scrub: 0.6,
          },
        }
      );

      const items = wrapRef.current?.querySelectorAll(`.${styles.item}`);
      items?.forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 85%" },
          }
        );
      });
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  if (experiences.length === 0) {
    return (
      <EmptyState
        title="Work history coming soon"
        description="Roles and timelines haven't been published here yet. The Awards tab and the Projects section cover what's been delivered so far."
      />
    );
  }

  return (
    <div ref={wrapRef} className={styles.timeline}>
      <div ref={lineRef} className={styles.line} />
      {experiences.map((exp, i) => (
        <div key={exp.id} className={`${styles.item} ${i % 2 === 0 ? styles.left : styles.right}`}>
          <span className={styles.dot} />
          <div className={styles.card}>
            <div className={styles.cardHead}>
              <h3 className={styles.role}>{exp.role}</h3>
              <span className={styles.duration}>{exp.duration}</span>
            </div>
            <div className={styles.companyRow}>
              <span className={styles.company}>{exp.company}</span>
              <span className={styles.location}>{exp.location}</span>
            </div>
            <p className={styles.description}>{exp.description}</p>
            <ul className={styles.achievements}>
              {exp.achievements.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
            <div className={styles.tech}>
              {exp.tech.map((t) => (
                <span key={t} className={styles.techTag}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
