import "../styles/pages/About.css";
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Eye, Target, Quote } from 'lucide-react';
import { SCHOOL, IMAGES, VALUES, TIMELINE } from '../data/schoolData';
import { useScrollToTop } from '../hooks/useScrollAnimation';
import { useSchoolData } from '../hooks/useSchoolData';
import PageHero from '../components/ui/PageHero';
import SectionTitle from '../components/ui/SectionTitle';
import Button from '../components/ui/Button';
import Reveal from '../components/ui/Reveal';
import { cn } from '../utils/cn';
import directorPhoto from '../assets/director.png';
import principalPhoto from '../assets/director.png';

export default function About() {
  useScrollToTop();
  useSchoolData();

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
                  <img src={IMAGES.about1} alt="School building" className="about__img-006" loading="lazy" />
                </div>
                <div className="about__div-007">
                  <img src={IMAGES.about2} alt={`${SCHOOL.name} campus`} className="about__img-008" loading="lazy" />
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
                  To provide a nurturing and stimulating learning environment that empowers every student to achieve academic excellence, develop strong character, and become a responsible global citizen.
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
                  To be recognized as a leading institution of academic and personal excellence in Nepal — a school where innovation meets tradition.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Leadership notes */}
      <section className="about-voices">
        <div className="about-voices__inner">
          <SectionTitle
            badge="Leadership"
            title="Notes from the Desk"
            subtitle="Two voices, one purpose — a word from those who guide the school each day."
          />

          <div className="about-voices__grid">
            <Reveal variant="slide-left">
              <article className="about-voices__card about-voices__card--light">
                <div className="about-voices__photo">
                  <img src={directorPhoto} alt={SCHOOL.leadershipName} loading="lazy" />
                  <div className="about-voices__person">
                    <p className="about-voices__name">{SCHOOL.leadershipName}</p>
                    <p className="about-voices__title">{SCHOOL.leadershipTitle}</p>
                  </div>
                </div>
                <div className="about-voices__body">
                  <Quote className="about-voices__mark" aria-hidden />
                  <p className="about-voices__role">From the Director</p>
                  <blockquote className="about-voices__quote">
                    {SCHOOL.leadershipMessage.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </blockquote>
                </div>
              </article>
            </Reveal>

            <Reveal variant="slide-right" delay={160}>
              <article className="about-voices__card about-voices__card--dark">
                <div className="about-voices__photo">
                  <img src={principalPhoto} alt={SCHOOL.principalName} loading="lazy" />
                  <div className="about-voices__person">
                    <p className="about-voices__name">{SCHOOL.principalName}</p>
                    <p className="about-voices__title">{SCHOOL.principalTitle}</p>
                  </div>
                </div>
                <div className="about-voices__body">
                  <Quote className="about-voices__mark" aria-hidden />
                  <p className="about-voices__role">From the Principal</p>
                  <blockquote className="about-voices__quote">
                    {SCHOOL.principalMessage.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </blockquote>
                </div>
              </article>
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
                    <div className="about__div-052" />
                    
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
                "A learning journey from early years through lower secondary",
                "Steady preparation for the next academic step",
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
