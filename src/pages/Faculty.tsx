import "../styles/pages/Faculty.css";
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { FACULTY, SCHOOL } from '../data/schoolData';
import { useScrollToTop } from '../hooks/useScrollAnimation';
import PageHero from '../components/ui/PageHero';
import SectionTitle from '../components/ui/SectionTitle';
import Button from '../components/ui/Button';
import Reveal from '../components/ui/Reveal';

export default function Faculty() {
  useScrollToTop();

  return (
    <main>
      <PageHero
        title="Our Faculty"
        subtitle="Meet the dedicated educators and staff who inspire, guide, and nurture our students every day."
        breadcrumb="Faculty"
      />

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="Our Team"
            title="Experienced & Passionate Educators"
            subtitle="Meet the teaching teams who shape learning, participation, and student wellbeing across the school."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-5 lg:gap-7 items-start">
            {FACULTY.map((member, i) => (
              <Reveal key={i} variant={i % 2 === 0 ? 'slide-left' : 'slide-right'} delay={i * 70} className={i % 3 === 0 ? 'lg:col-span-4' : 'lg:col-span-3'}>
                <div className="tactile group bg-white rounded-2xl overflow-hidden shadow-sm border border-navy-100/50 hover:shadow-lg hover:border-gold-200 transition-all duration-300 h-full">
                  <div className="aspect-[3/4] overflow-hidden relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent" />
                  </div>
                  <div className="p-5 -mt-12 relative">
                    <div className="bg-white rounded-xl p-4 shadow-md">
                      <h3 className="font-heading text-base font-bold text-navy-900 leading-tight">{member.name}</h3>
                      <p className="text-gold-600 text-sm font-medium mt-0.5">{member.position}</p>
                      <p className="text-navy-400 text-xs mt-1">{member.department}</p>
                      <p className="text-navy-500 text-xs mt-2 leading-relaxed">{member.bio}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team CTA */}
      <section className="py-16 md:py-24 bg-navy-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal variant="scale">
            <SectionTitle
              badge="Careers"
              title={`Join the ${SCHOOL.shortName} Community`}
              subtitle="We're always looking for passionate educators who want to make a difference. If you believe in the power of education, we'd love to hear from you."
            />
            <Link to="/contact">
              <Button variant="primary" size="lg">
                Get in Touch <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
