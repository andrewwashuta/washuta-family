"use client";

import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
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

function wrapIndex(index: number, length: number) {
  return ((index % length) + length) % length;
}

type GalleryCarouselProps = {
  images: Array<{src: string; caption: string; blurDataURL: string}>;
  variant?: 'modal' | 'default';
  onExpandImage?: (url: string) => void;
};

const GalleryCarousel = ({ images, variant = 'modal', onExpandImage }: GalleryCarouselProps) => {
  const N = images.length;
  const canLoop = N > 1;
  const [displayIndex, setDisplayIndex] = useState(0);
  const [trackOffset, setTrackOffset] = useState(0);
  const [animated, setAnimated] = useState(true);
  const [frameWidth, setFrameWidth] = useState(0);
  const frameRef = useRef<HTMLDivElement>(null);
  const hasMeasuredFrame = useRef(false);

  useLayoutEffect(() => {
    const update = () => {
      if (!frameRef.current) return;
      const nextWidth = frameRef.current.offsetWidth;
      if (!hasMeasuredFrame.current && nextWidth > 0) {
        hasMeasuredFrame.current = true;
        setAnimated(false);
      }
      setFrameWidth(nextWidth);
    };
    update();
    const ro = new ResizeObserver(update);
    if (frameRef.current) ro.observe(frameRef.current);
    return () => ro.disconnect();
  }, []);

  // After an instant snap back from a virtual edge, re-enable animated transitions
  // on the next frame so the snap itself stays jump-cut.
  useLayoutEffect(() => {
    if (animated) return;
    const id = requestAnimationFrame(() => setAnimated(true));
    return () => cancelAnimationFrame(id);
  }, [animated]);

  const move = useCallback((direction: -1 | 1, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!canLoop || trackOffset !== 0) return;
    setAnimated(true);
    setTrackOffset(direction);
  }, [canLoop, trackOffset]);

  const next = (e?: React.MouseEvent) => {
    move(1, e);
  };

  const prev = (e?: React.MouseEvent) => {
    move(-1, e);
  };

  const handleAnimationComplete = () => {
    if (!canLoop || trackOffset === 0) return;
    setDisplayIndex((index) => wrapIndex(index + trackOffset, N));
    setAnimated(false);
    setTrackOffset(0);
  };

  const handleDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number }; velocity: { x: number } }) => {
    if (!canLoop) return;
    const threshold = frameWidth * 0.15;
    const velocityThreshold = 300;
    if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) {
      move(1);
    } else if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
      move(-1);
    } else {
      setAnimated(true);
      setTrackOffset(0);
    }
  };

  const frameClassName =
    variant === 'modal'
      ? 'relative w-full h-[42vh] min-h-[280px] max-h-[460px] overflow-hidden bg-[var(--image-bg)] rounded-xl group'
      : 'relative w-full aspect-[4/5] overflow-hidden bg-[var(--image-bg)]';

  const visibleSlides = canLoop
    ? [-1, 0, 1].map((offset) => {
        const index = wrapIndex(displayIndex + offset, N);
        return { offset, index, image: images[index] };
      })
    : [{ offset: 0, index: displayIndex, image: images[displayIndex] }];
  const trackLen = visibleSlides.length;
  const trackX = canLoop ? -(1 + trackOffset) * frameWidth : 0;

  return (
    <div className="w-full">
      <div ref={frameRef} className={frameClassName}>
        <motion.div
          className="absolute inset-y-0 left-0 flex cursor-grab active:cursor-grabbing"
          style={{ width: frameWidth * trackLen }}
          initial={false}
          animate={{ x: trackX }}
          transition={animated ? { type: 'tween', duration: 0.35, ease: [0.22, 1, 0.36, 1] } : { duration: 0 }}
          drag={canLoop ? 'x' : false}
          dragConstraints={canLoop ? { left: -2 * frameWidth, right: 0 } : { left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={handleDragEnd}
          onAnimationComplete={handleAnimationComplete}
        >
          {visibleSlides.map(({ offset, index, image }) => {
            const isPriority = offset === 0 && index === 0;
            return (
              <div
                key={`${offset}-${image.src}`}
                className="relative flex-shrink-0 h-full"
                style={{ width: frameWidth }}
              >
                <Image
                  src={image.src}
                  alt={image.caption}
                  fill
                  sizes="(max-width: 768px) 100vw, 720px"
                  className="object-contain"
                  priority={isPriority}
                  loading={isPriority ? undefined : 'eager'}
                  placeholder="blur"
                  blurDataURL={image.blurDataURL}
                  draggable={false}
                />
              </div>
            );
          })}
        </motion.div>
        {variant === 'modal' && onExpandImage && (
          <button
            onClick={(e) => { e.stopPropagation(); onExpandImage(images[displayIndex].src); }}
            aria-label="Expand image"
            className={`absolute top-2 right-2 ${ICON_BUTTON_PADDING} ${ICON_BUTTON_ROUNDED} bg-black/30 backdrop-blur-sm text-white/80 hover:text-white hover:bg-black/50 transition-all opacity-0 group-hover:opacity-100`}
          >
            <IconExpandSimple size={ICON_BUTTON_SIZE} />
          </button>
        )}
      </div>

      <div className={`mt-3 flex items-center gap-2 font-sans text-left ${variant === 'modal' ? 'pl-2' : ''}`} aria-live="polite">
        <span className="flex-1 min-w-0 text-[13px] text-[var(--text-muted)] truncate text-left">{images[displayIndex].caption}</span>
        <div className="flex-shrink-0 flex items-center gap-4">
          <span className="text-[13px] text-[var(--text-muted)] opacity-60">{displayIndex + 1}/{images.length}</span>
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
  const selectedMonth = YEAR_DATA.find((m) => m.id === selectedId);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);
  const wasDragged = useRef(false);
  const lastDragX = useRef(0);
  const lastDragT = useRef(0);
  const dragVelocity = useRef(0);
  const momentumRaf = useRef<number | null>(null);
  const hoverSyncRaf = useRef<number | null>(null);
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const [hasEntered, setHasEntered] = useState(false);
  useEffect(() => { setHasEntered(true); }, []);

  // Freeze shadow values when modal opens so theme switch during layout animation doesn't cause a glitch
  const frozenShadowsRef = useRef({ card: shadowCard, cardHover: shadowCardHover, modal: shadowModal });
  if (!selectedId) {
    frozenShadowsRef.current = { card: shadowCard, cardHover: shadowCardHover, modal: shadowModal };
  }
  const shadows = selectedId ? frozenShadowsRef.current : { card: shadowCard, cardHover: shadowCardHover, modal: shadowModal };

  // Edge fade for the card row. Driven by the scroll state we already track, so the
  // mask only changes when an edge is reached (canScroll* flips) — the rest of the
  // time it's a fixed mask the scrolling content composites under, costing nothing
  // per frame and never fighting the momentum glide. Fades the leading edge only once
  // scrolled and the trailing edge only while there's more to reveal. The gradient is
  // uniform along Y, so card hover-lift and shadows are never clipped.
  const FADE = '44px';
  const cardRowMask = (() => {
    if (!canScrollLeft && !canScrollRight) return undefined;
    const left = canScrollLeft ? `transparent 0, #000 ${FADE}` : '#000 0';
    const right = canScrollRight ? `#000 calc(100% - ${FADE}), transparent 100%` : '#000 100%';
    return `linear-gradient(to right, ${left}, ${right})`;
  })();

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

  const cancelMomentum = useCallback(() => {
    if (momentumRaf.current != null) {
      cancelAnimationFrame(momentumRaf.current);
      momentumRaf.current = null;
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = Math.max(1, scrollWidth - clientWidth);
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft < maxScroll - 5);
    // syncHoverToCursor() does an elementFromPoint hit-test (a forced reflow).
    // Coalesce to one call per frame so momentum scrolling stays smooth.
    if (hoverSyncRaf.current == null) {
      hoverSyncRaf.current = requestAnimationFrame(() => {
        hoverSyncRaf.current = null;
        syncHoverToCursor();
      });
    }
  }, [syncHoverToCursor]);

  const scrollByCard = useCallback((direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (!container) return;
    cancelMomentum();
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
  }, [cancelMomentum]);

  // After release, glide on the flick velocity with frame-rate-independent
  // friction, clamping at the scroll bounds. Keeps the drag from stopping dead.
  const startMomentum = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    // px/ms; ignore slow releases and cap runaway flicks
    let v = Math.max(-4, Math.min(4, dragVelocity.current));
    if (Math.abs(v) < 0.02) return;
    let prevT = performance.now();
    const maxScroll = container.scrollWidth - container.clientWidth;
    const step = () => {
      const now = performance.now();
      const dt = now - prevT;
      prevT = now;
      const next = container.scrollLeft + v * dt;
      if (next <= 0 || next >= maxScroll) {
        container.scrollLeft = next <= 0 ? 0 : maxScroll;
        momentumRaf.current = null;
        return;
      }
      container.scrollLeft = next;
      v *= Math.pow(0.997, dt); // ~5% of velocity remains after ~1s
      if (Math.abs(v) < 0.02) {
        momentumRaf.current = null;
        return;
      }
      momentumRaf.current = requestAnimationFrame(step);
    };
    momentumRaf.current = requestAnimationFrame(step);
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (isMobile || e.button !== 0) return;
    cancelMomentum();
    isDragging.current = true;
    wasDragged.current = false;
    dragStartX.current = e.clientX;
    dragScrollLeft.current = scrollRef.current?.scrollLeft ?? 0;
    lastDragX.current = e.clientX;
    lastDragT.current = performance.now();
    dragVelocity.current = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    (e.currentTarget as HTMLElement).style.cursor = 'grabbing';
  }, [isMobile, cancelMomentum]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const dx = e.clientX - dragStartX.current;
    if (Math.abs(dx) > 5) wasDragged.current = true;
    scrollRef.current.scrollLeft = dragScrollLeft.current - dx;
    const now = performance.now();
    const dt = now - lastDragT.current;
    if (dt > 0) {
      // scrollLeft moves opposite the pointer; blend to smooth jitter
      const v = -(e.clientX - lastDragX.current) / dt;
      dragVelocity.current = dragVelocity.current * 0.7 + v * 0.3;
      lastDragX.current = e.clientX;
      lastDragT.current = now;
    }
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const target = e.currentTarget as HTMLElement;
    if (target.hasPointerCapture?.(e.pointerId)) target.releasePointerCapture(e.pointerId);
    target.style.cursor = '';
    // Pointer capture retargets the synthetic `click` to the container, so the
    // card's onClick never fires on desktop. Open the tapped card here instead.
    if (!wasDragged.current) {
      let node = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      while (node) {
        const idx = node.getAttribute?.('data-card-index');
        if (idx != null) {
          const index = parseInt(idx, 10);
          if (!isNaN(index)) setSelectedId(YEAR_DATA[index].id);
          break;
        }
        node = node.parentElement;
      }
    }
    startMomentum();
  }, [startMomentum]);

  useEffect(() => {
    handleScroll();
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('resize', handleScroll);
      if (hoverSyncRaf.current != null) cancelAnimationFrame(hoverSyncRaf.current);
      cancelMomentum();
    };
  }, [handleScroll, cancelMomentum]);

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

  // Mobile cover color is written directly to each image so scrolling does not
  // re-render the full card list on every frame.
  useEffect(() => {
    if (!isMobile) return;
    const container = scrollRef.current;
    if (!container) return;
    let frame: number | null = null;
    const applyIntensities = () => {
      frame = null;
      const cards = container.querySelectorAll('[data-card-index]');
      if (cards.length === 0) return;
      const viewportCenterX = window.innerWidth / 2;
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
        const img = (el as HTMLElement).querySelector('img');
        if (img) {
          img.style.filter = `grayscale(${1 - intensity}) brightness(${0.88 + 0.12 * intensity})`;
        }
      });
    };
    const handleScroll = () => {
      if (frame == null) frame = requestAnimationFrame(applyIntensities);
    };
    container.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    applyIntensities();
    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (frame != null) cancelAnimationFrame(frame);
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
            We welcomed{' '}
            <span
              style={{
                fontFamily: 'var(--font-caveat), "Segoe Script", cursive',
                color: 'var(--accent-pink)',
                fontSize: '1.35em',
                lineHeight: 1,
                letterSpacing: '-0.01em',
              }}
            >
              Raya Luz Washuta
            </span>{' '}
            on December 30th and she has been such a light and the sweetest addition to our family. We&apos;ve been soaking up the time all together, and frankly also trying to catch up on life since her arrival!
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
            onPointerCancel={handlePointerUp}
            className="flex overflow-x-auto overflow-y-visible hide-scrollbar gap-4 md:gap-3 py-4 md:py-5 content-gutter-left content-gutter-right md:cursor-grab"
            style={{ touchAction: 'pan-x pan-y', maskImage: cardRowMask, WebkitMaskImage: cardRowMask }}
            role="region"
            aria-label="Monthly photo cards"
          >
            {YEAR_DATA.map((month, index) => {
              const transform = getHoverTransform(index, hoveredIndex, shadows.card, shadows.cardHover);
              return (
                <motion.div
                  key={month.id}
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
                          className="object-cover cover-img"
                          priority={index < 2}
                          placeholder="blur"
                          blurDataURL={month.coverBlurDataURL}
                          style={
                            isMobile
                              ? undefined
                              : {
                                  filter: hoveredIndex === index ? 'none' : 'grayscale(1)',
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
                      className={`scroll-mask-y transition-[max-height] duration-300 ease-out overflow-y-auto description-scroll ${
                        descriptionExpanded ? 'max-h-[5lh]' : 'max-h-[2.75lh]'
                      }`}
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
                  <GalleryCarousel
                    key={selectedMonth.id}
                    images={selectedMonth.gallery}
                    variant="modal"
                    onExpandImage={(url) => setExpandedImageUrl(url)}
                  />
                </motion.div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
