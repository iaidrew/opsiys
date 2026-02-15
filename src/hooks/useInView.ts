"use client";

import { useState, useEffect, useRef, RefObject } from "react";

export function useInView(options?: {
  threshold?: number;
  triggerOnce?: boolean;
  rootMargin?: string;
}): [RefObject<HTMLDivElement | null>, boolean] {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (options?.triggerOnce) observer.disconnect();
        } else if (!options?.triggerOnce) {
          setInView(false);
        }
      },
      {
        threshold: options?.threshold ?? 0.1,
        rootMargin: options?.rootMargin ?? "0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options?.threshold, options?.triggerOnce, options?.rootMargin]);

  return [ref, inView];
}
