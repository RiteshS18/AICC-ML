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
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-28 pb-16"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      {/* Particle Background */}
      <ParticleCanvas />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo */}
        <div className="flex justify-center items-center gap-6 mb-6">
          <div className="flex flex-col items-center gap-1.5">
            <motion.img
              src="/aiml-logo.jpg"
              alt="AIML Coding Club Logo"
              className="w-28 h-28 object-contain rounded-full"
              width={112}
              height={112}
              style={{
                boxShadow: '0 0 24px -4px var(--shadow-glow)',
                border: '2px solid var(--border)',
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.08, rotate: 3 }}
            />
            <span
              className="text-[11px] font-bold tracking-widest uppercase mt-1"
              style={{ color: 'var(--gold-text)' }}
            >
              LEARN AND LEAD
            </span>
          </div>
        </div>

        {/* Eyebrow */}
        <motion.p
          variants={fadeUp}
          className="text-sm tracking-widest uppercase mb-4"
          style={{ color: 'var(--text-muted)' }}
        >
          Kongu Engineering College · Autonomous
        </motion.p>

        {/* Hero Title — always readable in both modes */}
        <motion.div
          variants={fadeUp}
          className="mb-4"
        >
          <h1 className="font-display font-extrabold tracking-tight text-4xl sm:text-6xl md:text-7xl lg:text-8xl">
            <span
              style={{
                background: 'var(--gold-gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              AIML
            </span>{' '}
            <span style={{ color: 'var(--text)' }}>Coding Club</span>
          </h1>
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="text-base sm:text-lg md:text-xl font-medium mb-6 tracking-wide"
          style={{ color: 'var(--gold-text)' }}
        >
          Department of Artificial Intelligence &amp; Machine Learning Initiative
        </motion.p>

        {/* Subtext */}
        <motion.p
          variants={fadeUp}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-8"
          style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}
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
          <a href="#about" className="btn-gold">
            Explore Club
          </a>
          <Link to="/gallery" className="btn-outline">
            View Gallery
          </Link>
          <Link to="/members" className="btn-ghost">
            Meet the Team
          </Link>
        </motion.div>

        {/* Stats Row — Gold bordered card */}
        <motion.div
          className="inline-flex flex-wrap justify-center gap-6 md:gap-14 gold-card px-6 md:px-12 py-5 md:py-7"
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
              <div
                className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold"
                style={{
                  background: 'var(--gold-gradient)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                <StatCounter target={stat.target} suffix={stat.suffix} />
              </div>
              <div
                className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase mt-1"
                style={{ color: 'var(--text-muted)' }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        style={{ animation: 'float 2.5s ease-in-out infinite' }}
      >
        <ChevronDown className="w-6 h-6" style={{ color: 'var(--gold)' }} />
      </motion.div>
    </section>
  );
}
