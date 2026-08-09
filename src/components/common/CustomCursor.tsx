import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./CustomCursor.module.css";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isFine) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const ringPos = { x: 0, y: 0 };
    let mouseX = 0;
    let mouseY = 0;

    const quickDotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const quickDotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });

    const handleMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      quickDotX(mouseX);
      quickDotY(mouseY);
    };

    const ticker = () => {
      ringPos.x += (mouseX - ringPos.x) * 0.16;
      ringPos.y += (mouseY - ringPos.y) * 0.16;
      gsap.set(ring, { x: ringPos.x, y: ringPos.y });
    };
    gsap.ticker.add(ticker);

    const handleEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-cursor='interactive']")) {
        ring.classList.add(styles.ringActive);
        dot.classList.add(styles.dotActive);
      }
    };
    const handleLeave = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-cursor='interactive']")) {
        ring.classList.remove(styles.ringActive);
        dot.classList.remove(styles.dotActive);
      }
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseover", handleEnter);
    document.addEventListener("mouseout", handleLeave);

    return () => {
      gsap.ticker.remove(ticker);
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleEnter);
      document.removeEventListener("mouseout", handleLeave);
    };
  }, []);

  return (
    <div className="hide-on-touch" aria-hidden="true">
      <div ref={ringRef} className={styles.ring} />
      <div ref={dotRef} className={styles.dot} />
    </div>
  );
}
