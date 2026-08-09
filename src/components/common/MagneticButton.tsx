import { type ReactNode, type ElementType, type ComponentPropsWithoutRef } from "react";
import { useMagnetic } from "../../hooks/useMagnetic";
import styles from "./MagneticButton.module.css";

interface MagneticButtonProps {
  children: ReactNode;
  variant?: "solid" | "outline" | "ghost";
  as?: ElementType;
  className?: string;
  [key: string]: unknown;
}

export default function MagneticButton({
  children,
  variant = "solid",
  as = "button",
  className = "",
  ...rest
}: MagneticButtonProps & Omit<ComponentPropsWithoutRef<"button">, keyof MagneticButtonProps>) {
  const magneticRef = useMagnetic<HTMLDivElement>(0.35);
  const Component = as as ElementType<Record<string, unknown>>;

  return (
    <div ref={magneticRef} className={styles.wrap} data-cursor="interactive">
      <Component className={`${styles.btn} ${styles[variant]} ${className}`} {...rest}>
        <span className={styles.label}>{children}</span>
      </Component>
    </div>
  );
}
