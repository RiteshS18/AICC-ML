import React from 'react';
import { Building2, Settings, Bot, PenTool, LogOut, ChevronRight, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

const Card = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -5, scale: 1.02 }}
    className="group relative overflow-hidden bg-white/80 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 cursor-pointer flex flex-col items-center text-center"
  >
    <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-4 group-hover:translate-x-0">
      <ChevronRight className="w-6 h-6 text-indigo-500" />
    </div>
    
    <div className="w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner">
      <Icon className="w-10 h-10 text-indigo-600" />
    </div>
    
    <h3 className="text-xl font-bold text-gray-800 mb-3 font-sans tracking-tight">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    
    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  </motion.div>
);

export default function ExamInvigilator() {
  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-indigo-100 selection:text-indigo-900 flex flex-col relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-indigo-900/5 to-transparent pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="bg-slate-900 text-white shadow-2xl relative z-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo area */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-cyan-400 tracking-wider">KEC</span>
                <span className="text-sm font-semibold text-slate-300">ESTD 1984</span>
              </div>
            </motion.div>

            {/* Center Titles */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="hidden md:flex flex-col items-center text-center"
            >
              <h1 className="text-xl font-black tracking-wide text-white drop-shadow-md">
                KONGU ENGINEERING COLLEGE
              </h1>
              <h2 className="text-xs font-bold tracking-[0.2em] text-slate-400 mt-1 uppercase">
                Department of Artificial Intelligence
              </h2>
              <div className="mt-2 px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-sm">
                <h3 className="text-sm font-bold text-cyan-400 tracking-wide">
                  Exam Invigilator Assignment
                </h3>
              </div>
            </motion.div>

            {/* Logout */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <button className="flex items-center gap-2 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 border border-rose-500/20 hover:border-rose-500 hover:shadow-[0_0_20px_rgba(244,63,94,0.3)] group">
                <span className="text-sm">Logout</span>
                <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
          
          {/* Mobile Center Titles (shown only on small screens) */}
          <div className="md:hidden mt-6 flex flex-col items-center text-center pb-2">
            <h1 className="text-lg font-black tracking-wide text-white">
              KONGU ENGINEERING COLLEGE
            </h1>
            <h2 className="text-xs font-bold tracking-[0.1em] text-slate-400 mt-1 uppercase">
              Dept of Artificial Intelligence
            </h2>
            <div className="mt-3 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
              <h3 className="text-xs font-bold text-cyan-400 tracking-wide">
                Exam Invigilator Assignment
              </h3>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 w-full flex flex-col justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Exam Invigilator Assignment
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
            Choose an action to manage exam allocations, seating plans, and invigilator assignments seamlessly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 max-w-4xl mx-auto w-full">
          <Card 
            icon={Building2}
            title="Allocate Hall"
            description="Create new exam hall allocations, define seating capacities, and establish comprehensive plans."
            delay={0.1}
          />
          <Card 
            icon={Settings}
            title="Manage Allotments"
            description="View, edit, or delete existing allocations. Keep your assignments up-to-date and organized."
            delay={0.2}
          />
          <Card 
            icon={Bot}
            title="Auto Allocate"
            description="Leverage smart algorithms to automatically assign halls, seating, and invigilators based on constraints."
            delay={0.3}
          />
          <Card 
            icon={PenTool}
            title="Manual Allocate"
            description="Take full control. Manually select specific halls, benches, and seating arrangements for special cases."
            delay={0.4}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-8 relative z-10 border-t border-slate-200/50 bg-white/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="flex items-center gap-2 mb-2"
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-indigo-300" />
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600/80">Developed By</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-indigo-300" />
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-slate-700 font-semibold text-sm md:text-base text-center"
          >
            <span className="text-slate-500 font-medium">Content Devs: </span>
            <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">Nitheesh S J</span>
            <span className="text-slate-300 mx-2">•</span>
            <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">Mainudheen S</span>
            <span className="text-slate-300 mx-2">•</span>
            <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">Oviya B</span>
          </motion.p>
        </div>
      </footer>
    </div>
  );
}
