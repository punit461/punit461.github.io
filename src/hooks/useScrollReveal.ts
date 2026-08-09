import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealType = "up" | "scale" | "blur";

interface Options {
  type?: RevealType;
  y?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  start?: string;
  selector?: string;
}

export function useScrollReveal<T extends HTMLElement>(options: Options = {}) {
  const ref = useRef<T | null>(null);
  const {
    type = "up",
    y = 60,
    duration = 1,
    delay = 0,
    stagger = 0.08,
    start = "top 85%",
    selector,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = selector ? el.querySelectorAll(selector) : el;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      gsap.set(targets, { opacity: 1, y: 0, scale: 1, filter: "none" });
      return;
    }

    const fromVars: gsap.TweenVars =
      type === "scale"
        ? { scale: 0.9, opacity: 0 }
        : type === "blur"
        ? { opacity: 0, filter: "blur(14px)", y: 24 }
        : { y, opacity: 0 };

    const toVars: gsap.TweenVars =
      type === "scale"
        ? { scale: 1, opacity: 1 }
        : type === "blur"
        ? { opacity: 1, filter: "blur(0px)", y: 0 }
        : { y: 0, opacity: 1 };

    const ctx = gsap.context(() => {
      gsap.fromTo(targets, fromVars, {
        ...toVars,
        duration,
        delay,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: "play none none none",
        },
      });
    }, el);

    return () => ctx.revert();
  }, [type, y, duration, delay, stagger, start, selector]);

  return ref;
}
