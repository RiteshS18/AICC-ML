import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { Users, CalendarCheck, Zap, Trophy, Rocket } from 'lucide-react';


const cards = [
  {
    id: '01',
    year: '2022',
    icon: Users,
    title: 'Club Founded',
    tag: 'ORIGINS',
    desc: 'The AI Coding Club was born from a shared passion for technology. 10 members set the culture of curiosity, collaboration, and building things that matter.',
    dark: false,
  },
  {
    id: '02',
    year: '2023',
    icon: CalendarCheck,
    title: 'First Hackathon',
    tag: 'MILESTONE',
    desc: 'Year two brought our inaugural hackathon. Membership doubled, workshops deepened, and the first inter-college connections were forged.',
    dark: false,
  },
  {
    id: '03',
    year: '2024',
    icon: Zap,
    title: 'Rising Prominence',
    tag: 'GROWTH',
    desc: 'The club experienced explosive growth, stepping into the spotlight with unprecedented visibility. We orchestrated a diverse lineup of transformative events, directly empowering students to elevate their technical prowess.',
    dark: false,
  },
  {
    id: '04',
    year: '2025',
    icon: Rocket,
    title: 'Flagship Innovations',
    tag: 'EXPANSION',
    desc: 'A landmark year defined by our flagship marquee event, Hackvotrix. We launched a powerful series of skill-building initiatives and workshops, cementing our role as a catalyst for student innovation.',
    dark: false,
  },
  {
    id: '05',
    year: '2026',
    icon: Trophy,
    title: 'The New Era',
    tag: 'TODAY',
    desc: 'Stepping into a new era as a tightly-knit family of 25+ passionate innovators. Our focus runs deep: building collaborative projects, fostering meaningful interactions, and driving a relentless culture of knowledge sharing.',
    dark: true,
  },
];

// Each card reveals at these scroll thresholds (start, full)
const CARD_THRESHOLDS = [
  [0.05, 0.20],
  [0.23, 0.38],
  [0.41, 0.56],
  [0.59, 0.74],
  [0.77, 0.92],
];

// ── Animated card driven by scroll ───────────────────────────────────────────
function ScrollCard({ data, index, progress }) {
  const [startReveal, fullReveal] = CARD_THRESHOLDS[index];

  const opacity = useTransform(progress, [startReveal, fullReveal], [0, 1]);
  const y       = useTransform(progress, [startReveal, fullReveal], [52, 0]);
  const scale   = useTransform(progress, [startReveal, fullReveal], [0.94, 1]);

  const Icon = data.icon;

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="relative rounded-2xl overflow-hidden flex flex-col h-full"
    >
      {/* Card shell */}
      <div
        className="relative flex flex-col h-full rounded-2xl overflow-hidden"
        style={{
          background: data.dark ? '#0d0d0d' : '#ffffff',
          border: data.dark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e4e4e4',
          boxShadow: data.dark
            ? '0 24px 60px rgba(0,0,0,0.5)'
            : '0 4px 32px rgba(0,0,0,0.06)',
          padding: '28px',
          minHeight: '300px',
        }}
      >
        {/* Watermark number */}
        <div
          className="absolute bottom-3 right-4 font-display font-black select-none pointer-events-none"
          style={{
            fontSize: '6.5rem',
            lineHeight: 1,
            color: data.dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
          }}
        >
          {data.id}
        </div>

        {/* Icon box */}
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 flex-shrink-0"
          style={{
            background: data.dark ? 'rgba(255,255,255,0.1)' : '#111111',
          }}
        >
          <Icon
            className="w-[18px] h-[18px]"
            strokeWidth={2}
            style={{ color: '#ffffff' }}
          />
        </div>

        {/* Year */}
        <div className="flex items-baseline gap-2 mb-1">
          <span
            className="font-display font-black leading-none"
            style={{
              fontSize: '3.2rem',
              letterSpacing: '-0.03em',
              color: data.dark ? '#ffffff' : '#111111',
            }}
          >
            {data.year}
          </span>
        </div>

        {/* Title */}
        <h3
          className="font-display font-bold text-lg leading-snug mb-3 mt-1"
          style={{ color: data.dark ? '#ffffff' : '#111111' }}
        >
          {data.title}
        </h3>

        {/* Desc */}
        <p
          className="text-sm leading-relaxed flex-1"
          style={{ color: data.dark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.5)' }}
        >
          {data.desc}
        </p>

        {/* Tag */}
        <div className="mt-5 flex-shrink-0">
          <span
            className="inline-block px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-[0.18em] uppercase"
            style={{
              background: data.dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)',
              color: data.dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)',
            }}
          >
            {data.tag}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ── Timeline node — activates as scroll passes its threshold ─────────────────
