import { FaRegClock } from "react-icons/fa6";
import styles from "./EmptyState.module.css";

/**
 * Shown when a Journey tab has no entries yet. Populate the matching array in
 * constants/data.ts and the real content replaces this automatically.
 */
export default function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className={styles.empty}>
      <span className={styles.icon} aria-hidden="true">
        <FaRegClock />
      </span>
      <p className={styles.title}>{title}</p>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
