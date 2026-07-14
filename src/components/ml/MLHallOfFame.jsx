import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import BorderGlow from '../ui/BorderGlow';

const placeholders = [1, 2, 3];

export default function MLHallOfFame() {
  return (
    <section id="hall-of-fame" className="relative py-24 bg-white overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-50 text-amber-500 mb-6 border border-amber-200 shadow-sm">
            <Award className="w-8 h-8" />
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight text-slate-900 leading-none mb-6">
            Hall of <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Fame.</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
            Celebrating our most dedicated and continuous participants who consistently bring passion, energy, and excellence to the AI &amp; ML Coding Club.
          </p>
        </motion.div>

        {/* Placeholder Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                backgroundColor="#ffffff"
                borderRadius={32}
                glowColor="40 80 80"
                colors={['#f59e0b', '#fb923c', '#fbbf24']}
                className="w-full shadow-xl"
              >
                <div 
                  className="relative flex flex-col items-center justify-center gap-5 p-12 bg-white/90 backdrop-blur-xl h-full w-full group rounded-[32px] z-10" 
                  style={{ minHeight: '260px' }}
                >
                  <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-100 transition-all duration-300 shadow-sm">
                    <Award className="w-7 h-7 text-amber-500 group-hover:text-amber-600 transition-colors" />
                  </div>

                  <div className="flex flex-col items-center gap-2.5">
                    <div className="w-32 h-3 rounded-full bg-slate-200" />
                    <div className="w-20 h-2.5 rounded-full bg-slate-100" />
                  </div>

                  <span className="text-slate-400 text-xs font-bold tracking-widest uppercase mt-2 group-hover:text-amber-500 transition-colors">
                    Not yet started
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
