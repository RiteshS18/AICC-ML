import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import ParticleCanvas from '../ui/ParticleCanvas';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const stats = [
  { value: '10+', label: 'Workshops' },
  { value: '7+', label: 'Hackathons' },
  { value: '30+', label: 'Members' },
];

export default function MLHero({ intro, setTheme }) {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsExpanded(prev => !prev);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Particle Background */}
      <ParticleCanvas particleCount={60} />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logos */}
        <div className="flex justify-center items-center gap-6 mb-6">
          {!intro && (
            <div className="flex flex-col items-center gap-1.5">
              <motion.img 
                layoutId="new-logo"
                src="/aiml-logo.jpg" 
                alt="AICC ML Logo" 
                className="w-28 h-28 object-contain rounded-full drop-shadow-lg" 
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.1, rotate: 3 }}
              />
              <span className="text-[11px] font-bold tracking-widest uppercase text-primary mt-1">
              LEARN AND LEAD
              </span>
            </div>
          )}
        </div>

        {/* Eyebrow */}
        <motion.p
          variants={fadeUp}
          className="text-sm text-text-muted tracking-widest uppercase mb-6"
        >
          Kongu Engineering College · AI Department
        </motion.p>

        {/* Animated Club Name */}
        <motion.div
          className="flex flex-col items-center justify-center relative mb-8 w-full max-w-[90vw] overflow-hidden px-2 md:px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div 
            className="font-display font-bold text-text flex items-center justify-center tracking-tight"
            style={{ fontSize: 'clamp(1.75rem, 6vw, 6rem)' }}
          >
            <span>AI</span>
            
            <motion.span
              className="overflow-hidden inline-flex whitespace-nowrap"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              &amp;ML
            </motion.span>
            
            <motion.span
              className="overflow-hidden inline-flex"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: isExpanded ? "0.25em" : 0, opacity: isExpanded ? 1 : 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />

            <span>C</span>

            <motion.span
              className="overflow-hidden inline-flex whitespace-nowrap"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              oding
            </motion.span>

            <motion.span
              className="overflow-hidden inline-flex"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: isExpanded ? "0.25em" : 0, opacity: isExpanded ? 1 : 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />

            <span>C</span>

            <motion.span
              className="overflow-hidden inline-flex whitespace-nowrap"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              lub
            </motion.span>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="text-xl md:text-2xl font-display font-bold mb-6 drop-shadow-sm bg-gradient-to-r from-primary-light to-accent-light bg-clip-text text-transparent"
        >
          A Department of AIML Initiative
        </motion.div>

        {/* Subtext */}
        <motion.p
          variants={fadeUp}
          className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-8"
        >
          Empowering students to learn, build, and innovate in AI and coding
          through workshops, hackathons, and collaborative projects. More than just a club, 
          we share a great interaction and bond like a family.
        </motion.p>

        {/* Call to Action Buttons */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12"
        >
          <Link to="/ml/gallery" className="btn-moon">
            View Gallery
          </Link>
          <Link to="/ml/members" className="btn-moon">
            Members
          </Link>
        </motion.div>

        {/* Stats Row in Bordered Box */}
        <motion.div
          variants={fadeUp}
          className="inline-flex flex-wrap justify-center gap-8 md:gap-16 border border-border rounded-3xl px-8 md:px-16 py-6 md:py-8 bg-white/40 backdrop-blur-md shadow-sm"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.9 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="text-3xl md:text-4xl font-display font-bold text-primary">
                {stat.value}
              </div>
              <div className="text-sm font-semibold tracking-wider uppercase text-text-muted mt-2">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <ChevronDown className="w-6 h-6 text-text-muted" />
      </motion.div>
    </section>
  );
}
