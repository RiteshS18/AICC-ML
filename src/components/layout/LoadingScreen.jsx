import { motion } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark text-white overflow-hidden"
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
    >
      {/* Subtle background ambient glow */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        style={{
          background: 'radial-gradient(circle at center, rgba(79, 70, 229, 0.15) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo container with scale down and blur reveal */}
        <motion.div
          initial={{ scale: 1.15, opacity: 0, filter: 'blur(10px)' }}
          animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 relative"
        >
          {/* Main Logo */}
          <img
            src="/aicc-logo.webp"
            alt="AI Coding Club Logo"
            className="w-24 h-24 md:w-28 md:h-28 object-contain drop-shadow-2xl relative z-10"
          />
          {/* Logo pulse/glow behind it */}
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/20 blur-2xl z-0"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
          />
        </motion.div>

        {/* Text Reveal */}
        <motion.div className="overflow-hidden">
          <motion.h1
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl font-display font-black tracking-[0.2em] uppercase text-white/90"
          >
            AI Coding Club
          </motion.h1>
        </motion.div>

        {/* Minimalist Progress Line */}
        <div className="w-48 h-[2px] bg-white/10 mt-6 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
            onAnimationComplete={onComplete}
          />
        </div>
      </div>
    </motion.div>
  );
}
