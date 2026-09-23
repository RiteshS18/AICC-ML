import { motion } from 'framer-motion';
import { Award, Clock } from 'lucide-react';
import BorderGlow from '../ui/BorderGlow';

const placeholders = [1, 2, 3];

export default function MLHallOfFame() {
  return (
    <section id="hall-of-fame" className="relative py-24 lg:py-32 bg-[#0a0a0f] overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#0a0a0f] to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#0a0a0f] to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-400 mb-6 border border-amber-500/30 shadow-lg shadow-amber-500/10">
            <Award className="w-8 h-8" />
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight text-white leading-none mb-6">
            Hall of <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300">Fame.</span>
          </h2>
          <p className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto font-normal">
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
                backgroundColor="#12121a"
                borderRadius={24}
                glowColor="40 80 80"
                colors={['#f59e0b', '#fb923c', '#fbbf24']}
                className="w-full shadow-2xl"
              >
                <div 
                  className="relative flex flex-col items-center justify-center gap-5 p-12 bg-[#12121a]/90 backdrop-blur-xl h-full w-full group rounded-[24px] z-10 border border-white/10" 
                  style={{ minHeight: '260px' }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-500/20 transition-all duration-300 shadow-sm">
                    <Award className="w-7 h-7 text-amber-400 group-hover:text-amber-300 transition-colors" />
                  </div>

                  <div className="flex flex-col items-center gap-2.5">
                    <div className="w-32 h-2.5 rounded-full bg-white/10" />
                    <div className="w-20 h-2 rounded-full bg-white/5" />
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 mt-2">
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
