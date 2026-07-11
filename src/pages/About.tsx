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
      <section className="about__section-001">
        <div className="about__div-002">
          <div className="about__div-003">
            <Reveal variant="clip">
              <div className="about__div-004">
                <div className="about__div-005">
                  <img src={IMAGES.building} alt="School building" className="about__img-006" loading="lazy" />
                </div>
                <div className="about__div-007">
                  <img src={IMAGES.building2} alt="Campus" className="about__img-008" />
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
                  <p key={paragraph} className={cn("about__p-009", index < SCHOOL.story.length - 1 && "about__p-010")}>{paragraph}</p>
                ))}
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="about__section-011">
        <div className="about__div-012">
          <SectionTitle
            badge="Our Purpose"
            title="Mission & Vision"
            subtitle="Guided by purpose, driven by passion — our mission and vision define everything we do."
          />
          <div className="about__div-013">
            <Reveal variant="slide-left">
              <div className="about__div-014">
                <div className="about__div-015">
                  <Target className="about__target-016" />
                </div>
                <h3 className="about__h3-017">Our Mission</h3>
                <p className="about__p-018">
                  To provide a nurturing and stimulating learning environment that empowers every student to achieve academic excellence, develop strong character, and become a responsible global citizen equipped with the skills and values needed for the 21st century.
                </p>
              </div>
            </Reveal>

            <Reveal variant="slide-right" delay={150}>
              <div className="about__div-019">
                <div className="about__div-020">
                  <Eye className="about__eye-021" />
                </div>
                <h3 className="about__h3-022">Our Vision</h3>
                <p className="about__p-023">
                  To be recognized as a leading institution of academic and personal excellence in Nepal — a school where innovation meets tradition, where every student is inspired to dream big, and where the foundation for lifelong learning and leadership is firmly established.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Principal Message */}
      <section className="about__section-024">
        <div className="about__div-025">
          <div className="about__div-026">
            <Reveal variant="clip" className="about__reveal-027">
              <div className="about__div-028">
                <div className="about__div-029">
                  <img src={IMAGES.principal} alt="Principal" className="about__img-030" loading="lazy" />
                </div>
                <div className="about__div-031">
                  <p className="about__p-032">{SCHOOL.leadershipName}</p>
                  <p className="about__p-033">{SCHOOL.leadershipTitle}</p>
                </div>
              </div>
            </Reveal>

            <Reveal variant="slide-right" className="about__reveal-034" delay={200}>
              <SectionTitle badge="From the Principal" title="A Message of Welcome" align="left" />
              <div className="about__div-035">
                <p>Dear Parents and Students,</p>
                {SCHOOL.leadershipMessage.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                <p className="about__p-036">
                  Together, let us build a brighter future for our children.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="about__section-037">
        <div className="about__div-038">
          <SectionTitle
            badge="Core Values"
            title="The Pillars of Our Community"
            subtitle="These six core values form the foundation of everything we teach, practice, and believe in."
          />
          <div className="about__div-039">
            {VALUES.map((value, i) => (
              <Reveal key={i} variant={i % 2 === 0 ? 'slide-left' : 'slide-right'} delay={i * 80}>
                <div className="tactile about__div-040">
                  <div className="about__div-041" />
                  <h3 className="about__h3-042">{value.title}</h3>
                  <p className="about__p-043">{value.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="about__section-044">
        <div className="about__div-045">
          <SectionTitle
            badge="Our Journey"
            title="Milestones Through the Years"
            subtitle="From humble beginnings to becoming a beacon of quality education — here's our story."
          />
          <div className="about__div-046">
            {/* Center line */}
            <div className="about__div-047" />
            
            <div className="about__div-048">
              {TIMELINE.map((item, i) => (
                <Reveal key={i} variant={i % 2 === 0 ? 'slide-left' : 'slide-right'} delay={i * 100}>
                  <div className={cn(
                    "about__div-049",
                    i % 2 === 0 ? "about__div-050" : "about__div-051"
                  )}>
                    {/* Dot */}
                    <div className="about__div-052" />
                    
                    {/* Content */}
                    <div className={cn(
                      "about__div-053",
                      i % 2 === 0 ? "about__div-054" : "about__div-055"
                    )}>
                      <span className="about__span-056">{item.year}</span>
                      <h3 className="about__h3-057">{item.title}</h3>
                      <p className="about__p-058">{item.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Parents Trust */}
      <section className="about__section-059">
        <div className="about__div-060">
          <div className="about__div-061" />
        </div>
        <div className="about__div-062">
          <SectionTitle
            badge="Trust"
            title={`Why Families Choose ${SCHOOL.shortName}`}
            light
          />
          <Reveal variant="scale">
            <div className="about__div-063">
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
                <div key={i} className="about__div-064">
                  <CheckCircle className="about__check-circle-065" />
                  <span className="about__span-066">{item}</span>
                </div>
              ))}
            </div>
            <div className="about__div-067">
              <Link to="/contact">
                <Button variant="secondary" size="lg">
                  Schedule a Visit <ArrowRight className="about__arrow-right-068" />
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
