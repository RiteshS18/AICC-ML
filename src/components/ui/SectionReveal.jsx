import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * SectionReveal — wraps a section and triggers a subtle fade + slide-up
 * animation once, when the element enters the viewport.
 *
 * GPU-friendly: only animates transform and opacity.
 * Respects prefers-reduced-motion (framer-motion handles this).
 */
export default function SectionReveal({
  children,
  className = '',
  delay = 0,
  y = 32,
  once = true,
  threshold = 0.15,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
