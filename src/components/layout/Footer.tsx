import "../../styles/components/layout/Footer.css";
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NAV_LINKS, SCHOOL } from '../../data/schoolData';

export default function Footer() {
  return (
    <footer className="bg-cream-100 text-navy-950 border-t border-navy-900/15">
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-24">
        <div className="grid lg:grid-cols-[1.2fr_0.7fr_0.7fr] gap-14 lg:gap-20">
          <div>
            <Link to="/" className="inline-flex items-center gap-4">
              <span className="w-14 h-14 grid place-items-center bg-navy-950 text-gold-300 font-heading text-3xl italic">{SCHOOL.shortName.charAt(0)}</span>
              <span>
                <strong className="block font-heading text-2xl leading-none">{SCHOOL.name}</strong>
                <small className="editorial-kicker text-navy-500 block mt-2">{SCHOOL.tagline}</small>
              </span>
            </Link>
            <p className="font-heading text-3xl sm:text-4xl leading-tight max-w-xl mt-10">
              A thoughtful place for young minds to take root—and find their way forward.
            </p>
            <Link
              to="/admission"
              className="inline-flex items-center gap-3 mt-8 font-bold text-sm border-b border-navy-950 pb-2"
            >
              Start an admission enquiry <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div>
            <p className="editorial-kicker text-gold-700 mb-6">Explore</p>
            <div className="grid grid-cols-2 gap-x-7 gap-y-3">
              {NAV_LINKS.map((link) => (
                <Link key={link.path} to={link.path} className="text-sm text-navy-700 hover:text-gold-700 transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="editorial-kicker text-gold-700 mb-6">Find us</p>
            <ul className="space-y-5 text-sm text-navy-700">
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 text-gold-700 shrink-0 mt-0.5" />
                <span>{SCHOOL.address}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-4 h-4 text-gold-700 shrink-0" />
                <a href={`tel:${SCHOOL.phone}`}>{SCHOOL.phone}</a>
              </li>
              {SCHOOL.email && (
                <li className="flex gap-3">
                  <Mail className="w-4 h-4 text-gold-700 shrink-0" />
                  <a href={`mailto:${SCHOOL.email}`}>{SCHOOL.email}</a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-navy-900/15 flex flex-col sm:flex-row justify-between gap-3 editorial-kicker text-navy-400">
          <span>© {new Date().getFullYear()} {SCHOOL.name}</span>
          <span>{SCHOOL.locationLine} · Nepal</span>
        </div>
      </div>
    </footer>
  );
}
