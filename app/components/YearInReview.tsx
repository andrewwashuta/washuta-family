"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { IconExpandSimple } from '@central-icons-react/round-outlined-radius-3-stroke-2/IconExpandSimple';
import { IconChevronLeftSmall } from '@central-icons-react/round-outlined-radius-3-stroke-2/IconChevronLeftSmall';
import { IconChevronRightSmall } from '@central-icons-react/round-outlined-radius-3-stroke-2/IconChevronRightSmall';
import { IconCrossMedium } from '@central-icons-react/round-outlined-radius-3-stroke-2/IconCrossMedium';
import { useTheme } from 'next-themes';
import { ThemeToggle } from './ThemeToggle';
import { YEAR_DATA as ALL_YEAR_DATA } from '../../data/months';

const YEAR_DATA = ALL_YEAR_DATA.filter((m) => m.published !== false);
import { SunlightOverlay } from './SunlightOverlay';

const SHADOW_CARD_LIGHT = '0 1px 2px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.02)';
const SHADOW_CARD_DARK = '0 1px 2px rgba(0,0,0,0.2), 0 1px 3px rgba(0,0,0,0.15)';
const SHADOW_CARD_HOVER_LIGHT = '0 4px 12px rgba(0,0,0,0.06), 0 2px 4px rgba(0,0,0,0.04)';
const SHADOW_CARD_HOVER_DARK = '0 4px 12px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2)';
const SHADOW_MODAL_LIGHT = '0 8px 30px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)';
const SHADOW_MODAL_DARK = '0 8px 30px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.25)';

/** Shared icon button sizing — X, arrows, expand */
const ICON_BUTTON_PADDING = 'p-1.5';
const ICON_BUTTON_ROUNDED = 'rounded-lg';
const ICON_BUTTON_SIZE = 18;


function getHoverTransform(index: number, hoveredIndex: number | null, shadowCard: string, shadowCardHover: string) {
  if (hoveredIndex === null) {
    return { y: 0, scale: 1, zIndex: index, boxShadow: shadowCard };
  }
  if (index === hoveredIndex) {
    return { y: -6, scale: 1.02, zIndex: 50, boxShadow: shadowCardHover };
  }
  return { y: 0, scale: 1, zIndex: index, boxShadow: shadowCard };
}

