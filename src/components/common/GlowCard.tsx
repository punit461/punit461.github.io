import { type ReactNode, useRef } from "react";
import styles from "./GlowCard.module.css";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
  style?: React.CSSProperties;
}

export default function GlowCard({ children, className = "", tilt = true, style }: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--glow-x", `${x}px`);
    el.style.setProperty("--glow-y", `${y}px`);

    if (tilt) {
      const px = x / rect.width - 0.5;
      const py = y / rect.height - 0.5;
      el.style.setProperty("--rx", `${-py * 8}deg`);
      el.style.setProperty("--ry", `${px * 8}deg`);
    }
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
  };

  return (
    <div
      ref={ref}
      className={`${styles.card} ${className}`}
      style={style}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      data-cursor="interactive"
    >
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>{children}</div>
    </div>
  );
}
