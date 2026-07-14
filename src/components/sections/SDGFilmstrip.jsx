import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';

const goals = [
  { id: '01', title: 'No Poverty',                              color: '#E5243B', desc: 'AI helps identify poverty hotspots, optimise resource distribution, and connect underserved communities with financial and social services — driving equitable access for all.' },
  { id: '02', title: 'Zero Hunger',                             color: '#DDA63A', desc: 'Through smart agriculture, crop-yield prediction, and supply-chain analytics, AI-powered solutions reduce food waste and strengthen global food security.' },
  { id: '03', title: 'Good Health & Well-being',               color: '#4C9F38', desc: 'From early disease detection to personalised medicine, AI accelerates diagnostics and makes quality healthcare accessible in even the most remote regions.' },
  { id: '04', title: 'Quality Education',                       color: '#C5192D', desc: 'Adaptive learning platforms powered by AI personalise each student\'s journey, helping educators identify gaps and providing world-class education to everyone.' },
  { id: '05', title: 'Gender Equality',                         color: '#FF3A21', desc: 'AI surfaces and counters systemic bias in hiring, lending, and policy — empowering women and marginalised groups with data-driven advocacy and equal opportunity.' },
  { id: '06', title: 'Clean Water & Sanitation',               color: '#26BDE2', desc: 'Predictive models monitor water quality in real-time, detect leaks, and optimise purification — ensuring safe water for communities around the world.' },
  { id: '07', title: 'Affordable & Clean Energy',              color: '#FCC30B', desc: 'AI optimises energy grids, forecasts renewable output, and cuts waste — making clean energy cheaper, smarter, and reliably available at scale.' },
  { id: '08', title: 'Decent Work & Economic Growth',          color: '#A21942', desc: 'By automating repetitive tasks and uncovering new market insights, AI frees humans for creative work and fuels inclusive economic growth across industries.' },
  { id: '09', title: 'Industry, Innovation & Infrastructure',  color: '#FD6925', desc: 'Smart manufacturing, predictive maintenance, and AI-driven R&D compress innovation cycles — building resilient infrastructure for tomorrow\'s economy.' },
  { id: '10', title: 'Reduced Inequalities',                   color: '#DD1367', desc: 'Fair AI audits bias in algorithms and public policy, helping governments craft solutions that bridge the digital divide and reduce socioeconomic gaps.' },
  { id: '11', title: 'Sustainable Cities & Communities',       color: '#FD9D24', desc: 'Urban AI models optimise traffic, waste, energy use, and emergency response — making cities greener, safer, and more liveable for every resident.' },
  { id: '12', title: 'Responsible Consumption & Production',   color: '#BF8B2E', desc: 'AI traces supply chains for ethical sourcing, predicts demand to cut overproduction, and guides circular-economy initiatives toward zero waste.' },
  { id: '13', title: 'Climate Action',                         color: '#3F7E44', desc: 'Machine-learning models analyse climate patterns, optimise carbon capture, and guide policy — giving humanity its best tool yet to fight the climate crisis.' },
  { id: '14', title: 'Life Below Water',                       color: '#0A97D9', desc: 'Computer vision monitors ocean health, tracks illegal fishing, and models marine ecosystems — protecting biodiversity beneath the surface.' },
  { id: '15', title: 'Life on Land',                           color: '#56C02B', desc: 'Satellite AI detects deforestation in real-time, guides reforestation efforts, and monitors endangered species — safeguarding terrestrial ecosystems.' },
  { id: '16', title: 'Peace, Justice & Strong Institutions',   color: '#00689D', desc: 'AI improves transparency in governance, speeds up justice systems, and helps detect corruption — strengthening institutions that underpin peaceful societies.' },
  { id: '17', title: 'Partnerships for the Goals',             color: '#19486A', desc: 'Open-source AI collaboration across borders amplifies the impact of every SDG — connecting governments, NGOs, and innovators around shared data and solutions.' },
];

