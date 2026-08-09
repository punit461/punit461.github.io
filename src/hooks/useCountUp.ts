import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useCountUp<T extends HTMLElement>(target: number, duration = 2) {
  const ref = useRef<T | null>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const counter = { val: 0 };
    const tween = gsap.to(counter, {
      val: target,
      duration,
      ease: "power2.out",
      onUpdate: () => setValue(Math.round(counter.val)),
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      tween.kill();
    };
  }, [target, duration]);

  return { ref, value };
}
