import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const media = [
  // Farewell
  { type: 'video', src: '/Farewel/WhatsApp Video 2026-06-15 at 19.03.41.mp4', alt: 'Farewell Highlights', category: 'Farewell', colSpan: 2, rowSpan: 2 },
  { type: 'video', src: '/Farewel/WhatsApp Video 2026-06-15 at 19.03.43.mp4', alt: 'Farewell Moments', category: 'Farewell', colSpan: 1, rowSpan: 1 },
  { type: 'video', src: '/Farewel/WhatsApp Video 2026-06-15 at 19.03.57.mp4', alt: 'Farewell Celebrations', category: 'Farewell', colSpan: 1, rowSpan: 1 },
  { type: 'video', src: '/Farewel/WhatsApp Video 2026-06-15 at 19.03.57(1).mp4', alt: 'Farewell Dance', category: 'Farewell', colSpan: 1, rowSpan: 1 },
  { type: 'video', src: '/Farewel/WhatsApp Video 2026-06-15 at 19.22.32.mp4', alt: 'Farewell Speeches', category: 'Farewell', colSpan: 1, rowSpan: 1 },
  { type: 'video', src: '/Farewel/WhatsApp Video 2026-06-15 at 19.27.42.mp4', alt: 'Farewell Awards', category: 'Farewell', colSpan: 1, rowSpan: 1 },
  { type: 'video', src: '/Farewel/WhatsApp Video 2026-06-15 at 19.27.42(1).mp4', alt: 'Farewell Fun', category: 'Farewell', colSpan: 1, rowSpan: 1 },
  { type: 'video', src: '/Farewel/WhatsApp Video 2026-06-15 at 19.27.43.mp4', alt: 'Farewell Memories', category: 'Farewell', colSpan: 2, rowSpan: 2 },
  { type: 'video', src: '/Farewel/WhatsApp Video 2026-06-15 at 19.27.43(1).mp4', alt: 'Farewell Goodbye', category: 'Farewell', colSpan: 1, rowSpan: 1 },
  { type: 'image', src: '/Farewel/WhatsApp Image 2026-06-15 at 19.03.56.jpeg', alt: 'Farewell Together', category: 'Farewell', colSpan: 1, rowSpan: 1 },
  { type: 'image', src: '/Farewel/WhatsApp Image 2026-06-15 at 19.03.57.jpeg', alt: 'Farewell Group Photo', category: 'Farewell', colSpan: 2, rowSpan: 1 },
  { type: 'image', src: '/Farewel/WhatsApp Image 2026-06-15 at 19.22.55.jpeg', alt: 'Farewell Ceremony', category: 'Farewell', colSpan: 1, rowSpan: 1 },

  // Life
  { type: 'image', src: '/life/23-24_1.webp', alt: 'Hackathon Event 2023', category: 'Life', colSpan: 2, rowSpan: 2 },
  { type: 'image', src: '/life/23-24_2.webp', alt: 'Team Meetup 2023', category: 'Life', colSpan: 1, rowSpan: 1 },
  { type: 'image', src: '/life/24-25_1.webp', alt: 'Club Celebration 2024', category: 'Life', colSpan: 1, rowSpan: 1 },
  { type: 'image', src: '/life/24-25_2.webp', alt: 'Project Showcase 2024', category: 'Life', colSpan: 2, rowSpan: 1 },
  { type: 'image', src: '/life/24-25_3.webp', alt: 'Casual Fun 2024', category: 'Life', colSpan: 1, rowSpan: 1 },
  { type: 'image', src: '/life/25-26_1.webp', alt: 'AI Workshop 2025', category: 'Life', colSpan: 1, rowSpan: 1 },
  { type: 'image', src: '/life/25-26_2.webp', alt: 'Hackathon Winners 2025', category: 'Life', colSpan: 2, rowSpan: 1 },
  { type: 'image', src: '/life/25-26_3.webp', alt: 'Annual Meet 2025', category: 'Life', colSpan: 1, rowSpan: 1 },

  // Hackathon
  { type: 'image', src: '/hackathon/hackathon1.webp', alt: 'Hackathon Opening', category: 'Hackathon', colSpan: 2, rowSpan: 2 },
  { type: 'image', src: '/hackathon/hackathon2.webp', alt: 'Team Collaboration', category: 'Hackathon', colSpan: 1, rowSpan: 1 },
  { type: 'image', src: '/hackathon/hackathon3.webp', alt: 'Coding Session', category: 'Hackathon', colSpan: 1, rowSpan: 1 },
  { type: 'image', src: '/hackathon/hackathon4.webp', alt: 'Problem Solving', category: 'Hackathon', colSpan: 1, rowSpan: 1 },
  { type: 'image', src: '/hackathon/hackathon5.webp', alt: 'Prototype Building', category: 'Hackathon', colSpan: 1, rowSpan: 1 },
  { type: 'image', src: '/hackathon/hackathon6.webp', alt: 'Presentation Round', category: 'Hackathon', colSpan: 2, rowSpan: 1 },
  { type: 'image', src: '/hackathon/hackathon7.webp', alt: 'Winners Announced', category: 'Hackathon', colSpan: 2, rowSpan: 2 },
  { type: 'image', src: '/hackathon/hackathon8.webp', alt: 'Victory Moment', category: 'Hackathon', colSpan: 1, rowSpan: 1 },

  // Thinkathon
  { type: 'image', src: '/thinkathon/thinkathon(1).webp', alt: 'Thinkathon Kick-off', category: 'Thinkathon', colSpan: 2, rowSpan: 1 },
  { type: 'image', src: '/thinkathon/thinkathon(2).webp', alt: 'Brainstorming Session', category: 'Thinkathon', colSpan: 1, rowSpan: 1 },
  { type: 'image', src: '/thinkathon/thinkathon(3).webp', alt: 'Ideation Workshop', category: 'Thinkathon', colSpan: 1, rowSpan: 2 },
  { type: 'image', src: '/thinkathon/thinkathon(4).webp', alt: 'Team Discussion', category: 'Thinkathon', colSpan: 1, rowSpan: 1 },
  { type: 'image', src: '/thinkathon/thinkathon(5).webp', alt: 'Final Presentations', category: 'Thinkathon', colSpan: 2, rowSpan: 1 },

  // Workshop
  { type: 'image', src: '/workshop/workshop(1).webp', alt: 'Workshop Introduction', category: 'Workshop', colSpan: 2, rowSpan: 1 },
  { type: 'image', src: '/workshop/workshop(2).webp', alt: 'Hands-on Practice', category: 'Workshop', colSpan: 1, rowSpan: 1 },
  { type: 'image', src: '/workshop/workshop(3).webp', alt: 'Guided Session', category: 'Workshop', colSpan: 1, rowSpan: 2 },
  { type: 'image', src: '/workshop/workshop(4).webp', alt: 'Deep Dive', category: 'Workshop', colSpan: 1, rowSpan: 1 },
  { type: 'image', src: '/workshop/workshop(5).webp', alt: 'Group Activity', category: 'Workshop', colSpan: 2, rowSpan: 1 },

  // HCS
  { type: 'image', src: '/hcs/HCS1(1).webp', alt: 'HCS Achievement', category: 'HCS', colSpan: 2, rowSpan: 1 },
  { type: 'image', src: '/hcs/HCS1(2).webp', alt: 'HCS Recognition', category: 'HCS', colSpan: 1, rowSpan: 1 },
  { type: 'image', src: '/hcs/HCS1(3).webp', alt: 'HCS Celebration', category: 'HCS', colSpan: 1, rowSpan: 1 },
  { type: 'image', src: '/hcs/HCS1(4).webp', alt: 'HCS Ceremony', category: 'HCS', colSpan: 2, rowSpan: 2 },
];

