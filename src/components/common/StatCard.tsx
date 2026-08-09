import { useCountUp } from "../../hooks/useCountUp";
import type { Stat } from "../../types";
import styles from "./StatCard.module.css";

export default function StatCard({ stat }: { stat: Stat }) {
  const { ref, value } = useCountUp<HTMLDivElement>(stat.value, 1.8);

  return (
    <div ref={ref} className={styles.stat}>
      <div className={styles.value}>
        {stat.prefix}
        {value}
        {stat.suffix}
      </div>
      <div className={styles.label}>{stat.label}</div>
    </div>
  );
}
