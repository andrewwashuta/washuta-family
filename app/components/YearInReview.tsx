"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

// --- Family Photo Data ---
const YEAR_DATA = [
  {
    id: 'january',
    month: 'January',
    year: '2024',
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
    year: '2024',
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
    year: '2024',
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
    year: '2024',
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
    year: '2024',
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
    year: '2024',
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
    year: '2024',
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
    year: '2024',
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
    year: '2024',
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
    year: '2024',
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
    year: '2024',
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
    year: '2024',
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

// --- Sub-Component: Carousel ---
const GalleryCarousel = ({ images }: { images: Array<{src: string; caption: string}> }) => {
  const [index, setIndex] = useState(0);

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full aspect-[4/3] overflow-hidden group">
      <AnimatePresence mode='wait'>
        <motion.img
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          src={images[index].src}
          alt={images[index].caption}
          className="w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Navigation */}
      {images.length > 1 && (
        <div className="absolute inset-0 flex items-center justify-between px-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={prev}
            className="p-1.5 text-white/60 hover:text-white transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="p-1.5 text-white/60 hover:text-white transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}

      {/* Caption + index */}
      <div className="mt-3 flex items-baseline justify-between">
        <span className="text-xs text-[var(--text-muted)]">{images[index].caption}</span>
        <span className="text-xs text-[var(--text-muted)] opacity-60">{index + 1}/{images.length}</span>
      </div>
    </div>
  );
};

// --- Main Application ---
export default function YearInReview() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedMonth = YEAR_DATA.find((m) => m.id === selectedId);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedId]);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">

      {/* Theme Toggle */}
      <div className="fixed top-6 right-6 z-40">
        <ThemeToggle />
      </div>

      {/* --- Header --- */}
      <div className="relative pt-16 pb-10 px-6 md:px-12 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex items-baseline justify-between mb-8">
            <h1 className="text-2xl md:text-3xl text-[var(--text-primary)]">
              Washuta Family
            </h1>
            <span className="text-sm text-[var(--text-muted)]">2024</span>
          </div>
          <p className="text-base md:text-lg text-[var(--text-secondary)] max-w-lg leading-relaxed">
            A visual collection of our year — from snowy mornings to summer adventures, the moments we'll remember.
          </p>
        </motion.div>
      </div>

      {/* --- Grid --- */}
      <div className="px-6 md:px-12 pb-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {YEAR_DATA.map((month, i) => (
            <motion.div
              key={month.id}
              layoutId={`card-${month.id}`}
              onClick={() => setSelectedId(month.id)}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="relative group cursor-pointer"
            >
              {/* Image */}
              <motion.div layoutId={`img-container-${month.id}`} className="aspect-[3/4] overflow-hidden">
                <motion.img
                  layoutId={`img-${month.id}`}
                  src={month.cover}
                  alt={month.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </motion.div>

              {/* Caption below image */}
              <motion.div
                layoutId={`content-${month.id}`}
                className="pt-3 pb-6"
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-[var(--text-primary)]">{month.title}</span>
                  <span className="text-xs text-[var(--text-muted)]">{month.month}</span>
                </div>
                <div className="text-xs text-[var(--text-muted)] mt-1">
                  {month.location}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- Modal --- */}
      <AnimatePresence>
        {selectedId && selectedMonth && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">

            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-[var(--overlay-backdrop)] backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              layoutId={`card-${selectedId}`}
              className="relative w-full max-w-4xl max-h-[90vh] bg-[var(--bg-elevated)] overflow-hidden flex flex-col md:flex-row"
            >
              {/* Close */}
              <button
                onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                className="absolute top-4 right-4 z-50 p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              >
                <X size={20} />
              </button>

              {/* Image */}
              <motion.div
                layoutId={`img-container-${selectedId}`}
                className="relative h-72 md:h-auto md:w-1/2 flex-shrink-0"
              >
                 <motion.img
                  layoutId={`img-${selectedId}`}
                  src={selectedMonth.cover}
                  alt={selectedMonth.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Content */}
              <div className="flex-1 p-6 md:p-8 flex flex-col overflow-y-auto">
                <motion.div layoutId={`content-${selectedId}`} className="mb-6">
                  <div className="flex items-baseline justify-between mb-6">
                    <span className="text-sm text-[var(--text-primary)]">{selectedMonth.title}</span>
                    <span className="text-xs text-[var(--text-muted)]">{selectedMonth.month} {selectedMonth.year}</span>
                  </div>

                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                    {selectedMonth.description}
                  </p>

                  <div className="text-xs text-[var(--text-muted)]">
                    {selectedMonth.location} · {selectedMonth.stats.photos} photos
                  </div>
                </motion.div>

                {/* Carousel */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="mt-auto pt-6"
                >
                  <GalleryCarousel images={selectedMonth.gallery} />
                </motion.div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
