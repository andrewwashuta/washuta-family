"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const YEAR_DATA = [
  {
    id: 'january',
    month: 'January',
    year: '2025',
    title: 'Fresh starts',
    location: 'Home',
    description: 'Cozy mornings, hot cocoa after sled rides, and a new tradition of Sunday waffles.',
    cover: 'https://picsum.photos/seed/jan-1/900/1200',
    stats: { photos: 4, videos: 0 },
    gallery: [
      { src: 'https://picsum.photos/seed/jan-1/900/1200', caption: 'Snowy backyard adventures.' },
      { src: 'https://picsum.photos/seed/jan-2/900/1200', caption: 'The annual puzzle marathon.' },
      { src: 'https://picsum.photos/seed/jan-3/900/1200', caption: 'Quiet library afternoons.' },
      { src: 'https://picsum.photos/seed/jan-4/900/1200', caption: 'Fireside story time.' },
    ]
  },
  {
    id: 'february',
    month: 'February',
    year: '2025',
    title: 'Warm hearts',
    location: 'Home',
    description: 'Handmade valentines, a surprise snow day, and a living room dance party.',
    cover: 'https://picsum.photos/seed/feb-1/900/1200',
    stats: { photos: 4, videos: 0 },
    gallery: [
      { src: 'https://picsum.photos/seed/feb-1/900/1200', caption: 'Glittery valentines on display.' },
      { src: 'https://picsum.photos/seed/feb-2/900/1200', caption: 'Snowball mission in the park.' },
      { src: 'https://picsum.photos/seed/feb-3/900/1200', caption: 'Homemade heart-shaped pizzas.' },
      { src: 'https://picsum.photos/seed/feb-4/900/1200', caption: 'Movie night cocoa station.' },
    ]
  },
  {
    id: 'march',
    month: 'March',
    year: '2025',
    title: 'First blooms',
    location: 'Local trails',
    description: 'Early hikes, garden prep, and the first picnic of the season by the lake.',
    cover: 'https://picsum.photos/seed/mar-1/900/1200',
    stats: { photos: 4, videos: 0 },
    gallery: [
      { src: 'https://picsum.photos/seed/mar-1/900/1200', caption: 'Windy trail smiles.' },
      { src: 'https://picsum.photos/seed/mar-2/900/1200', caption: 'Planting seedlings together.' },
      { src: 'https://picsum.photos/seed/mar-3/900/1200', caption: 'Picnic blanket + sunshine.' },
      { src: 'https://picsum.photos/seed/mar-4/900/1200', caption: 'Rainy day fort building.' },
    ]
  },
  {
    id: 'april',
    month: 'April',
    year: '2025',
    title: 'Play outside',
    location: 'Soccer fields',
    description: 'Weekend soccer games, splashy rain walks, and pastel egg adventures.',
    cover: 'https://picsum.photos/seed/apr-1/900/1200',
    stats: { photos: 4, videos: 0 },
    gallery: [
      { src: 'https://picsum.photos/seed/apr-1/900/1200', caption: 'Sideline cheers.' },
      { src: 'https://picsum.photos/seed/apr-2/900/1200', caption: 'Colorful egg hunt.' },
      { src: 'https://picsum.photos/seed/apr-3/900/1200', caption: 'Umbrella runway.' },
      { src: 'https://picsum.photos/seed/apr-4/900/1200', caption: 'Kitchen cupcake test run.' },
    ]
  },
  {
    id: 'may',
    month: 'May',
    year: '2025',
    title: 'Golden evenings',
    location: 'School & backyard',
    description: 'School performances, bike rides at sunset, and the first backyard campout.',
    cover: 'https://picsum.photos/seed/may-1/900/1200',
    stats: { photos: 4, videos: 0 },
    gallery: [
      { src: 'https://picsum.photos/seed/may-1/900/1200', caption: 'Stage lights and proud smiles.' },
      { src: 'https://picsum.photos/seed/may-2/900/1200', caption: 'Bike trail breakthroughs.' },
      { src: 'https://picsum.photos/seed/may-3/900/1200', caption: 'Campfire marshmallow magic.' },
      { src: 'https://picsum.photos/seed/may-4/900/1200', caption: 'Garden blooms on deck.' },
    ]
  },
  {
    id: 'june',
    month: 'June',
    year: '2025',
    title: 'Summer energy',
    location: 'Pool & road trips',
    description: 'Pool afternoons, messy popsicles, and day trips that stretched late.',
    cover: 'https://picsum.photos/seed/jun-1/900/1200',
    stats: { photos: 4, videos: 0 },
    gallery: [
      { src: 'https://picsum.photos/seed/jun-1/900/1200', caption: 'Poolside cannonballs.' },
      { src: 'https://picsum.photos/seed/jun-2/900/1200', caption: 'Popsicle rainbow.' },
      { src: 'https://picsum.photos/seed/jun-3/900/1200', caption: 'Road trip playlists.' },
      { src: 'https://picsum.photos/seed/jun-4/900/1200', caption: 'Backyard sprinkler parties.' },
    ]
  },
  {
    id: 'july',
    month: 'July',
    year: '2025',
    title: 'Big sky days',
    location: 'Lake house',
    description: 'Fourth of July sparklers, lake weekends, and sunset paddleboarding.',
    cover: 'https://picsum.photos/seed/jul-1/900/1200',
    stats: { photos: 4, videos: 0 },
    gallery: [
      { src: 'https://picsum.photos/seed/jul-1/900/1200', caption: 'Sparklers after dusk.' },
      { src: 'https://picsum.photos/seed/jul-2/900/1200', caption: 'Lake dock leaps.' },
      { src: 'https://picsum.photos/seed/jul-3/900/1200', caption: 'Sunset paddle session.' },
      { src: 'https://picsum.photos/seed/jul-4/900/1200', caption: 'Berry picking haul.' },
    ]
  },
  {
    id: 'august',
    month: 'August',
    year: '2025',
    title: 'Road miles',
    location: 'Mountain trip',
    description: 'Mountain air, roadside diners, and the loudest family sing-alongs.',
    cover: 'https://picsum.photos/seed/aug-1/900/1200',
    stats: { photos: 4, videos: 0 },
    gallery: [
      { src: 'https://picsum.photos/seed/aug-1/900/1200', caption: 'Summit selfie.' },
      { src: 'https://picsum.photos/seed/aug-2/900/1200', caption: 'Trail snacks break.' },
      { src: 'https://picsum.photos/seed/aug-3/900/1200', caption: 'Vintage roadside stop.' },
      { src: 'https://picsum.photos/seed/aug-4/900/1200', caption: 'Cabin board games.' },
    ]
  },
  {
    id: 'september',
    month: 'September',
    year: '2025',
    title: 'New routines',
    location: 'School & neighborhood',
    description: 'Back-to-school energy, fresh notebooks, and after-dinner walks.',
    cover: 'https://picsum.photos/seed/sep-1/900/1200',
    stats: { photos: 4, videos: 0 },
    gallery: [
      { src: 'https://picsum.photos/seed/sep-1/900/1200', caption: 'First-day outfits.' },
      { src: 'https://picsum.photos/seed/sep-2/900/1200', caption: 'Homework nook refresh.' },
      { src: 'https://picsum.photos/seed/sep-3/900/1200', caption: 'Evening neighborhood stroll.' },
      { src: 'https://picsum.photos/seed/sep-4/900/1200', caption: 'Apple orchard visit.' },
    ]
  },
  {
    id: 'october',
    month: 'October',
    year: '2025',
    title: 'Autumn glow',
    location: 'Pumpkin patch',
    description: 'Pumpkin carving, crunchy leaves, and the spookiest movie marathons.',
    cover: 'https://picsum.photos/seed/oct-1/900/1200',
    stats: { photos: 4, videos: 0 },
    gallery: [
      { src: 'https://picsum.photos/seed/oct-1/900/1200', caption: 'Pumpkin patch portrait.' },
      { src: 'https://picsum.photos/seed/oct-2/900/1200', caption: 'Jack-o\'-lantern lineup.' },
      { src: 'https://picsum.photos/seed/oct-3/900/1200', caption: 'Leaf piles takeoff.' },
      { src: 'https://picsum.photos/seed/oct-4/900/1200', caption: 'Costume test run.' },
    ]
  },
  {
    id: 'november',
    month: 'November',
    year: '2025',
    title: 'Gather + savor',
    location: 'Home',
    description: 'Turkey trials, gratitude notes, and long chats around the table.',
    cover: 'https://picsum.photos/seed/nov-1/900/1200',
    stats: { photos: 4, videos: 0 },
    gallery: [
      { src: 'https://picsum.photos/seed/nov-1/900/1200', caption: 'Pie baking lineup.' },
      { src: 'https://picsum.photos/seed/nov-2/900/1200', caption: 'Table setting ritual.' },
      { src: 'https://picsum.photos/seed/nov-3/900/1200', caption: 'Gratitude notes.' },
      { src: 'https://picsum.photos/seed/nov-4/900/1200', caption: 'Friendsgiving laughter.' },
    ]
  },
  {
    id: 'december',
    month: 'December',
    year: '2025',
    title: 'Lights on',
    location: 'Home',
    description: 'Tree trimming, cookie exchanges, and the coziest holiday nights.',
    cover: 'https://picsum.photos/seed/dec-1/900/1200',
    stats: { photos: 4, videos: 0 },
    gallery: [
      { src: 'https://picsum.photos/seed/dec-1/900/1200', caption: 'Ornament memories.' },
      { src: 'https://picsum.photos/seed/dec-2/900/1200', caption: 'Snowy night drive.' },
      { src: 'https://picsum.photos/seed/dec-3/900/1200', caption: 'Cookie decorating.' },
      { src: 'https://picsum.photos/seed/dec-4/900/1200', caption: 'Fireplace glow.' },
    ]
  },
];

