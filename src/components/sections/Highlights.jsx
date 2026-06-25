import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

// ── All AICC event photos ─────────────────────────────────────────────────────
const ALL_PHOTOS = [
  '/hackathon/hackathon1.webp', '/hackathon/hackathon2.webp', '/hackathon/hackathon3.webp',
  '/hackathon/hackathon4.webp', '/hackathon/hackathon5.webp', '/hackathon/hackathon6.webp',
  '/hackathon/hackathon7.webp', '/hackathon/hackathon8.webp',
  '/thinkathon/thinkathon(1).webp', '/thinkathon/thinkathon(2).webp', '/thinkathon/thinkathon(3).webp',
  '/thinkathon/thinkathon(4).webp', '/thinkathon/thinkathon(5).webp',
  '/workshop/workshop(1).webp', '/workshop/workshop(2).webp', '/workshop/workshop(3).webp',
  '/workshop/workshop(4).webp', '/workshop/workshop(5).webp',
  '/hcs/HCS1(1).webp', '/hcs/HCS1(2).webp', '/hcs/HCS1(3).webp', '/hcs/HCS1(4).webp',
  '/life/23-24_1.webp', '/life/23-24_2.webp', '/life/24-25_1.webp', '/life/24-25_2.webp',
  '/life/24-25_3.webp', '/life/25-26_1.webp', '/life/25-26_2.webp', '/life/25-26_3.webp',
  '/Farewel/WhatsApp Image 2026-06-15 at 19.03.56.jpeg', 
  '/Farewel/WhatsApp Image 2026-06-15 at 19.03.57.jpeg', 
  '/Farewel/WhatsApp Image 2026-06-15 at 19.22.55.jpeg',
];

// Split photos into 3 rows
const ROW1 = ALL_PHOTOS.slice(0, 11);
const ROW2 = ALL_PHOTOS.slice(11, 22);
const ROW3 = ALL_PHOTOS.slice(22, 33);

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
  
  // Text and radial mask fade out as we scroll
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.3], ['0%', '-20%']);

  // Buttons appear at the very end of the scroll
  const buttonOpacity = useTransform(scrollYProgress, [0.85, 1], [0, 1]);
  const buttonY = useTransform(scrollYProgress, [0.85, 1], ['20px', '0px']);
  const pointerEvents = useTransform(scrollYProgress, v => v > 0.85 ? 'auto' : 'none');


  return (
    <>
    <section
      id="highlights"
      ref={containerRef}
      style={{
        backgroundColor: '#ffffff',
        position: 'relative',
        height: '350vh', // Huge scrollable area
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
            style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(3rem, 7vw, 6.5rem)',
              lineHeight: 1.1,
              color: '#111111',
              letterSpacing: '-0.02em',
              marginBottom: '16px',
            }}
          >
            AI Coding Club&apos;s
            <br />
            Highlights
          </h2>
        </motion.div>

        {/* Buttons fade in at the very end of the animation */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: '-1.5rem', // Break out of the section!
            left: 0,
            width: '100%',
            opacity: buttonOpacity,
            y: buttonY,
            pointerEvents,
            zIndex: 30,
          }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link to="/gallery" className="btn-moon">
            View Gallery
          </Link>
          <Link to="/members" className="btn-moon">
            Members
          </Link>
        </motion.div>
      </div>
    </section>
    </>
  );
}
