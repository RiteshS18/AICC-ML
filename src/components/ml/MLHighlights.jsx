import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const ALL_PHOTOS = [
  '/hackathon/hackathon1.webp', '/thinkathon/thinkathon(1).webp', '/workshop/workshop(1).webp',
  '/life/25-26_1.webp', '/HackSphere/IMG_20260220_215326.jpg', '/hcs/HCS1(1).webp',
  '/Farewel/WhatsApp Image 2026-06-15 at 19.22.55.jpeg', '/hackathon/hackathon5.webp',
  '/interaction/20250811_32719pmByGPSMapCamera.jpg', '/life/24-25_1.webp', '/thinkathon/thinkathon(4).webp',
  '/hackathon/hackathon3.webp', '/workshop/workshop(3).webp', '/life/25-26_2.webp',
  '/HackSphere/IMG_20260220_215341.jpg', '/hcs/HCS1(4).webp', '/thinkathon/thinkathon(2).webp',
  '/hackathon/hackathon7.webp', '/Farewel/WhatsApp Image 2026-06-15 at 19.03.56.jpeg',
  '/workshop/workshop(5).webp', '/interaction/20250811_32858pmByGPSMapCamera.jpg', '/life/23-24_1.webp',
  '/hackathon/hackathon2.webp', '/thinkathon/thinkathon(5).webp', '/workshop/workshop(4).webp',
  '/life/25-26_3.webp', '/HackSphere/IMG_20260220_215421.jpg', '/hcs/HCS1(2).webp',
  '/hackathon/hackathon6.webp', '/Farewel/WhatsApp Image 2026-06-15 at 19.03.57.jpeg',
  '/interaction/20250811_40712PMByGPSMapCamera.jpg', '/Members/Frame.jpg', '/life/24-25_2.webp',
];

const ROW1 = ALL_PHOTOS.slice(0, 11);
const ROW2 = ALL_PHOTOS.slice(11, 22);
const ROW3 = ALL_PHOTOS.slice(22);

function PhotoRow({ images, direction = 1, scrollYProgress }) {
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 1 ? ['0%', '-25%'] : ['-25%', '0%']
  );

  return (
    <motion.div
      style={{
        display: 'flex',
        gap: '24px',
        x,
        width: 'max-content',
        paddingLeft: '50vw',
        paddingRight: '50vw',
      }}
    >
      {[...images, ...images, ...images].map((src, i) => (
        <div
          key={`${src}-${i}`}
          style={{
            width: 'clamp(250px, 20vw, 400px)',
            aspectRatio: '4/3',
            borderRadius: '16px',
            overflow: 'hidden',
            flexShrink: 0,
            boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <img
            src={src}
            alt="AIML Coding Club Highlight"
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      ))}
    </motion.div>
  );
}

export default function MLHighlights() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const rotate = useTransform(scrollYProgress, [0, 0.4], ['-12deg', '0deg']);
  const scale = useTransform(scrollYProgress, [0, 0.4], [1.15, 1]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.4], [0.35, 1]);
  const gridFilter = useTransform(scrollYProgress, [0.5, 0.7], ['blur(0px)', 'blur(16px)']);
  const overlayOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 0.75]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.3], ['0%', '-20%']);
  const buttonOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);
  const buttonScale = useTransform(scrollYProgress, [0.5, 0.7], [0.8, 1]);
  const pointerEvents = useTransform(scrollYProgress, v => v > 0.5 ? 'auto' : 'none');

  return (
    <section
      id="highlights"
      ref={containerRef}
      style={{
        backgroundColor: 'var(--bg)',
        position: 'relative',
        height: '400vh',
        zIndex: 20,
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <motion.div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              x: '-50%',
              y: '-50%',
              rotate,
              scale,
              opacity: gridOpacity,
              filter: gridFilter,
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              width: '100vw',
              zIndex: 0,
            }}
          >
            <PhotoRow images={ROW1} direction={1} scrollYProgress={scrollYProgress} />
            <PhotoRow images={ROW2} direction={-1} scrollYProgress={scrollYProgress} />
            <PhotoRow images={ROW3} direction={1} scrollYProgress={scrollYProgress} />
          </motion.div>

          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'var(--bg)',
              pointerEvents: 'none',
              zIndex: 1,
              opacity: overlayOpacity,
            }}
          />

          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at center, var(--bg) 0%, color-mix(in srgb, var(--bg) 75%, transparent) 40%, transparent 80%)',
              zIndex: 1,
              pointerEvents: 'none',
              opacity: textOpacity,
            }}
          />
        </div>

        {/* Foreground Text */}
        <motion.div
          style={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            padding: '0 20px',
            opacity: textOpacity,
            y: textY,
          }}
        >
          <h2
            className="font-display font-black leading-none tracking-tight mb-4"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)' }}
          >
            <span style={{ color: 'var(--text)' }}>AIML Coding Club's </span>
            <span className="text-hollow">
              Highlights.
            </span>
          </h2>
        </motion.div>

        {/* Buttons fade in at the center */}
        <motion.div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            x: '-50%',
            y: '-50%',
            opacity: buttonOpacity,
            scale: buttonScale,
            pointerEvents,
            zIndex: 30,
          }}
          className="flex flex-col sm:flex-row items-center justify-center gap-8 w-full px-4"
        >
          <Link
            to="/gallery"
            className="group relative w-72 h-80 rounded-3xl overflow-hidden shadow-2xl glass-card flex flex-col hover:-translate-y-2 transition-all duration-300"
            style={{
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
            }}
          >
            <div className="h-2/3 w-full relative overflow-hidden" style={{ backgroundColor: 'var(--surface-2)' }}>
              <img src="/hackathon/hackathon1.webp" alt="Gallery" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div
              className="h-1/3 w-full flex items-center justify-center backdrop-blur-sm"
              style={{
                backgroundColor: 'var(--surface)',
                borderTop: '1px solid var(--border)',
              }}
            >
              <span className="text-xl font-display font-bold flex items-center gap-2" style={{ color: 'var(--text)' }}>
                View Gallery
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" style={{ color: 'var(--gold-text)' }} />
              </span>
            </div>
          </Link>
          
          <Link
            to="/members"
            className="group relative w-72 h-80 rounded-3xl overflow-hidden shadow-2xl glass-card flex flex-col hover:-translate-y-2 transition-all duration-300"
            style={{
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
            }}
          >
            <div className="h-2/3 w-full relative overflow-hidden" style={{ backgroundColor: 'var(--surface-2)' }}>
              <img src="/Members/Frame.jpg" alt="Members" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div
              className="h-1/3 w-full flex items-center justify-center backdrop-blur-sm"
              style={{
                backgroundColor: 'var(--surface)',
                borderTop: '1px solid var(--border)',
              }}
            >
              <span className="text-xl font-display font-bold flex items-center gap-2" style={{ color: 'var(--text)' }}>
                Our Members
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" style={{ color: 'var(--gold-text)' }} />
              </span>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