function getHoverTransform(index: number, hoveredIndex: number | null) {
  if (hoveredIndex === null) {
    return { y: 0, scale: 1, zIndex: index };
  }
  if (index === hoveredIndex) {
    return { y: -6, scale: 1.02, zIndex: 50 };
  }
  return { y: 0, scale: 1, zIndex: index };
}

const GalleryCarousel = ({
  images,
  variant = 'modal',
}: {
  images: Array<{src: string; caption: string}>;
  variant?: 'modal' | 'default';
}) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setDirection(1);
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setDirection(-1);
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number } }) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      next();
    } else if (info.offset.x > threshold) {
      prev();
    }
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -100 : 100, opacity: 0 }),
  };

  const frameClassName =
    variant === 'modal'
      ? 'relative w-full h-[46vh] min-h-[320px] max-h-[520px] overflow-hidden group bg-[var(--image-bg)] rounded-xl'
      : 'relative w-full aspect-[4/5] overflow-hidden group bg-[var(--image-bg)]';

  return (
    <div className="w-full">
      <div className={frameClassName}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.img
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.2 }}
            src={images[index].src}
            alt={images[index].caption}
            className="w-full h-full object-contain cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
          />
        </AnimatePresence>

        {images.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between px-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <button
              onClick={prev}
              aria-label="Previous image"
              className="p-2 text-white/60 hover:text-white transition-colors pointer-events-auto"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              aria-label="Next image"
              className="p-2 text-white/60 hover:text-white transition-colors pointer-events-auto"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline justify-between font-sans" aria-live="polite">
        <span className="text-[13px] text-[var(--text-muted)]">{images[index].caption}</span>
        <span className="text-[13px] text-[var(--text-muted)] opacity-60">{index + 1}/{images.length}</span>
      </div>
    </div>
  );
};

