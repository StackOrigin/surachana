import "../styles/pages/Academics.css";
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useScrollToTop } from '../hooks/useScrollAnimation';
import PageHero from '../components/ui/PageHero';
import SectionTitle from '../components/ui/SectionTitle';
import Button from '../components/ui/Button';
import Reveal from '../components/ui/Reveal';
import AcademicJourney from '../components/academics/AcademicJourney';

export default function Academics() {
  useScrollToTop();

  return (
    <main>
      <PageHero
        title="Academic Programs"
        subtitle="A comprehensive curriculum designed to nurture curious minds, develop critical thinkers, and prepare students for the challenges of tomorrow."
        breadcrumb="Academics"
      />

      <AcademicJourney />

      {/* Facilities */}
      <section className="academics__section-001">
        <div className="academics__div-002">
          <SectionTitle
            badge="Facilities"
            title="State-of-the-Art Learning Spaces"
            subtitle="Our campus is equipped with modern facilities designed to enhance learning and personal growth."
          />
          <div className="academics__div-003">
            {[
              { title: "Smart Classrooms", desc: "Projectors, digital boards, and interactive learning tools in every classroom." },
              { title: "Science Labs", desc: "Fully equipped physics, chemistry, and biology laboratories." },
              { title: "Arts & Music Room", desc: "Dedicated spaces for creative expression, music, and visual arts." },
              { title: "Sports Grounds", desc: "Football field, basketball court, and indoor game facilities." },
            ].map((item, i) => (
              <Reveal key={i} variant="scale" delay={i * 80}>
                <div className="tactile academics__div-004">
                  <span className="editorial-kicker academics__span-005">0{i + 1}</span>
                  <div className="academics__div-006" />
                  <h3 className="academics__h3-007">{item.title}</h3>
                  <p className="academics__p-008">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="academics__section-009">
        <div className="academics__div-010">
          <div className="academics__div-011" />
        </div>
        <div className="academics__div-012">
          <Reveal variant="scale">
            <h2 className="academics__h2-013">
              Find the Right Program <span className="academics__span-014">for Your Child</span>
            </h2>
            <p className="academics__p-015">
              Not sure which program suits your child best? Schedule a visit and let our counselors guide you.
            </p>
            <div className="academics__div-016">
              <Link to="/admission">
                <Button variant="secondary" size="lg">Apply Now <ArrowRight className="academics__arrow-right-017" /></Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="academics__button-018">
                  Schedule a Visit <ArrowRight className="academics__arrow-right-019" />
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
