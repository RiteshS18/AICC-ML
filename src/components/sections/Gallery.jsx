import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';

const mediaItems = [
  { type: 'image', src: '/hackathon/hackathon1.webp', alt: 'Hackathon Opening', category: 'Hackathon', colSpan: 2, rowSpan: 2 },
  { type: 'video', src: '/Farewel/WhatsApp Video 2026-06-15 at 19.03.41.mp4', alt: 'Farewell Highlights', category: 'Farewell', colSpan: 2, rowSpan: 2 },
  { type: 'image', src: '/life/24-25_2.webp', alt: 'Project Showcase', category: 'Life', colSpan: 2, rowSpan: 1 },
  { type: 'image', src: '/workshop/workshop(4).webp', alt: 'Deep Dive', category: 'Workshop', colSpan: 1, rowSpan: 1 },
  { type: 'video', src: '/Farewel/WhatsApp Video 2026-06-15 at 19.03.43.mp4', alt: 'Farewell Moments', category: 'Farewell', colSpan: 1, rowSpan: 1 },
  { type: 'image', src: '/thinkathon/thinkathon(3).webp', alt: 'Ideation Workshop', category: 'Thinkathon', colSpan: 1, rowSpan: 1 },
  { type: 'image', src: '/hcs/HCS1(1).webp', alt: 'HCS Achievement', category: 'HCS', colSpan: 2, rowSpan: 1 },
  { type: 'video', src: '/Farewel/WhatsApp Video 2026-06-15 at 19.22.32.mp4', alt: 'Farewell Speeches', category: 'Farewell', colSpan: 1, rowSpan: 1 },
];

export default function Gallery() {
  const [selectedMedia, setSelectedMedia] = useState(null);

  return (
    <section id="gallery" className="py-24 lg:py-32 bg-off-white">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          eyebrow="Life @ AICC"
          title="Life @ AICC"
          subtitle="A glimpse of our journey, teamwork, and unforgettable moments."
        />

        {/* Bento Grid */}
        <div className="gallery-bento grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-16">
          {mediaItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
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
        </div>

        {/* Responsive bento grid styles */}
        <style>{`
          .gallery-bento {
            grid-auto-rows: minmax(180px, 1fr);
          }

          /* Desktop (lg): full spanning */
          @media (min-width: 1024px) {
            .gallery-item[data-col="2"] { grid-column: span 2; }
            .gallery-item[data-row="2"] { grid-row: span 2; }
          }

          /* Tablet (md): col spans allowed, no row spans */
          @media (min-width: 768px) and (max-width: 1023px) {
            .gallery-item[data-col="2"] { grid-column: span 2; }
          }

          /* Mobile: all 1x1 */
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
            {/* Close Button */}
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
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <motion.img
                layoutId={`media-${selectedMedia.src}`}
                src={selectedMedia.src}
                alt={selectedMedia.alt}
                className="max-w-[90vw] max-h-[90vh] object-contain rounded-2xl shadow-2xl relative z-20"
                onClick={(e) => e.stopPropagation()}
              />
            )}

            {/* Caption */}
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
    </section>
  );
}
