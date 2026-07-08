import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  GraduationCap,
  Quote,
} from 'lucide-react';
import { ACHIEVEMENTS, GALLERY_ITEMS, IMAGES, PROGRAMS, SCHOOL } from '../data/schoolData';
import { useScrollToTop } from '../hooks/useScrollAnimation';
import Reveal from '../components/ui/Reveal';
import CampusStory from '../components/home/CampusStory';
import HomeHero from '../components/home/HomeHero';
import { cn } from '../utils/cn';

const programImages = [IMAGES.drawing, IMAGES.hero2, IMAGES.students2, IMAGES.students1];

export default function Home() {
  useScrollToTop();

  return (
    <main>
      <HomeHero />

      <section className="bg-gold-400 text-navy-950">
        <div className="max-w-[1480px] mx-auto grid grid-cols-2 lg:grid-cols-4">
          {ACHIEVEMENTS.map((item, index) => (
            <div
              key={item.label}
              className={cn(
                'px-5 py-7 sm:px-8 lg:py-9 border-navy-950/15',
                index % 2 === 0 ? 'border-r' : '',
                index < 2 ? 'border-b lg:border-b-0' : '',
                index < 3 ? 'lg:border-r' : '',
              )}
            >
              <span className="font-heading text-3xl sm:text-5xl">{item.number}</span>
              <span className="block text-[10px] sm:text-xs uppercase tracking-[0.16em] mt-2 font-bold">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 lg:py-36 bg-cream-50">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-[0.8fr_1.45fr] gap-12 lg:gap-24">
            <Reveal>
              <div className="lg:sticky lg:top-32">
                <p className="editorial-kicker text-gold-700 mb-5">02 · Our point of view</p>
                <h2 className="font-heading text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-navy-950">
                  Education is more than a result.
                </h2>
              </div>
            </Reveal>

            <div>
              <Reveal>
                <p className="font-heading text-3xl sm:text-4xl lg:text-5xl leading-[1.12] text-navy-800">
                  We help students become capable learners, generous classmates, and confident
                  young people—ready for examinations, and for life beyond them.
                </p>
              </Reveal>

              <Reveal delay={100} className="mt-12 grid sm:grid-cols-2 gap-x-10 gap-y-7">
                {[
                  ['Small moments matter', 'Teachers notice how each child learns, not only what they score.'],
                  ['Questions come first', 'Curiosity, practical work, and discussion turn lessons into understanding.'],
                  ['Character is practised', 'Respect, responsibility, and empathy are part of everyday school life.'],
                  ['Parents stay connected', 'Clear communication keeps families close to every stage of progress.'],
                ].map(([title, description]) => (
                  <div key={title} className="border-t border-navy-900/20 pt-5">
                    <Check className="w-4 h-4 text-gold-700 mb-4" />
                    <h3 className="font-heading text-2xl text-navy-950 mb-2">{title}</h3>
                    <p className="text-sm text-navy-600 leading-relaxed">{description}</p>
                  </div>
                ))}
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-navy-950 text-white py-24 lg:py-32">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-7 mb-14 lg:mb-20">
            <Reveal>
              <p className="editorial-kicker text-gold-300 mb-4">03 · Learning journey</p>
              <h2 className="font-heading text-5xl sm:text-6xl lg:text-7xl leading-none">
                Four stages.
                <span className="block italic font-normal text-white/45">One shared purpose.</span>
              </h2>
            </Reveal>
            <Link
              to="/academics"
              className="group inline-flex items-center gap-3 text-sm font-bold text-gold-300 pb-2 border-b border-gold-300/50 self-start sm:self-auto"
            >
              Explore academics <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="border-t border-white/15">
            {PROGRAMS.map((program, index) => (
              <Reveal key={program.title} delay={index * 70}>
                <article className="group grid md:grid-cols-[0.15fr_0.85fr_1.15fr_0.75fr] gap-4 md:gap-8 items-center py-7 border-b border-white/15">
                  <span className="font-heading text-2xl text-gold-300">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="editorial-kicker text-white/35 mb-1">{program.ages}</p>
                    <h3 className="font-heading text-2xl lg:text-3xl">{program.title}</h3>
                  </div>
                  <p className="text-sm text-white/55 leading-relaxed max-w-xl">{program.description}</p>
                  <div className="relative hidden md:block h-24 overflow-hidden opacity-55 group-hover:opacity-100 transition-opacity">
                    <img
                      src={programImages[index]}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CampusStory />

      <section className="py-24 lg:py-36 bg-cream-50">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-7 mb-12">
            <Reveal variant="slide-left">
              <p className="editorial-kicker text-gold-700 mb-5">05 · Seen around school</p>
              <h2 className="font-heading text-5xl sm:text-6xl lg:text-7xl leading-none text-navy-950 max-w-3xl">
                The small moments
                <span className="block italic text-navy-500">make the story.</span>
              </h2>
            </Reveal>
            <Link to="/gallery" className="group inline-flex items-center gap-3 text-sm font-bold border-b border-navy-950 pb-2 self-start">
              Open the gallery <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-5 items-end">
            <Reveal variant="clip" className="col-span-2 lg:col-span-5">
              <Link to="/gallery" className="group block relative h-[360px] sm:h-[560px] overflow-hidden">
                <img src={GALLERY_ITEMS[6].src} alt={GALLERY_ITEMS[6].alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" loading="lazy" />
                <span className="absolute bottom-0 left-0 bg-cream-50 px-4 py-3 editorial-kicker text-navy-800">Culture · together</span>
              </Link>
            </Reveal>
            <Reveal variant="clip" delay={130} className="lg:col-span-4">
              <Link to="/gallery" className="group block relative h-[250px] sm:h-[390px] overflow-hidden">
                <img src={GALLERY_ITEMS[12].src} alt={GALLERY_ITEMS[12].alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" loading="lazy" />
                <span className="absolute bottom-0 left-0 bg-cream-50 px-3 py-2 editorial-kicker text-navy-800">Quiet discoveries</span>
              </Link>
            </Reveal>
            <Reveal variant="clip" delay={240} className="lg:col-span-3">
              <Link to="/gallery" className="group block relative h-[290px] sm:h-[470px] overflow-hidden">
                <img src={GALLERY_ITEMS[4].src} alt={GALLERY_ITEMS[4].alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" loading="lazy" />
                <span className="absolute bottom-0 left-0 bg-cream-50 px-3 py-2 editorial-kicker text-navy-800">Play with purpose</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-navy-900 text-white">
        <div className="max-w-[1380px] mx-auto grid lg:grid-cols-2">
          <div className="relative min-h-[540px]">
            <img src={IMAGES.principal} alt={`${SCHOOL.name} leadership`} className="absolute inset-0 w-full h-full object-cover object-top" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent" />
            <div className="absolute bottom-7 left-7">
              <p className="font-heading text-2xl">{SCHOOL.leadershipName}</p>
              <p className="editorial-kicker text-gold-300 mt-1">{SCHOOL.leadershipTitle}</p>
            </div>
          </div>

          <Reveal className="p-8 sm:p-12 lg:p-16 xl:p-24 flex flex-col justify-center">
            <Quote className="w-10 h-10 text-gold-300 mb-8" />
            <blockquote className="font-heading text-3xl sm:text-4xl xl:text-5xl leading-[1.14]">
              “A good school does not ask every child to be the same. It gives each one the
              courage and discipline to become their best.”
            </blockquote>
            <div className="mt-10 pt-8 border-t border-white/15 flex flex-col sm:flex-row gap-4">
              <Link
                to="/admission"
                className="inline-flex items-center justify-center gap-3 bg-gold-400 text-navy-950 px-6 py-4 text-sm font-bold hover:bg-gold-300 transition-colors"
              >
                Apply for admission <GraduationCap className="w-4 h-4" />
              </Link>
              <a
                href={`tel:${SCHOOL.phone}`}
                className="inline-flex items-center justify-center gap-3 border border-white/20 px-6 py-4 text-sm font-bold hover:bg-white hover:text-navy-950 transition-colors"
              >
                Talk to our team
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
