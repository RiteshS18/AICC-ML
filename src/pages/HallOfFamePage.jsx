import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

const placeholders = [1, 2, 3];

export default function HallOfFamePage() {
  return (
    <motion.div
      className="min-h-screen bg-off-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-24">
        {/* ═══════ Hero Header ═══════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 text-amber-600 mb-6">
            <Award className="w-8 h-8" />
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-black tracking-tight text-slate-900 leading-none mb-6">
            Hall of <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Fame.</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
            Celebrating our most dedicated and continuous participants who consistently bring passion, energy, and excellence to the AI Coding Club.
          </p>
        </motion.div>

        {/* ═══════ Placeholder Cards ═══════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {placeholders.map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{
                background: 'rgba(255, 255, 255, 0.45)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                borderRadius: '1.5rem',
                padding: '3rem 2rem',
                minHeight: '240px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1.25rem',
                border: '1px solid rgba(255, 255, 255, 0.6)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)',
              }}
            >
              {/* Icon circle */}
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'rgba(245, 158, 11, 0.08)',
                  border: '1px solid rgba(245, 158, 11, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Award style={{ width: '24px', height: '24px', color: 'rgba(245, 158, 11, 0.35)' }} />
              </div>

              {/* Blurred placeholder lines */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <div
                  style={{
                    width: '120px',
                    height: '12px',
                    borderRadius: '6px',
                    background: 'rgba(0, 0, 0, 0.06)',
                    filter: 'blur(1px)',
                  }}
                />
                <div
                  style={{
                    width: '80px',
                    height: '10px',
                    borderRadius: '5px',
                    background: 'rgba(0, 0, 0, 0.04)',
                    filter: 'blur(1px)',
                  }}
                />
              </div>

              {/* Label */}
              <span
                style={{
                  color: 'rgba(100, 116, 139, 0.6)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginTop: '0.25rem',
                }}
              >
                Not yet started
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
