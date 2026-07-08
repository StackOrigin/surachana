import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { resetScrollImmediately } from '../utils/scroll';

export function useScrollAnimation(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    const current = ref.current;
    if (current) observer.observe(current);
    return () => { if (current) observer.unobserve(current); };
  }, [threshold]);

  return { ref, isVisible };
}

export function useScrollToTop() {
  useLayoutEffect(() => {
    resetScrollImmediately();
  }, []);
}
