import { motion } from 'framer-motion';

export default function SectionHeader({ eyebrow, title, subtitle, align = 'center' }) {
  const isCenter = align === 'center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className={isCenter ? 'text-center' : 'text-left'}
    >
      {/* Eyebrow */}
      <div className={`flex items-center gap-2 ${isCenter ? 'justify-center' : ''}`}>
        <div
          className="w-3 h-0.5 rounded-full"
          style={{ background: 'linear-gradient(to right, #4f46e5, #7c3aed)' }}
        />
        <span className="uppercase text-xs tracking-[0.2em] font-semibold text-primary">
          {eyebrow}
        </span>
      </div>

      {/* Title */}
      <h2 className="mt-4 text-4xl md:text-5xl font-display font-bold text-text">
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className={`mt-4 text-lg text-text-secondary max-w-2xl ${isCenter ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
