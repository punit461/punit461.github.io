import { useEffect, useRef } from "react";
import gsap from "gsap";

interface TiltOptions {
  max?: number;
  scale?: number;
  glare?: boolean;
}

export function useTilt<T extends HTMLElement>(options: TiltOptions = {}) {
  const ref = useRef<T | null>(null);
  const { max = 10, scale = 1.02 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isFine) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rotateY = (px - 0.5) * max * 2;
      const rotateX = -(py - 0.5) * max * 2;

      gsap.to(el, {
        rotateX,
        rotateY,
        scale,
        duration: 0.5,
        ease: "power2.out",
        transformPerspective: 800,
        transformOrigin: "center",
      });

      el.style.setProperty("--mx", `${px * 100}%`);
      el.style.setProperty("--my", `${py * 100}%`);
    };

    const handleLeave = () => {
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.7,
        ease: "power3.out",
      });
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [max, scale]);

  return ref;
}
