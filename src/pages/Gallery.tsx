import "../styles/pages/Gallery.css";
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { GALLERY_CATEGORIES, GALLERY_ITEMS, SCHOOL, loadGallery } from '../data/schoolData';
import { useScrollToTop } from '../hooks/useScrollAnimation';
import { useSchoolData } from '../hooks/useSchoolData';
import PageHero from '../components/ui/PageHero';
import Reveal from '../components/ui/Reveal';
import { cn } from '../utils/cn';

const ITEMS_PER_PAGE = 12;

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
  useSchoolData();
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [page, setPage] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    loadGallery().finally(() => setLoading(false));
  }, []);

  const filtered = GALLERY_ITEMS
    .map((item, originalIndex) => ({ ...item, originalIndex }))
    .filter((item) => activeCategory === 'All' || item.category === activeCategory);
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const pagedItems = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
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
      if (event.key === 'Tab') {
        const controls = dialogRef.current?.querySelectorAll<HTMLElement>('button, [href], [tabindex]:not([tabindex="-1"])');
        if (!controls?.length) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIndex, activeCategory]);

  useEffect(() => {
    if (selectedIndex === null) lastTriggerRef.current?.focus();
  }, [selectedIndex]);

  useEffect(() => {
    setPage(1);
    setSelectedIndex(null);
  }, [activeCategory]);

  useEffect(() => {
    setPage((current) => Math.min(current, totalPages));
  }, [totalPages]);

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
            {pagedItems.map((item) => (
              <button
                key={`${item.src}-${item.originalIndex}`}
                type="button"
                onClick={(event) => {
                  lastTriggerRef.current = event.currentTarget;
                  setSelectedIndex(item.originalIndex);
                }}
                className="gallery__button-031"
                aria-label={`Open photo: ${item.alt}`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="gallery__img-033"
                  loading="lazy"
                />
              </button>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="gallery__p-040">
              {loading ? 'Loading gallery…' : 'No photographs in this chapter yet.'}
            </p>
          )}

          {filtered.length > ITEMS_PER_PAGE && (
            <nav className="gallery__pagination" aria-label="Gallery pagination">
              <button
                type="button"
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                disabled={currentPage === 1}
                className="gallery__page-button"
              >
                Previous
              </button>
              <span className="editorial-kicker gallery__page-status">
                Page {currentPage} of {totalPages}
              </span>
              <button
                type="button"
                onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                disabled={currentPage === totalPages}
                className="gallery__page-button"
              >
                Next
              </button>
            </nav>
          )}
        </div>
      </section>

      {selected && createPortal(
        <div
          ref={dialogRef}
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
                <p className="gallery__p-052">{captions[selectedIndex! % captions.length] || selected.alt}</p>
              </div>
              <span className="editorial-kicker gallery__span-053">
                {String(selectedIndex! + 1).padStart(2, '0')} / {String(GALLERY_ITEMS.length).padStart(2, '0')}
              </span>
            </figcaption>
          </figure>
        </div>,
        document.body,
      )}
    </main>
  );
}
