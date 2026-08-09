import styles from "./GradientBlobs.module.css";

interface GradientBlobsProps {
  variant?: "default" | "reverse";
}

export default function GradientBlobs({ variant = "default" }: GradientBlobsProps) {
  return (
    <div className={`${styles.wrap} ${variant === "reverse" ? styles.reverse : ""}`} aria-hidden="true">
      <span className={`${styles.blob} ${styles.blobOne}`} />
      <span className={`${styles.blob} ${styles.blobTwo}`} />
    </div>
  );
}
