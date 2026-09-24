import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const col1 = [
  {
    id: '01',
    question: 'What is AIML Coding Club?',
    answer:
      'AIML Coding Club is a student-run tech community focused on Artificial Intelligence, Machine Learning, and Full-Stack Development. We run workshops, hackathons, and real-world projects to help members grow.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
      </svg>
    ),
  },
  {
    id: '02',
    question: 'Do I need prior experience to join?',
    answer:
      'Absolutely not! AIML Coding Club welcomes everyone — from complete beginners to seasoned coders. All you need is curiosity and a willingness to learn. We will guide you every step of the way.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: '03',
    question: 'How do I become a member?',
    answer:
      'Membership forms are shared at the beginning of each academic year. Simply fill out the form, attend our orientation session, and join our community channels to get started!',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    id: '04',
    question: 'Is there a membership fee?',
    answer:
      'No! Joining AIML Coding Club is completely free. We believe in open access to knowledge, community, and innovation, so there are no fees whatsoever.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    id: '05',
    question: 'What kind of projects do members build?',
    answer:
      'Members build a wide range of projects — from AI chatbots and image classifiers to full-stack web apps and UN SDG-aligned solutions. Creativity is encouraged and mentors are always around to help.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
];

const col2 = [
  {
    id: '06',
    question: 'What are the benefits of joining?',
    answer:
      'You will gain hands-on experience with modern tech, build a strong portfolio, network with like-minded peers, and get exclusive access to resources and mentorship.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
  },
  {
    id: '07',
    question: 'How can I stay updated on club activities?',
    answer:
      'Join our official Discord and WhatsApp groups, and follow our social media channels. We regularly post updates on workshops, projects, and social gatherings there.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    id: '08',
    question: 'Is the club environment inclusive?',
    answer:
      'Absolutely. AIML Coding Club is committed to fostering a safe, respectful, and diverse environment for all members regardless of background, skill level, or identity. Everyone belongs here.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

function FAQItem({ item, index, colIndex }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.07 + colIndex * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="group relative cursor-default"
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ backgroundColor: 'var(--border)' }} />
      <motion.div
        className="absolute inset-0 rounded-xl"
        style={{ backgroundColor: 'var(--surface-hover)' }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
      />
      <div className="relative px-3 py-5 lg:py-6">
        <div className="flex items-center gap-4">
          <span
            className="font-display font-black text-sm tracking-wider min-w-[2rem] transition-colors"
            style={{ color: hovered ? 'var(--gold)' : 'var(--gold-text)' }}
          >
            {item.id}
          </span>
          <h3
            className="flex-1 font-display font-bold text-base md:text-lg leading-snug transition-colors"
            style={{ color: hovered ? 'var(--gold-text)' : 'var(--text)' }}
          >
            {item.question}
          </h3>
          <span
            className="flex-shrink-0 transition-transform duration-300"
            style={{
              color: hovered ? 'var(--gold)' : 'var(--text-muted)',
              transform: hovered ? 'rotate(15deg)' : 'none',
            }}
          >
            {item.icon}
          </span>
        </div>
        <AnimatePresence>
          {hovered && (
            <motion.div
              key="answer"
              initial={{ height: 0, opacity: 0, y: -8 }}
              animate={{ height: 'auto', opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -4 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p className="mt-3 ml-[2.875rem] text-sm md:text-base leading-relaxed max-w-md pr-2" style={{ color: 'var(--text-secondary)' }}>
                {item.answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ backgroundColor: 'var(--border)' }} />
    </motion.div>
  );
}

export default function MLFAQ() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section id="faq" className="relative py-20 md:py-28 overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-30"
        style={{ background: 'radial-gradient(ellipse at center, var(--shadow-glow) 0%, transparent 70%)' }}
      />
      <div className="max-w-7xl mx-auto px-6">
        <div ref={sectionRef} className="text-center mb-16 md:mb-20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              className="h-px rounded-full"
              style={{ background: 'var(--gold-gradient)' }}
              initial={{ width: 0, opacity: 0 }}
              animate={isInView ? { width: 28, opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            />
            <motion.p
              className="text-xs font-bold tracking-[0.22em] uppercase"
              style={{ color: 'var(--gold-text)' }}
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.15 }}
            >
              Got Questions?
            </motion.p>
            <motion.div
              className="h-px rounded-full"
              style={{ background: 'var(--gold-gradient)' }}
              initial={{ width: 0, opacity: 0 }}
              animate={isInView ? { width: 28, opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            />
          </div>
          <h2
            className="font-display font-black leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)' }}
          >
            <span className="text-hollow">Everything </span>
            <span style={{ color: 'var(--text)' }}>you need to </span>
            <span className="text-hollow">know.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 xl:gap-x-24 relative">
          <div>
            {col1.map((item, i) => (
              <FAQItem key={item.id} item={item} index={i} colIndex={0} />
            ))}
          </div>
          <div className="hidden lg:block absolute left-1/2 -translate-x-px" style={{ top: 0, bottom: 0 }}>
            <motion.div
              className="w-px h-full"
              style={{ background: 'linear-gradient(to bottom, transparent, var(--border) 15%, var(--border) 85%, transparent)' }}
              initial={{ scaleY: 0, opacity: 0 }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <div>
            {col2.map((item, i) => (
              <FAQItem key={item.id} item={item} index={i} colIndex={1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
