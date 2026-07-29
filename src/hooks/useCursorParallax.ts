import { useEffect, useRef } from 'react';

export function useCursorParallax() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 0.06;
      const y = (e.clientY / window.innerHeight - 0.5) * 0.06;
      el.style.transform = `translate(${x * 100}px, ${y * 100}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return ref;
}
