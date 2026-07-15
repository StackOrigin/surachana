import "../styles/pages/Home.css";
import { Link } from 'react-router-dom';
import {
  ArrowRight,
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

      <section className="home__section-001">
        <div className="home__div-002">
          {ACHIEVEMENTS.map((item, index) => (
            <div
              key={item.label}
              className={cn(
                "home__div-003",
                index % 2 === 0 ? "home__div-004" : '',
                index < 2 ? "home__div-005" : '',
                index < 3 ? "home__div-006" : '',
              )}
            >
              <span className="home__span-007">{item.number}</span>
              <span className="home__span-008">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 02: Our point of view ── */}
      <section className="home__section-009">
        <div className="home__div-010">
          {/* Kicker + heading row */}
          <Reveal>
            <div className="home__div-011">
              <p className="editorial-kicker home__p-012">02 · Our point of view</p>
              <h2 className="home__h2-013">
                Education is more than a result.
              </h2>
              <p className="home__p-014">
                We help students become capable learners, generous classmates, and confident
                young people.
              </p>
            </div>
          </Reveal>

          {/* Values grid – large horizontal cards */}
          <div className="home__div-015">
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
                <div className="home__div-016">
                  {/* Left number */}
                  <span className="home__span-017">
                    {item.num}
                  </span>

                  {/* Content */}
                  <div>
                    <h3 className="home__h3-018">
                      {item.title}
                    </h3>
                    <p className="home__p-019">
                      {item.desc}
                    </p>
                  </div>

                  {/* Right accent tag – hidden on smallest screens */}
                  <span className="editorial-kicker home__span-020">
                    {item.accent}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="home__section-021">
        <div className="home__div-022">
          <div className="home__div-023">
            <Reveal>
              <p className="editorial-kicker home__p-024">03 · Learning journey</p>
              <h2 className="home__h2-025">
                Three stages.
                <span className="home__span-026">One shared purpose.</span>
              </h2>
            </Reveal>
            <Link
              to="/academics"
              className="home__link-027"
            >
              Explore academics <ArrowRight className="home__arrow-right-028" />
            </Link>
          </div>

          <div className="home__div-029">
            {PROGRAMS.slice(0, 3).map((program, index) => (
              <Reveal key={program.title} delay={index * 70}>
                <article className="home__article-030">
                  <span className="home__span-031">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="editorial-kicker home__p-032">{program.ages}</p>
                    <h3 className="home__h3-033">{program.title}</h3>
                  </div>
                  <p className="home__p-034">{program.description}</p>
                  <div className="home__div-035">
                    <img
                      src={programImages[index]}
                      alt=""
                      className="home__img-036"
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

      <section className="home__section-037">
        <div className="home__div-038">
          <div className="home__div-039">
            <Reveal variant="slide-left">
              <p className="editorial-kicker home__p-040">05 · Seen around school</p>
              <h2 className="home__h2-041">
                The small moments
                <span className="home__span-042">make the story.</span>
              </h2>
            </Reveal>
            <Link to="/gallery" className="home__link-043">
              Open the gallery <ArrowRight className="home__arrow-right-044" />
            </Link>
          </div>

          <div className="home__div-045">
            <Reveal variant="clip" className="home__reveal-046">
              <Link to="/gallery" className="home__link-047">
                <img src={GALLERY_ITEMS[7].src} alt={GALLERY_ITEMS[7].alt} className="home__img-048" loading="lazy" />
                <span className="editorial-kicker home__span-049">Culture · together</span>
              </Link>
            </Reveal>
            <Reveal variant="clip" delay={130} className="home__reveal-050">
              <Link to="/gallery" className="home__link-051">
                <img src={GALLERY_ITEMS[12].src} alt={GALLERY_ITEMS[12].alt} className="home__img-052" loading="lazy" />
                <span className="editorial-kicker home__span-053">Quiet discoveries</span>
              </Link>
            </Reveal>
            <Reveal variant="clip" delay={240} className="home__reveal-054">
              <Link to="/gallery" className="home__link-055">
                <img src={GALLERY_ITEMS[4].src} alt={GALLERY_ITEMS[4].alt} className="home__img-056" loading="lazy" />
                <span className="editorial-kicker home__span-057">Play with purpose</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Principal Quote ── */}
      <section className="home__section-058">
        <div className="home__div-059">
          <div className="home__div-060">
            <img src={IMAGES.principal} alt={`${SCHOOL.name} leadership`} className="home__img-061" loading="lazy" />
            <div className="home__div-062" />
            <div className="home__div-063">
              <p className="home__p-064">{SCHOOL.leadershipName}</p>
              <p className="editorial-kicker home__p-065">{SCHOOL.leadershipTitle}</p>
            </div>
          </div>

          <Reveal className="home__reveal-066">
            <Quote className="home__quote-067" />
            <blockquote className="home__blockquote-068">
              “A good school does not ask every child to be the same. It gives each one the
              courage and discipline to become their best.”
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="home__section-069">
        {/* Decorative grid overlay */}
        <div className="editorial-grid home__div-070" />

        {/* Decorative gold accent circles */}
        <div className="home__div-071" />
        <div className="home__div-072" />

        <div className="home__div-073">
          <Reveal>
            <p className="editorial-kicker home__p-074">Ready to begin?</p>
            <h2 className="home__h2-075">
              Give your child the gift of
              <span className="home__span-076">a thoughtful education.</span>
            </h2>
            <p className="home__p-077">
              Admissions are open for the upcoming academic session. Limited seats available
              across all grades — early applications receive priority consideration.
            </p>
          </Reveal>

          <Reveal delay={150}>
            <div className="home__div-078">
              <Link
                to="/admission"
                className="home__link-079"
              >
                <span className="home__span-080" />
              
                <span className="home__span-082">Apply for admission</span>
                <ArrowRight className="home__arrow-right-083" />
              </Link>
              <a
                href={`tel:${SCHOOL.phone}`}
                className="home__a-084"
              >
                <span>Talk to our team</span>
               
              </a>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <p className="home__p-086">
              <span className="home__span-087">
                <span className="home__span-088" />
                No entrance test · Age-appropriate assessment only
                <span className="home__span-089" />
                Need-based scholarships available
              </span>
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}