import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Typewriter hook ───────────────────────────────────────────────────────────
function useTypewriter(text, speed = 42, active = true) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) return;
    setDisplayed('');
    setDone(false);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(id); setDone(true); }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, active]);

  return { displayed, done };
}

// ── Scene 1: Typewriter ───────────────────────────────────────────────────────
function SceneTypewriter({ onDone }) {
  const text = 'Every Department Has Clubs, Societies & Communities, Etc.';
  const { displayed, done } = useTypewriter(text, 42, true);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!done) return;
    const t1 = setTimeout(() => setVisible(false), 1000);
    const t2 = setTimeout(onDone, 1700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [done, onDone]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-8 md:px-20"
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <p className="font-display text-center leading-snug max-w-3xl text-black"
        style={{ fontSize: 'clamp(1.5rem, 3.2vw, 2.6rem)', fontWeight: 500, letterSpacing: '-0.01em' }}>
        {displayed}
        {!done && (
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.7, repeat: Infinity }}
            className="inline-block w-[2px] h-[1em] bg-black ml-1 align-middle"
          />
        )}
      </p>
    </motion.div>
  );
}

// ── Scene 2: Word-by-word ─────────────────────────────────────────────────────
function SceneWordByWord({ onDone }) {
  // line1: plain weight — "Few Conduct Events."
  const line1 = ['Few', 'Conduct', 'Events.'];
  // line2: bold — "And only Few Shape"
  const line2 = ['And', 'only', 'Few', 'Shape'];
  // bigWord: "Generations." displayed big & centered below
  const bigWord = 'Generations.';

  const totalWords = line1.length + line2.length + 1; // +1 for big word
  const lastDelay = 0.1 * (totalWords - 1);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const pause = (lastDelay + 1.3) * 1000;
    const t1 = setTimeout(() => setVisible(false), pause);
    const t2 = setTimeout(onDone, pause + 650);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone, lastDelay]);

  let idx = 0;
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-8 md:px-20"
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <div className="text-center max-w-4xl">

        {/* Line 1 — plain weight: "Few Conduct Events." */}
        <div className="flex flex-wrap justify-center items-baseline gap-x-3 mb-3">
          {line1.map((word) => {
            const i = idx++;
            return (
              <motion.span
                key={`l1-${i}`}
                initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.5, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block text-black"
                style={{
                  fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)',
                  fontWeight: 400,
                  letterSpacing: '-0.015em',
                  fontFamily: 'var(--font-display, inherit)',
                }}
              >
                {word}
              </motion.span>
            );
          })}
        </div>

        {/* Line 2 — bold: "And only Few Shape" */}
        <div className="flex flex-wrap justify-center items-baseline gap-x-3 mb-1">
          {line2.map((word) => {
            const i = idx++;
            return (
              <motion.span
                key={`l2-${i}`}
                initial={{ opacity: 0, y: 24, filter: 'blur(5px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.55, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block text-black"
                style={{
                  fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.015em',
                  fontFamily: 'var(--font-display, inherit)',
                  lineHeight: 1,
                }}
              >
                {word}
              </motion.span>
            );
          })}
        </div>

        {/* Big word — "Generations." large & centered */}
        {(() => {
          const i = idx++;
          return (
            <div className="flex justify-center">
              <motion.span
                key={`big2-${i}`}
                initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.6, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block text-black"
                style={{
                  fontSize: 'clamp(3rem, 7.5vw, 6.5rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.04em',
                  fontFamily: 'var(--font-display, inherit)',
                  lineHeight: 1,
                }}
              >
                {bigWord}
              </motion.span>
            </div>
          );
        })()}

      </div>
    </motion.div>
  );
}

// ── Scene 3: Simple fade phrase ───────────────────────────────────────────────
function SceneFade({ text, onDone, fadeIn = 800, hold = 1100 }) {
  const [phase, setPhase] = useState('in');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('hold'), fadeIn);
    const t2 = setTimeout(() => setPhase('out'), fadeIn + hold);
    const t3 = setTimeout(onDone, fadeIn + hold + 700);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone, fadeIn, hold]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-8 md:px-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: phase === 'out' ? 0 : 1 }}
      transition={{ duration: phase === 'out' ? 0.65 : 0.75, ease: 'easeInOut' }}
    >
      <p className="text-center text-black max-w-2xl"
        style={{ fontSize: 'clamp(2rem, 4.5vw, 3.6rem)', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.15, fontFamily: 'var(--font-display, inherit)' }}>
        {text}
      </p>
    </motion.div>
  );
}

