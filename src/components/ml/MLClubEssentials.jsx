import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';

const essentials = [
  { id: '01', title: 'Workshops & Training', desc: 'Engaging, hands-on sessions covering the latest in AI, Machine Learning, and Full-Stack Development.' },
  { id: '02', title: 'Real-World Projects', desc: 'Collaborate with peers to build intelligent solutions from scratch and deploy them to the world.' },
  { id: '03', title: 'Flagship Hackathons', desc: 'Compete in our flagship hackathons, push your limits, and win exciting prizes while innovating.' },
  { id: '04', title: 'No Prerequisites', desc: 'Whether you are a beginner or an expert, if you have the passion to learn, you belong here.' },
  { id: '05', title: 'Industry Connect', desc: 'Interact with industry professionals, gain insights, and prepare yourself for the corporate world.' },
];

const community = [
  { id: '06', title: 'Form a Team', desc: 'Find like-minded individuals, form teams, and tackle challenges together in a collaborative environment.' },
  { id: '07', title: 'Mentorship', desc: 'Receive dedicated guidance from experienced seniors and faculty members to accelerate your growth.' },
  { id: '08', title: 'Resource Hub', desc: 'Gain access to a curated repository of premium learning materials, templates, and coding resources.' },
  { id: '09', title: 'Interactive Meets', desc: 'Join our regular meetups to discuss emerging tech trends, brainstorm ideas, and network.' },
  { id: '10', title: 'Safe & Inclusive', desc: 'We foster a welcoming, respectful, and highly supportive environment for everyone.' },
];

const allItems = [...essentials, ...community];

function EssentialCard({ item, isSelected }) {
  return (
    <div
      className={`w-[65vw] sm:w-[35vw] md:w-[240px] flex-shrink-0 overflow-hidden flex flex-col justify-between h-[300px] p-7 rounded-2xl relative transition-all duration-500 ease-out cursor-pointer ${
        isSelected
          ? 'scale-105 z-20 opacity-100'
          : 'scale-95 z-10 opacity-70 hover:opacity-95'
      }`}
      style={{
        background: isSelected ? 'var(--gold-gradient)' : 'var(--surface)',
        color: isSelected ? 'var(--btn-primary-text)' : 'var(--text)',
        border: isSelected ? '2px solid var(--gold)' : '1.5px solid var(--border)',
        boxShadow: isSelected
          ? '0 16px 40px -8px var(--shadow-glow), 0 0 24px -4px var(--shadow-glow)'
          : '0 4px 20px -4px var(--shadow-color)',
      }}
    >
      <div className="flex flex-col gap-3 items-start relative z-10">
        <span
          className="text-5xl font-display font-black tracking-tight"
          style={{
            color: isSelected ? 'var(--btn-primary-text)' : 'var(--gold-text)',
          }}
        >
          {item.id}
        </span>
        <h4 className="text-xl font-display font-bold uppercase leading-snug tracking-tight">
          {item.title}
        </h4>
      </div>

      <div className="relative z-10">
        <span
          className="inline-flex items-center text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full"
          style={{
            backgroundColor: isSelected ? 'rgba(26, 20, 11, 0.12)' : 'var(--gold-subtle)',
            color: isSelected ? 'var(--btn-primary-text)' : 'var(--gold-text)',
            border: isSelected ? '1px solid rgba(26, 20, 11, 0.2)' : '1px solid var(--border)',
          }}
        >
          {isSelected ? 'Active Pillar' : 'Club Pillar'}
        </span>
      </div>

      {/* Decorative large watermark number */}
      <div
        className="absolute -bottom-4 -right-2 text-9xl font-display font-black select-none pointer-events-none transition-transform duration-500"
        style={{
          color: isSelected ? 'rgba(26, 20, 11, 0.10)' : 'var(--border)',
        }}
      >
        {item.id}
      </div>
    </div>
  );
}

export default function MLClubEssentials() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const floatIndex = useTransform(scrollYProgress, [0, 1], [0, allItems.length - 1]);

  const x = useTransform(floatIndex, (val) => {
    return `calc(50vw - (var(--card-width) / 2) - (${val} * (var(--card-width) + var(--gap))))`;
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let index = Math.round(latest * (allItems.length - 1));
    if (index < 0) index = 0;
    if (index >= allItems.length) index = allItems.length - 1;
    setActiveIndex(index);
  });

  const activeItem = allItems[activeIndex];

  return (
    <section ref={sectionRef} id="essentials" className="relative" style={{ height: '420vh', backgroundColor: 'var(--bg)' }}>
      <style>{`
        .filmstrip-wrapper {
          --card-width: 65vw;
          --gap: 16px;
        }
        @media (min-width: 640px) {
          .filmstrip-wrapper {
            --card-width: 35vw;
          }
        }
        @media (min-width: 768px) {
          .filmstrip-wrapper {
            --card-width: 240px;
            --gap: 32px;
          }
        }
      `}</style>
      <div className="sticky top-0 flex flex-col h-[100dvh] overflow-hidden filmstrip-wrapper">

        {/* Header */}
        <div className="w-full px-6 md:px-10 mt-20 lg:mt-24 max-w-7xl mx-auto flex-shrink-0 text-center relative z-20">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-6 rounded-full" style={{ background: 'var(--gold-gradient)' }} />
            <span className="uppercase text-xs tracking-[0.22em] font-semibold" style={{ color: 'var(--gold-text)' }}>
              Why Join Us · Core Pillars
            </span>
            <div className="h-px w-6 rounded-full" style={{ background: 'var(--gold-gradient)' }} />
          </div>

          <motion.h2
            className="font-display font-extrabold tracking-tight leading-tight text-4xl sm:text-5xl md:text-6xl mb-2"
            style={{ color: 'var(--text)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Club <span className="text-gold-gradient">Essentials.</span>
          </motion.h2>
        </div>

        {/* Filmstrip container */}
        <div className="flex-1 flex items-center justify-start w-full relative z-10 overflow-hidden">
          <motion.div
            style={{ x, gap: 'var(--gap)' }}
            className="flex min-w-max py-10 items-center absolute left-0"
          >
            {allItems.map((item, index) => (
              <EssentialCard key={item.id} item={item} isSelected={activeIndex === index} />
            ))}
          </motion.div>
        </div>

        {/* Content details */}
        <div
          className="w-full h-[32vh] md:h-[28vh] px-6 md:px-12 flex flex-col justify-start items-center text-center z-20 mt-2 md:mt-4"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto glass-card p-6 md:p-8 rounded-2xl"
              style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                boxShadow: '0 8px 30px -4px var(--shadow-color)',
              }}
            >
              <h3
                className="text-2xl md:text-3xl font-display font-bold mb-3"
                style={{ color: 'var(--gold-text)' }}
              >
                {activeItem.id}. {activeItem.title}
              </h3>
              <p className="text-base md:text-lg leading-relaxed font-medium" style={{ color: 'var(--text-secondary)' }}>
                {activeItem.desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
