import { motion } from 'framer-motion';
import { Trophy, Clock, User, Hash, BookOpen } from 'lucide-react';
import { leaderboardData } from '../../data/leaderboard';

function LeaderboardCard({ title, yearData, delay = 0 }) {
  const isNotStarted = yearData.individuals.every((ind) => ind.points === '--');

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay }}
      className="flex-1 flex"
    >
      <div className="w-full glass-card rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col">
        <div className="p-6 md:p-8 relative z-10 h-full flex flex-col">
          {isNotStarted && (
            <div className="absolute top-6 right-6 z-20">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-500/15 text-amber-300 border border-amber-500/30">
                <Clock className="w-3.5 h-3.5" />
                Not Yet Started
              </span>
            </div>
          )}

          <h3 className="text-2xl font-bold font-display text-white flex items-center gap-3 mb-8 pb-4 border-b border-white/10">
            <Trophy className="w-7 h-7 text-amber-400" />
            <span>{title}</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
            {/* Class Standings */}
            <div>
              <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4 flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-primary" />
                Class Standings
              </h4>
              <div className="space-y-3">
                {yearData.classes.map((cls, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-primary/40 hover:bg-white/[0.06] transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                          idx === 0
                            ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                            : idx === 1
                            ? 'bg-slate-400/20 text-slate-200 border border-slate-400/40'
                            : 'bg-orange-400/20 text-orange-300 border border-orange-400/40'
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <span className="text-sm font-semibold text-white/90">{cls.name}</span>
                    </div>
                    <div className="text-right">
                      <span
                        className={`text-base font-bold ${
                          cls.points === '--' ? 'text-slate-600' : 'text-primary-light'
                        }`}
                      >
                        {cls.points}
                      </span>
                      {cls.points !== '--' && (
                        <span className="text-xs text-text-muted font-medium ml-1">pts</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Individuals */}
            <div>
              <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4 flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-primary" />
                Top Individuals
              </h4>
              <div className="space-y-3">
                {yearData.individuals.map((ind, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-primary/40 hover:bg-white/[0.06] transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                          idx === 0
                            ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                            : 'bg-slate-400/20 text-slate-200 border border-slate-400/40'
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <div>
                        <p
                          className={`text-sm font-bold ${
                            ind.name === '--' ? 'text-slate-600' : 'text-white'
                          }`}
                        >
                          {ind.name}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span
                            className={`text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1 ${
                              ind.rollno === '--' ? 'text-slate-600' : 'text-text-secondary'
                            }`}
                          >
                            <Hash className="w-3 h-3" />
                            {ind.rollno}
                          </span>
                          {ind.class !== undefined && (
                            <span
                              className={`text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1 ${
                                ind.class === '--' ? 'text-slate-600' : 'text-text-secondary'
                              }`}
                            >
                              <BookOpen className="w-3 h-3" />
                              {ind.class}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`text-base font-bold ${
                          ind.points === '--' ? 'text-slate-600' : 'text-primary-light'
                        }`}
                      >
                        {ind.points}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function MLLeaderboard() {
  return (
    <section id="leaderboard" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Title */}
        <div className="text-center mb-16">
          <h2
            className="font-display font-black leading-none tracking-tight mb-4"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}
          >
            <span className="text-white">Department </span>
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: '2px rgba(255, 255, 255, 0.5)' }}
            >
              Leaderboard.
            </span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-base md:text-lg mt-4 font-normal">
            Points are awarded for event participation, winning competitions, and active contributions to the club community.
          </p>
        </div>

        {/* Leaderboards Container */}
        <div className="flex flex-col xl:flex-row gap-8">
          <LeaderboardCard title="3rd Year Standings" yearData={leaderboardData.year3} delay={0.1} />
          <LeaderboardCard title="2nd Year Standings" yearData={leaderboardData.year2} delay={0.2} />
        </div>
      </div>
    </section>
  );
}