// ── Heading that animates in once on scroll ──
function AnimatedHeader({ isInView }) {
  const title = "Our Vision";
  const titleWords = title.split(' ');

  return (
    <div className="text-center pointer-events-none">
      {/* Eyebrow */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <motion.div
          className="h-px rounded-full"
          style={{ background: 'linear-gradient(to right, var(--color-primary), var(--color-accent))' }}
          initial={{ width: 0, opacity: 0 }}
          animate={isInView ? { width: 24, opacity: 1 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.p
          className="text-primary text-xs font-bold tracking-[0.22em] uppercase"
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          IMPACT
        </motion.p>
        <motion.div
          className="h-px rounded-full"
          style={{ background: 'linear-gradient(to right, var(--color-accent), var(--color-primary))' }}
          initial={{ width: 0, opacity: 0 }}
          animate={isInView ? { width: 24, opacity: 1 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* Title words blur-fade up */}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text tracking-tight leading-tight">
        {titleWords.map((word, i) => (
          <motion.span
            key={word + i}
            className="inline-block"
            style={{ marginRight: '0.28em' }}
            initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
            animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{
              duration: 0.6,
              delay: 0.28 + i * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        ))}
      </h2>
    </div>
  );
}

// ── Description panel shown below the filmstrip ──
function DescPanel({ goal, direction }) {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={goal.id}
        custom={direction}
        variants={{
          enter: (dir) => ({ opacity: 0, y: dir > 0 ? 16 : -16, filter: 'blur(4px)' }),
          center: { opacity: 1, y: 0, filter: 'blur(0px)' },
          exit:  (dir) => ({ opacity: 0, y: dir > 0 ? -12 : 12, filter: 'blur(4px)' }),
        }}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-3xl mx-auto text-center px-6"
      >
        {/* Coloured badge */}
        <span
          className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white tracking-widest uppercase mb-3"
          style={{ backgroundColor: goal.color }}
        >
          SDG {goal.id}
        </span>

        {/* Goal title */}
        <p className="text-base md:text-lg font-display font-bold text-text mb-2">
          {goal.title}
        </p>

        {/* Description */}
        <p className="text-sm md:text-base text-text-secondary leading-relaxed">
          {goal.desc}
        </p>
      </motion.div>
    </AnimatePresence>
  );
}

export default function SDGFilmstrip() {
  const sectionRef  = useRef(null);
  const headerRef   = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.5 });

  const { scrollYProgress } = useScroll({ target: sectionRef });

  // Active card index derived from scroll
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = scrolling down, -1 = up

  // Horizontal translate: move the strip so we end near the last card
  // Card width ≈ 148px + 16px gap = 164px × 17 cards = 2788px; container starts at ~10vw
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-78%']);

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      const newIdx = Math.round(v * (goals.length - 1));
      const clamped = Math.max(0, Math.min(goals.length - 1, newIdx));
      setActiveIdx(prev => {
        if (prev !== clamped) setDirection(clamped > prev ? 1 : -1);
        return clamped;
      });
    });
    return unsub;
  }, [scrollYProgress]);

  const activeGoal = goals[activeIdx];

  return (
    <section
      ref={sectionRef}
      id="filmstrip"
      className="relative bg-white text-text"
      style={{ height: '400vh' }}
    >
      <div className="sticky top-0 flex flex-col h-screen items-center justify-center overflow-hidden gap-0">

        {/* ── Heading ── */}
        <div ref={headerRef} className="w-full px-6 mb-6 mt-[-2vh]">
          <AnimatedHeader isInView={isHeaderInView} />
        </div>

        {/* ── Filmstrip row ── */}
        <div className="w-full overflow-hidden">
          <motion.div
            style={{ x }}
            className="flex gap-4 pl-[10vw] pr-[10vw] min-w-max"
          >
            {goals.map((goal, i) => {
              const isActive = activeIdx === i;
              return (
                <motion.div
                  key={goal.id}
                  animate={{
                    scale: isActive ? 1 : 0.82,
                    opacity: isActive ? 1 : 0.45,
                    boxShadow: isActive
                      ? `0 0 15px 2px ${goal.color}aa`
                      : `none`,
                  }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer"
                  style={{
                    backgroundColor: goal.color,
                    width: '224px',
                    height: '296px',
                  }}
                >
                  {/* Subtle cross-hatch texture */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)`,
                      backgroundSize: '8px 8px',
                    }}
                  />

                  {/* Large number watermark */}
                  <div className="absolute -bottom-4 -right-3 text-[120px] font-display font-black text-black/20 leading-none select-none">
                    {goal.id}
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 p-5 flex flex-col justify-between z-10">
                    <div>
                      <p className="text-white/75 font-bold tracking-wider uppercase text-[13px] mb-2">
                        SDG {goal.id}
                      </p>
                      <h3 className="text-lg md:text-xl font-display font-bold text-white leading-snug drop-shadow-sm">
                        {goal.title}
                      </h3>
                    </div>

                    {/* Active indicator dot */}
                    <motion.div
                      animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.4 }}
                      transition={{ duration: 0.3 }}
                      className="w-2 h-2 rounded-full bg-white/90"
                    />
                  </div>

                  {/* Bottom gradient on active */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* ── Description panel ── */}
        <div className="w-full mt-8 px-4" style={{ minHeight: '100px' }}>
          {/* Thin coloured bar */}
          <motion.div
            className="mx-auto mb-5 rounded-full"
            animate={{ backgroundColor: activeGoal.color }}
            transition={{ duration: 0.4 }}
            style={{ width: 40, height: 3 }}
          />
          <DescPanel goal={activeGoal} direction={direction} />
        </div>

        {/* Scroll cue */}
        <p className="absolute bottom-8 text-[11px] text-text-muted tracking-widest uppercase opacity-60">
          scroll to explore
        </p>
      </div>
    </section>
  );
}