const categories = ['All', 'Farewell', 'Life', 'Hackathon', 'Thinkathon', 'Workshop', 'HCS'];

export default function GalleryPage() {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const navigate = useNavigate();

  const filtered = activeCategory === 'All' ? media : media.filter(p => p.category === activeCategory);

  return (
    <motion.div
      className="min-h-screen bg-off-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="fixed top-6 left-6 z-50 glass-card px-4 py-2 flex items-center gap-2 text-text-secondary hover:bg-white hover:text-text transition-all duration-200 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Back</span>
      </button>

      <div className="max-w-7xl mx-auto px-6 pt-28 pb-24">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <p className="text-primary text-sm font-bold tracking-widest uppercase mb-4">
            Gallery @ AICC
          </p>
          <h1 className="text-5xl md:text-7xl font-display font-black tracking-tight text-text leading-none">
            Our Moments
          </h1>
          <p className="text-text-secondary mt-4 text-lg max-w-xl">
            A glimpse of our journey, teamwork, and unforgettable memories.
          </p>
        </motion.div>

        {/* Category Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'bg-white border border-border text-text-secondary hover:border-primary hover:text-primary'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Bento Grid */}
        <div className="gallery-bento grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => (
              <motion.div
                key={item.src + index}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="gallery-item relative overflow-hidden rounded-2xl cursor-pointer group"
                data-col={item.colSpan}
                data-row={item.rowSpan}
                onClick={() => setSelectedMedia(item)}
              >
                {item.type === 'video' ? (
                  <motion.video
                    layoutId={`media-${item.src}`}
                    src={item.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                ) : (
                  <motion.img
                    layoutId={`media-${item.src}`}
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                )}
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Overlay Content */}
                <div className="absolute bottom-0 left-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <span className="text-xs font-semibold text-white/80 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center w-max gap-1">
                    {item.type === 'video' && <Play className="w-3 h-3 fill-white" />}
                    {item.category}
                  </span>
                  <p className="text-sm font-medium text-white mt-2">{item.alt}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Grid Styles */}
        <style>{`
          .gallery-bento {
            grid-auto-rows: minmax(200px, 1fr);
          }
          @media (min-width: 1024px) {
            .gallery-item[data-col="2"] { grid-column: span 2; }
            .gallery-item[data-row="2"] { grid-row: span 2; }
          }
          @media (min-width: 768px) and (max-width: 1023px) {
            .gallery-item[data-col="2"] { grid-column: span 2; }
          }
        `}</style>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedMedia(null)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.2 }}
              onClick={() => setSelectedMedia(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:text-white hover:bg-white/20 transition-all z-50 shadow-xl border border-white/10"
              aria-label="Close lightbox"
            >
              <X size={24} />
            </motion.button>
            
            {selectedMedia.type === 'video' ? (
              <motion.video
                layoutId={`media-${selectedMedia.src}`}
                src={selectedMedia.src}
                controls
                autoPlay
                muted
                className="max-w-[90vw] max-h-[90vh] object-contain rounded-2xl shadow-2xl relative z-20"
                onClick={e => e.stopPropagation()}
              />
            ) : (
              <motion.img
                layoutId={`media-${selectedMedia.src}`}
                src={selectedMedia.src}
                alt={selectedMedia.alt}
                className="max-w-[90vw] max-h-[90vh] object-contain rounded-2xl shadow-2xl relative z-20"
                onClick={e => e.stopPropagation()}
              />
            )}
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center z-30"
            >
              <span className="text-xs font-bold tracking-wider uppercase text-white/90 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full shadow-lg border border-white/10">
                {selectedMedia.category}
              </span>
              <p className="text-lg font-display font-medium text-white mt-4 drop-shadow-md">{selectedMedia.alt}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
