import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { skillGroups } from "../../../constants/data";
import type { SkillCategory } from "../../../types";
import SectionHeading from "../../common/SectionHeading";
import SkillCard from "./SkillCard";
import GradientBlobs from "../../common/GradientBlobs";
import styles from "./Skills.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const [active, setActive] = useState<SkillCategory>(skillGroups[0].category);
  const gridRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);

  const activeGroup = skillGroups.find((g) => g.category === active) ?? skillGroups[0];

  useLayoutEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const cards = el.querySelectorAll(`.${styles.cardItem}`);

    gsap.fromTo(
      cards,
      { opacity: 0, y: 24, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.05,
        ease: "power3.out",
      }
    );
  }, [active]);

  useLayoutEffect(() => {
    const el = pillsRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll(`.${styles.pill}`),
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.04,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className={styles.skills}>
      <GradientBlobs variant="reverse" />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <SectionHeading
          index="02"
          eyebrow="Capabilities"
          title="A toolkit built around intelligent systems."
          description="From the models themselves to the APIs, containers, and cloud they run on — here's what I reach for."
        />

        <div ref={pillsRef} className={styles.pills} role="tablist" aria-label="Skill categories">
          {skillGroups.map((group) => (
            <button
              key={group.category}
              role="tab"
              aria-selected={active === group.category}
              className={`${styles.pill} ${active === group.category ? styles.pillActive : ""}`}
              onClick={() => setActive(group.category)}
              data-cursor="interactive"
            >
              {group.category}
            </button>
          ))}
        </div>

        <p className={styles.groupDescription}>{activeGroup.description}</p>

        <div ref={gridRef} className={styles.grid}>
          {activeGroup.skills.map((skill, i) => (
            <div key={skill.name} className={styles.cardItem}>
              <SkillCard skill={skill} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
