import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Play, Camera, Video, Layers } from 'lucide-react';

// ── Complete media catalog — every web-compatible file from public/, zero repeats ──
const media = [
  // ─── Hackathon (8 event photos) ───
  { type: 'image', src: '/hackathon/hackathon1.webp', alt: 'Hackathon Opening Ceremony', category: 'Hackathon', colSpan: 2, rowSpan: 2 },
  { type: 'image', src: '/hackathon/hackathon2.webp', alt: 'Team Collaboration', category: 'Hackathon', colSpan: 1, rowSpan: 1 },
  { type: 'image', src: '/hackathon/hackathon3.webp', alt: 'Coding Session', category: 'Hackathon', colSpan: 1, rowSpan: 1 },
  { type: 'image', src: '/hackathon/hackathon4.webp', alt: 'Problem Solving Sprint', category: 'Hackathon', colSpan: 1, rowSpan: 1 },
  { type: 'image', src: '/hackathon/hackathon5.webp', alt: 'Prototype Building', category: 'Hackathon', colSpan: 1, rowSpan: 1 },
  { type: 'image', src: '/hackathon/hackathon6.webp', alt: 'Presentation Round', category: 'Hackathon', colSpan: 2, rowSpan: 1 },
  { type: 'image', src: '/hackathon/hackathon7.webp', alt: 'Winners Announced', category: 'Hackathon', colSpan: 2, rowSpan: 2 },
  { type: 'image', src: '/hackathon/hackathon8.webp', alt: 'Victory Celebration', category: 'Hackathon', colSpan: 1, rowSpan: 1 },

  // ─── HackSphere (3 photos) ───
  { type: 'image', src: '/HackSphere/IMG_20260220_215326.jpg', alt: 'HackSphere Launch', category: 'HackSphere', colSpan: 2, rowSpan: 2 },
  { type: 'image', src: '/HackSphere/IMG_20260220_215341.jpg', alt: 'HackSphere Teams in Action', category: 'HackSphere', colSpan: 1, rowSpan: 1 },
  { type: 'image', src: '/HackSphere/IMG_20260220_215421.jpg', alt: 'HackSphere Finale', category: 'HackSphere', colSpan: 1, rowSpan: 1 },

  // ─── Thinkathon (5 photos) ───
  { type: 'image', src: '/thinkathon/thinkathon(1).webp', alt: 'Thinkathon Kick-off', category: 'Thinkathon', colSpan: 2, rowSpan: 1 },
  { type: 'image', src: '/thinkathon/thinkathon(2).webp', alt: 'Brainstorming Session', category: 'Thinkathon', colSpan: 1, rowSpan: 1 },
  { type: 'image', src: '/thinkathon/thinkathon(3).webp', alt: 'Ideation Workshop', category: 'Thinkathon', colSpan: 1, rowSpan: 2 },
  { type: 'image', src: '/thinkathon/thinkathon(4).webp', alt: 'Team Discussion', category: 'Thinkathon', colSpan: 1, rowSpan: 1 },
  { type: 'image', src: '/thinkathon/thinkathon(5).webp', alt: 'Final Presentations', category: 'Thinkathon', colSpan: 2, rowSpan: 1 },

  // ─── Workshop (5 photos) ───
  { type: 'image', src: '/workshop/workshop(1).webp', alt: 'Workshop Introduction', category: 'Workshop', colSpan: 2, rowSpan: 1 },
  { type: 'image', src: '/workshop/workshop(2).webp', alt: 'Hands-on Practice', category: 'Workshop', colSpan: 1, rowSpan: 1 },
  { type: 'image', src: '/workshop/workshop(3).webp', alt: 'Guided Learning', category: 'Workshop', colSpan: 1, rowSpan: 2 },
  { type: 'image', src: '/workshop/workshop(4).webp', alt: 'Deep Dive Session', category: 'Workshop', colSpan: 1, rowSpan: 1 },
  { type: 'image', src: '/workshop/workshop(5).webp', alt: 'Group Activity', category: 'Workshop', colSpan: 2, rowSpan: 1 },

  // ─── HCS (4 photos) ───
  { type: 'image', src: '/hcs/HCS1(1).webp', alt: 'HCS Achievement', category: 'HCS', colSpan: 2, rowSpan: 1 },
  { type: 'image', src: '/hcs/HCS1(2).webp', alt: 'HCS Recognition', category: 'HCS', colSpan: 1, rowSpan: 1 },
  { type: 'image', src: '/hcs/HCS1(3).webp', alt: 'HCS Celebration', category: 'HCS', colSpan: 1, rowSpan: 1 },
  { type: 'image', src: '/hcs/HCS1(4).webp', alt: 'HCS Ceremony', category: 'HCS', colSpan: 2, rowSpan: 2 },

  // ─── Life @ AICC (8 photos) ───
  { type: 'image', src: '/life/23-24_1.webp', alt: 'Club Life 2023', category: 'Life', colSpan: 2, rowSpan: 2 },
  { type: 'image', src: '/life/23-24_2.webp', alt: 'Team Meetup 2023', category: 'Life', colSpan: 1, rowSpan: 1 },
  { type: 'image', src: '/life/24-25_1.webp', alt: 'Club Celebration 2024', category: 'Life', colSpan: 1, rowSpan: 1 },
  { type: 'image', src: '/life/24-25_2.webp', alt: 'Project Showcase 2024', category: 'Life', colSpan: 2, rowSpan: 1 },
  { type: 'image', src: '/life/24-25_3.webp', alt: 'Casual Fun 2024', category: 'Life', colSpan: 1, rowSpan: 1 },
  { type: 'image', src: '/life/25-26_1.webp', alt: 'AI Workshop 2025', category: 'Life', colSpan: 1, rowSpan: 1 },
  { type: 'image', src: '/life/25-26_2.webp', alt: 'Hackathon Winners 2025', category: 'Life', colSpan: 2, rowSpan: 1 },
  { type: 'image', src: '/life/25-26_3.webp', alt: 'Annual Meet 2025', category: 'Life', colSpan: 1, rowSpan: 1 },

  // ─── Farewell (3 photos + 9 videos) ───
  { type: 'image', src: '/Farewel/WhatsApp Image 2026-06-15 at 19.03.56.jpeg', alt: 'Farewell Together', category: 'Farewell', colSpan: 1, rowSpan: 1 },
  { type: 'image', src: '/Farewel/WhatsApp Image 2026-06-15 at 19.03.57.jpeg', alt: 'Farewell Group Photo', category: 'Farewell', colSpan: 2, rowSpan: 1 },
  { type: 'image', src: '/Farewel/WhatsApp Image 2026-06-15 at 19.22.55.jpeg', alt: 'Farewell Ceremony', category: 'Farewell', colSpan: 1, rowSpan: 1 },
  { type: 'video', src: '/Farewel/WhatsApp Video 2026-06-15 at 19.03.41.mp4', alt: 'Farewell Highlights', category: 'Farewell', colSpan: 2, rowSpan: 2 },
  { type: 'video', src: '/Farewel/WhatsApp Video 2026-06-15 at 19.03.43.mp4', alt: 'Farewell Moments', category: 'Farewell', colSpan: 1, rowSpan: 1 },
  { type: 'video', src: '/Farewel/WhatsApp Video 2026-06-15 at 19.03.57.mp4', alt: 'Farewell Celebrations', category: 'Farewell', colSpan: 1, rowSpan: 1 },
  { type: 'video', src: '/Farewel/WhatsApp Video 2026-06-15 at 19.03.57(1).mp4', alt: 'Farewell Dance', category: 'Farewell', colSpan: 1, rowSpan: 1 },
  { type: 'video', src: '/Farewel/WhatsApp Video 2026-06-15 at 19.22.32.mp4', alt: 'Farewell Speeches', category: 'Farewell', colSpan: 1, rowSpan: 1 },
  { type: 'video', src: '/Farewel/WhatsApp Video 2026-06-15 at 19.27.42.mp4', alt: 'Farewell Awards', category: 'Farewell', colSpan: 1, rowSpan: 1 },
  { type: 'video', src: '/Farewel/WhatsApp Video 2026-06-15 at 19.27.42(1).mp4', alt: 'Farewell Fun', category: 'Farewell', colSpan: 1, rowSpan: 1 },
  { type: 'video', src: '/Farewel/WhatsApp Video 2026-06-15 at 19.27.43.mp4', alt: 'Farewell Memories', category: 'Farewell', colSpan: 2, rowSpan: 2 },
  { type: 'video', src: '/Farewel/WhatsApp Video 2026-06-15 at 19.27.43(1).mp4', alt: 'Farewell Goodbye', category: 'Farewell', colSpan: 1, rowSpan: 1 },

  // ─── Interaction (3 photos) ───
  { type: 'image', src: '/interaction/20250811_32719pmByGPSMapCamera.jpg', alt: 'Industry Interaction', category: 'Interaction', colSpan: 2, rowSpan: 1 },
  { type: 'image', src: '/interaction/20250811_32858pmByGPSMapCamera.jpg', alt: 'Expert Talk Session', category: 'Interaction', colSpan: 1, rowSpan: 1 },
  { type: 'image', src: '/interaction/20250811_40712PMByGPSMapCamera.jpg', alt: 'Panel Discussion', category: 'Interaction', colSpan: 1, rowSpan: 1 },

  // ─── Posters (14 images) ───
  { type: 'image', src: '/poster/HACKVOTRIX-poster.webp', alt: 'Hackvotrix Poster', category: 'Posters', colSpan: 1, rowSpan: 2 },
  { type: 'image', src: "/poster/Hacksphere'26-poster.webp", alt: "Hacksphere '26 Poster", category: 'Posters', colSpan: 1, rowSpan: 2 },
  { type: 'image', src: '/poster/THINKATHON-poster.webp', alt: 'Thinkathon Poster', category: 'Posters', colSpan: 1, rowSpan: 2 },
  { type: 'image', src: '/poster/hackathon.webp', alt: 'Hackathon Poster', category: 'Posters', colSpan: 1, rowSpan: 1 },
  { type: 'image', src: '/poster/hacksphere1.webp', alt: 'Hacksphere Event Poster', category: 'Posters', colSpan: 1, rowSpan: 1 },
  { type: 'image', src: '/poster/hackvotrix.webp', alt: 'Hackvotrix Event Poster', category: 'Posters', colSpan: 1, rowSpan: 1 },
  { type: 'image', src: '/poster/hcs.webp', alt: 'HCS Poster', category: 'Posters', colSpan: 1, rowSpan: 2 },
  { type: 'image', src: '/poster/ideathon1.webp', alt: 'Ideathon Poster', category: 'Posters', colSpan: 1, rowSpan: 1 },
  { type: 'image', src: '/poster/ideathon2.webp', alt: 'Ideathon Round 2 Poster', category: 'Posters', colSpan: 1, rowSpan: 1 },
  { type: 'image', src: '/poster/placement_talks1.webp', alt: 'Placement Talks Poster', category: 'Posters', colSpan: 1, rowSpan: 1 },
  { type: 'image', src: '/poster/thinkathon.webp', alt: 'Thinkathon Event Poster', category: 'Posters', colSpan: 1, rowSpan: 1 },
  { type: 'image', src: '/poster/thinkathon1.webp', alt: 'Thinkathon Special Poster', category: 'Posters', colSpan: 1, rowSpan: 1 },
  { type: 'image', src: '/poster/workshop1.webp', alt: 'Workshop Poster', category: 'Posters', colSpan: 1, rowSpan: 2 },
  { type: 'image', src: '/poster/workshop2.webp', alt: 'Workshop Series Poster', category: 'Posters', colSpan: 1, rowSpan: 2 },
];

