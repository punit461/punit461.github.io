import { FaGraduationCap } from "react-icons/fa6";
import { education } from "../../../constants/data";
import EmptyState from "./EmptyState";
import styles from "./EducationTab.module.css";

export default function EducationTab() {
  if (education.length === 0) {
    return (
      <EmptyState
        title="Education details coming soon"
        description="This section hasn't been published yet. In the meantime, the Projects and Awards tabs cover the work itself."
      />
    );
  }

  return (
    <div className={styles.list}>
      {education.map((edu) => (
        <div key={edu.id} className={styles.card}>
          <div className={styles.iconWrap}>
            <FaGraduationCap />
          </div>
          <div className={styles.content}>
            <div className={styles.head}>
              <h3 className={styles.degree}>{edu.degree}</h3>
              <span className={styles.duration}>{edu.duration}</span>
            </div>
            <div className={styles.schoolRow}>
              <span className={styles.school}>{edu.school}</span>
              <span className={styles.location}>{edu.location}</span>
              {edu.score && <span className={styles.score}>{edu.score}</span>}
            </div>
            {edu.description && (
              <p className={styles.description}>{edu.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