// ── Scene 4: "First Club of Dept of AI" ───────────────────────────────────────
function SceneFirstClub({ onDone }) {
  const [phase, setPhase] = useState('in');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('hold'), 800);
    const t2 = setTimeout(() => setPhase('out'), 2200);
    const t3 = setTimeout(onDone, 2900);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: phase === 'out' ? 0 : 1 }}
      transition={{ duration: phase === 'out' ? 0.7 : 0.8, ease: 'easeInOut' }}
    >
      <p className="text-center text-black/40 tracking-[0.22em] uppercase text-xs font-bold">
        Kongu Engineering College · Dept of AI
      </p>
      <p className="text-center text-black"
        style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4.2rem)', fontWeight: 800, letterSpacing: '-0.02em', fontFamily: 'var(--font-display, inherit)', lineHeight: 1.2 }}>
        The First Club of the
        <br />
        <span style={{ color: 'var(--color-primary)' }}>Department of AI</span>
      </p>
    </motion.div>
  );
}

// ── Scene 5: AICC → AI Coding Club reveal ─────────────────────────────────────
const screenVariants = {
  visible: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1], staggerChildren: 0 } }
};

const textContainerVariants = {
  hidden: { opacity: 1, y: 15, gap: '0.2em' },
  initialPhase: {
    opacity: 1,
    y: 0,
    gap: '0.2em',
    transition: { staggerChildren: 0.12, delayChildren: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  },
  expanded: (isExpanded) => ({
    opacity: 1,
    y: 0,
    gap: isExpanded ? '0.5em' : '0.2em',
    transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] }
  }),
  front: { 
    opacity: 0, 
    scale: 1.05, 
    filter: 'blur(10px)', 
    gap: '0.5em',
    transition: { duration: 0.6 } 
  },
  disintegrate: { 
    opacity: 0, 
    scale: 1.05, 
    filter: 'blur(10px)', 
    gap: '0.5em',
    transition: { duration: 0.6 } 
  },
  exit: { opacity: 0 }
};

const letterVariants = {
  hidden: { opacity: 0, y: 10, filter: 'blur(4px)' },
  initialPhase: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  expanded: { opacity: 1, y: 0, filter: 'blur(0px)' },
  front: { opacity: 0, filter: 'blur(10px)' },
  disintegrate: { opacity: 0, filter: 'blur(10px)' }
};

const logoLeftVariants = {
  hidden: { opacity: 0, scale: 1.15, filter: 'grayscale(100%) blur(10px)' },
  initialPhase: { 
    opacity: 0.07, 
    scale: 1.05, 
    filter: 'grayscale(100%) blur(0px)', 
    transition: { duration: 1.5, ease: 'easeOut' } 
  },
  expanded: { 
    opacity: 0.07, 
    scale: 1, 
    filter: 'grayscale(100%) blur(0px)', 
    transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] } 
  },
  front: { 
    opacity: 1, 
    scale: 1.15, 
    filter: 'grayscale(0%) blur(0px)', 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  },
  disintegrate: {
    opacity: 0,
    transition: { duration: 0.05 }
  }
};

const finalLeftVariants = {
  hidden: { opacity: 0, scale: 0.85, filter: 'blur(10px)' },
  initialPhase: { opacity: 0, scale: 0.85, filter: 'blur(10px)' },
  expanded: { opacity: 0, scale: 0.85, filter: 'blur(10px)' },
  front: { opacity: 0, scale: 0.85, filter: 'blur(10px)' },
  disintegrate: {
    opacity: 1,
    scale: 0.85,
    filter: 'blur(0px)',
    transition: { duration: 0.6, delay: 3.0, ease: 'easeOut' }
  }
};

