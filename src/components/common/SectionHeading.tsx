import { useSplitReveal } from "../../hooks/useSplitReveal";
import styles from "./SectionHeading.module.css";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  index?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  index,
}: SectionHeadingProps) {
  const titleRef = useSplitReveal<HTMLHeadingElement>({
    type: "words",
    triggerOnScroll: true,
    stagger: 0.05,
  });

  return (
    <div className={`${styles.heading} ${align === "center" ? styles.center : ""}`}>
      <div className={styles.eyebrowRow}>
        {index && <span className={styles.index}>{index}</span>}
        <span className={styles.eyebrow}>
          <span className={styles.dot} />
          {eyebrow}
        </span>
      </div>
      <h2 ref={titleRef} className={styles.title}>
        {title}
      </h2>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
}
