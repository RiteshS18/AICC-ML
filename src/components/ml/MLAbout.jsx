import { useRef, useCallback } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { BookOpen, Users } from 'lucide-react';

const cardData = [
  {
    icon: BookOpen,
    title: 'A Premier Learning Platform',
    text: 'More than just a club, we are a dynamic learning platform dedicated to mastering AI and emerging tech. Through interactive workshops, coding sprints, and hands-on hackathons, we provide the resources and environment needed to turn theoretical concepts into real-world innovations.',
  },
  {
    icon: Users,
    title: 'A Community & Family',
    text: 'At our core, we are a close-knit family of tech enthusiasts. We prioritize building strong connections, peer-to-peer mentorship, and a supportive network where every member feels valued. Together, we learn, grow, and celebrate our shared passion for technology.',
  },
];

function TiltCard({ children, index, isInView }) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const handleMouseMove = useCallback(
    (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const rx = Math.max(-5, Math.min(5, ((e.clientY - rect.top - rect.height / 2) / rect.height) * 10));
      const ry = Math.max(-5, Math.min(5, -((e.clientX - rect.left - rect.width / 2) / rect.width) * 10));
      rotateX.set(rx);
      rotateY.set(ry);
    },
    [rotateX, rotateY]
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.35 + index * 0.18, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
    >
      <motion.div
        className="glass-card p-8 h-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX: springRotateX, rotateY: springRotateY, transformStyle: 'preserve-3d' }}
        whileHover={{ boxShadow: '0 24px 64px var(--color-primary-alpha)' }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default function MLAbout() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const eyebrow = 'About the Club';
  const titleWords = ['About', 'AI', '&', 'ML', 'Coding', 'Club'];

  return (
    <section id="about" ref={sectionRef} className="py-24 lg:py-32" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto px-6">

        {/* ── Section Header ── */}
        <div className="text-center mb-16">

          <div className="flex items-center justify-center gap-3 mb-5">
            <motion.div
              className="h-px rounded-full"
              style={{ background: 'var(--gold-gradient)' }}
              initial={{ width: 0, opacity: 0 }}
              animate={isInView ? { width: 24, opacity: 1 } : {}}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.span
              className="uppercase text-xs tracking-[0.22em] font-semibold"
              style={{ color: 'var(--gold-text)' }}
              initial={{ opacity: 0, y: 6 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              {eyebrow}
            </motion.span>
            <motion.div
              className="h-px rounded-full"
              style={{ background: 'var(--gold-gradient)' }}
              initial={{ width: 0, opacity: 0 }}
              animate={isInView ? { width: 24, opacity: 1 } : {}}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight leading-tight" style={{ color: 'var(--text)' }}>
            {titleWords.map((word, i) => (
              <motion.span
                key={word + i}
                className="inline-block"
                style={{ marginRight: '0.28em' }}
                initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
                animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.28 + i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {word}
              </motion.span>
            ))}
          </h2>
        </div>

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cardData.map((card, i) => {
            const IconComponent = card.icon;
            return (
              <TiltCard key={card.title} index={i} isInView={isInView}>

                <motion.div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'var(--gold-gradient)', color: 'var(--btn-primary-text)' }}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: 0.45,
                    delay: 0.5 + i * 0.18,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                >
                  <IconComponent className="w-6 h-6" />
                </motion.div>

                <div className="mt-6 group">
                  <motion.h3
                    className="text-xl font-display font-bold inline-block relative"
                    style={{ color: 'var(--text)' }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 0.6 + i * 0.18,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {card.title}
                    <motion.span
                      className="absolute left-0 -bottom-0.5 h-px rounded-full"
                      style={{ background: 'var(--gold-gradient)' }}
                      initial={{ width: '0%' }}
                      animate={isInView ? { width: '100%' } : {}}
                      transition={{
                        duration: 0.6,
                        delay: 0.75 + i * 0.18,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  </motion.h3>
                </div>

                <motion.p
                  className="mt-4 leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{
                    duration: 0.7,
                    delay: 0.72 + i * 0.18,
                    ease: 'easeOut',
                  }}
                >
                  {card.text}
                </motion.p>

              </TiltCard>
            );
          })}
        </div>

      </div>
    </section>
  );
}
