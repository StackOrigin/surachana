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
    <section className="page-hero__section-001">
      <div className="editorial-grid page-hero__div-002" />
      <div className="page-hero__div-003" />
      <div className="page-hero__div-004">
        {SCHOOL.shortName.charAt(0)}
      </div>

      <div className="page-hero__div-005">
        <div className="page-hero__div-006">
          <div className="page-hero__div-007">
            <span className="page-hero__span-008">01</span>
          </div>
          <div>
            {breadcrumb && (
              <div className="page-hero-kicker editorial-kicker page-hero__div-009">
                <Link to="/" className="page-hero__link-010">Home</Link>
                <span className="page-hero__span-011" />
                <span className="page-hero__span-012">{breadcrumb}</span>
              </div>
            )}
            <h1 className="page-hero-title page-hero__h1-013">
              {title}
            </h1>
          </div>
          {subtitle && (
            <p className="page-hero-copy page-hero__p-014">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
