import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { IMAGES, SCHOOL } from '../../data/schoolData';
import Reveal from '../ui/Reveal';
import PointerDepth from '../ui/PointerDepth';
import { cn } from '../../utils/cn';

const moments = [
  { label: '07:20', title: 'Arrive & belong', copy: 'Morning greetings turn a large campus into a familiar place.', image: IMAGES.campus },
  { label: '09:10', title: 'Question & discover', copy: 'Lessons move between explanation, experiments, and ideas shared aloud.', image: IMAGES.hero2 },
  { label: '12:40', title: 'Move & connect', copy: 'Playgrounds and team activities make cooperation something children practise.', image: IMAGES.sports1 },
  { label: '14:15', title: 'Make & express', copy: 'Art, music, reading, and performance give every kind of confidence room.', image: IMAGES.drawing },
];

export default function CampusStory() {
  const [active, setActive] = useState(0);
  const steps = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(Number((entry.target as HTMLElement).dataset.index))),
      { rootMargin: '-34% 0px -50%', threshold: 0.1 },
    );
    steps.current.forEach((step) => step && observer.observe(step));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 lg:py-36 bg-cream-100">
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12">
        <Reveal variant="slide-left" className="mb-14">
          <p className="editorial-kicker text-gold-700 mb-5">04 · A day at {SCHOOL.shortName}</p>
          <h2 className="font-heading text-5xl sm:text-6xl lg:text-7xl leading-none max-w-4xl">
            Follow the rhythm
            <span className="block italic text-navy-500">of an ordinary school day.</span>
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-[0.75fr_1.25fr] gap-10 lg:gap-20 items-start">
          <div className="border-t border-navy-900/20">
            {moments.map((moment, index) => (
              <button
                key={moment.title}
                ref={(node) => { steps.current[index] = node; }}
                data-index={index}
                type="button"
                onClick={() => setActive(index)}
                onPointerEnter={() => setActive(index)}
                className={cn(
                  'w-full text-left grid grid-cols-[0.25fr_1fr_auto] gap-4 py-7 border-b border-navy-900/20 transition-all',
                  active === index ? 'text-navy-950 pl-3' : 'text-navy-500 hover:text-navy-950',
                )}
                aria-pressed={active === index}
              >
                <span className="editorial-kicker text-gold-700">{moment.label}</span>
                <span>
                  <strong className="font-heading text-2xl sm:text-3xl block">{moment.title}</strong>
                  <span className={cn('text-sm leading-relaxed mt-2 block transition-opacity', active === index ? 'opacity-100' : 'opacity-55')}>
                    {moment.copy}
                  </span>
                </span>
                <ArrowUpRight className={cn('w-5 h-5 transition-transform', active === index && 'rotate-45')} />
              </button>
            ))}
          </div>

          <div className="lg:sticky lg:top-28">
            <PointerDepth>
              <div className="relative h-[430px] sm:h-[620px] overflow-hidden bg-navy-950">
                {moments.map((moment, index) => (
                  <img
                    key={moment.image}
                    src={moment.image}
                    alt={moment.title}
                    className={cn(
                      'absolute inset-0 w-full h-full object-cover transition-all duration-1000',
                      active === index ? 'opacity-100 scale-100' : 'opacity-0 scale-110',
                    )}
                    loading="lazy"
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/65 via-transparent to-transparent" />
                <span className="absolute bottom-6 left-6 font-heading text-7xl text-white/20">
                  {String(active + 1).padStart(2, '0')}
                </span>
              </div>
            </PointerDepth>
          </div>
        </div>
      </div>
    </section>
  );
}
