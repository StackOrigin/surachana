import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowDownRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { IMAGES, SCHOOL } from '../../data/schoolData';
import Magnetic from '../ui/Magnetic';
import { cn } from '../../utils/cn';

const scenes = [
  { image: IMAGES.hero1, label: 'The classroom', note: 'Questions become conversations.' },
  { image: IMAGES.cultural1, label: 'The stage', note: 'Confidence finds its own voice.' },
  { image: IMAGES.sports1, label: 'The field', note: 'Belonging is built together.' },
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
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const normalizedX = Math.min(0.999, Math.max(0, (event.clientX - rect.left) / rect.width));
    const normalizedY = (event.clientY - rect.top) / rect.height - 0.5;
    const nextScene = Math.floor(normalizedX * scenes.length);
    if (nextScene !== activeScene) setActiveScene(nextScene);
    visualRef.current?.style.setProperty('--scene-x', `${(normalizedX - 0.5) * 18}px`);
    visualRef.current?.style.setProperty('--scene-y', `${normalizedY * 12}px`);
  };

  const resetPointer = () => {
    visualRef.current?.style.setProperty('--scene-x', '0px');
    visualRef.current?.style.setProperty('--scene-y', '0px');
  };

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
        <div className="absolute inset-0 editorial-grid opacity-25" />

        <div
          ref={visualRef}
          className="book-visual"
          onPointerMove={handlePointerMove}
          onPointerLeave={resetPointer}
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
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-navy-950/5 to-navy-950/35" />
        </div>

        <div className="absolute inset-x-0 top-0 z-20 max-w-[1480px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 pt-28 lg:pt-32 flex justify-between">
          <span className="editorial-kicker text-gold-300">{SCHOOL.shortName} · School life</span>
          <span className="hidden sm:block editorial-kicker text-white/45">{SCHOOL.locationLine}</span>
        </div>

        <div className="book-headline absolute inset-0 z-10 grid place-items-center pointer-events-none px-5">
          <h1 className="font-heading tracking-[-0.05em] leading-[0.82] text-white text-center">
            <span className="book-page book-page-left block text-[2.7rem] sm:text-[4.1rem] lg:text-[5.7rem] xl:text-[6.8rem]">
              {SCHOOL.heroLines[0]}
            </span>
            <span className="block italic text-gold-300 text-[2.5rem] sm:text-[3.8rem] lg:text-[5.25rem] xl:text-[6.25rem]">
              {SCHOOL.heroLines[1]}
            </span>
            <span className="book-page book-page-right block text-[2.5rem] sm:text-[3.95rem] lg:text-[5.35rem] xl:text-[6.4rem]">
              {SCHOOL.heroLines[2]}
            </span>
          </h1>
        </div>

        <div className="book-details absolute inset-x-0 bottom-0 z-20 max-w-[1480px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 pb-8 lg:pb-12 grid md:grid-cols-[1fr_auto] gap-7 items-end">
          <div>
            <p className="editorial-kicker text-gold-300 mb-2">{scenes[activeScene].label}</p>
            <p className="font-heading text-2xl sm:text-3xl text-white">{scenes[activeScene].note}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Magnetic>
              <Link to="/admission" className="group inline-flex items-center justify-between gap-8 bg-gold-400 text-navy-950 px-6 py-4 text-sm font-bold">
                Begin admission
                <ArrowDownRight className="w-5 h-5 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
              </Link>
            </Magnetic>
            <Link to="/about" className="ink-link inline-flex items-center gap-3 px-2 py-4 text-sm font-bold text-white">
              Our point of view <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="book-scroll-note absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center gap-3 [writing-mode:vertical-rl] text-white/45">
          <span className="editorial-kicker">Scroll to open</span>
          <span className="h-12 w-px bg-white/25" />
        </div>
      </div>
    </section>
  );
}
