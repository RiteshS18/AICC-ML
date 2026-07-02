import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

// ── All AICC event photos ─────────────────────────────────────────────────────
const ALL_PHOTOS = [
  // Row 1 - diverse mix
  '/hackathon/hackathon1.webp', '/thinkathon/thinkathon(1).webp', '/workshop/workshop(1).webp',
  '/life/25-26_1.webp', '/HackSphere/IMG_20260220_215326.jpg', '/hcs/HCS1(1).webp',
  '/Farewel/WhatsApp Image 2026-06-15 at 19.22.55.jpeg', '/hackathon/hackathon5.webp',
  '/interaction/20250811_32719pmByGPSMapCamera.jpg', '/life/24-25_1.webp', '/thinkathon/thinkathon(4).webp',
  // Row 2 - different images
  '/hackathon/hackathon3.webp', '/workshop/workshop(3).webp', '/life/25-26_2.webp',
  '/HackSphere/IMG_20260220_215341.jpg', '/hcs/HCS1(4).webp', '/thinkathon/thinkathon(2).webp',
  '/hackathon/hackathon7.webp', '/Farewel/WhatsApp Image 2026-06-15 at 19.03.56.jpeg',
  '/workshop/workshop(5).webp', '/interaction/20250811_32858pmByGPSMapCamera.jpg', '/life/23-24_1.webp',
  // Row 3 - remaining unique images
  '/hackathon/hackathon2.webp', '/thinkathon/thinkathon(5).webp', '/workshop/workshop(4).webp',
  '/life/25-26_3.webp', '/HackSphere/IMG_20260220_215421.jpg', '/hcs/HCS1(2).webp',
  '/hackathon/hackathon6.webp', '/Farewel/WhatsApp Image 2026-06-15 at 19.03.57.jpeg',
  '/interaction/20250811_40712PMByGPSMapCamera.jpg', '/Members/Frame.jpg', '/life/24-25_2.webp',
];

// Split photos into 3 rows
const ROW1 = ALL_PHOTOS.slice(0, 11);
const ROW2 = ALL_PHOTOS.slice(11, 22);
const ROW3 = ALL_PHOTOS.slice(22);

function PhotoRow({ images, direction = 1, scrollYProgress }) {
  // Map scroll progress to horizontal movement. 
  // Moves slowly over the entire scroll height.
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
        // Make the row very wide so it doesn't run out of images while scrolling/rotating
        width: 'max-content',
        paddingLeft: '50vw',
        paddingRight: '50vw',
      }}
    >
      {/* Duplicate images to ensure we fill the screen during translation */}
      {[...images, ...images, ...images].map((src, i) => (
        <div
          key={`${src}-${i}`}
          style={{
            width: 'clamp(250px, 20vw, 400px)',
            aspectRatio: '4/3',
            borderRadius: '16px',
            overflow: 'hidden',
            flexShrink: 0,
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
          }}
        >
          <img
            src={src}
            alt="AICC Highlight"
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

export default function Highlights() {
  const containerRef = useRef(null);
  
  // Track scroll over this entire section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smoothly straighten the image grid from -12deg to 0deg during the first 40% of scroll
  const rotate = useTransform(scrollYProgress, [0, 0.4], ['-12deg', '0deg']);
  // Images scale down slightly as they straighten
  const scale = useTransform(scrollYProgress, [0, 0.4], [1.15, 1]);
  // Images start faded (so text is readable) and become fully opaque as text disappears
  const gridOpacity = useTransform(scrollYProgress, [0, 0.4], [0.35, 1]);
  
  // Grid blurs towards the end of the scroll
  const gridFilter = useTransform(scrollYProgress, [0.5, 0.7], ['blur(0px)', 'blur(16px)']);
  
  // A subtle white overlay fades in to give contrast to the buttons
  const overlayOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 0.6]);

  // Text and radial mask fade out as we scroll
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.3], ['0%', '-20%']);

  // Buttons appear at the center towards the end
  const buttonOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);
  const buttonScale = useTransform(scrollYProgress, [0.5, 0.7], [0.8, 1]);
  const pointerEvents = useTransform(scrollYProgress, v => v > 0.5 ? 'auto' : 'none');


  return (
    <>
    <section
      id="highlights"
      ref={containerRef}
      style={{
        backgroundColor: '#ffffff',
        position: 'relative',
        height: '400vh', // Huge scrollable area
        zIndex: 20, // Sit on top of FAQ to allow buttons to pop out over it
      }}
    >
      {/* Sticky container that stays on screen while we scroll through the 350vh */}
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
        {/* Inner container to crop rotating images without cropping buttons */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          {/* Background animated tilted rows */}
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

        {/* White overlay for contrast when buttons appear */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#ffffff',
            pointerEvents: 'none',
            zIndex: 1, // Above the grid, below the text and buttons
            opacity: overlayOpacity,
          }}
        />

        {/* Radial gradient mask so the text is highly legible against the images */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at center, rgba(255,255,255,1) 0%, rgba(255,255,255,0.6) 40%, rgba(255,255,255,0) 80%)',
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
            <span className="text-black">AI Coding Club's </span>
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: '2px #111111' }}
            >
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
          <Link to="/gallery" className="group relative w-72 h-80 rounded-3xl overflow-hidden shadow-2xl bg-white flex flex-col hover:-translate-y-2 transition-transform duration-300">
            <div className="h-2/3 w-full relative overflow-hidden bg-gray-100">
              <img src="/hackathon/hackathon1.webp" alt="Gallery" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="h-1/3 w-full flex items-center justify-center bg-white/95 backdrop-blur-sm">
              <span className="text-xl font-display font-bold text-slate-900 flex items-center gap-2">
                View Gallery
                <ArrowUpRight className="w-5 h-5 text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
            </div>
          </Link>
          
          <Link to="/members" className="group relative w-72 h-80 rounded-3xl overflow-hidden shadow-2xl bg-white flex flex-col hover:-translate-y-2 transition-transform duration-300">
            <div className="h-2/3 w-full relative overflow-hidden bg-gray-100">
              <img src="/Members/Frame.jpg" alt="Members" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="h-1/3 w-full flex items-center justify-center bg-white/95 backdrop-blur-sm">
              <span className="text-xl font-display font-bold text-slate-900 flex items-center gap-2">
                Our Members
                <ArrowUpRight className="w-5 h-5 text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
    </>
  );
}
