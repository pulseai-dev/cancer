import { useEffect, useRef, useCallback } from 'react';

export function useCursorParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    targetRef.current.x = (e.clientX / window.innerWidth - 0.5) * 0.06;
    targetRef.current.y = (e.clientY / window.innerHeight - 0.5) * 0.06;
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const animate = () => {
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.08;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.08;
      el.style.transform = `translate(${currentRef.current.x * 100}px, ${currentRef.current.y * 100}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove]);

  return ref;
}
