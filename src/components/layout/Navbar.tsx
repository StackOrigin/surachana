import "../../styles/components/layout/Navbar.css";
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronDown, Clock, Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NAV_GROUPS, SCHOOL, type NavChild, type NavGroup } from '../../data/schoolData';
import { useSchoolData } from '../../hooks/useSchoolData';
import { useLang } from '../../i18n/lang';
import LiveTime from '../ui/LiveTime';
import { cn } from '../../utils/cn';
import schoolNameImg from '../../assets/SchoolName.png';

// Swap this single constant when the transparent crest arrives
// (e.g. '/schools/surachana/school_logo_transparent.png').
const schoolLogoSrc = import.meta.env.DEV
  ? '/schools/surachana/school_logo.jpg'
  : './schools/surachana/school_logo.jpg';

function groupTo(group: NavGroup, child?: NavChild) {
  const path = child?.path ?? group.path;
  const hash = child?.hash;
  return hash ? `${path}#${hash}` : path;
}

export default function Navbar() {
  useSchoolData();
  const { lang, setLang, t } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimer = useRef<number | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setOpenGroup(null);
    setMobileExpanded(null);
  }, [location.pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setOpenGroup(null);
      }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen]);

  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenGroup(null), 140);
  };
  const cancelClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
  };

  const goWithHash = (group: NavGroup, child?: NavChild) => {
    const hash = child?.hash;
    setOpenGroup(null);
    setIsOpen(false);
    setMobileExpanded(null);
    navigate(groupTo(group, child));
    if (hash) {
      window.setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    }
  };

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
                "navbar__span-009 navbar__logo-badge",
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
              <img
                src={schoolNameImg}
                alt={SCHOOL.name}
                className="navbar__school-name-img"
                loading="eager"
              />
            </span>
          </Link>

          <div className="navbar__div-020">
            {NAV_GROUPS.map((group) => (
              <div
                key={group.label}
                className="navbar__group"
                onMouseEnter={() => { cancelClose(); if (group.children) setOpenGroup(group.label); }}
                onMouseLeave={scheduleClose}
              >
                {group.children ? (
                  <button
                    type="button"
                    className={cn(
                      "navbar__link-021 navbar__group-button",
                      isScrolled ? "navbar__link-022" : "navbar__link-023",
                      (location.pathname === group.path || group.children.some((c) => location.pathname === c.path)) &&
                        (isScrolled ? "navbar__link-024" : "navbar__link-025"),
                    )}
                    aria-expanded={openGroup === group.label}
                    aria-haspopup="true"
                    onClick={() => setOpenGroup((v) => (v === group.label ? null : group.label))}
                    onFocus={() => setOpenGroup(group.label)}
                  >
                    {t(group.label)}
                    <ChevronDown className="navbar__chevron" aria-hidden="true" />
                  </button>
                ) : (
                  <Link
                    to={group.path}
                    className={cn(
                      "navbar__link-021",
                      isScrolled ? "navbar__link-022" : "navbar__link-023",
                      location.pathname === group.path && (isScrolled ? "navbar__link-024" : "navbar__link-025"),
                    )}
                    aria-current={location.pathname === group.path ? 'page' : undefined}
                  >
                    {t(group.label)}
                  </Link>
                )}
                {group.children && openGroup === group.label && (
                  <div className="navbar__dropdown" role="menu" onMouseEnter={cancelClose} onMouseLeave={scheduleClose}>
                    <button type="button" role="menuitem" className="navbar__dropdown-parent" onClick={() => goWithHash(group)}>
                      All {t(group.label)}
                    </button>
                    {group.children.map((child) => (
                      <button key={child.label} type="button" role="menuitem" className="navbar__dropdown-item" onClick={() => goWithHash(group, child)}>
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="navbar__div-026">
            <span className="navbar__span-live-time">
              <Clock className="navbar__clock-icon" />
              <LiveTime />
            </span>
            <div className="navbar__lang-toggle" role="group" aria-label="Language">
              <button
                type="button"
                className={cn('navbar__lang-btn', lang === 'en' && 'navbar__lang-btn--active')}
                onClick={() => setLang('en')}
                aria-pressed={lang === 'en'}
              >
                EN
              </button>
              <span aria-hidden="true">|</span>
              <button
                type="button"
                className={cn('navbar__lang-btn', lang === 'ne' && 'navbar__lang-btn--active')}
                onClick={() => setLang('ne')}
                aria-pressed={lang === 'ne'}
              >
                NE
              </button>
            </div>
            <Link
              to="/admission"
              className={cn(
                "navbar__link-027",
                isScrolled ? "navbar__link-028" : "navbar__link-029",
              )}
            >
              {t('Apply for Admission')} <ArrowUpRight className="navbar__arrow-up-right-030" />
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
          {NAV_GROUPS.map((group, index) => (
            <div key={group.label}>
              {group.children ? (
                <>
                  <button
                    type="button"
                    className="navbar__link-040 navbar__mobile-group"
                    tabIndex={isOpen ? 0 : -1}
                    aria-expanded={mobileExpanded === group.label}
                    onClick={() => setMobileExpanded((v) => (v === group.label ? null : group.label))}
                  >
                    <span className="navbar__span-041">{t(group.label)}</span>
                    <span className="editorial-kicker navbar__span-042">{String(index + 1).padStart(2, '0')}</span>
                  </button>
                  {mobileExpanded === group.label && (
                    <div className="navbar__mobile-sub">
                      <button type="button" className="navbar__mobile-sub-item" tabIndex={isOpen ? 0 : -1} onClick={() => goWithHash(group)}>
                        All {t(group.label)}
                      </button>
                      {group.children.map((child) => (
                        <button key={child.label} type="button" className="navbar__mobile-sub-item" tabIndex={isOpen ? 0 : -1} onClick={() => goWithHash(group, child)}>
                          {child.label}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link to={group.path} className="navbar__link-040" tabIndex={isOpen ? 0 : -1}>
                  <span className="navbar__span-041">{t(group.label)}</span>
                  <span className="editorial-kicker navbar__span-042">{String(index + 1).padStart(2, '0')}</span>
                </Link>
              )}
            </div>
          ))}
          <Link
            to="/admission"
            className="navbar__link-043"
            tabIndex={isOpen ? 0 : -1}
          >
            <span className="navbar__span-044">{t('Apply for Admission')}</span>
            <ArrowUpRight className="navbar__arrow-up-right-045" />
          </Link>
          <div className="navbar__mobile-lang">
            <button type="button" className={cn('navbar__lang-btn', lang === 'en' && 'navbar__lang-btn--active')} onClick={() => setLang('en')} tabIndex={isOpen ? 0 : -1}>EN</button>
            <span aria-hidden="true">|</span>
            <button type="button" className={cn('navbar__lang-btn', lang === 'ne' && 'navbar__lang-btn--active')} onClick={() => setLang('ne')} tabIndex={isOpen ? 0 : -1}>NE</button>
          </div>
          <span className="navbar__span-live-time-mobile">
            <Clock className="navbar__clock-icon" />
            <LiveTime />
          </span>
        </div>
      </div>
    </header>
  );
}
