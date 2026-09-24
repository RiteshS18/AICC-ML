import { motion } from 'framer-motion';
import { Award, Clock } from 'lucide-react';
import BorderGlow from '../ui/BorderGlow';

const placeholders = [1, 2, 3];

export default function MLHallOfFame() {
  return (
    <section id="hall-of-fame" className="relative py-24 lg:py-32 overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 shadow-md"
            style={{
              backgroundColor: 'var(--gold-subtle)',
              border: '1px solid var(--border)',
              color: 'var(--gold-text)',
            }}
          >
            <Award className="w-8 h-8" />
          </div>
          <h2
            className="text-4xl md:text-6xl font-display font-black tracking-tight leading-none mb-6"
            style={{ color: 'var(--text)' }}
          >
            Hall of <span className="text-gold-gradient">Fame.</span>
          </h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto font-normal" style={{ color: 'var(--text-secondary)' }}>
            Celebrating our top contributors and continuous participants who consistently bring passion, energy, and excellence to the AIML Coding Club.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {placeholders.map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col"
            >
              <BorderGlow
                backgroundColor="var(--surface)"
                borderRadius={24}
                glowColor="40 80 80"
                colors={['#DFB235', '#C99716', '#9E7409']}
                className="w-full shadow-xl"
              >
                <div 
                  className="relative flex flex-col items-center justify-center gap-5 p-12 h-full w-full group rounded-[24px] z-10" 
                  style={{
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--border)',
                    minHeight: '260px',
                  }}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-sm"
                    style={{
                      backgroundColor: 'var(--gold-subtle)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <Award className="w-7 h-7" style={{ color: 'var(--gold-text)' }} />
                  </div>

                  <div className="flex flex-col items-center gap-2.5">
                    <div className="w-32 h-2.5 rounded-full" style={{ backgroundColor: 'var(--border)' }} />
                    <div className="w-20 h-2 rounded-full" style={{ backgroundColor: 'var(--border)' }} />
                  </div>

                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mt-2"
                    style={{
                      backgroundColor: 'var(--gold-subtle)',
                      color: 'var(--gold-text)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <Clock className="w-3 h-3" />
                    Not Yet Started
                  </span>
                </div>
              </BorderGlow>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