function TimelineNode({ data, index, progress }) {
  const [startReveal] = CARD_THRESHOLDS[index];

  const bg = useTransform(
    progress,
    [startReveal - 0.04, startReveal + 0.04],
    [
      '#d4d4d4',
      index === cards.length - 1 ? '#2563eb' : '#111111',
    ]
  );
  const iconColor = useTransform(
    progress,
    [startReveal - 0.04, startReveal + 0.04],
    ['#888888', '#111111']
  );
  const scale = useTransform(
    progress,
    [startReveal - 0.06, startReveal + 0.04],
    [0.75, 1]
  );

  const Icon = data.icon;

  return (
    <motion.div style={{ scale }} className="relative z-10 flex-shrink-0">
      <motion.div
        style={{ background: bg }}
        className="w-10 h-10 rounded-full flex items-center justify-center shadow-md"
      >
        <motion.div style={{ color: iconColor }}>
          <Icon className="w-4 h-4" strokeWidth={2} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ── Blue timeline fill ────────────────────────────────────────────────────────
function TimelineFill({ progress }) {
  const width = useTransform(
    progress,
    [CARD_THRESHOLDS[0][0], CARD_THRESHOLDS[4][1]],
    ['0%', '100%']
  );
  return (
    <motion.div
      className="absolute left-0 top-1/2 -translate-y-1/2 h-[2.5px] rounded-full origin-left"
      style={{ width, background: 'linear-gradient(to right, #1d4ed8, #60a5fa)' }}
    />
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function YearCards() {
  const sectionRef   = useRef(null);
  const [isDesktop, setIsDesktop] = useState(true);
  // Raw progress value fed into ParticleCanvas (plain number, not motion value)
  const [particleProgress, setParticleProgress] = useState(0);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Mirror scroll progress into state so ParticleCanvas re-renders
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setParticleProgress(latest);
  });

  const xTransform = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const x          = isDesktop ? xTransform : 0;

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="relative"
      style={{ height: '500vh' }}
    >
      {/* ── Sticky viewport ─────────────────────────────────────────────── */}
      <div className="sticky top-0 h-[100dvh] flex flex-col justify-center overflow-hidden">

        {/* ── White background ──────────────────────────────────────────── */}
        <div className="absolute inset-0 z-0" style={{ background: '#ffffff' }} />

        {/* ── Content ─────────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto w-full px-6 md:px-10 relative z-[2]">

          {/* Header */}
          <div className="mb-10">
            <h2
              className="font-display font-black leading-none tracking-tight"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)' }}
            >
              <span className="text-black">Our </span>
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: '2px #111111' }}
              >
                Journey.
              </span>
            </h2>
          </div>

          <motion.div style={{ x }} className="w-full lg:w-[125%]">
            {/* Timeline */}
            <div className="relative flex items-center mb-10 px-5">
              {/* Gray track */}
              <div
                className="absolute left-5 right-5 top-1/2 -translate-y-1/2 h-[2.5px] rounded-full"
                style={{ background: 'rgba(0,0,0,0.08)' }}
              />
              {/* Animated blue fill */}
              <TimelineFill progress={scrollYProgress} />
              {/* Nodes */}
              <div className="relative flex justify-between w-full">
                {cards.map((card, i) => (
                  <TimelineNode
                    key={card.id}
                    data={card}
                    index={i}
                    progress={scrollYProgress}
                  />
                ))}
              </div>
            </div>

            {/* 5 Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {cards.map((card, i) => (
                <ScrollCard
                  key={card.id}
                  data={card}
                  index={i}
                  progress={scrollYProgress}
                />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
