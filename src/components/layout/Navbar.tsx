import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS, SCHOOL } from '../../data/schoolData';
import { cn } from '../../utils/cn';

const primaryLinks = NAV_LINKS.filter((link) =>
  ['/', '/about', '/academics', '/admission', '/gallery', '/contact'].includes(link.path),
);

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

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-cream-50/95 text-navy-950 shadow-[0_1px_0_rgba(11,35,30,0.12)] backdrop-blur-xl' : 'text-white',
      )}
    >
      <div className="max-w-[1480px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
        <nav className={cn('flex items-center justify-between transition-all duration-300', isScrolled ? 'h-18' : 'h-24')}>
          <Link to="/" className="flex items-center gap-3 group" aria-label={`${SCHOOL.name} home`}>
            <span
              className={cn(
                'w-11 h-11 grid place-items-center border font-heading text-2xl italic transition-colors',
                isScrolled ? 'border-navy-900 bg-navy-900 text-gold-300' : 'border-white/35 text-gold-300 group-hover:bg-white group-hover:text-navy-950',
              )}
            >
              {SCHOOL.shortName.charAt(0)}
            </span>
            <span>
              <strong className="block font-heading text-lg leading-none tracking-tight">{SCHOOL.name}</strong>
              <small className={cn('editorial-kicker text-[8px] mt-1.5 block', isScrolled ? 'text-navy-500' : 'text-white/50')}>
                {SCHOOL.tagline}
              </small>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-7">
            {primaryLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'relative py-2 text-[13px] font-semibold transition-colors after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:transition-all hover:after:w-full',
                  isScrolled ? 'after:bg-navy-950 hover:text-gold-700' : 'after:bg-gold-300 text-white/75 hover:text-white',
                  location.pathname === link.path && (isScrolled ? 'text-gold-700 after:w-full' : 'text-gold-300 after:w-full'),
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/admission"
              className={cn(
                'hidden sm:inline-flex items-center gap-3 px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] transition-colors',
                isScrolled ? 'bg-gold-400 text-navy-950 hover:bg-gold-300' : 'bg-white text-navy-950 hover:bg-gold-300',
              )}
            >
              Enquire <ArrowUpRight className="w-4 h-4" />
            </Link>
            <button
              type="button"
              onClick={() => setIsOpen((value) => !value)}
              className={cn('lg:hidden w-11 h-11 grid place-items-center border', isScrolled ? 'border-navy-900/20' : 'border-white/25')}
              aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </div>

      <div
        className={cn(
          'lg:hidden overflow-hidden bg-cream-50 text-navy-950 transition-all duration-500',
          isOpen ? 'max-h-[680px] border-t border-navy-900/10' : 'max-h-0',
        )}
      >
        <div className="px-5 sm:px-8 py-6">
          {NAV_LINKS.map((link, index) => (
            <Link
              key={link.path}
              to={link.path}
              className="flex items-center justify-between py-3.5 border-b border-navy-900/10"
            >
              <span className="font-heading text-2xl">{link.label}</span>
              <span className="editorial-kicker text-navy-400">{String(index + 1).padStart(2, '0')}</span>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
