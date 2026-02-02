"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, MapPin, Image as ImageIcon, Calendar } from 'lucide-react';

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
    <div className="relative w-full h-64 md:h-80 bg-neutral-800 rounded-2xl overflow-hidden group shadow-inner">
      <AnimatePresence mode='wait'>
        <motion.img
          key={index}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          src={images[index].src}
          alt={images[index].caption}
          className="w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Gradient Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={prev}
            className="p-2 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full text-white transition-all transform hover:scale-110"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="p-2 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full text-white transition-all transform hover:scale-110"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      {/* Dots Indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? 'bg-white w-6' : 'bg-white/40 w-1.5'}`}
          />
        ))}
      </div>

      {/* Caption */}
      <div className="absolute bottom-12 left-0 right-0 px-4 text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-white text-sm drop-shadow-lg"
          >
            {images[index].caption}
          </motion.p>
        </AnimatePresence>
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

  // Calculate totals
  const totalPhotos = YEAR_DATA.reduce((acc, month) => acc + month.stats.photos, 0);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-rose-500/30">

      {/* --- Header --- */}
      <div className="relative pt-20 pb-12 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-rose-500 font-medium tracking-widest uppercase mb-4 text-sm">Washuta Family Recap</p>
          <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-6 bg-gradient-to-br from-white via-neutral-200 to-neutral-600 bg-clip-text text-transparent">
            2024
          </h1>
          <div className="flex flex-col md:flex-row md:items-end gap-6 border-t border-white/10 pt-8">
            <p className="text-lg text-neutral-400 max-w-md leading-relaxed">
              A visual collection of our year. From snowy mornings to summer adventures, these are the moments we'll remember forever.
            </p>
            <div className="ml-auto flex gap-8 text-neutral-500 text-sm">
              <div>
                <span className="block text-white font-bold text-xl">12</span>
                <span>Months</span>
              </div>
              <div>
                <span className="block text-white font-bold text-xl">{totalPhotos}</span>
                <span>Photos</span>
              </div>
              <div>
                <span className="block text-white font-bold text-xl">∞</span>
                <span>Memories</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* --- Bento Grid --- */}
      <div className="px-6 md:px-12 pb-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[400px]">
          {YEAR_DATA.map((month, i) => (
            <motion.div
              key={month.id}
              layoutId={`card-${month.id}`}
              onClick={() => setSelectedId(month.id)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="relative group cursor-pointer rounded-3xl overflow-hidden bg-neutral-900 border border-white/5 shadow-xl hover:shadow-2xl hover:shadow-rose-500/10 transition-all"
            >
              {/* Background Image */}
              <motion.div layoutId={`img-container-${month.id}`} className="absolute inset-0">
                <motion.img
                  layoutId={`img-${month.id}`}
                  src={month.cover}
                  alt={month.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
              </motion.div>

              {/* Card Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <motion.div
                  layoutId={`content-${month.id}`}
                  className="relative z-10"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                      {month.month}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold leading-tight text-white mb-2">{month.title}</h2>
                  <div className="flex items-center gap-2 text-neutral-300 text-sm">
                    <MapPin size={14} className="text-neutral-400" />
                    <span>{month.location}</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- Fullscreen Modal --- */}
      <AnimatePresence>
        {selectedId && selectedMonth && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">

            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              layoutId={`card-${selectedId}`}
              className="relative w-full max-w-5xl h-full md:h-auto max-h-[90vh] bg-neutral-900 rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button
                onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                className="absolute top-4 right-4 z-50 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-colors"
              >
                <X size={24} />
              </button>

              {/* Left Side: Image Hero */}
              <motion.div
                layoutId={`img-container-${selectedId}`}
                className="relative h-64 md:h-auto md:w-1/2"
              >
                 <motion.img
                  layoutId={`img-${selectedId}`}
                  src={selectedMonth.cover}
                  alt={selectedMonth.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent md:bg-gradient-to-r" />
              </motion.div>

              {/* Right Side: Content */}
              <div className="flex-1 p-6 md:p-10 flex flex-col h-full overflow-y-auto">
                <motion.div layoutId={`content-${selectedId}`} className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-full text-xs font-bold uppercase tracking-wider">
                      {selectedMonth.month} {selectedMonth.year}
                    </span>
                    <div className="flex items-center gap-1 text-neutral-400 text-xs font-medium">
                      <MapPin size={12} /> {selectedMonth.location}
                    </div>
                  </div>

                  <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">{selectedMonth.title}</h2>

                  <p className="text-neutral-300 leading-relaxed text-lg mb-8">
                    {selectedMonth.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                      <div className="flex items-center gap-2 text-neutral-400 mb-1">
                        <ImageIcon size={16} />
                        <span className="text-xs uppercase tracking-wider">Captured</span>
                      </div>
                      <span className="text-2xl font-bold text-white">{selectedMonth.stats.photos} Photos</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                      <div className="flex items-center gap-2 text-neutral-400 mb-1">
                        <Calendar size={16} />
                        <span className="text-xs uppercase tracking-wider">Month</span>
                      </div>
                      <span className="text-2xl font-bold text-white">{selectedMonth.month}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Internal Carousel */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-auto"
                >
                  <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-500 mb-3">Highlights</h4>
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
