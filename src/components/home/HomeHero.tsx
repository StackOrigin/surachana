import "../../styles/components/home/HomeHero.css";
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowDownRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { IMAGES, SCHOOL } from '../../data/schoolData';
import Magnetic from '../ui/Magnetic';
import { cn } from '../../utils/cn';

const scenes = [
  { image: IMAGES.heroPhoto1, label: 'School life', note: 'Questions become conversations.' },
  { image: IMAGES.heroPhoto2, label: 'The stage', note: 'Confidence finds its own voice.' },
  { image: IMAGES.heroPhoto3, label: 'The field', note: 'Belonging is built together.' },
  { image: IMAGES.heroPhoto4, label: 'The classroom', note: 'Learning comes to life.' },
];

export default function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const [activeScene, setActiveScene] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const mobile = window.innerWidth < 768;
      const progress = reduced || mobile ? 0 : Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.56)));
      section.style.setProperty('--book-left', `${progress * -18}vw`);
      section.style.setProperty('--book-right', `${progress * 18}vw`);
      section.style.setProperty('--book-opacity', `${1 - progress * 0.72}`);
      section.style.setProperty('--image-inset', `${Math.max(0, 34 - progress * 34)}%`);
      section.style.setProperty('--image-scale', `${1.08 - progress * 0.08}`);
      section.style.setProperty('--detail-opacity', `${Math.min(1, progress * 2.4)}`);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveScene((current) => (current + 1) % scenes.length);
    }, 2500);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="book-hero"
      style={{
        '--book-left': '0vw',
        '--book-right': '0vw',
        '--book-opacity': 1,
        '--image-inset': '34%',
        '--image-scale': 1.08,
        '--detail-opacity': 0,
      } as CSSProperties}
    >
      <div className="book-hero-sticky">
        <div className="editorial-grid home-hero__div-003" />

        <div
          className="book-visual"
          ref={visualRef}
        >
          {scenes.map((scene, index) => (
            <img
              key={scene.image}
              src={scene.image}
              alt={index === activeScene ? scene.label : ''}
              aria-hidden={index !== activeScene}
              className={cn('book-scene', index === activeScene && 'is-active')}
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          ))}
          <div className="home-hero__div-004" />
        </div>

        <div className="home-hero__div-005">
          <span className="editorial-kicker home-hero__span-006">{SCHOOL.shortName} · School life</span>
          <span className="editorial-kicker home-hero__span-007">{SCHOOL.locationLine}</span>
        </div>

        <div className="book-headline home-hero__div-008">
          <h1 className="home-hero__h1-009">
            <span className="book-page book-page-left home-hero__span-010">
              {SCHOOL.heroLines[0]}
            </span>
            <span className="home-hero__span-011">
              {SCHOOL.heroLines[1]}
            </span>
            <span className="book-page book-page-right home-hero__span-012">
              {SCHOOL.heroLines[2]}
            </span>
          </h1>
        </div>

        <div className="book-details home-hero__div-013">
          <div>
            <span className="editorial-kicker home-hero__span-023">{SCHOOL.shortName} · School life</span>
            <p className="editorial-kicker home-hero__p-014">{scenes[activeScene].label}</p>
            <p className="home-hero__p-015">{scenes[activeScene].note}</p>
          </div>
          <div className="home-hero__div-016">
            <Magnetic>
              <Link to="/admission" className="home-hero__link-017">
                Begin admission
                <ArrowDownRight className="home-hero__arrow-down-right-018" />
              </Link>
            </Magnetic>
            <Link to="/about" className="home-hero__link-019">
              Our point of view <ArrowRight className="home-hero__arrow-right-020" />
            </Link>
          </div>
        </div>

        <div className="book-scroll-note home-hero__div-021">
          <span className="editorial-kicker">Scroll to open</span>
          <span className="home-hero__span-022" />
        </div>
      </div>
    </section>
  );
}
