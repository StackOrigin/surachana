import "../styles/pages/About.css";
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Eye, Target } from 'lucide-react';
import { SCHOOL, IMAGES, VALUES, TIMELINE } from '../data/schoolData';
import { useScrollToTop } from '../hooks/useScrollAnimation';
import PageHero from '../components/ui/PageHero';
import SectionTitle from '../components/ui/SectionTitle';
import Button from '../components/ui/Button';
import Reveal from '../components/ui/Reveal';
import { cn } from '../utils/cn';

export default function About() {
  useScrollToTop();

  return (
    <main>
      <PageHero
        title={`About ${SCHOOL.shortName}`}
        subtitle={SCHOOL.aboutSubtitle}
        breadcrumb="About Us"
      />

      {/* Introduction */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Reveal variant="clip">
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-xl aspect-[4/3]">
                  <img src={IMAGES.building} alt="School building" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="absolute -bottom-6 -right-6 w-40 h-40 rounded-2xl overflow-hidden shadow-xl border-4 border-white hidden md:block">
                  <img src={IMAGES.building2} alt="Campus" className="w-full h-full object-cover" />
                </div>
              </div>
            </Reveal>

            <div>
              <SectionTitle
                badge="Who We Are"
                title={SCHOOL.storyTitle}
                align="left"
              />
              <Reveal variant="slide-right" delay={200}>
                {SCHOOL.story.map((paragraph, index) => (
                  <p key={paragraph} className={cn('text-navy-600 leading-relaxed', index < SCHOOL.story.length - 1 && 'mb-5')}>{paragraph}</p>
                ))}
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 md:py-28 bg-navy-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="Our Purpose"
            title="Mission & Vision"
            subtitle="Guided by purpose, driven by passion — our mission and vision define everything we do."
          />
          <div className="grid md:grid-cols-2 gap-8">
            <Reveal variant="slide-left">
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-navy-100/50 h-full">
                <div className="w-14 h-14 rounded-2xl bg-navy-900 text-gold-400 flex items-center justify-center mb-6">
                  <Target className="w-7 h-7" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-navy-900 mb-4">Our Mission</h3>
                <p className="text-navy-600 leading-relaxed">
                  To provide a nurturing and stimulating learning environment that empowers every student to achieve academic excellence, develop strong character, and become a responsible global citizen equipped with the skills and values needed for the 21st century.
                </p>
              </div>
            </Reveal>

            <Reveal variant="slide-right" delay={150}>
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-navy-100/50 h-full">
                <div className="w-14 h-14 rounded-2xl bg-gold-500 text-navy-900 flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-navy-900 mb-4">Our Vision</h3>
                <p className="text-navy-600 leading-relaxed">
                  To be recognized as a leading institution of academic and personal excellence in Nepal — a school where innovation meets tradition, where every student is inspired to dream big, and where the foundation for lifelong learning and leadership is firmly established.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Principal Message */}
      <section className="py-20 md:py-28 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            <Reveal variant="clip" className="lg:col-span-2">
              <div className="relative max-w-sm mx-auto lg:mx-0">
                <div className="rounded-3xl overflow-hidden shadow-xl aspect-[3/4]">
                  <img src={IMAGES.principal} alt="Principal" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-lg px-5 py-3 text-center whitespace-nowrap">
                  <p className="font-heading text-sm font-bold text-navy-900">{SCHOOL.leadershipName}</p>
                  <p className="text-xs text-navy-500">{SCHOOL.leadershipTitle}</p>
                </div>
              </div>
            </Reveal>

            <Reveal variant="slide-right" className="lg:col-span-3" delay={200}>
              <SectionTitle badge="From the Principal" title="A Message of Welcome" align="left" />
              <div className="space-y-4 text-navy-600 leading-relaxed">
                <p>Dear Parents and Students,</p>
                {SCHOOL.leadershipMessage.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                <p className="font-medium text-navy-900">
                  Together, let us build a brighter future for our children.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="Core Values"
            title="The Pillars of Our Community"
            subtitle="These six core values form the foundation of everything we teach, practice, and believe in."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map((value, i) => (
              <Reveal key={i} variant={i % 2 === 0 ? 'slide-left' : 'slide-right'} delay={i * 80}>
                <div className="tactile p-6 md:p-8 rounded-2xl bg-white border border-navy-100/50 shadow-sm hover:shadow-lg hover:border-gold-200 transition-all duration-300 group h-full">
                  <div className="w-10 h-px bg-gold-600 mb-6 transition-all duration-300 group-hover:w-16" />
                  <h3 className="font-heading text-xl font-bold text-navy-900 mb-3">{value.title}</h3>
                  <p className="text-sm text-navy-500 leading-relaxed">{value.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="Our Journey"
            title="Milestones Through the Years"
            subtitle="From humble beginnings to becoming a beacon of quality education — here's our story."
          />
          <div className="relative">
            {/* Center line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-navy-200 md:-translate-x-0.5" />
            
            <div className="space-y-12">
              {TIMELINE.map((item, i) => (
                <Reveal key={i} variant={i % 2 === 0 ? 'slide-left' : 'slide-right'} delay={i * 100}>
                  <div className={cn(
                    "relative flex items-start gap-6 md:gap-0",
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  )}>
                    {/* Dot */}
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gold-500 border-4 border-cream-50 shadow z-10 mt-1" />
                    
                    {/* Content */}
                    <div className={cn(
                      "ml-10 md:ml-0 md:w-[calc(50%-2rem)]",
                      i % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"
                    )}>
                      <span className="inline-block font-heading text-2xl font-bold text-gold-600 mb-1">{item.year}</span>
                      <h3 className="font-heading text-lg font-bold text-navy-900 mb-2">{item.title}</h3>
                      <p className="text-sm text-navy-500 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Parents Trust */}
      <section className="py-20 md:py-28 bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionTitle
            badge="Trust"
            title={`Why Families Choose ${SCHOOL.shortName}`}
            light
          />
          <Reveal variant="scale">
            <div className="grid sm:grid-cols-2 gap-6 text-left">
              {[
                "A learning journey from early years to secondary level",
                "Steady preparation for the SEE pathway",
                "Teachers who value progress and participation",
                "Direct communication with families",
                "A school community rooted in its local area",
                "Activities that build confidence and friendship",
                "Space for curiosity, expression, and responsibility",
                "A personal campus visit before you decide",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                  <span className="text-navy-200 text-sm">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Link to="/contact">
                <Button variant="secondary" size="lg">
                  Schedule a Visit <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
