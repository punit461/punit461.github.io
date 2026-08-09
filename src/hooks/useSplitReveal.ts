import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

type SplitType = "chars" | "words" | "lines";

interface Options {
  type?: SplitType;
  duration?: number;
  stagger?: number;
  delay?: number;
  y?: number;
  triggerOnScroll?: boolean;
  start?: string;
}

export function useSplitReveal<T extends HTMLElement>(options: Options = {}) {
  const ref = useRef<T | null>(null);
  const {
    type = "words",
    duration = 1,
    stagger = 0.035,
    delay = 0,
    y = "110%",
    triggerOnScroll = false,
    start = "top 85%",
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      gsap.set(el, { opacity: 1 });
      return;
    }

    const split = new SplitText(el, {
      type: type === "chars" ? "chars,words" : type,
      mask: "lines",
    });

    const targets =
      type === "chars" ? split.chars : type === "lines" ? split.lines : split.words;

    gsap.set(targets, { yPercent: 110 });

    const anim = gsap.to(targets, {
      yPercent: 0,
      duration,
      delay,
      stagger,
      ease: "power4.out",
      scrollTrigger: triggerOnScroll
        ? { trigger: el, start, toggleActions: "play none none none" }
        : undefined,
    });

    return () => {
      anim.kill();
      split.revert();
    };
  }, [type, duration, stagger, delay, y, triggerOnScroll, start]);

  return ref;
}
