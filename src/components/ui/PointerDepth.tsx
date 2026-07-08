import { useRef, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface PointerDepthProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export default function PointerDepth({ children, className, strength = 12 }: PointerDepthProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    ref.current?.style.setProperty('--depth-x', `${x * strength}px`);
    ref.current?.style.setProperty('--depth-y', `${y * strength}px`);
    ref.current?.style.setProperty('--depth-rx', `${y * -2.5}deg`);
    ref.current?.style.setProperty('--depth-ry', `${x * 2.5}deg`);
  };

  const reset = () => {
    ref.current?.style.setProperty('--depth-x', '0px');
    ref.current?.style.setProperty('--depth-y', '0px');
    ref.current?.style.setProperty('--depth-rx', '0deg');
    ref.current?.style.setProperty('--depth-ry', '0deg');
  };

  return (
    <div
      ref={ref}
      className={cn('pointer-depth', className)}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
    >
      {children}
    </div>
  );
}
