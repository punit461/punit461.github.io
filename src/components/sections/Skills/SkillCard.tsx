import type { Skill } from "../../../types";
import GlowCard from "../../common/GlowCard";
import styles from "./SkillCard.module.css";

export default function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  return (
    <GlowCard className={styles.card} style={{ ["--float-delay" as string]: `${index * 0.4}s` }}>
      <div className={styles.float}>
        <div className={styles.iconWrap}>
          <skill.icon className={styles.icon} />
        </div>
        <h3 className={styles.name}>{skill.name}</h3>
        <p className={styles.description}>{skill.description}</p>
        {skill.level !== undefined && (
          <div className={styles.levelTrack}>
            <div className={styles.levelFill} style={{ width: `${skill.level}%` }} />
          </div>
        )}
      </div>
    </GlowCard>
  );
}
