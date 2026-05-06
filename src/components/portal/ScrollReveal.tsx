"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger multiple reveals on the same view. */
  delayMs?: number;
};

/**
 * Scroll-triggered entrance. Opacity + light vertical motion; skips work when
 * prefers-reduced-motion is set.
 */
export function ScrollReveal({
  children,
  className = "",
  delayMs = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActive(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    let timeout = 0;
    const ob = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          ob.unobserve(node);
          timeout = window.setTimeout(() => setActive(true), delayMs);
          break;
        }
      },
      { threshold: 0.06, rootMargin: "0px 0px -10% 0px" },
    );

    ob.observe(node);
    return () => {
      ob.disconnect();
      window.clearTimeout(timeout);
    };
  }, [delayMs]);

  return (
    <div
      ref={ref}
      className={[
        "transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        active ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
