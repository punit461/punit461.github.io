import { useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { projects } from "../../../constants/data";
import type { ProjectCategory } from "../../../types";
import SectionHeading from "../../common/SectionHeading";
import ProjectCard from "./ProjectCard";
import styles from "./Projects.module.css";

const FILTERS: ("All" | ProjectCategory)[] = [
  "All",
  "AI",
  "Machine Learning",
  "Computer Vision",
  "Full Stack",
  "Tools",
  "Learning",
];

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const [active, setActive] = useState<"All" | ProjectCategory>("All");
  const gridRef = useRef<HTMLDivElement>(null);
  const hasMounted = useRef(false);

  const filtered = useMemo(
    () =>
      active === "All"
        ? projects
        : projects.filter((p) => p.categories.includes(active as ProjectCategory)),
    [active]
  );

  useLayoutEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const cards = el.querySelectorAll(`.${styles.gridItem}`);

    const tween = gsap.fromTo(
      cards,
      { opacity: 0, y: 30, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.55,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: hasMounted.current
          ? undefined
          : { trigger: el, start: "top 88%" },
      }
    );

    hasMounted.current = true;
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [active]);

  return (
    <section id="projects" className={styles.projects}>
      <div className="container">
        <div className={styles.headerRow}>
          <SectionHeading
            index="03"
            eyebrow="Selected Work"
            title="Products built to be used, not just shipped."
            description="AI agents, computer vision systems, and the platforms around them — every one of them open source. Filter by discipline."
          />
        </div>

        <div className={styles.filters} role="tablist" aria-label="Project filters">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              role="tab"
              aria-selected={active === filter}
              className={`${styles.filterBtn} ${active === filter ? styles.filterActive : ""}`}
              onClick={() => setActive(filter)}
              data-cursor="interactive"
            >
              {filter}
            </button>
          ))}
        </div>

        <div ref={gridRef} className={styles.grid}>
          {filtered.map((project) => (
            <div key={project.id} className={styles.gridItem}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className={styles.empty}>No projects in this category yet.</p>
        )}
      </div>
    </section>
  );
}
