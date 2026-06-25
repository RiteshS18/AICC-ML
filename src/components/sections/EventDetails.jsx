import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CalendarDays, MapPin } from 'lucide-react';
import eventsData from '../../data/events';

const statusLabels = {
  live: 'Live',
  register: 'Register',
  upcoming: 'Upcoming',
  completed: 'Completed',
  Completed: 'Completed',
};

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const event = eventsData.find((e) => String(e.id) === String(id));

  if (!event) {
    return (
      <motion.div
        className="min-h-screen flex flex-col items-center justify-center bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="text-3xl font-display font-bold text-text mb-4">
          Event not found
        </h2>
        <button
          onClick={() => navigate('/')}
          className="btn-primary"
        >
          Go Home
        </button>
      </motion.div>
    );
  }

  const status = event.status?.toLowerCase();
  const showRegister = status === 'register' || status === 'live';

  return (
    <motion.div
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="fixed top-6 left-6 z-50 glass-card px-4 py-2 flex items-center gap-2 text-text-secondary hover:bg-white hover:text-text transition-all duration-200 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Back</span>
      </button>

      {/* Hero Banner */}
      <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
        <img
          src={event.poster}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-8 pb-6 md:pb-8">
          <motion.h1
            className="text-4xl md:text-6xl font-display font-bold text-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {event.title.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: 0.3 + i * 0.03,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>

          {/* Info pills */}
          <motion.div
            className="flex flex-wrap gap-3 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {event.time && (
              <div className="glass-card px-4 py-2 flex items-center gap-2 text-sm text-text-secondary">
                <CalendarDays className="w-4 h-4" />
                {event.time}
              </div>
            )}
            {event.venue && (
              <div className="glass-card px-4 py-2 flex items-center gap-2 text-sm text-text-secondary">
                <MapPin className="w-4 h-4" />
                {event.venue}
              </div>
            )}
            <span className={`badge badge-${status}`}>
              {statusLabels[event.status] || event.status}
            </span>
          </motion.div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* About Card */}
          {event.description && (
            <motion.div
              className="glass-card p-8 bg-off-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-8 h-0.5 rounded-full"
                  style={{ background: 'linear-gradient(to right, #4f46e5, #7c3aed)' }}
                />
                <h3 className="text-xl font-display font-semibold text-text">
                  About
                </h3>
              </div>
              <p className="text-text-secondary leading-relaxed">
                {event.description}
              </p>
            </motion.div>
          )}

          {/* How It's Conducted Card */}
          {event.how && (
            <motion.div
              className="glass-card p-8 bg-off-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-8 h-0.5 rounded-full"
                  style={{ background: 'linear-gradient(to right, #4f46e5, #7c3aed)' }}
                />
                <h3 className="text-xl font-display font-semibold text-text">
                  How It&apos;s Conducted
                </h3>
              </div>
              <p className="text-text-secondary leading-relaxed">
                {event.how}
              </p>
            </motion.div>
          )}
        </div>

        {/* Register Button */}
        {showRegister && event.registrationLink && (
          <motion.div
            className="flex justify-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a
              href={event.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Register Now
            </a>
          </motion.div>
        )}

        {/* Photo Gallery */}
        {event.photos && event.photos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-display font-semibold text-text mt-16 mb-8">
              Event Gallery
            </h3>
            <div
              className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {event.photos.map((photo, i) => (
                <motion.div
                  key={i}
                  className="snap-start flex-shrink-0 w-72 md:w-96 h-48 md:h-64 rounded-2xl overflow-hidden"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <img
                    src={photo}
                    alt={`${event.title} gallery ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