const finalRightVariants = {
  hidden: { opacity: 0, scale: 0.85, filter: 'blur(10px)' },
  initialPhase: { opacity: 0, scale: 0.85, filter: 'blur(10px)' },
  expanded: { opacity: 0, scale: 0.85, filter: 'blur(10px)' },
  front: { opacity: 0, scale: 0.85, filter: 'blur(10px)' },
  disintegrate: {
    opacity: 1,
    scale: 0.85,
    filter: 'blur(0px)',
    transition: { duration: 0.6, delay: 3.0, ease: 'easeOut' }
  }
};
// ── Disintegrating Logo (Avengers Infinity War Snapping Canvas Effect) ──────────
function DisintegratingLogo({ active, srcOld, srcNew, width = 300, height = 300 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animId;
    let loadedCount = 0;

    const onImageLoad = () => {
      loadedCount++;
      if (loadedCount < 2) return;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      const sampleWidth = 100;
      const sampleHeight = 100;

      const canvasOld = document.createElement('canvas');
      canvasOld.width = sampleWidth;
      canvasOld.height = sampleHeight;
      const ctxOld = canvasOld.getContext('2d');
      ctxOld.drawImage(imgOld, 0, 0, sampleWidth, sampleHeight);
      const dataOld = ctxOld.getImageData(0, 0, sampleWidth, sampleHeight).data;

      const canvasNew = document.createElement('canvas');
      canvasNew.width = sampleWidth;
      canvasNew.height = sampleHeight;
      const ctxNew = canvasNew.getContext('2d');
      ctxNew.drawImage(imgNew, 0, 0, sampleWidth, sampleHeight);
      const dataNew = ctxNew.getImageData(0, 0, sampleWidth, sampleHeight).data;

      const oldPoints = [];
      const newPoints = [];

      const centerX = width / 2;
      const centerY = height / 2;
      const logoSize = Math.max(220, Math.min(width * 0.3, 400));

      for (let y = 0; y < sampleHeight; y += 2) {
        for (let x = 0; x < sampleWidth; x += 2) {
          const idx = (y * sampleWidth + x) * 4;
          
          if (dataOld[idx + 3] > 40) {
            oldPoints.push({
              x: (x / sampleWidth) * logoSize,
              y: (y / sampleHeight) * logoSize,
              r: dataOld[idx],
              g: dataOld[idx + 1],
              b: dataOld[idx + 2],
              a: dataOld[idx + 3] / 255
            });
          }

          if (dataNew[idx + 3] > 40) {
            const nr = dataNew[idx];
            const ng = dataNew[idx + 1];
            const nb = dataNew[idx + 2];
            
            // Calculate distance from center (50, 50) of the 100x100 sample grid
            const dx = x - 50;
            const dy = y - 50;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Filter out white background (nr, ng, nb > 240) and clip square corners (dist > 48)
            const isWhiteBackground = nr > 240 && ng > 240 && nb > 240;
            const isOutsideCircle = dist > 48;

            if (!isWhiteBackground && !isOutsideCircle) {
              newPoints.push({
                x: (x / sampleWidth) * logoSize,
                y: (y / sampleHeight) * logoSize,
                r: nr,
                g: ng,
                b: nb,
                a: dataNew[idx + 3] / 255
              });
            }
          }
        }
      }

      if (oldPoints.length === 0 || newPoints.length === 0) {
        console.warn("Failed to sample pixels from logos. oldPoints:", oldPoints.length, "newPoints:", newPoints.length);
        return;
      }

      const shuffle = (arr) => {
        for (let k = arr.length - 1; k > 0; k--) {
          const j = (Math.random() * (k + 1)) | 0;
          [arr[k], arr[j]] = [arr[j], arr[k]];
        }
      };
      shuffle(oldPoints);
      shuffle(newPoints);

      const particleCount = 2400;
      const particles = [];

      for (let i = 0; i < particleCount; i++) {
        const isLeft = i < particleCount / 2;
        const start = oldPoints[i % oldPoints.length];
        
        const startX = centerX - logoSize / 2 + start.x;
        const startY = centerY - logoSize / 2 + start.y;

        const margin = width * 0.03;
        let targetX, targetY, targetR, targetG, targetB, targetA;
        if (isLeft) {
          const target = oldPoints[i % oldPoints.length];
          targetX = centerX - margin - logoSize + target.x;
          targetY = centerY - logoSize / 2 + target.y;
          targetR = target.r;
          targetG = target.g;
          targetB = target.b;
          targetA = target.a;
        } else {
          const target = newPoints[(i - particleCount / 2) % newPoints.length];
          targetX = centerX + margin + target.x;
          targetY = centerY - logoSize / 2 + target.y;
          targetR = target.r;
          targetG = target.g;
          targetB = target.b;
          targetA = target.a;
        }

        particles.push({
          x: startX,
          y: startY,
          scatteredX: 0,
          scatteredY: 0,
          startX,
          startY,
          tx: targetX,
          ty: targetY,
          sr: start.r, sg: start.g, sb: start.b, sa: start.a,
          tr: targetR, tg: targetG, tb: targetB, ta: targetA,
          vx: isLeft ? (Math.random() - 0.75) * 1.5 : (Math.random() - 0.25) * 1.5,
          vy: (Math.random() - 0.6) * 1.2,
          size: Math.random() * 1.5 + 0.8,
          seed: Math.random() * 100,
        });
      }

      let startTime = null;

      function easeInOutCubic(x) {
        return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
      }

      function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = (timestamp - startTime) / 1000;

        ctx.clearRect(0, 0, width, height);

        let canvasAlpha = 1.0;
        if (elapsed > 3.0) {
          canvasAlpha = Math.max(0, 1 - (elapsed - 3.0) / 0.6);
        }

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          let x, y, r, g, b, a;

          if (elapsed < 0.8) {
            p.x += p.vx;
            p.y += p.vy;
            p.vx += (Math.random() - 0.5) * 0.1;
            p.vy += (Math.random() - 0.55) * 0.1;

            x = p.x;
            y = p.y;
            r = p.sr;
            g = p.sg;
            b = p.sb;
            a = p.sa;

            p.scatteredX = p.x;
            p.scatteredY = p.y;
          } else {
            const pct = Math.min(1.0, (elapsed - 0.8) / 1.8);
            const ease = easeInOutCubic(pct);

            const wiggleAmp = 8 * (1 - ease);
            const wiggleX = Math.sin(elapsed * 10 + p.seed) * wiggleAmp;
            const wiggleY = Math.cos(elapsed * 10 + p.seed) * wiggleAmp;

            x = p.scatteredX + (p.tx - p.scatteredX) * ease + wiggleX;
            y = p.scatteredY + (p.ty - p.scatteredY) * ease + wiggleY;

            r = p.sr + (p.tr - p.sr) * ease;
            g = p.sg + (p.tg - p.sg) * ease;
            b = p.sb + (p.tb - p.sb) * ease;
            a = p.sa + (p.ta - p.sa) * ease;
          }

          ctx.beginPath();
          ctx.arc(x, y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${a * canvasAlpha})`;
          ctx.fill();
        }

        if (elapsed < 3.8) {
          animId = requestAnimationFrame(animate);
        }
      }

      animId = requestAnimationFrame(animate);
    };

    const imgOld = new Image();
    imgOld.onload = onImageLoad;
    imgOld.src = srcOld;

    const imgNew = new Image();
    imgNew.onload = onImageLoad;
    imgNew.src = srcNew;

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [active, srcOld, srcNew, width, height]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width,
        height,
        position: 'absolute',
        pointerEvents: 'none',
        zIndex: 60,
        overflow: 'visible', // Allow particles to travel outside canvas limits
      }}
    />
  );
}

// ── Scene 5: AICC → AI Coding Club reveal ─────────────────────────────────────
function SceneAICC({ onDone }) {
  const [phase, setPhase] = useState('hidden');
  const measureRef = useRef(null);
  const [rect, setRect] = useState({ width: 300, height: 300 });

  useEffect(() => {
    if (measureRef.current) {
      const r = measureRef.current.getBoundingClientRect();
      setRect({ width: r.width, height: r.height });
    }
  }, [phase]);

  useEffect(() => {
    // 0ms -> immediately start initial phase
    setPhase('initialPhase');

    // 2s: wait 1s for AICC typing (1s) + 1s hold
    const t0 = setTimeout(() => setPhase('expanded'), 2000); 

    // 5s: 1s to expand + 2s hold = 3s wait from expanded start
    const t1 = setTimeout(() => setPhase('front'), 5000); 

    // 6.0s: wait 1.0s for logo to come to front, then start disintegration
    const t2 = setTimeout(() => setPhase('disintegrate'), 6000);

    // 9.8s: wait 3.8s for disintegration + slow slide-out to complete and hold, then trigger onDone
    const t3 = setTimeout(onDone, 9800);
    return () => [t0, t1, t2, t3].forEach(clearTimeout);
  }, [onDone]);

  const isExpanded = phase === 'expanded' || phase === 'front' || phase === 'disintegrate';
  const isFront = phase === 'front' || phase === 'disintegrate';

  const textStyle = {
    fontSize: 'clamp(2rem, 7.5vw, 8rem)',
    fontWeight: 900,
    letterSpacing: '-0.045em',
    lineHeight: 1,
    color: '#0a0a0a',
    fontFamily: '"Plus Jakarta Sans", "Helvetica Neue", system-ui, sans-serif',
    display: 'inline-block',
  };

  return (
    <motion.div
      ref={measureRef}
      className="absolute inset-0 flex items-center justify-center overflow-hidden px-2"
    >
      {/* Disintegrating Canvas (Infinity War ash dusting + merge effect) */}
      {phase === 'disintegrate' && (
        <DisintegratingLogo
          active={true}
          srcOld="/aicc-logo.webp"
          srcNew="/aiml-logo.jpg"
          width={rect.width}
          height={rect.height}
        />
      )}

      {/* Static Old Logo (visible until disintegration starts) */}
      <motion.img
        src="/aicc-logo.webp"
        alt="AICC Old Logo"
        variants={logoLeftVariants}
        initial="hidden"
        animate={phase}
        style={{
          position: 'absolute',
          width: 'clamp(220px, 30vw, 400px)',
          height: 'clamp(220px, 30vw, 400px)',
          objectFit: 'contain',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: isFront ? 50 : 10,
        }}
      />

      {/* Final Left Logo (Slides out from center, morph target) */}
      <motion.img
        layoutId="old-logo"
        src="/aicc-logo.webp"
        alt="AICC Old Logo"
        variants={finalLeftVariants}
        initial="hidden"
        animate={phase}
        style={{
          position: 'absolute',
          right: '50%',
          marginRight: '3vw',
          width: 'clamp(220px, 30vw, 400px)',
          height: 'clamp(220px, 30vw, 400px)',
          objectFit: 'contain',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: phase === 'disintegrate' ? 49 : 0,
        }}
      />

      {/* Final Right Logo (Slides out from center, morph target) */}
      <motion.img
        layoutId="new-logo"
        src="/aiml-logo.jpg"
        alt="AICC New Logo"
        variants={finalRightVariants}
        initial="hidden"
        animate={phase}
        className="rounded-full"
        style={{
          position: 'absolute',
          left: '50%',
          marginLeft: '3vw',
          width: 'clamp(220px, 30vw, 400px)',
          height: 'clamp(220px, 30vw, 400px)',
          objectFit: 'contain',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: phase === 'disintegrate' ? 49 : 0,
        }}
      />

      {/* All text in one baseline-aligned flex row */}
      <motion.div
        className="relative z-10 flex items-baseline justify-center"
        variants={textContainerVariants}
        custom={isExpanded}
        initial="hidden"
        animate={phase}
      >
        {/* Word 1: AI */}
        <span style={{ display: 'inline-flex', alignItems: 'baseline' }}>
          <motion.span variants={letterVariants} style={textStyle}>A</motion.span>
          <motion.span variants={letterVariants} style={textStyle}>I</motion.span>
        </span>

        {/* Word 2: C + expanding "oding" */}
        <span style={{ display: 'inline-flex', alignItems: 'baseline' }}>
          <motion.span variants={letterVariants} style={textStyle}>C</motion.span>
          <motion.span
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            style={{ ...textStyle, overflow: 'hidden', whiteSpace: 'nowrap', display: 'inline-block' }}
          >
            oding
          </motion.span>
        </span>

        {/* Word 3: C + expanding "lub" */}
        <span style={{ display: 'inline-flex', alignItems: 'baseline' }}>
          <motion.span variants={letterVariants} style={textStyle}>C</motion.span>
          <motion.span
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 1.0, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ ...textStyle, overflow: 'hidden', whiteSpace: 'nowrap', display: 'inline-block' }}
          >
            lub
          </motion.span>
        </span>
      </motion.div>
    </motion.div>
  );
}

// ── Main Intro Screen ─────────────────────────────────────────────────────────
export default function IntroScreen({ onComplete }) {
  const [scene, setScene] = useState(0);

  const advance = () => setScene(s => s + 1);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-white"
      variants={screenVariants}
      initial="visible"
      animate="visible"
      exit="exit"
    >
      <AnimatePresence mode="wait">
        {scene === 0 && <SceneTypewriter  key="s0" onDone={advance} />}
        {scene === 1 && <SceneWordByWord  key="s1" onDone={advance} />}
        {scene === 2 && (
          <SceneFade key="s2" text="Now Its Time For Us." onDone={advance} fadeIn={800} hold={1100} />
        )}
        {scene === 3 && <SceneFirstClub key="s3" onDone={advance} />}
        {scene === 4 && <SceneAICC key="s4" onDone={onComplete} />}
      </AnimatePresence>
      <button 
        onClick={onComplete}
        className="fixed bottom-6 right-8 text-sm font-semibold text-black/40 hover:text-black/80 transition-colors z-50 uppercase tracking-widest"
      >
        Skip
      </button>
    </motion.div>
  );
}