export default function YearInReview() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const selectedMonth = YEAR_DATA.find((m) => m.id === selectedId);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({
    startX: 0,
    scrollLeft: 0,
    lastX: 0,
    lastTime: 0,
    velocity: 0,
    moved: false,
    suppressClickUntil: 0,
    rafId: 0 as number | 0,
  });

  const closeModal = useCallback(() => setSelectedId(null), []);

  const stopMomentum = useCallback(() => {
    if (dragState.current.rafId) {
      cancelAnimationFrame(dragState.current.rafId);
      dragState.current.rafId = 0;
    }
  }, []);

  const startMomentum = useCallback(() => {
    stopMomentum();
    const step = () => {
      const state = dragState.current;
      if (!scrollRef.current) return;
      state.velocity *= 0.92;
      if (Math.abs(state.velocity) < 0.1) {
        state.velocity = 0;
        state.rafId = 0;
        return;
      }
      scrollRef.current.scrollLeft -= state.velocity;
      state.rafId = requestAnimationFrame(step);
    };
    dragState.current.rafId = requestAnimationFrame(step);
  }, [stopMomentum]);

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || !scrollRef.current) return;
    stopMomentum();
    dragState.current.startX = e.clientX;
    dragState.current.scrollLeft = scrollRef.current.scrollLeft;
    dragState.current.lastX = e.clientX;
    dragState.current.lastTime = performance.now();
    dragState.current.velocity = 0;
    dragState.current.moved = false;
    setIsDragging(true);
  }, [stopMomentum]);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || e.pointerType !== 'mouse' || !scrollRef.current) return;
    const deltaX = e.clientX - dragState.current.startX;
    if (Math.abs(deltaX) > 3) {
      dragState.current.moved = true;
    }
    scrollRef.current.scrollLeft = dragState.current.scrollLeft - deltaX;

    const now = performance.now();
    const frameDelta = now - dragState.current.lastTime;
    if (frameDelta > 0) {
      const movement = e.clientX - dragState.current.lastX;
      dragState.current.velocity = (movement / frameDelta) * 16;
    }
    dragState.current.lastX = e.clientX;
    dragState.current.lastTime = now;
  }, [isDragging]);

  const handlePointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || !scrollRef.current) return;
    setIsDragging(false);
    if (Math.abs(dragState.current.velocity) > 0.5) {
      startMomentum();
    }
    if (dragState.current.moved) {
      dragState.current.suppressClickUntil = performance.now() + 250;
    }
    dragState.current.moved = false;
  }, [startMomentum]);

  useEffect(() => () => stopMomentum(), [stopMomentum]);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = Math.max(1, scrollWidth - clientWidth);
    setScrollProgress(Math.min(1, Math.max(0, scrollLeft / maxScroll)));
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = 'hidden';
      closeButtonRef.current?.focus();
      const handleEscape = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal(); };
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedId, closeModal]);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">

      <div className="fixed top-6 right-6 z-40">
        <ThemeToggle />
      </div>

      <header className="relative pt-20 pb-14">
        <div className="mx-auto max-w-3xl px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)] font-sans">
                Washuta Family
              </span>
              <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)] font-sans">
                2025
              </span>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-[16px] md:text-[18px] leading-[1.5] tracking-[-0.02em] text-[var(--text-secondary)] mt-6 max-w-md"
          >
            A collection of our favorite frames from the year — snowy mornings, summer road trips, and the quiet moments in between.
          </motion.p>
        </div>
      </header>

      <main className="pb-20">
        <div className="mx-auto max-w-3xl px-6 md:px-12">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="inline-block text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)] font-sans mb-4"
          >
            Month by month
          </motion.span>
        </div>
        <div className="overflow-visible">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className={`flex overflow-x-auto overflow-y-visible scroll-smooth hide-scrollbar gap-4 md:gap-3 py-4 md:py-5 content-gutter-left content-gutter-right ${isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'}`}
            style={{ touchAction: 'pan-x' }}
            role="region"
            aria-label="Monthly photo cards"
          >
            {YEAR_DATA.map((month, index) => {
              const transform = getHoverTransform(index, hoveredIndex);
              return (
                <motion.div
                  key={month.id}
                  className="flex-shrink-0 w-[75vw] md:w-[200px] lg:w-[220px]"
                  animate={{ y: transform.y, scale: transform.scale }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  style={{ zIndex: transform.zIndex }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => {
                    if (performance.now() < dragState.current.suppressClickUntil) return;
                    setSelectedId(month.id);
                  }}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedId(month.id); } }}
                  role="button"
                  tabIndex={0}
                  aria-label={`${month.month} - ${month.title}`}
                >
                  <div
                    className="bg-[var(--bg-secondary)] rounded-xl overflow-hidden"
                    style={{ boxShadow: 'var(--shadow-card)' }}
                  >
                    <div className="h-[44px] flex items-center justify-between px-4 select-none">
                      <span className="text-[14px] text-[var(--text-primary)] truncate">{month.title}</span>
                      <span className="text-[13px] text-[var(--text-muted)] font-sans flex-shrink-0 ml-3">{month.month}</span>
                    </div>
                    <div className="px-3 pb-3">
                      <div className="aspect-[4/5] overflow-hidden rounded-lg">
                        <img
                          src={month.cover}
                          alt={month.title}
                          className={`w-full h-full object-cover transition-all duration-300 ${
                            hoveredIndex === index ? '' : 'grayscale'
                          }`}
                          draggable={false}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
        <div className="mx-auto max-w-3xl px-6 md:px-12">
          <div className="mt-3 flex items-center justify-between text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)] font-sans">
            <span>Scroll to explore</span>
            <span className="opacity-60">{Math.round(scrollProgress * 100)}%</span>
          </div>
          <div className="mt-2 h-[2px] w-full bg-[var(--border-subtle)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--text-muted)] transition-[width] duration-150"
              style={{ width: `${Math.max(8, scrollProgress * 100)}%` }}
              aria-hidden="true"
            />
          </div>
        </div>
      </main>

      <AnimatePresence>
        {selectedId && selectedMonth && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-8">

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              onClick={closeModal}
              className="absolute inset-0 bg-[var(--overlay-backdrop)] backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label={`${selectedMonth.title} - ${selectedMonth.month} ${selectedMonth.year}`}
              style={{ boxShadow: 'var(--shadow-modal)' }}
              className="relative w-full max-w-3xl max-h-[88vh] md:max-h-[90vh] bg-[var(--bg-elevated)] rounded-2xl border border-[var(--border-subtle)] overflow-hidden flex flex-col"
            >
              {/* Fixed header */}
              <div className="flex items-center justify-between px-6 md:px-8 pt-5 pb-3 border-b border-[var(--border-subtle)]">
                <div className="flex items-baseline gap-3 min-w-0">
                  <span className="text-[14px] text-[var(--text-primary)] truncate">{selectedMonth.title}</span>
                  <span className="text-[13px] text-[var(--text-muted)] font-sans whitespace-nowrap">{selectedMonth.month} {selectedMonth.year}</span>
                </div>
                <button
                  ref={closeButtonRef}
                  onClick={(e) => { e.stopPropagation(); closeModal(); }}
                  aria-label="Close"
                  className="ml-4 flex-shrink-0 p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--image-bg)] transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto px-6 md:px-8 py-5">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.25, ease: 'easeOut' }}
                  className="text-[13px] text-[var(--text-secondary)] leading-relaxed mb-5"
                >
                  {selectedMonth.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.3, ease: 'easeOut' }}
                >
                  <GalleryCarousel images={selectedMonth.gallery} variant="modal" />
                </motion.div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
