import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// --- Dummy Data ---
const wallOfGloryData = [
  { id: '01', title: '50+ Internships Cracked', description: 'At top product companies including Microsoft, Amazon, and Google.' },
  { id: '02', title: 'Smart India Hackathon Winner', description: 'Secured 1st place in the software edition tackling real-world problems.' },
  { id: '03', title: '5+ GSoC Selections', description: 'Students contributed to major open-source projects via Google Summer of Code.' },
  { id: '04', title: 'Global AI Challenge Finalists', description: 'Ranked in the top 10 out of 5,000+ participating teams globally.' },
];

function WallOfGlory() {
  return (
    <div className="max-w-4xl mx-auto border-t border-slate-200">
      {wallOfGloryData.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group relative border-b border-slate-200 py-8 md:py-10 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-default transition-colors hover:bg-slate-50/50"
        >
          {/* Animated left border on hover */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary scale-y-0 origin-top transition-transform duration-300 group-hover:scale-y-100" />
          
          <div className="flex items-center gap-6 md:gap-12 px-6">
            <span className="font-display font-black text-slate-300 text-2xl md:text-3xl group-hover:text-primary/40 transition-colors">
              {item.id}
            </span>
            <h4 className="font-display font-bold text-xl md:text-3xl text-slate-900 group-hover:text-primary transition-colors">
              {item.title}
            </h4>
          </div>
          
          <div className="px-6 md:px-0 md:pr-6 max-w-sm">
            <p className="text-sm md:text-base text-slate-500 leading-relaxed group-hover:text-slate-700 transition-colors">
              {item.description}
            </p>
          </div>
          
          {/* Arrow icon appearing on hover */}
          <div className="absolute right-6 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 hidden md:block">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-primary">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// --- Main Section Export ---
export default function Achievements() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section id="achievements" className="relative bg-slate-50 py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div ref={sectionRef} className="text-center mb-16 md:mb-20">
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
              Our Legacy
            </motion.p>
            <motion.div
              className="h-px rounded-full"
              style={{ background: 'linear-gradient(to right, #7c3aed, #4f46e5)' }}
              initial={{ width: 0, opacity: 0 }}
              animate={isInView ? { width: 28, opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            />
          </div>

          <h2
            className="font-display font-black leading-none tracking-tight mb-4"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)' }}
          >
            Wall of Glory
          </h2>
        </div>

        <WallOfGlory />

      </div>
    </section>
  );
}
