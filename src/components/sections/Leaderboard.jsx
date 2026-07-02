import { motion } from 'framer-motion';
import { Trophy, Clock, User, Hash, BookOpen } from 'lucide-react';
import { leaderboardData } from '../../data/leaderboard';
import EvilEye from '../ui/EvilEye';

function LeaderboardCard({ title, yearData, delay = 0 }) {
  const isNotStarted = yearData.individuals.every(ind => ind.points === '--');
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay }}
      className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-slate-100 flex-1 relative z-10 overflow-hidden"
    >
      {/* Not Yet Started Overlay Banner */}
      {isNotStarted && (
        <div className="absolute top-4 right-4 z-20">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-50 text-amber-600 border border-amber-200">
            <Clock className="w-3.5 h-3.5" />
            Not Yet Started
          </span>
        </div>
      )}
      
      <h3 className="text-2xl font-bold font-display text-slate-900 flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
        <Trophy className="w-8 h-8 text-amber-500" />
        {title}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Class Standings */}
        <div>
          <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-5 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Class Standings
          </h4>
          <div className="space-y-4">
            {yearData.classes.map((cls, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-primary/20 hover:shadow-sm transition-all">
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    idx === 0 ? 'bg-amber-100 text-amber-700' : 
                    idx === 1 ? 'bg-slate-200 text-slate-700' : 
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {idx + 1}
                  </span>
                  <span className="text-base font-semibold text-slate-800">{cls.name}</span>
                </div>
                <div className="text-right">
                  <span className={`text-lg font-bold ${cls.points === '--' ? 'text-slate-300' : 'text-slate-900'}`}>
                    {cls.points}
                  </span>
                  {cls.points !== '--' && (
                    <span className="text-xs text-slate-500 font-medium ml-1">pts</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Individuals */}
        <div>
          <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-5 flex items-center gap-2">
            <User className="w-4 h-4" />
            Top Individuals
          </h4>
          <div className="space-y-4">
            {yearData.individuals.map((ind, idx) => (
              <div key={idx} className="flex justify-between items-center p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-primary/20 hover:shadow-sm transition-all">
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    idx === 0 ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {idx + 1}
                  </span>
                  <div>
                    <p className={`text-base font-bold ${ind.name === '--' ? 'text-slate-300' : 'text-slate-900'}`}>
                      {ind.name}
                    </p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className={`text-xs font-semibold uppercase tracking-widest flex items-center gap-1 ${ind.rollno === '--' ? 'text-slate-300' : 'text-slate-500'}`}>
                        <Hash className="w-3 h-3" />
                        {ind.rollno}
                      </span>
                      {ind.class !== undefined && (
                        <span className={`text-xs font-semibold uppercase tracking-widest flex items-center gap-1 ${ind.class === '--' ? 'text-slate-300' : 'text-slate-500'}`}>
                          <BookOpen className="w-3 h-3" />
                          {ind.class}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xl font-bold ${ind.points === '--' ? 'text-slate-300' : 'text-slate-900'}`}>
                    {ind.points}
                  </span>
                  {ind.points !== '--' && (
                    <span className="text-xs text-slate-500 font-medium ml-1">pts</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Leaderboard() {
  return (
    <section id="leaderboard" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Evil Eye Background */}
      <div className="absolute inset-0 z-0">
        <EvilEye 
          backgroundColor="#f8fafc" 
          eyeColor="#FF4500" 
          glowIntensity={0.6}
          intensity={1.8}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10 pointer-events-none">
        
        {/* Title */}
        <div className="text-center mb-16 pointer-events-auto">
          <h2
            className="font-display font-black leading-none tracking-tight mb-4"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)' }}
          >
            <span className="text-black">Department </span>
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: '2px #111111' }}
            >
              LeaderBoard.
            </span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg mt-4 font-medium">
            Points are awarded for event participation, winning competitions, and active contributions to the club community.
          </p>
        </div>

        {/* Leaderboards Container */}
        <div className="flex flex-col xl:flex-row gap-8 pointer-events-auto">
          <LeaderboardCard title="3rd Year Standings" yearData={leaderboardData.year3} delay={0.1} />
          <LeaderboardCard title="2nd Year Standings" yearData={leaderboardData.year2} delay={0.2} />
        </div>

      </div>
    </section>
  );
}
