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
        "fade-up section-title__div-001",
        isVisible && "section-title__div-002",
        align === 'center' ? "section-title__div-003" : "section-title__div-004"
      )}
    >
      {badge && (
        <span className={cn(
          "editorial-kicker section-title__span-005",
          light ? "section-title__span-006" : "section-title__span-007"
        )}>
          <span className={cn("section-title__span-008", light ? "section-title__span-009" : "section-title__span-010")} />
          {badge}
        </span>
      )}
      <h2 className={cn(
        "section-title__h2-011",
        light ? "section-title__h2-012" : "section-title__h2-013"
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          "section-title__p-014",
          light ? "section-title__p-015" : "section-title__p-016"
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
