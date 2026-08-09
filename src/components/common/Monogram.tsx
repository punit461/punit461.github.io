import styles from "./Monogram.module.css";

/**
 * Placeholder shown wherever a real photo hasn't been supplied yet.
 * Set `avatar` / `aboutImage` in constants/data.ts to replace it with an image.
 */
export default function Monogram({
  initials,
  label,
}: {
  initials: string;
  label: string;
}) {
  return (
    <div className={styles.monogram} role="img" aria-label={label}>
      <span className={styles.initials} aria-hidden="true">
        {initials}
        <span className={styles.dot}>.</span>
      </span>
    </div>
  );
}
