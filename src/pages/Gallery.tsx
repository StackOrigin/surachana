import { useEffect, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { GALLERY_CATEGORIES, GALLERY_ITEMS, SCHOOL } from '../data/schoolData';
import { useScrollToTop } from '../hooks/useScrollAnimation';
import PageHero from '../components/ui/PageHero';
import Reveal from '../components/ui/Reveal';
import { cn } from '../utils/cn';

const compositions = [
  'lg:col-span-5 lg:row-span-2',
  'lg:col-span-3',
  'lg:col-span-4',
  'lg:col-span-3',
  'lg:col-span-4 lg:row-span-2',
  'lg:col-span-5',
  'lg:col-span-3',
  'lg:col-span-5',
  'lg:col-span-4',
  'lg:col-span-5 lg:row-span-2',
  'lg:col-span-3',
  'lg:col-span-4',
  'lg:col-span-3',
  'lg:col-span-4',
  'lg:col-span-5',
  'lg:col-span-4',
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

    document.body.style.overflow = 'hidden';
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

      <section className="py-20 lg:py-32 bg-cream-50">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-[0.55fr_1.45fr] gap-10 lg:gap-20 mb-14">
            <Reveal variant="slide-left">
              <p className="editorial-kicker text-gold-700 mb-5">A living archive</p>
              <h2 className="font-heading text-5xl sm:text-6xl leading-none">
                Little windows into
                <span className="block italic text-navy-500">life at {SCHOOL.shortName}.</span>
              </h2>
            </Reveal>
            <Reveal variant="slide-right" delay={120} className="lg:self-end">
              <p className="text-navy-600 leading-relaxed max-w-xl mb-8">
                Classrooms are only one part of a school. These are the rehearsals, matches,
                experiments, friendships, and quiet in-between moments that children carry with them.
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-3 border-t border-navy-900/20 pt-5" role="group" aria-label="Filter gallery">
                {GALLERY_CATEGORIES.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={cn(
                      'relative py-1 text-xs font-bold uppercase tracking-[0.12em] transition-colors after:absolute after:left-0 after:-bottom-1 after:h-px after:transition-all',
                      activeCategory === category
                        ? 'text-gold-700 after:w-full after:bg-gold-700'
                        : 'text-navy-500 after:w-0 after:bg-navy-950 hover:text-navy-950 hover:after:w-full',
                    )}
                    aria-pressed={activeCategory === category}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </Reveal>
          </div>

          <div key={activeCategory} className="gallery-enter grid grid-cols-2 lg:grid-cols-12 lg:auto-rows-[220px] gap-3 sm:gap-5">
            {filtered.map((item, index) => (
              <button
                key={`${item.src}-${item.originalIndex}`}
                type="button"
                onClick={() => setSelectedIndex(item.originalIndex)}
                className={cn(
                  'group relative overflow-hidden min-h-52 text-left bg-navy-900',
                  activeCategory === 'All' ? compositions[index] : 'lg:col-span-4',
                )}
                aria-label={`Open photo: ${item.alt}`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-[1.07] group-hover:rotate-[0.3deg] transition-transform duration-1000"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/5 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="editorial-kicker text-gold-300">{item.category}</span>
                  <p className="font-heading text-xl sm:text-2xl text-white mt-2 max-w-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {captions[item.originalIndex]}
                  </p>
                </div>
                <span className="absolute top-4 right-4 w-9 h-9 grid place-items-center bg-cream-50 text-navy-950 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </button>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="py-20 text-center font-heading text-3xl text-navy-500">
              No photographs in this chapter yet.
            </p>
          )}
        </div>
      </section>

      {selected && (
        <div
          className="lightbox-enter fixed inset-0 z-[70] bg-navy-950/95 backdrop-blur-md p-4 sm:p-8 lg:p-12 grid place-items-center"
          role="dialog"
          aria-modal="true"
          aria-label={`Photo preview: ${selected.alt}`}
          onClick={() => setSelectedIndex(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedIndex(null)}
            className="absolute top-5 right-5 sm:top-8 sm:right-8 w-12 h-12 grid place-items-center border border-white/25 text-white hover:bg-white hover:text-navy-950 transition-colors"
            aria-label="Close photo preview"
            autoFocus
          >
            <X className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={(event) => { event.stopPropagation(); moveSelection(-1); }}
            className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 grid place-items-center border border-white/25 text-white hover:bg-white hover:text-navy-950 transition-colors"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={(event) => { event.stopPropagation(); moveSelection(1); }}
            className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 grid place-items-center border border-white/25 text-white hover:bg-white hover:text-navy-950 transition-colors"
            aria-label="Next photo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <figure key={selectedIndex} className="lightbox-image-enter max-w-6xl w-full px-12 sm:px-16" onClick={(event) => event.stopPropagation()}>
            <img src={selected.src} alt={selected.alt} className="max-h-[72vh] w-full object-contain" />
            <figcaption className="mt-5 flex flex-col sm:flex-row sm:items-end justify-between gap-2 text-white">
              <div>
                <span className="editorial-kicker text-gold-300">{selected.category}</span>
                <p className="font-heading text-2xl sm:text-3xl mt-2">{captions[selectedIndex!]}</p>
              </div>
              <span className="editorial-kicker text-white/35">
                {String(selectedIndex! + 1).padStart(2, '0')} / {String(GALLERY_ITEMS.length).padStart(2, '0')}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </main>
  );
}
