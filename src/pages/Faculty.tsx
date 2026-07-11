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

      <section className="faculty__section-001">
        <div className="faculty__div-002">
          <SectionTitle
            badge="Our Team"
            title="Experienced & Passionate Educators"
            subtitle="Meet the teaching teams who shape learning, participation, and student wellbeing across the school."
          />

          <div className="faculty__div-003">
            {FACULTY.map((member, i) => (
              <Reveal key={i} variant={i % 2 === 0 ? 'slide-left' : 'slide-right'} delay={i * 70} className={i % 3 === 0 ? "faculty__reveal-004" : "faculty__reveal-005"}>
                <div className="tactile faculty__div-006">
                  <div className="faculty__div-007">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="faculty__img-008"
                      loading="lazy"
                    />
                    <div className="faculty__div-009" />
                  </div>
                  <div className="faculty__div-010">
                    <div className="faculty__div-011">
                      <h3 className="faculty__h3-012">{member.name}</h3>
                      <p className="faculty__p-013">{member.position}</p>
                      <p className="faculty__p-014">{member.department}</p>
                      <p className="faculty__p-015">{member.bio}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team CTA */}
      <section className="faculty__section-016">
        <div className="faculty__div-017">
          <Reveal variant="scale">
            <SectionTitle
              badge="Careers"
              title={`Join the ${SCHOOL.shortName} Community`}
              subtitle="We're always looking for passionate educators who want to make a difference. If you believe in the power of education, we'd love to hear from you."
            />
            <Link to="/contact">
              <Button variant="primary" size="lg">
                Get in Touch <ArrowRight className="faculty__arrow-right-018" />
              </Button>
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
