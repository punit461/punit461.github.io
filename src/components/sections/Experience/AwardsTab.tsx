import { awards } from "../../../constants/data";
import GlowCard from "../../common/GlowCard";
import styles from "./AwardsTab.module.css";

export default function AwardsTab() {
  return (
    <div className={styles.grid}>
      {awards.map((award) => (
        <GlowCard key={award.id} className={styles.card}>
          <div className={styles.iconWrap}>
            <award.icon />
          </div>
          <h3 className={styles.title}>{award.title}</h3>
          <div className={styles.meta}>
            <span className={styles.org}>{award.organization}</span>
            {award.date && <span className={styles.date}>{award.date}</span>}
          </div>
          <p className={styles.description}>{award.description}</p>
        </GlowCard>
      ))}
    </div>
  );
}
