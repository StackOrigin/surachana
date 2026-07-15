import "../../styles/components/layout/Navbar.css";
import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS, SCHOOL } from '../../data/schoolData';
import { cn } from '../../utils/cn';

const primaryLinkPaths = ['/', '/about', '/academics', '/faculty', '/gallery', '/contact'];
const primaryLinks = primaryLinkPaths
  .map((path) => NAV_LINKS.find((link) => link.path === path))
  .filter((link): link is (typeof NAV_LINKS)[number] => Boolean(link));
const schoolLogoSrc = import.meta.env.DEV
  ? '/schools/surachana/logo.jpg'
  : './schools/surachana/logo.jpg';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen]);

  return (
    <header
      className={cn(
        "navbar__header-001",
        isScrolled ? "navbar__header-002" : "navbar__header-003",
      )}
    >
      <div className="navbar__div-004">
        <nav aria-label="Primary navigation" className={cn("navbar__nav-005", isScrolled ? "navbar__nav-006" : "navbar__nav-007")}>
          <Link to="/" className="navbar__link-008" aria-label={`${SCHOOL.name} home`}>
            <span
              className={cn(
                "navbar__span-009",
                isScrolled ? "navbar__span-010" : "navbar__span-011",
              )}
            >
              <img
                src={schoolLogoSrc}
                alt=""
                className="navbar__img-012"
                loading="eager"
                aria-hidden="true"
              />
            </span>
            <span>
              <strong className="navbar__strong-016">{SCHOOL.name}</strong>
              <small className={cn("editorial-kicker navbar__small-017", isScrolled ? "navbar__small-018" : "navbar__small-019")}>
                {SCHOOL.tagline}
              </small>
            </span>
          </Link>

          <div className="navbar__div-020">
            {primaryLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "navbar__link-021",
                  isScrolled ? "navbar__link-022" : "navbar__link-023",
                  location.pathname === link.path && (isScrolled ? "navbar__link-024" : "navbar__link-025"),
                )}
                aria-current={location.pathname === link.path ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="navbar__div-026">
            <Link
              to="/admission"
              className={cn(
                "navbar__link-027",
                isScrolled ? "navbar__link-028" : "navbar__link-029",
              )}
            >
              Enquire <ArrowUpRight className="navbar__arrow-up-right-030" />
            </Link>
            <button
              type="button"
              onClick={() => setIsOpen((value) => !value)}
              className={cn("navbar__button-031", isScrolled ? "navbar__button-032" : "navbar__button-033")}
              aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
            >
              {isOpen ? <X className="navbar__x-034" /> : <Menu className="navbar__menu-035" />}
            </button>
          </div>
        </nav>
      </div>

      <div
        id="mobile-navigation"
        aria-hidden={!isOpen}
        className={cn(
          "navbar__div-036",
          isOpen ? "navbar__div-037" : "navbar__div-038",
        )}
      >
        <div className="navbar__div-039">
          {primaryLinks.map((link, index) => (
            <Link
              key={link.path}
              to={link.path}
              className="navbar__link-040"
              tabIndex={isOpen ? 0 : -1}
            >
              <span className="navbar__span-041">{link.label}</span>
              <span className="editorial-kicker navbar__span-042">{String(index + 1).padStart(2, '0')}</span>
            </Link>
          ))}
          <Link
            to="/admission"
            className="navbar__link-043"
            tabIndex={isOpen ? 0 : -1}
          >
            <span className="navbar__span-044">Enquire</span>
            <ArrowUpRight className="navbar__arrow-up-right-045" />
          </Link>
        </div>
      </div>
    </header>
  );
}