type GalleryCarouselProps = {
  images: Array<{src: string; caption: string; blurDataURL: string}>;
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
      ? 'relative w-full h-[42vh] min-h-[280px] max-h-[460px] overflow-hidden bg-[var(--image-bg)] rounded-xl group'
      : 'relative w-full aspect-[4/5] overflow-hidden bg-[var(--image-bg)]';

  return (
    <div className="w-full">
      <div className={frameClassName}>
        {/* Preload all images so swipes don't flash the blur placeholder */}
        <div aria-hidden className="absolute inset-0 pointer-events-none opacity-0">
          {images.map((img, i) => (
            i !== index && (
              <Image
                key={img.src}
                src={img.src}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 720px"
                className="object-contain"
              />
            )
          ))}
        </div>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.2 }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
          >
            <Image
              src={images[index].src}
              alt={images[index].caption}
              fill
              sizes="(max-width: 768px) 100vw, 720px"
              className="object-contain"
              priority={index === 0}
              placeholder="blur"
              blurDataURL={images[index].blurDataURL}
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>
        {variant === 'modal' && onExpandImage && (
          <button
            onClick={(e) => { e.stopPropagation(); onExpandImage(images[index].src); }}
            aria-label="Expand image"
            className={`absolute top-2 right-2 ${ICON_BUTTON_PADDING} ${ICON_BUTTON_ROUNDED} bg-black/30 backdrop-blur-sm text-white/80 hover:text-white hover:bg-black/50 transition-all opacity-0 group-hover:opacity-100`}
          >
            <IconExpandSimple size={ICON_BUTTON_SIZE} />
          </button>
        )}
      </div>

      <div className={`mt-3 flex items-center gap-2 font-sans text-left ${variant === 'modal' ? 'pl-2' : ''}`} aria-live="polite">
        <span className="flex-1 min-w-0 text-[13px] text-[var(--text-muted)] truncate text-left">{images[index].caption}</span>
        <div className="flex-shrink-0 flex items-center gap-4">
          <span className="text-[13px] text-[var(--text-muted)] opacity-60">{index + 1}/{images.length}</span>
          {images.length > 1 && (
            <div className="flex items-center gap-1">
              <button
                onClick={prev}
                aria-label="Previous image"
                className={`${ICON_BUTTON_PADDING} ${ICON_BUTTON_ROUNDED} text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--image-bg)] transition-colors`}
              >
                <IconChevronLeftSmall size={ICON_BUTTON_SIZE} />
              </button>
              <button
                onClick={next}
                aria-label="Next image"
                className={`${ICON_BUTTON_PADDING} ${ICON_BUTTON_ROUNDED} text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--image-bg)] transition-colors`}
              >
                <IconChevronRightSmall size={ICON_BUTTON_SIZE} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export default function YearInReview() {
  const { resolvedTheme, theme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const shadowCard = isDark ? SHADOW_CARD_DARK : SHADOW_CARD_LIGHT;
  const shadowCardHover = isDark ? SHADOW_CARD_HOVER_DARK : SHADOW_CARD_HOVER_LIGHT;
  const shadowModal = isDark ? SHADOW_MODAL_DARK : SHADOW_MODAL_LIGHT;
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedImageUrl, setExpandedImageUrl] = useState<string | null>(null);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  /** Mobile: per-card color intensity 0–1 (scroll-based, smooth falloff so center is 1 and neighbors get a touch) */
  const [cardIntensities, setCardIntensities] = useState<number[]>(() => YEAR_DATA.map(() => 0));
  const selectedMonth = YEAR_DATA.find((m) => m.id === selectedId);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);
  const wasDragged = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const [hasEntered, setHasEntered] = useState(false);
  useEffect(() => { setHasEntered(true); }, []);

  // Freeze shadow values when modal opens so theme switch during layout animation doesn't cause a glitch
  const frozenShadowsRef = useRef({ card: shadowCard, cardHover: shadowCardHover, modal: shadowModal });
  if (!selectedId) {
    frozenShadowsRef.current = { card: shadowCard, cardHover: shadowCardHover, modal: shadowModal };
  }
  const shadows = selectedId ? frozenShadowsRef.current : { card: shadowCard, cardHover: shadowCardHover, modal: shadowModal };

  const closeModal = useCallback(() => {
    setExpandedImageUrl(null);
    setDescriptionExpanded(false);
    setSelectedId(null);
  }, []);

  const syncHoverToCursor = useCallback(() => {
    if (isMobile || selectedId) return;
    const { x, y } = lastMouseRef.current;
    if (x === 0 && y === 0) return;
    const el = document.elementFromPoint(x, y);
    let node: HTMLElement | null = el as HTMLElement | null;
    while (node) {
      const idx = node.getAttribute?.('data-card-index');
      if (idx != null) {
        const parsed = parseInt(idx, 10);
        if (!isNaN(parsed)) {
          setHoveredIndex((prev) => (prev === parsed ? prev : parsed));
        }
        return;
      }
      node = node.parentElement;
    }
    setHoveredIndex((prev) => (prev === null ? prev : null));
  }, [isMobile, selectedId]);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = Math.max(1, scrollWidth - clientWidth);
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft < maxScroll - 5);
    syncHoverToCursor();
  }, [syncHoverToCursor]);

  const scrollByCard = useCallback((direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (!container) return;
    const cards = container.querySelectorAll('[data-card-index]');
    if (cards.length === 0) return;
    const first = cards[0] as HTMLElement;
    const second = cards[1] as HTMLElement;
    const cardWidth = first.offsetWidth;
    const gap = second ? second.offsetLeft - first.offsetLeft - first.offsetWidth : 12;
    const step = cardWidth + gap;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    const maxScroll = Math.max(0, scrollWidth - clientWidth);
    const currentIndex = Math.round(scrollLeft / step);
    const targetIndex = direction === 'right'
      ? Math.min(currentIndex + 1, cards.length - 1)
      : Math.max(currentIndex - 1, 0);
    const targetScroll = Math.min(targetIndex * step, maxScroll);
    container.scrollTo({ left: targetScroll, behavior: 'smooth' });
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
    const handleWindowScroll = () => {
      setHasScrolled((prev) => {
        const next = window.scrollY > 10;
        return prev === next ? prev : next;
      });
    };
    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    handleWindowScroll();
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, []);

  // Mobile: per-card color intensity (0–1) from distance to viewport center, smooth falloff so center is full color and neighbors get a touch
  useEffect(() => {
    if (!isMobile) {
      setCardIntensities(YEAR_DATA.map(() => 0));
      return;
    }
    const computeIntensities = () => {
      const container = scrollRef.current;
      if (!container) return;
      const cards = container.querySelectorAll('[data-card-index]');
      if (cards.length === 0) return;
      const viewportCenterX = window.innerWidth / 2;
      const intensities: number[] = [];
      cards.forEach((el) => {
        const rect = (el as HTMLElement).getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const distance = Math.abs(viewportCenterX - cardCenterX);
        const cardWidth = rect.width;
        // Full color when well centered; smooth falloff so neighbors get ~0.2–0.35 at their near edge
        const peakWidth = cardWidth * 0.45;
        const falloffWidth = cardWidth * 0.9;
        let intensity: number;
        if (distance <= peakWidth) {
          intensity = 1;
        } else if (distance <= peakWidth + falloffWidth) {
          intensity = Math.max(0, 1 - (distance - peakWidth) / falloffWidth * 0.85);
        } else {
          intensity = 0;
        }
        intensities.push(intensity);
      });
      setCardIntensities((prev) => {
        const changed = intensities.some((v, i) => Math.abs(v - (prev[i] ?? 0)) > 0.01);
        return changed ? intensities : prev;
      });
    };
    const handleScroll = () => requestAnimationFrame(computeIntensities);
    const container = scrollRef.current;
    if (!container) return;
    container.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', computeIntensities);
    computeIntensities();
    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', computeIntensities);
    };
  }, [isMobile]);

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

      <SunlightOverlay active={theme === 'daylight'} />

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
                Year in Review
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
            className="text-[15px] md:text-[16px] leading-[1.5] tracking-normal text-[var(--text-secondary)] mt-6 max-w-md"
            style={{ fontFamily: 'var(--font-mduixl), Georgia, serif', fontFeatureSettings: '"ss01"' }}
          >
            Hi! It&apos;s us — late (as usual, ugh!), but still wanting to share about ANOTHER wild year, however, thankfully one that ended on the most beautiful note.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-[15px] md:text-[16px] leading-[1.5] tracking-normal text-[var(--text-secondary)] mt-4 max-w-md"
            style={{ fontFamily: 'var(--font-mduixl), Georgia, serif', fontFeatureSettings: '"ss01"' }}
          >
            We welcomed Raya Luz Washuta on December 30th and she has been such a light and the sweetest addition to our family. We&apos;ve been soaking up the time all together, and frankly also trying to catch up on life since her arrival!
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-[15px] md:text-[16px] leading-[1.5] tracking-normal text-[var(--text-secondary)] mt-4 max-w-md"
            style={{ fontFamily: 'var(--font-mduixl), Georgia, serif', fontFeatureSettings: '"ss01"' }}
          >
            Please enjoy photos and memories of our 2025 — there were tears, laughs, and a lot of &ldquo;you&apos;ve got to be kidding me?!&rdquo; ;)
          </motion.p>
        </div>
      </header>

      <main className="pb-8">
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
            style={{ touchAction: 'pan-x pan-y' }}
            role="region"
            aria-label="Monthly photo cards"
          >
            {YEAR_DATA.map((month, index) => {
              const transform = getHoverTransform(index, hoveredIndex, shadows.card, shadows.cardHover);
              return (
                <motion.div
                  key={month.id}
                  layout
                  layoutId={`card-${month.id}`}
                  data-card-index={index}
                  className="flex-shrink-0 w-[75vw] md:w-[232px] lg:w-[260px] rounded-xl"
                  {...(!hasEntered && { initial: { opacity: 0, y: 20 } })}
                  animate={{ opacity: 1, y: transform.y, scale: transform.scale, boxShadow: transform.boxShadow }}
                  transition={!hasEntered
                    ? { duration: 0.5, delay: 0.6 + index * 0.06, ease: [0.25, 0.1, 0.25, 1] }
                    : { type: 'spring', stiffness: 400, damping: 30 }
                  }
                  style={{ zIndex: transform.zIndex, ...(selectedId === month.id && { opacity: 0 }) }}
                  onMouseEnter={isMobile ? undefined : () => setHoveredIndex(index)}
                  onMouseMove={isMobile ? undefined : () => { if (hoveredIndex !== index && !selectedId) setHoveredIndex(index); }}
                  onMouseLeave={isMobile ? undefined : () => setHoveredIndex(null)}
                  onClick={() => { if (!wasDragged.current) setSelectedId(month.id); }}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedId(month.id); } }}
                  role="button"
                  tabIndex={0}
                  aria-label={month.month}
                >
                  <div
                    className="card-surface bg-[var(--bg-secondary)] rounded-xl overflow-hidden"
                  >
                    <div className="h-[44px] flex items-center justify-between px-4 select-none">
                      <motion.span layoutId={`month-label-${month.id}`} className="text-[14px] font-medium text-[var(--text-primary)]">{month.month}</motion.span>
                      <span className="text-[12px] text-[var(--text-muted)] font-sans">({month.stats.photos})</span>
                    </div>
                    <div className="px-3 pb-3">
                      <div className="aspect-[4/5] overflow-hidden rounded-lg relative">
                        <Image
                          src={month.cover}
                          alt={month.month}
                          fill
                          sizes="(max-width: 768px) 75vw, 260px"
                          className="object-cover"
                          priority={index < 2}
                          placeholder="blur"
                          blurDataURL={month.coverBlurDataURL}
                          style={
                            isMobile
                              ? {
                                  filter: `grayscale(${1 - (cardIntensities[index] ?? 0)}) brightness(${0.88 + 0.12 * (cardIntensities[index] ?? 0)})`,
                                  transition: 'filter 0.2s ease-out',
                                  willChange: 'filter',
                                }
                              : {
                                  filter: hoveredIndex === index ? 'none' : 'grayscale(1)',
                                  transition: 'filter 0.3s ease-out',
                                }
                          }
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mx-auto max-w-3xl px-6 md:px-12"
        >
          <div className="mt-3 flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)] font-sans">
              {isMobile ? 'Swipe to explore' : 'Scroll to explore'}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => scrollByCard('left')}
                disabled={!canScrollLeft}
                aria-label="Scroll left"
                className={`${ICON_BUTTON_PADDING} ${ICON_BUTTON_ROUNDED} text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--image-bg)] transition-colors disabled:opacity-30 disabled:pointer-events-none`}
              >
                <IconChevronLeftSmall size={ICON_BUTTON_SIZE} />
              </button>
              <button
                onClick={() => scrollByCard('right')}
                disabled={!canScrollRight}
                aria-label="Scroll right"
                className={`${ICON_BUTTON_PADDING} ${ICON_BUTTON_ROUNDED} text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--image-bg)] transition-colors disabled:opacity-30 disabled:pointer-events-none`}
              >
                <IconChevronRightSmall size={ICON_BUTTON_SIZE} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Footer — main view */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="mx-auto max-w-3xl px-6 md:px-12 pt-16 pb-8"
        >
          <div className="flex flex-col gap-0.5">
            <span
              className="text-[15px] md:text-[16px] text-[var(--text-muted)]"
              style={{ fontFamily: 'var(--font-mduixl), Georgia, serif' }}
            >
              With love from New Mexico,
            </span>
            <span
              className="text-[22px] leading-none text-[var(--text-secondary)]"
              style={{ fontFamily: 'var(--font-caveat), "Segoe Script", cursive', letterSpacing: '-0.02em' }}
            >
              Andrew, Seneca, Thor &amp; Raya
            </span>
          </div>
        </motion.div>
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
              layout
              layoutId={`card-${selectedId}`}
              animate={{ boxShadow: shadows.modal }}
              transition={{ type: 'spring', stiffness: 400, damping: 35 }}
              role="dialog"
              aria-modal="true"
              aria-label={`${selectedMonth.month} ${selectedMonth.year}`}
              className="relative w-full max-w-lg md:max-w-[720px] max-h-[86vh] md:max-h-[88vh] bg-[var(--bg-elevated)] rounded-2xl border border-[var(--border-subtle)] overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between pl-4 pr-3 pt-4 pb-0 select-none md:pl-5">
                <div className="flex-1 min-w-0 pr-3">
                  <motion.span layoutId={`month-label-${selectedId}`} className="text-[14px] md:text-[15px] font-medium text-[var(--text-primary)] inline-block">{selectedMonth.month}</motion.span>
                </div>
                <button
                    ref={closeButtonRef}
                    onClick={(e) => { e.stopPropagation(); closeModal(); }}
                    aria-label="Close"
                    className={`${ICON_BUTTON_PADDING} ${ICON_BUTTON_ROUNDED} text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--image-bg)] transition-colors`}
                  >
                    <IconCrossMedium size={ICON_BUTTON_SIZE} />
                  </button>
              </div>

              {/* Scrollable content — image/gallery p-3, text p-4/5 */}
              <div className="flex-1 overflow-y-auto pb-3">
                {selectedMonth.description && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12, duration: 0.25, ease: 'easeOut' }}
                    className="mb-4 pl-4 pr-6 md:pl-5 md:pr-10"
                  >
                    <div
                      className={`transition-[max-height] duration-300 ease-out overflow-hidden ${
                        descriptionExpanded
                          ? 'max-h-[5lh] overflow-y-auto description-scroll'
                          : 'max-h-[2.75lh]'
                      }`}
                      style={!descriptionExpanded ? {
                        maskImage: 'linear-gradient(to bottom, black 0%, black 25%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0.15) 80%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 25%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0.15) 80%, transparent 100%)',
                      } : undefined}
                    >
                      <p className="text-[14px] md:text-[15px] text-[var(--text-muted)] leading-[1.6] max-w-prose">
                        {selectedMonth.description}
                      </p>
                    </div>
                    <button
                      onClick={() => setDescriptionExpanded(!descriptionExpanded)}
                      className="text-[13px] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mt-1"
                    >
                      {descriptionExpanded ? 'Read less' : 'Read more'}
                    </button>
                  </motion.div>
                )}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.3, ease: 'easeOut' }}
                  className="px-3"
                >
                  <GalleryCarousel images={selectedMonth.gallery} variant="modal" onExpandImage={(url) => setExpandedImageUrl(url)} />
                </motion.div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
