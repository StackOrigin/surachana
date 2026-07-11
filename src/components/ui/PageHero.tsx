import "../../styles/components/ui/PageHero.css";
import { Link } from 'react-router-dom';
import { SCHOOL } from '../../data/schoolData';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumb?: string;
}

export default function PageHero({ title, subtitle, breadcrumb }: PageHeroProps) {
  return (
    <section className="relative bg-navy-950 text-white overflow-hidden">
      <div className="absolute inset-0 editorial-grid opacity-25" />
      <div className="absolute right-[8%] top-0 h-full w-px bg-white/10" />
      <div className="absolute right-[18%] bottom-0 font-heading text-[20rem] leading-none text-white/[0.025] select-none">
        {SCHOOL.shortName.charAt(0)}
      </div>

      <div className="relative max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 pt-32 md:pt-40 pb-20 md:pb-28">
        <div className="grid lg:grid-cols-[0.2fr_1.15fr_0.65fr] gap-7 lg:gap-12 items-end">
          <div className="hidden lg:block">
            <span className="font-heading text-6xl text-gold-300">01</span>
          </div>
          <div>
            {breadcrumb && (
              <div className="page-hero-kicker flex items-center gap-3 editorial-kicker text-white/45 mb-7">
                <Link to="/" className="hover:text-gold-300 transition-colors">Home</Link>
                <span className="h-px w-5 bg-white/25" />
                <span className="text-gold-300">{breadcrumb}</span>
              </div>
            )}
            <h1 className="page-hero-title font-heading text-5xl sm:text-6xl lg:text-8xl tracking-[-0.035em] text-white leading-[0.92]">
              {title}
            </h1>
          </div>
          {subtitle && (
            <p className="page-hero-copy text-base text-white/58 leading-relaxed border-l border-gold-300/50 pl-5 max-w-sm">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
