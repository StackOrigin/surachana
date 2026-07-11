import "../../styles/components/ui/Magnetic.css";
import { useRef, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export default function Magnetic({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const move = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.13;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.18;
    ref.current?.style.setProperty("magnetic__variant-001", `translate3d(${x}px, ${y}px, 0)`);
  };

  const reset = () => ref.current?.style.setProperty("magnetic__variant-002", 'translate3d(0, 0, 0)');

  return (
    <div ref={ref} className={cn('magnetic', className)} onPointerMove={move} onPointerLeave={reset}>
      {children}
    </div>
  );
}
