import "../../styles/components/home/CampusStory.css";
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { IMAGES, SCHOOL } from '../../data/schoolData';
import Reveal from '../ui/Reveal';
import PointerDepth from '../ui/PointerDepth';
import { cn } from '../../utils/cn';

const moments = [
  { label: '07:20', title: 'Arrive & belong', copy: 'Morning greetings turn a large campus into a familiar place.', image: IMAGES.arriveAndBelong },
  { label: '09:10', title: 'Question & discover', copy: 'Lessons move between explanation, experiments, and ideas shared aloud.', image: IMAGES.questionAndDiscover },
  { label: '12:40', title: 'Move & connect', copy: 'Playgrounds and team activities make cooperation something children practise.', image: IMAGES.moveAndConnect },
  { label: '14:15', title: 'Make & express', copy: 'Art, music, reading, and performance give every kind of confidence room.', image: IMAGES.makeAndExpress },
];

export default function CampusStory() {
  const [active, setActive] = useState(0);
  const steps = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(Number((entry.target as HTMLElement).dataset.index))),
      { rootMargin: '-34% 0px -50%', threshold: 0.1 },
    );
    steps.current.forEach((step) => step && observer.observe(step));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="campus-story__section-001">
      <div className="campus-story__div-002">
        <Reveal variant="slide-left" className="campus-story__reveal-003">
          <p className="editorial-kicker campus-story__p-004">04 · A day at {SCHOOL.shortName}</p>
          <h2 className="campus-story__h2-005">
            Follow the rhythm
            <span className="campus-story__span-006">of an ordinary school day.</span>
          </h2>
        </Reveal>

        <div className="campus-story__div-007">
          <div className="campus-story__div-008">
            {moments.map((moment, index) => (
              <button
                key={moment.title}
                ref={(node) => { steps.current[index] = node; }}
                data-index={index}
                type="button"
                onClick={() => setActive(index)}
                onPointerEnter={() => setActive(index)}
                className={cn(
                  "campus-story__button-009",
                  active === index ? "campus-story__button-010" : "campus-story__button-011",
                )}
                aria-pressed={active === index}
              >
                <span className="editorial-kicker campus-story__span-012">{moment.label}</span>
                <span>
                  <strong className="campus-story__strong-013">{moment.title}</strong>
                  <span className={cn("campus-story__span-014", active === index ? "campus-story__span-015" : "campus-story__span-016")}>
                    {moment.copy}
                  </span>
                </span>
                <ArrowUpRight className={cn("campus-story__arrow-up-right-017", active === index && "campus-story__arrow-up-right-018")} />
              </button>
            ))}
          </div>

          <div className="campus-story__div-019">
            <PointerDepth>
              <div className="campus-story__div-020">
                {moments.map((moment, index) => (
                  <img
                    key={moment.image}
                    src={moment.image}
                    alt={moment.title}
                    className={cn(
                      "campus-story__img-021",
                      active === index ? "campus-story__img-022" : "campus-story__img-023",
                    )}
                    loading="lazy"
                  />
                ))}
                <div className="campus-story__div-024" />
                <span className="campus-story__span-025">
                  {String(active + 1).padStart(2, '0')}
                </span>
              </div>
            </PointerDepth>
          </div>
        </div>
      </div>
    </section>
  );
}
