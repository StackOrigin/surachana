import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { IMAGES, PROGRAMS } from '../../data/schoolData';
import Reveal from '../ui/Reveal';
import PointerDepth from '../ui/PointerDepth';
import { cn } from '../../utils/cn';

const images = [IMAGES.drawing, IMAGES.hero2, IMAGES.students2, IMAGES.students1];

export default function AcademicJourney() {
  const [active, setActive] = useState(0);
  const program = PROGRAMS[active];

  return (
    <section className="py-24 lg:py-32 bg-cream-50">
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12">
        <Reveal variant="slide-left" className="mb-14">
          <p className="editorial-kicker text-gold-700 mb-5">The learning journey</p>
          <h2 className="font-heading text-5xl sm:text-6xl lg:text-7xl leading-none max-w-4xl">
            Growing independence,
            <span className="block italic text-navy-500">one stage at a time.</span>
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-[0.48fr_1.52fr] gap-8 lg:gap-14">
          <div className="relative border-l border-navy-900/20">
            <span
              className="absolute left-[-2px] top-0 w-[3px] bg-gold-500 transition-all duration-700"
              style={{ height: '25%', transform: `translateY(${active * 100}%)` }}
            />
            {PROGRAMS.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setActive(index)}
                onPointerEnter={() => setActive(index)}
                className={cn(
                  'w-full text-left px-6 py-6 transition-colors',
                  active === index ? 'bg-navy-950 text-white' : 'text-navy-500 hover:text-navy-950',
                )}
                aria-pressed={active === index}
              >
                <span className="editorial-kicker text-gold-500">{String(index + 1).padStart(2, '0')} · {item.ages}</span>
                <strong className="font-heading text-xl sm:text-2xl block mt-2">{item.title}</strong>
              </button>
            ))}
          </div>

          <div key={active} className="journey-panel grid md:grid-cols-2 bg-cream-100 min-h-[560px]">
            <PointerDepth className="min-h-[340px] md:min-h-full">
              <div className="h-full overflow-hidden">
                <img src={images[active]} alt={program.title} className="w-full h-full object-cover cinematic-image" />
              </div>
            </PointerDepth>
            <div className="p-7 sm:p-10 lg:p-14 flex flex-col justify-between">
              <div>
                <span className="editorial-kicker text-gold-700">{program.ages}</span>
                <h3 className="font-heading text-4xl sm:text-5xl leading-none mt-4">{program.title}</h3>
                <p className="text-navy-600 leading-relaxed mt-6">{program.description}</p>
                <div className="mt-8 space-y-3">
                  {program.focus.map((focus) => (
                    <div key={focus} className="flex items-center gap-3 text-sm text-navy-700">
                      <Check className="w-4 h-4 text-gold-700" />
                      {focus}
                    </div>
                  ))}
                </div>
              </div>
              <a href="#/admission" className="ink-link mt-10 inline-flex items-center gap-3 text-sm font-bold self-start">
                Ask about this stage <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
