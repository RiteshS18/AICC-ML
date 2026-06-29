import { useState, useEffect } from 'react';
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
        <span style={{ color: '#4f46e5' }}>Department of AI</span>
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
  exit: { opacity: 0 }
};

const letterVariants = {
  hidden: { opacity: 0, y: 10, filter: 'blur(4px)' },
  initialPhase: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  expanded: { opacity: 1, y: 0, filter: 'blur(0px)' },
  front: { opacity: 0, filter: 'blur(10px)' }
};

const logoVariants = {
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
  }
};

// ── Scene 5: AICC → AI Coding Club reveal ─────────────────────────────────────
function SceneAICC({ onDone }) {
  const [phase, setPhase] = useState('hidden');

  useEffect(() => {
    // 0ms -> immediately start initial phase
    setPhase('initialPhase');

    // 2s: wait 1s for AICC typing (1s) + 1s hold
    const t0 = setTimeout(() => setPhase('expanded'), 2000); 

    // 5s: 1s to expand + 2s hold = 3s wait from expanded start
    const t1 = setTimeout(() => setPhase('front'), 5000); 

    // 6s: 1s after logo starts coming to the front, trigger the final morph travel
    const t2 = setTimeout(onDone, 6000);
    return () => [t0, t1, t2].forEach(clearTimeout);
  }, [onDone]);

  const isExpanded = phase === 'expanded' || phase === 'front';
  const isFront = phase === 'front';

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
      className="absolute inset-0 flex items-center justify-center overflow-hidden px-2"
    >
      {/* Ghost logo -> Cinematic Logo -> Morph Target */}
      <motion.img
        layoutId="main-logo"
        src="/aicc-logo.webp"
        alt=""
        aria-hidden="true"
        variants={logoVariants}
        initial="hidden"
        animate={phase}
        style={{
          position: 'absolute',
          width: 'clamp(260px, 40vw, 500px)',
          height: 'clamp(260px, 40vw, 500px)',
          objectFit: 'contain',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: isFront ? 50 : 0,
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
        {scene === 4 && <SceneAICC      key="s4" onDone={onComplete} />}
      </AnimatePresence>
    </motion.div>
  );
}
