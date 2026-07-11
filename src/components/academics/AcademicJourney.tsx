import "../../styles/components/academics/AcademicJourney.css";
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
    <section className="academic-journey__section-001">
      <div className="academic-journey__div-002">
        <Reveal variant="slide-left" className="academic-journey__reveal-003">
          <p className="editorial-kicker academic-journey__p-004">The learning journey</p>
          <h2 className="academic-journey__h2-005">
            Growing independence,
            <span className="academic-journey__span-006">one stage at a time.</span>
          </h2>
        </Reveal>

        <div className="academic-journey__div-007">
          <div className="academic-journey__div-008">
            <span
              className="academic-journey__span-009"
              style={{ height: '25%', transform: `translateY(${active * 100}%)` }}
            />
            {PROGRAMS.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setActive(index)}
                onPointerEnter={() => setActive(index)}
                className={cn(
                  "academic-journey__button-010",
                  active === index ? "academic-journey__button-011" : "academic-journey__button-012",
                )}
                aria-pressed={active === index}
              >
                <span className="editorial-kicker academic-journey__span-013">{String(index + 1).padStart(2, '0')} · {item.ages}</span>
                <strong className="academic-journey__strong-014">{item.title}</strong>
              </button>
            ))}
          </div>

          <div key={active} className="journey-panel academic-journey__div-015">
            <PointerDepth className="academic-journey__pointer-depth-016">
              <div className="academic-journey__div-017">
                <img src={images[active]} alt={program.title} className="cinematic-image academic-journey__img-018" />
              </div>
            </PointerDepth>
            <div className="academic-journey__div-019">
              <div>
                <span className="editorial-kicker academic-journey__span-020">{program.ages}</span>
                <h3 className="academic-journey__h3-021">{program.title}</h3>
                <p className="academic-journey__p-022">{program.description}</p>
                <div className="academic-journey__div-023">
                  {program.focus.map((focus) => (
                    <div key={focus} className="academic-journey__div-024">
                      <Check className="academic-journey__check-025" />
                      {focus}
                    </div>
                  ))}
                </div>
              </div>
              <a href="#/admission" className="ink-link academic-journey__a-026">
                Ask about this stage <ArrowRight className="academic-journey__arrow-right-027" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
