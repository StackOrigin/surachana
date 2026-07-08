import type { CSSProperties, ReactNode } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { cn } from '../../utils/cn';

export type RevealVariant = 'fade' | 'slide-left' | 'slide-right' | 'scale' | 'clip';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  threshold?: number;
  variant?: RevealVariant;
}

export default function Reveal({
  children,
  className,
  delay = 0,
  duration = 850,
  threshold = 0.1,
  variant = 'fade',
}: RevealProps) {
  const { ref, isVisible } = useScrollAnimation(threshold);
  const style = {
    '--reveal-delay': `${delay}ms`,
    '--reveal-duration': `${duration}ms`,
  } as CSSProperties;

  if (variant === 'clip') {
    return (
      <div ref={ref} className={className} style={style}>
        <div className="clip-reveal-auto">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn('reveal', `reveal-${variant}`, isVisible && 'is-visible', className)}
      style={style}
    >
      {children}
    </div>
  );
}
