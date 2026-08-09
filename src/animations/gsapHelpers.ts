import gsap from "gsap";

export const easeOut = "power3.out";
export const easeInOut = "power2.inOut";

interface RevealOptions {
  y?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  start?: string;
  once?: boolean;
  ease?: string;
}

export function revealUp(
  targets: gsap.TweenTarget,
  scrollTriggerEl: Element,
  opts: RevealOptions = {}
) {
  const {
    y = 60,
    duration = 1,
    delay = 0,
    stagger = 0.08,
    start = "top 85%",
    once = true,
    ease = easeOut,
  } = opts;

  return gsap.fromTo(
    targets,
    { y, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration,
      delay,
      stagger,
      ease,
      scrollTrigger: {
        trigger: scrollTriggerEl,
        start,
        toggleActions: once ? "play none none none" : "play reverse play reverse",
      },
    }
  );
}

export function maskReveal(
  targets: gsap.TweenTarget,
  scrollTriggerEl: Element,
  opts: RevealOptions = {}
) {
  const { duration = 1.1, delay = 0, stagger = 0.1, start = "top 85%", ease = easeOut } = opts;

  return gsap.fromTo(
    targets,
    { yPercent: 110 },
    {
      yPercent: 0,
      duration,
      delay,
      stagger,
      ease,
      scrollTrigger: {
        trigger: scrollTriggerEl,
        start,
        toggleActions: "play none none none",
      },
    }
  );
}

export function scaleFade(
  targets: gsap.TweenTarget,
  scrollTriggerEl: Element,
  opts: RevealOptions = {}
) {
  const { duration = 1, delay = 0, stagger = 0.08, start = "top 85%", ease = easeOut } = opts;

  return gsap.fromTo(
    targets,
    { scale: 0.9, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration,
      delay,
      stagger,
      ease,
      scrollTrigger: {
        trigger: scrollTriggerEl,
        start,
        toggleActions: "play none none none",
      },
    }
  );
}

export function blurReveal(
  targets: gsap.TweenTarget,
  scrollTriggerEl: Element,
  opts: RevealOptions = {}
) {
  const { duration = 1.2, delay = 0, stagger = 0.08, start = "top 85%", ease = easeOut } = opts;

  return gsap.fromTo(
    targets,
    { opacity: 0, filter: "blur(14px)", y: 24 },
    {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      duration,
      delay,
      stagger,
      ease,
      scrollTrigger: {
        trigger: scrollTriggerEl,
        start,
        toggleActions: "play none none none",
      },
    }
  );
}
