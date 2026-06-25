import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock } from 'lucide-react';

export default function MarkCalendar() {
  return (
    <section className="py-24 lg:py-32 bg-dark text-white relative overflow-hidden">
      {/* Abstract shapes for background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/30 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/30 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card-dark p-8 md:p-16 border border-white/10 relative overflow-hidden"
        >
          {/* Subtle grid pattern inside card */}
          <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0ibm9uZSIvPgo8cGF0aCBkPSJNMjAgMEwwIDBaTTAgMjBMMCAwWiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9zdmc+')]"></div>

          <div className="relative z-10">
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-semibold tracking-wider uppercase mb-8 text-white">
              Next Big Event
            </div>
            
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-black mb-10 text-transparent bg-clip-text bg-gradient-to-r from-primary-light via-white to-primary-light pb-2">
              Mark Your Calendar
            </h2>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-12">
              <div className="flex items-center gap-3 text-lg md:text-2xl text-white/90">
                <Calendar className="w-6 h-6 text-primary-light" />
                <span className="font-medium">Sept 12, 2025</span>
              </div>
              <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-white/30" />
              <div className="flex items-center gap-3 text-lg md:text-2xl text-white/90">
                <Clock className="w-6 h-6 text-primary-light" />
                <span className="font-medium">09:00 AM</span>
              </div>
              <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-white/30" />
              <div className="flex items-center gap-3 text-lg md:text-2xl text-white/90">
                <MapPin className="w-6 h-6 text-primary-light" />
                <span className="font-medium">AI Block, KEC</span>
              </div>
            </div>
            
            <motion.a
              href="https://forms.gle/XhaX4KWLJsoDCJfMA"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block btn-primary text-lg md:text-xl px-10 py-5 shadow-[0_0_40px_rgba(79,70,229,0.4)]"
            >
              Add to Calendar
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
