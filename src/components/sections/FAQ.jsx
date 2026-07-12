import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

// ── FAQ Data ─────────────────────────────────────────────────────────────────
const col1 = [
  {
    id: '01',
    question: 'What is AI Coding Club?',
    answer:
      'AI Coding Club (AICC) is a student-run tech community focused on Artificial Intelligence, Machine Learning, and Full-Stack Development. We run workshops, hackathons, and real-world projects to help members grow.',
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
      'Absolutely not! AICC welcomes everyone — from complete beginners to seasoned coders. All you need is curiosity and a willingness to learn. We will guide you every step of the way.',
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
      'No! Joining the AI Coding Club is completely free. We believe in open access to knowledge, community, and innovation, so there are no fees whatsoever.',
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
      'Absolutely. AICC is committed to fostering a safe, respectful, and diverse environment for all members regardless of background, skill level, or identity. Everyone belongs here.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

// ── Single FAQ Row ────────────────────────────────────────────────────────────
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
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-slate-100" />

      {/* Hover background fill */}
      <motion.div
        className="absolute inset-0 rounded-lg bg-white"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
      />

      <div className="relative px-0 py-5 lg:py-6">
        {/* Question row */}
        <div className="flex items-center gap-4">
          {/* Number */}
          <motion.span
            animate={{ color: hovered ? '#1e293b' : '#94a3b8' }}
            transition={{ duration: 0.25 }}
            className="font-display font-black text-sm tracking-wider min-w-[2rem]"
          >
            {item.id}
          </motion.span>

          {/* Question text */}
          <motion.h3
            animate={{ color: hovered ? '#0f172a' : '#1e293b' }}
            transition={{ duration: 0.25 }}
            className="flex-1 font-display font-bold text-base md:text-lg leading-snug"
          >
            {item.question}
          </motion.h3>

          {/* Icon */}
          <motion.span
            animate={{
              color: hovered ? '#1e293b' : '#cbd5e1',
              rotate: hovered ? 15 : 0,
            }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0"
          >
            {item.icon}
          </motion.span>
        </div>

        {/* Answer — expands on hover */}
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
              <p className="mt-3 ml-[2.875rem] text-sm md:text-base text-text-secondary leading-relaxed max-w-md pr-2">
                {item.answer}
              </p>


            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom border (last item only shows bottom) */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-slate-100" />
    </motion.div>
  );
}

// ── Column heading ────────────────────────────────────────────────────────────
function ColHeading({ label, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center gap-3 mb-6"
    >
      <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-primary/70">
        {label}
      </span>
      <div className="flex-1 h-px bg-slate-100" />
    </motion.div>
  );
}

// ── Main Section ──────────────────────────────────────────────────────────────
export default function FAQ() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section id="faq" className="relative bg-white py-20 md:py-28 overflow-hidden">

      {/* Subtle background gradient blob */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-30"
        style={{ background: 'radial-gradient(ellipse at center, #ede9fe 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6">

        {/* ── Header ── */}
        <div ref={sectionRef} className="text-center mb-16 md:mb-20">

          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              className="h-px rounded-full"
              style={{ background: 'linear-gradient(to right, #4f46e5, #7c3aed)' }}
              initial={{ width: 0, opacity: 0 }}
              animate={isInView ? { width: 28, opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            />
            <motion.p
              className="text-primary text-xs font-bold tracking-[0.22em] uppercase"
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.15 }}
            >
              Got Questions?
            </motion.p>
            <motion.div
              className="h-px rounded-full"
              style={{ background: 'linear-gradient(to right, #7c3aed, #4f46e5)' }}
              initial={{ width: 0, opacity: 0 }}
              animate={isInView ? { width: 28, opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Headline */}
          <h2
            className="font-display font-black leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)' }}
          >
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: '2px #111111' }}
            >
              Everything 
            </span>
            <span className="text-black">you need to </span>
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: '2px #111111' }}
            >
              know.
            </span>
          </h2>
        </div>

        {/* ── Two-column FAQ grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 xl:gap-x-24 relative">

          {/* Left column */}
          <div>

            <div>
              {col1.map((item, i) => (
                <FAQItem key={item.id} item={item} index={i} colIndex={0} />
              ))}
            </div>
          </div>

          {/* Divider — vertical line (desktop only) */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-px" style={{ top: 0, bottom: 0 }}>
            <motion.div
              className="w-px h-full"
              style={{ background: 'linear-gradient(to bottom, transparent, #e2e8f0 15%, #e2e8f0 85%, transparent)' }}
              initial={{ scaleY: 0, opacity: 0 }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          {/* Right column */}
          <div>

            <div>
              {col2.map((item, i) => (
                <FAQItem key={item.id} item={item} index={i} colIndex={1} />
              ))}
            </div>
          </div>

        </div>

        {/* ── Join our community ── */}
        <div className="mt-28 md:mt-40">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              className="h-px rounded-full"
              style={{ background: 'linear-gradient(to right, #4f46e5, #7c3aed)' }}
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 28, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            />
            <motion.p
              className="text-primary text-xs font-bold tracking-[0.22em] uppercase"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.15 }}
            >
              Get Involved
            </motion.p>
            <motion.div
              className="h-px rounded-full"
              style={{ background: 'linear-gradient(to right, #7c3aed, #4f46e5)' }}
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 28, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Headline */}
          <h2
            className="font-display font-black leading-none tracking-tight text-center mb-16 md:mb-20"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)' }}
          >
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: '2px #111111' }}
            >
              Join 
            </span>
            <span className="text-black">our </span>
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: '2px #111111' }}
            >
              community.
            </span>
          </h2>

          {/* QR Codes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 max-w-2xl mx-auto mt-12">
            <motion.a 
              href="https://chat.whatsapp.com/COwfbo7EXsX4m07IqTVfMh"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center group cursor-pointer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src="/2nd_year_qr.png" 
                alt="2nd Year Group QR Code" 
                className="w-64 h-64 md:w-72 md:h-72 object-contain rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] transition-all duration-300 mb-6 bg-white" 
              />
              <h3 className="text-xl md:text-2xl font-bold font-display text-slate-900 group-hover:text-primary transition-colors duration-300">
                2nd Year
              </h3>
            </motion.a>

            <motion.a 
              href="https://chat.whatsapp.com/FogewpJ6b4vKUU1y7T3gaQ"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center group cursor-pointer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <img 
                src="/3rd_year_qr.png" 
                alt="3rd Year Group QR Code" 
                className="w-64 h-64 md:w-72 md:h-72 object-contain rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] transition-all duration-300 mb-6 bg-white" 
              />
              <h3 className="text-xl md:text-2xl font-bold font-display text-slate-900 group-hover:text-primary transition-colors duration-300">
                3rd Year
              </h3>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
