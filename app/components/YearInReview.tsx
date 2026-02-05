"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { useTheme } from 'next-themes';
import { ThemeToggle } from './ThemeToggle';

const SHADOW_CARD_LIGHT = '0 1px 2px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.02)';
const SHADOW_CARD_DARK = '0 1px 2px rgba(0,0,0,0.2), 0 1px 3px rgba(0,0,0,0.15)';
const SHADOW_MODAL_LIGHT = '0 8px 30px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)';
const SHADOW_MODAL_DARK = '0 8px 30px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.25)';

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

type GalleryCarouselProps = {
  images: Array<{src: string; caption: string}>;
  variant?: 'modal' | 'default';
  onExpandImage?: (url: string) => void;
};

const GalleryCarousel = ({ images, variant = 'modal', onExpandImage }: GalleryCarouselProps) => {
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
      ? 'relative w-full h-[42vh] min-h-[280px] max-h-[460px] overflow-hidden bg-[var(--image-bg)] rounded-xl'
      : 'relative w-full aspect-[4/5] overflow-hidden bg-[var(--image-bg)]';

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
        {variant === 'modal' && onExpandImage && (
          <button
            onClick={(e) => { e.stopPropagation(); onExpandImage(images[index].src); }}
            aria-label="Expand image"
            className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/30 backdrop-blur-sm text-white/80 hover:text-white hover:bg-black/50 transition-all"
          >
            <Maximize2 size={18} />
          </button>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between gap-2 font-sans" aria-live="polite">
        {images.length > 1 ? (
          <>
            <button
              onClick={prev}
              aria-label="Previous image"
              className="flex-shrink-0 p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--image-bg)] transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex-1 min-w-0 flex items-baseline justify-center gap-2">
              <span className="text-[13px] text-[var(--text-muted)] truncate">{images[index].caption}</span>
              <span className="flex-shrink-0 text-[13px] text-[var(--text-muted)] opacity-60">{index + 1}/{images.length}</span>
            </div>
            <button
              onClick={next}
              aria-label="Next image"
              className="flex-shrink-0 p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--image-bg)] transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </>
        ) : (
          <>
            <span className="flex-1 min-w-0 text-[13px] text-[var(--text-muted)] truncate">{images[index].caption}</span>
            <span className="flex-shrink-0 text-[13px] text-[var(--text-muted)] opacity-60">1/1</span>
          </>
        )}
      </div>
    </div>
  );
};


export default function YearInReview() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const shadowCard = isDark ? SHADOW_CARD_DARK : SHADOW_CARD_LIGHT;
  const shadowModal = isDark ? SHADOW_MODAL_DARK : SHADOW_MODAL_LIGHT;
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedImageUrl, setExpandedImageUrl] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const selectedMonth = YEAR_DATA.find((m) => m.id === selectedId);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);
  const wasDragged = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });

  const closeModal = useCallback(() => {
    setExpandedImageUrl(null);
    setSelectedId(null);
  }, []);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = Math.max(1, scrollWidth - clientWidth);
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft < maxScroll - 5);
  }, []);

  const scrollByCard = useCallback((direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const firstCard = scrollRef.current.querySelector(':scope > div') as HTMLElement | null;
    const cardWidth = firstCard?.clientWidth ?? 220;
    const gap = 12;
    const scrollAmount = (cardWidth + gap) * (direction === 'right' ? 1 : -1);
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (isMobile) return;
    isDragging.current = true;
    wasDragged.current = false;
    dragStartX.current = e.clientX;
    dragScrollLeft.current = scrollRef.current?.scrollLeft ?? 0;
    (e.currentTarget as HTMLElement).style.cursor = 'grabbing';
  }, [isMobile]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const dx = e.clientX - dragStartX.current;
    if (Math.abs(dx) > 5) wasDragged.current = true;
    scrollRef.current.scrollLeft = dragScrollLeft.current - dx;
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    isDragging.current = false;
    (e.currentTarget as HTMLElement).style.cursor = '';
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)');
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const handleWindowScroll = () => setHasScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    handleWindowScroll();
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      lastMouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const restoreHoverAfterModalClose = useCallback(() => {
    const { x, y } = lastMouseRef.current;
    const el = document.elementFromPoint(x, y);
    if (!el) return;
    let node: HTMLElement | null = el as HTMLElement;
    while (node) {
      const idx = node.getAttribute?.('data-card-index');
      if (idx != null) {
        const index = parseInt(idx, 10);
        if (!isNaN(index)) setHoveredIndex(index);
        break;
      }
      node = node.parentElement;
    }
  }, []);

  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = 'hidden';
      closeButtonRef.current?.focus();
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          if (expandedImageUrl) setExpandedImageUrl(null);
          else closeModal();
        }
      };
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedId, closeModal, expandedImageUrl]);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">

      <div
        className="fixed top-0 left-0 right-0 z-30 h-16 pointer-events-none transition-opacity duration-300"
        style={{ opacity: hasScrolled ? 1 : 0 }}
      >
        <div
          className="absolute inset-0 backdrop-blur-sm"
          style={{
            maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, var(--bg-primary) 0%, transparent 100%)' }}
        />
      </div>

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
            className="flex overflow-x-auto overflow-y-visible scroll-smooth hide-scrollbar gap-4 md:gap-3 py-4 md:py-5 content-gutter-left content-gutter-right md:cursor-grab"
            style={{ touchAction: 'pan-x' }}
            role="region"
            aria-label="Monthly photo cards"
          >
            {YEAR_DATA.map((month, index) => {
              const transform = getHoverTransform(index, hoveredIndex);
              return (
                <motion.div
                  key={month.id}
                  layoutId={`card-${month.id}`}
                  data-card-index={index}
                  className="flex-shrink-0 w-[75vw] md:w-[232px] lg:w-[260px] rounded-xl"
                  animate={{ y: transform.y, scale: transform.scale, boxShadow: shadowCard }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  style={{ zIndex: transform.zIndex, opacity: selectedId === month.id ? 0 : 1 }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseMove={() => { if (hoveredIndex !== index && !selectedId) setHoveredIndex(index); }}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => { if (!wasDragged.current) setSelectedId(month.id); }}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedId(month.id); } }}
                  role="button"
                  tabIndex={0}
                  aria-label={`${month.month} - ${month.title}`}
                >
                  <div
                    className="bg-[var(--bg-secondary)] rounded-xl overflow-hidden"
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
          <div className="mt-3 flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)] font-sans">
              {isMobile ? 'Swipe to explore' : 'Scroll to explore'}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => scrollByCard('left')}
                disabled={!canScrollLeft}
                aria-label="Scroll left"
                className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--image-bg)] transition-colors disabled:opacity-30 disabled:pointer-events-none"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => scrollByCard('right')}
                disabled={!canScrollRight}
                aria-label="Scroll right"
                className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--image-bg)] transition-colors disabled:opacity-30 disabled:pointer-events-none"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Fullscreen expanded image overlay */}
      <AnimatePresence>
        {expandedImageUrl && (
          <motion.div
            key="expanded-image"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/95"
            onClick={() => setExpandedImageUrl(null)}
            role="button"
            tabIndex={0}
            aria-label="Close expanded image"
            onKeyDown={(e) => { if (e.key === 'Escape') setExpandedImageUrl(null); }}
          >
            <img
              src={expandedImageUrl}
              alt="Expanded view"
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence onExitComplete={restoreHoverAfterModalClose}>
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
              layoutId={`card-${selectedId}`}
              animate={{ boxShadow: shadowModal }}
              transition={{ type: 'spring', stiffness: 400, damping: 35 }}
              role="dialog"
              aria-modal="true"
              aria-label={`${selectedMonth.title} - ${selectedMonth.month} ${selectedMonth.year}`}
              className="relative w-full max-w-lg md:max-w-[720px] max-h-[86vh] md:max-h-[88vh] bg-[var(--bg-elevated)] rounded-2xl border border-[var(--border-subtle)] overflow-hidden flex flex-col"
            >
              {/* Header — title (serif), month badge (sans), close */}
              <div className="flex items-center justify-between px-5 md:px-6 h-[44px] select-none">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="text-[14px] text-[var(--text-primary)] truncate">{selectedMonth.title}</span>
                  <span className="flex-shrink-0 px-2.5 py-1 rounded-full text-[11px] font-sans text-[var(--text-muted)] bg-[var(--image-bg)] border border-[var(--border-subtle)]">{selectedMonth.month}</span>
                </div>
                <button
                  ref={closeButtonRef}
                  onClick={(e) => { e.stopPropagation(); closeModal(); }}
                  aria-label="Close"
                  className="ml-3 flex-shrink-0 p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--image-bg)] transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto px-5 md:px-6 pb-5">
                {selectedMonth.description && (
                  <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed mb-4">
                    {selectedMonth.description}
                  </p>
                )}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.3, ease: 'easeOut' }}
                >
                  <GalleryCarousel images={selectedMonth.gallery} variant="modal" onExpandImage={(url) => setExpandedImageUrl(url)} />
                </motion.div>
              </div>

              {/* Footer */}
              <div className="flex-shrink-0 px-5 md:px-6 py-4 border-t border-[var(--border-subtle)]">
                <span className="text-[11px] font-sans text-[var(--text-muted)]">Made with love in New Mexico</span>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
