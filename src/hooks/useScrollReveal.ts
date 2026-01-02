import { useEffect, useState } from "react";

export function useScrollReveal() {
  const [revealedElements, setRevealedElements] = useState<Set<string>>(new Set());

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Instantly reveal all elements if user prefers reduced motion
      const elements = document.querySelectorAll('.reveal-on-scroll');
      elements.forEach(el => el.classList.add('revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-reveal-id');
            if (id) {
              entry.target.classList.add('revealed');
              setRevealedElements(prev => new Set([...prev, id]));
              observer.unobserve(entry.target);
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return revealedElements;
}
