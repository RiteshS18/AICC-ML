import { motion } from 'framer-motion';
import { Award, Star, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const participants = [
  {
    name: "John Doe",
    batch: "2024-2028",
    branch: "AI-DS",
    eventsAttended: 12,
    highlights: ["Hackathon Winner", "Active Contributor"],
  },
  {
    name: "Jane Smith",
    batch: "2024-2028",
    branch: "AI-ML",
    eventsAttended: 10,
    highlights: ["Workshop Lead", "Top Coder"],
  },
  {
    name: "Alice Johnson",
    batch: "2025-2029",
    branch: "AI-DS",
    eventsAttended: 8,
    highlights: ["Thinkathon Finalist", "Consistent Participant"],
  }
];

export default function HallOfFamePage() {
  const navigate = useNavigate();

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

        {/* ═══════ Participants Grid ═══════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {participants.map((p, index) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:border-amber-200 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100 rounded-full blur-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -mr-10 -mt-10" />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-amber-500/30">
                    {p.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{p.name}</h3>
                    <p className="text-sm font-semibold text-slate-500">{p.branch} • {p.batch}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-6">
                  <div className="px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5" />
                    Continuous Participant
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                    <Zap className="w-4 h-4 text-amber-500" />
                    <span>Attended {p.eventsAttended}+ Events</span>
                  </div>
                  {p.highlights.map(h => (
                    <div key={h} className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300 ml-1.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