const categories = ['All', 'Hackathon', 'HackSphere', 'Thinkathon', 'Workshop', 'HCS', 'Life', 'Farewell', 'Interaction', 'Posters'];

// ── Animated counter hook ──
function useCountUp(target, duration = 1500) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
}

function StatBadge({ icon: Icon, value, label }) {
  const animatedValue = useCountUp(value);
  return (
    <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl px-5 py-3 shadow-sm">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <p className="text-2xl font-display font-black text-slate-900 leading-none">{animatedValue}</p>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">{label}</p>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = useMemo(
    () => activeCategory === 'All' ? media : media.filter(p => p.category === activeCategory),
    [activeCategory]
  );

  const selectedMedia = selectedIndex !== null ? filtered[selectedIndex] : null;

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = {};
    categories.forEach(cat => {
      counts[cat] = cat === 'All' ? media.length : media.filter(m => m.category === cat).length;
    });
    return counts;
  }, []);

  const totalPhotos = media.filter(m => m.type === 'image').length;
  const totalVideos = media.filter(m => m.type === 'video').length;

  // ── Keyboard Navigation ──
  const handleKeyDown = useCallback((e) => {
    if (selectedIndex === null) return;
    if (e.key === 'Escape') setSelectedIndex(null);
    if (e.key === 'ArrowRight') setSelectedIndex(prev => prev < filtered.length - 1 ? prev + 1 : 0);
    if (e.key === 'ArrowLeft') setSelectedIndex(prev => prev > 0 ? prev - 1 : filtered.length - 1);
  }, [selectedIndex, filtered.length]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Lock scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = selectedIndex !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedIndex]);

  return (
    <motion.div
      className="min-h-screen bg-off-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-24">

        {/* ═══════ Hero Header ═══════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          <h1 className="text-5xl md:text-7xl font-display font-black tracking-tight text-slate-900 leading-none">
            Our <span className="text-transparent" style={{ WebkitTextStroke: '2px #111111' }}>Moments.</span> @ AICC
          </h1>
        </motion.div>



        {/* ═══════ Category Filter Pills ═══════ */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="flex flex-wrap gap-2.5 mb-12"
        >
          {categories.map(category => (
            <button
              key={category}
              onClick={() => { setActiveCategory(category); setSelectedIndex(null); }}
              className="relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer"
              style={{
                color: activeCategory === category ? '#ffffff' : '#64748b',
                background: activeCategory === category
                  ? 'linear-gradient(135deg, #4f46e5, #7c3aed)'
                  : 'rgba(255,255,255,0.8)',
                border: activeCategory === category ? '1px solid transparent' : '1px solid #e2e8f0',
                boxShadow: activeCategory === category ? '0 4px 15px rgba(79,70,229,0.3)' : 'none',
              }}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* ═══════ Bento Grid ═══════ */}
        <div className="gallery-bento-v2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => (
              <motion.div
                key={item.src}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.6), ease: [0.22, 1, 0.36, 1] }}
                className={`gallery-item-v2 relative overflow-hidden rounded-2xl cursor-pointer group ${item.category === 'Posters' ? 'gallery-poster' : ''}`}
                data-col={item.colSpan}
                data-row={item.rowSpan}
                onClick={() => setSelectedIndex(index)}
              >
                {item.type === 'video' ? (
                  <video
                    src={item.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                ) : (
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Play Icon for Videos */}
                {item.type === 'video' && (
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center border border-white/20">
                    <Play className="w-3.5 h-3.5 text-white fill-white" />
                  </div>
                )}

                {/* Hover Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <span className="text-[10px] font-bold text-white/90 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full uppercase tracking-widest inline-flex items-center gap-1.5">
                    {item.type === 'video' && <Play className="w-2.5 h-2.5 fill-white" />}
                    {item.category}
                  </span>
                  <p className="text-sm font-semibold text-white mt-2 drop-shadow-sm">{item.alt}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* ═══════ Grid Styles ═══════ */}
        <style>{`
          .gallery-bento-v2 {
            grid-auto-rows: minmax(200px, 1fr);
          }
          .gallery-poster {
            aspect-ratio: 3/4;
          }
          @media (min-width: 1024px) {
            .gallery-item-v2[data-col="2"] { grid-column: span 2; }
            .gallery-item-v2[data-row="2"] { grid-row: span 2; }
          }
          @media (min-width: 768px) and (max-width: 1023px) {
            .gallery-item-v2[data-col="2"] { grid-column: span 2; }
          }
        `}</style>
      </div>

      {/* ═══════ Lightbox ═══════ */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(20px)' }}
            onClick={() => setSelectedIndex(null)}
          >
            {/* Close */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.1 }}
              onClick={() => setSelectedIndex(null)}
              className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all z-50 border border-white/10 cursor-pointer"
              aria-label="Close lightbox"
            >
              <X size={20} />
            </motion.button>

            {/* Counter */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.15 }}
              className="absolute top-6 left-1/2 -translate-x-1/2 text-white/70 text-sm font-semibold font-display tracking-wider z-50"
            >
              {selectedIndex + 1} / {filtered.length}
            </motion.div>

            {/* Previous */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: 0.1 }}
              onClick={(e) => { e.stopPropagation(); setSelectedIndex(prev => prev > 0 ? prev - 1 : filtered.length - 1); }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all z-50 border border-white/10 cursor-pointer"
              aria-label="Previous"
            >
              <ChevronLeft size={22} />
            </motion.button>

            {/* Next */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: 0.1 }}
              onClick={(e) => { e.stopPropagation(); setSelectedIndex(prev => prev < filtered.length - 1 ? prev + 1 : 0); }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all z-50 border border-white/10 cursor-pointer"
              aria-label="Next"
            >
              <ChevronRight size={22} />
            </motion.button>

            {/* Media */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedMedia.src}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-20 max-w-[90vw] max-h-[80vh]"
                onClick={e => e.stopPropagation()}
              >
                {selectedMedia.type === 'video' ? (
                  <video
                    src={selectedMedia.src}
                    controls
                    autoPlay
                    className="max-w-[90vw] max-h-[80vh] object-contain rounded-2xl shadow-2xl"
                  />
                ) : (
                  <img
                    src={selectedMedia.src}
                    alt={selectedMedia.alt}
                    className="max-w-[90vw] max-h-[80vh] object-contain rounded-2xl shadow-2xl"
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Caption */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center z-30"
            >
              <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/80 bg-white/15 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
                {selectedMedia.category}
              </span>
              <p className="text-base font-display font-medium text-white mt-3 drop-shadow-md max-w-md">{selectedMedia.alt}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
