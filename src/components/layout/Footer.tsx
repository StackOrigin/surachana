import "../../styles/components/layout/Footer.css";
import "../../styles/components/ui/SocialLinks.css";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { FOOTER_GROUPS, SCHOOL } from '../../data/schoolData';
import { useSchoolData } from '../../hooks/useSchoolData';
import { useLang } from '../../i18n/lang';
import SocialLinks from '../ui/SocialLinks';
import schoolNameImg from '../../assets/SchoolName.png';
const nivakshaLogoSrc = import.meta.env.DEV
  ? '/schools/surachana/nivakshaLogo.jpeg'
  : './schools/surachana/nivakshaLogo.jpeg';
const schoolLogoSrc = import.meta.env.DEV
  ? '/schools/surachana/school_logo.jpg'
  : './schools/surachana/school_logo.jpg';

export default function Footer() {
  useSchoolData();
  const { t } = useLang();
  const navigate = useNavigate();
  const location = SCHOOL.address || SCHOOL.locationLine;
  const directionsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    location || 'Surachana English School, Thaiba, Lalitpur, Nepal',
  )}`;

  const goAnchor = (path: string, hash?: string) => {
    navigate(hash ? `${path}#${hash}` : path);
    if (hash) {
      window.setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    }
  };

  return (
    <footer className="footer__footer-001">
      <div className="footer__div-002">
        <div className="footer__div-003">
          <div>
            <Link to="/" className="footer__link-004">
              <span className="footer__span-005">
                <img src={schoolLogoSrc} alt="Surachana English School logo" className="footer__img-026" loading="lazy" />
              </span>
              <span>
                <img
                  src={schoolNameImg}
                  alt={SCHOOL.name}
                  className="footer__school-name-img"
                  loading="lazy"
                />
                <small className="editorial-kicker footer__small-007">A bright, welcoming place to begin</small>
              </span>
            </Link>
            <p className="footer__p-008">
              A thoughtful place for young minds to take root—and find their way forward.
            </p>
            <Link
              to="/admission"
              className="footer__link-009"
            >
              Start an admission enquiry <ArrowUpRight className="footer__arrow-up-right-010" />
            </Link>
            <SocialLinks variant="light" className="footer__social" />
          </div>

          {FOOTER_GROUPS.map((group) => (
            <div key={group.title}>
              <p className="editorial-kicker footer__p-011">{t(group.title)}</p>
              <div className="footer__div-012">
                {group.links.map((link) => (
                  link.hash ? (
                    <button
                      key={`${link.path}#${link.hash}`}
                      type="button"
                      className="footer__link-013 footer__link-btn"
                      onClick={() => goAnchor(link.path, link.hash)}
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link key={link.path} to={link.path} className="footer__link-013">
                      {link.label}
                    </Link>
                  )
                ))}
              </div>
            </div>
          ))}

          <div>
            <p className="editorial-kicker footer__p-014">{t('Find us')}</p>
            <ul className="footer__ul-015">
              <li className="footer__li-016">
                <MapPin className="footer__map-pin-017" />
                <span>Thaiba, Lalitpur, Nepal</span>
              </li>
              <li className="footer__li-018">
                <Phone className="footer__phone-019" />
                <a href="tel:01-5560537">01-5560537</a>
              </li>
              {SCHOOL.email && (
                <li className="footer__li-020">
                  <Mail className="footer__mail-021" />
                  <a href={`mailto:${SCHOOL.email}`}>{SCHOOL.email}</a>
                </li>
              )}
              <li className="footer__li-020">
                <Clock className="footer__mail-021" />
                <span>Office Hours: 9 AM – 4 PM</span>
              </li>
            </ul>
            <a href={directionsHref} target="_blank" rel="noreferrer" className="footer__link-009 footer__directions">
              Get Directions <ArrowUpRight className="footer__arrow-up-right-010" />
            </a>
          </div>
        </div>

        <div className="editorial-kicker footer__div-022">
          <span>© {new Date().getFullYear()} Surachana English School</span>
          <span>Thaiba · Lalitpur · Nepal</span>
          <a
            href="https://nivaksha.me"
            target="_blank"
            rel="noreferrer"
            className="footer__link-023"
            aria-label="Visit Nivaksha"
          >
            <span className="footer__span-024">Designed by Nivaksha</span>
            <img src={nivakshaLogoSrc} alt="Nivaksha logo" className="footer__img-025" loading="lazy" />
          </a>
        </div>
      </div>
    </footer>
  );
}