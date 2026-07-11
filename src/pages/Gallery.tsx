import "../styles/pages/Gallery.css";
import { useEffect, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { GALLERY_CATEGORIES, GALLERY_ITEMS, SCHOOL } from '../data/schoolData';
import { useScrollToTop } from '../hooks/useScrollAnimation';
import PageHero from '../components/ui/PageHero';
import Reveal from '../components/ui/Reveal';
import { cn } from '../utils/cn';

const compositions = [
  "gallery__variant-001",
  "gallery__variant-002",
  "gallery__variant-003",
  "gallery__variant-004",
  "gallery__variant-005",
  "gallery__variant-006",
  "gallery__variant-007",
  "gallery__variant-008",
  "gallery__variant-009",
  "gallery__variant-010",
  "gallery__variant-011",
  "gallery__variant-012",
  "gallery__variant-013",
  "gallery__variant-014",
  "gallery__variant-015",
  "gallery__variant-016",
];

const captions = [
  'A question becomes a conversation.',
  'Learning is livelier when everyone joins in.',
  'Growing confidence, one ordinary day at a time.',
  'Room to run, reset, and return ready.',
  'Playing for the team, not only the score.',
  'The kind of afternoon they remember.',
  'Tradition carried forward by young hands.',
  'The stage belongs to them.',
  'A day worth celebrating together.',
  'Where the school day begins.',
  'Corners made for conversation.',
  'A little breathing room between lessons.',
  'Quiet focus has its own energy.',
  'Stories make the world feel larger.',
  'Messy hands, original ideas.',
  'Friendship is part of the curriculum too.',
];

export default function Gallery() {
  useScrollToTop();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filtered = GALLERY_ITEMS
    .map((item, originalIndex) => ({ ...item, originalIndex }))
    .filter((item) => activeCategory === 'All' || item.category === activeCategory);
  const visibleIndexes = filtered.map((item) => item.originalIndex);

  const moveSelection = (direction: number) => {
    if (selectedIndex === null) return;
    const current = visibleIndexes.indexOf(selectedIndex);
    const next = (current + direction + visibleIndexes.length) % visibleIndexes.length;
    setSelectedIndex(visibleIndexes[next]);
  };

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedIndex(null);
      if (event.key === 'ArrowLeft') moveSelection(-1);
      if (event.key === 'ArrowRight') moveSelection(1);
    };

    document.body.style.overflow = "gallery__variant-017";
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIndex, activeCategory]);

  const selected = selectedIndex === null ? null : GALLERY_ITEMS[selectedIndex];

  return (
    <main>
      <PageHero
        title="School, as it happens"
        subtitle={`Not stock photography—real public moments shared by ${SCHOOL.name}.`}
        breadcrumb="Gallery"
      />

      <section className="gallery__section-018">
        <div className="gallery__div-019">
          <div className="gallery__div-020">
            <Reveal variant="slide-left">
              <p className="editorial-kicker gallery__p-021">A living archive</p>
              <h2 className="gallery__h2-022">
                Little windows into
                <span className="gallery__span-023">life at {SCHOOL.shortName}.</span>
              </h2>
            </Reveal>
            <Reveal variant="slide-right" delay={120} className="gallery__reveal-024">
              <p className="gallery__p-025">
                Classrooms are only one part of a school. These are the rehearsals, matches,
                experiments, friendships, and quiet in-between moments that children carry with them.
              </p>
              <div className="gallery__div-026" role="group" aria-label="Filter gallery">
                {GALLERY_CATEGORIES.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={cn(
                      "gallery__button-027",
                      activeCategory === category
                        ? "gallery__button-028"
                        : "gallery__button-029",
                    )}
                    aria-pressed={activeCategory === category}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </Reveal>
          </div>

          <div key={activeCategory} className="gallery-enter gallery__div-030">
            {filtered.map((item, index) => (
              <button
                key={`${item.src}-${item.originalIndex}`}
                type="button"
                onClick={() => setSelectedIndex(item.originalIndex)}
                className={cn(
                  "gallery__button-031",
                  activeCategory === 'All' ? compositions[index] : "gallery__button-032",
                )}
                aria-label={`Open photo: ${item.alt}`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="gallery__img-033"
                  loading="lazy"
                />
                <div className="gallery__div-034" />
                <div className="gallery__div-035">
                  <span className="editorial-kicker gallery__span-036">{item.category}</span>
                  <p className="gallery__p-037">
                    {captions[item.originalIndex]}
                  </p>
                </div>
                <span className="gallery__span-038">
                  <ArrowUpRight className="gallery__arrow-up-right-039" />
                </span>
              </button>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="gallery__p-040">
              No photographs in this chapter yet.
            </p>
          )}
        </div>
      </section>

      {selected && (
        <div
          className="lightbox-enter gallery__div-041"
          role="dialog"
          aria-modal="true"
          aria-label={`Photo preview: ${selected.alt}`}
          onClick={() => setSelectedIndex(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedIndex(null)}
            className="gallery__button-042"
            aria-label="Close photo preview"
            autoFocus
          >
            <X className="gallery__x-043" />
          </button>

          <button
            type="button"
            onClick={(event) => { event.stopPropagation(); moveSelection(-1); }}
            className="gallery__button-044"
            aria-label="Previous photo"
          >
            <ChevronLeft className="gallery__chevron-left-045" />
          </button>
          <button
            type="button"
            onClick={(event) => { event.stopPropagation(); moveSelection(1); }}
            className="gallery__button-046"
            aria-label="Next photo"
          >
            <ChevronRight className="gallery__chevron-right-047" />
          </button>

          <figure key={selectedIndex} className="lightbox-image-enter gallery__figure-048" onClick={(event) => event.stopPropagation()}>
            <img src={selected.src} alt={selected.alt} className="gallery__img-049" />
            <figcaption className="gallery__figcaption-050">
              <div>
                <span className="editorial-kicker gallery__span-051">{selected.category}</span>
                <p className="gallery__p-052">{captions[selectedIndex!]}</p>
              </div>
              <span className="editorial-kicker gallery__span-053">
                {String(selectedIndex! + 1).padStart(2, '0')} / {String(GALLERY_ITEMS.length).padStart(2, '0')}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </main>
  );
}
