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

const programImages = [IMAGES.campus, IMAGES.students1, IMAGES.campus];

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

      {/* ── Section 02: Our point of view ── */}
      <section className="relative overflow-hidden bg-white py-14 lg:py-20">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12">
          {/* Kicker + heading row */}
          <Reveal>
            <div className="max-w-3xl">
              <p className="editorial-kicker text-gold-600 mb-5">02 · Our point of view</p>
              <h2 className="font-heading text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-navy-950">
                Education is more than a result.
              </h2>
              <p className="mt-6 sm:mt-8 font-heading text-base sm:text-lg lg:text-xl leading-[1.15] text-navy-500 max-w-2xl">
                We help students become capable learners, generous classmates, and confident
                young people—ready for examinations, and for life beyond them.
              </p>
            </div>
          </Reveal>

          {/* Values grid – large horizontal cards */}
          <div className="mt-16 lg:mt-24 grid gap-5">
            {[
              {
                num: '01',
                title: 'Small moments matter',
                desc: 'Teachers notice how each child learns, not only what they score.',
                accent: 'Teachers see every detail',
              },
              {
                num: '02',
                title: 'Questions come first',
                desc: 'Curiosity, practical work, and discussion turn lessons into understanding.',
                accent: 'Curiosity leads the way',
              },
              {
                num: '03',
                title: 'Character is practised',
                desc: 'Respect, responsibility, and empathy are part of everyday school life.',
                accent: 'Values in action daily',
              },
              {
                num: '04',
                title: 'Parents stay connected',
                desc: 'Clear communication keeps families close to every stage of progress.',
                accent: 'Family as partners',
              },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 90}>
                <div className="group relative grid md:grid-cols-[3.5rem_1fr_auto] items-center gap-6 md:gap-8 rounded-sm border border-navy-200/60 bg-navy-50/30 px-6 py-6 sm:px-8 sm:py-7 transition-all duration-500 hover:bg-navy-50/80 hover:border-navy-300">
                  {/* Left number */}
                  <span className="font-heading text-2xl text-gold-400/60 group-hover:text-gold-500 transition-colors duration-500">
                    {item.num}
                  </span>

                  {/* Content */}
                  <div>
                    <h3 className="font-heading text-2xl sm:text-3xl text-navy-900 group-hover:text-navy-950 transition-colors duration-500">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm sm:text-base text-navy-400 leading-relaxed group-hover:text-navy-600 transition-colors duration-500">
                      {item.desc}
                    </p>
                  </div>

                  {/* Right accent tag – hidden on smallest screens */}
                  <span className="hidden sm:block editorial-kicker text-gold-500/40 group-hover:text-gold-600/70 transition-colors duration-500 text-right">
                    {item.accent}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-950 text-white py-24 lg:py-32">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-7 mb-14 lg:mb-20">
            <Reveal>
              <p className="editorial-kicker text-gold-300 mb-4">03 · Learning journey</p>
              <h2 className="font-heading text-5xl sm:text-6xl lg:text-7xl leading-none">
                Three stages.
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
            {PROGRAMS.slice(0, 3).map((program, index) => (
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
                <img src={GALLERY_ITEMS[7].src} alt={GALLERY_ITEMS[7].alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" loading="lazy" />
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

      {/* ── Principal Quote ── */}
      <section className="bg-white">
        <div className="max-w-[1380px] mx-auto grid lg:grid-cols-2">
          <div className="relative min-h-[540px]">
            <img src={IMAGES.principal} alt={`${SCHOOL.name} leadership`} className="absolute inset-0 w-full h-full object-cover object-top" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent" />
            <div className="absolute bottom-7 left-7">
              <p className="font-heading text-2xl text-white">{SCHOOL.leadershipName}</p>
              <p className="editorial-kicker text-gold-300 mt-1">{SCHOOL.leadershipTitle}</p>
            </div>
          </div>

          <Reveal className="p-8 sm:p-12 lg:p-16 xl:p-24 flex flex-col justify-center">
            <Quote className="w-10 h-10 text-gold-500 mb-8" />
            <blockquote className="font-heading text-3xl sm:text-4xl xl:text-5xl leading-[1.14] text-navy-950">
              “A good school does not ask every child to be the same. It gives each one the
              courage and discipline to become their best.”
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="relative overflow-hidden bg-navy-950 py-8 lg:py-12">
        {/* Decorative grid overlay */}
        <div className="absolute inset-0 editorial-grid opacity-10" />

        {/* Decorative gold accent circles */}
        <div className="absolute top-[-120px] right-[-120px] w-[260px] h-[260px] rounded-full bg-gold-400/10 blur-3xl" />
        <div className="absolute bottom-[-80px] left-[-80px] w-[200px] h-[200px] rounded-full bg-gold-400/8 blur-3xl" />

        <div className="relative z-10 max-w-[900px] mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <Reveal>
            <p className="editorial-kicker text-gold-400 mb-5">Ready to begin?</p>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl leading-[1.08] tracking-tight text-white">
              Give your child the gift of
              <span className="block italic text-gold-400 mt-1">a thoughtful education.</span>
            </h2>
            <p className="mt-6 text-base sm:text-lg text-white/55 max-w-2xl mx-auto leading-relaxed">
              Admissions are open for the upcoming academic session. Limited seats available
              across all grades — early applications receive priority consideration.
            </p>
          </Reveal>

          <Reveal delay={150}>
            <div className="mt-10 lg:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/admission"
                className="group relative inline-flex items-center gap-3 bg-gold-400 text-navy-950 px-8 py-5 text-sm font-bold tracking-wider uppercase overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(240,161,74,0.30)]"
              >
                <span className="absolute inset-0 bg-gold-300 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <GraduationCap className="relative z-10 w-5 h-5" />
                <span className="relative z-10">Apply for admission</span>
                <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={`tel:${SCHOOL.phone}`}
                className="group inline-flex items-center gap-3 border border-white/20 text-white px-8 py-5 text-sm font-bold tracking-wider uppercase transition-all duration-300 hover:-translate-y-1 hover:border-white/40 hover:bg-white/5"
              >
                <span>Talk to our team</span>
                <Check className="w-4 h-4 text-gold-400 group-hover:rotate-[-8deg] transition-transform" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <p className="mt-10 text-xs text-white/30 tracking-wider uppercase">
              <span className="inline-flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-gold-400" />
                No entrance test · Age-appropriate assessment only
                <span className="w-1 h-1 rounded-full bg-gold-400" />
                Need-based scholarships available
              </span>
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}