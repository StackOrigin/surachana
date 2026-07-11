import "../../styles/components/ui/SectionTitle.css";
import { cn } from '../../utils/cn';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

interface SectionTitleProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
}

export default function SectionTitle({ badge, title, subtitle, align = 'center', light = false }: SectionTitleProps) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={cn(
        "fade-up mb-12 md:mb-16",
        isVisible && "visible",
        align === 'center' ? 'text-center mx-auto max-w-3xl' : 'text-left max-w-2xl'
      )}
    >
      {badge && (
        <span className={cn(
          "editorial-kicker inline-flex items-center gap-3 mb-5",
          light ? "text-gold-300" : "text-gold-700"
        )}>
          <span className={cn("w-8 h-px", light ? "bg-gold-300" : "bg-gold-700")} />
          {badge}
        </span>
      )}
      <h2 className={cn(
        "font-heading text-4xl md:text-5xl lg:text-6xl tracking-[-0.025em] leading-[0.98]",
        light ? "text-white" : "text-navy-950"
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          "mt-5 text-base md:text-lg leading-relaxed",
          light ? "text-white/60" : "text-navy-600"
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
