import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import ParticleCanvas from '../ui/ParticleCanvas';
import { membersData } from '../../data/members';
import eventsData from '../../data/events';
import { projectsData } from '../../data/projects';

function StatCounter({ target, suffix = '', duration = 1200 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const steps = 30;
    const increment = target / steps;
    const intervalTime = duration / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [target, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

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

export default function MLHero() {
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
            <div className="flex flex-col items-center gap-1.5">
              <motion.img 
                src="/aiml-logo.jpg" 
                alt="AIML Coding Club Logo" 
                className="w-28 h-28 object-contain rounded-full drop-shadow-lg" 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.1, rotate: 3 }}
              />
              <span className="text-[11px] font-bold tracking-widest uppercase text-primary mt-1">
              LEARN AND LEAD
              </span>
            </div>
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
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <a href="#about" className="btn-primary">
            Explore Club
          </a>
          <Link to="/gallery" className="btn-moon">
            View Gallery
          </Link>
          <Link to="/members" className="btn-ghost">
            Meet the Team
          </Link>
        </motion.div>

        {/* Stats Row in Bordered Box */}
        <motion.div
          className="inline-flex flex-wrap justify-center gap-6 md:gap-14 border border-white/10 rounded-3xl px-6 md:px-12 py-5 md:py-7 glass-card shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {[
            { target: eventsData.length, suffix: '+', label: 'Flagship Events' },
            { target: projectsData.length, suffix: '+', label: 'AI Projects' },
            { target: membersData.length, suffix: '', label: 'Office Bearers' },
            { target: 350, suffix: '+', label: 'Tech Community' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center min-w-[100px]"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.8 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
                <StatCounter target={stat.target} suffix={stat.suffix} />
              </div>
              <div className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-text-secondary mt-1">
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
