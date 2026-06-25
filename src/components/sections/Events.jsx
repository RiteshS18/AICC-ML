import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CalendarDays, MapPin, ArrowUpRight } from 'lucide-react';
import eventsData from '../../data/events';
import SectionHeader from '../ui/SectionHeader';

const statusPriority = { live: 0, register: 1, upcoming: 2, completed: 3 };

const statusLabels = {
  live: 'Live',
  register: 'Register',
  upcoming: 'Upcoming',
  completed: 'Completed',
  Completed: 'Completed',
};

function EventCarousel({ photos }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!photos || photos.length === 0) return;
    setCurrent(0);
    if (photos.length === 1) return; // No auto-play if only 1 photo

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % photos.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [photos]);

  if (!photos || photos.length === 0) return (
    <div className="w-full h-full bg-slate-100 flex items-center justify-center rounded-[2rem]">
      <span className="text-slate-400">No photos available</span>
    </div>
  );

  return (
    <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl bg-black">
      <AnimatePresence mode="popLayout">
        <motion.img
          key={current}
          src={photos[current]}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </AnimatePresence>

      {/* Carousel Indicators */}
      {photos.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10 bg-black/40 px-4 py-2.5 rounded-full backdrop-blur-md border border-white/10">
          {photos.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === current ? 'w-6 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function EventListItem({ event, index, activeIndex, setActiveIndex }) {
  const ref = useRef(null);
  const isActive = activeIndex === index;
  const status = event.status?.toLowerCase();

  // Scroll spy effect: mark active when element is near middle of viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveIndex(index);
        }
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index, setActiveIndex]);

  return (
    <div 
      ref={ref} 
      className={`py-12 border-b border-slate-100 cursor-pointer transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-30 hover:opacity-60'}`}
      onClick={() => setActiveIndex(index)}
    >
      <div className="flex flex-col gap-3">
        {/* Status Badge */}
        <span className={`badge badge-${status} self-start`}>
          {statusLabels[event.status] || event.status}
        </span>

        {/* Title */}
        <h3 className="text-3xl md:text-4xl font-display font-bold text-slate-900 tracking-tight">
          {event.title}
        </h3>

        {/* Details Row */}
        <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-500 mt-2">
          {event.time && (
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-primary" />
              <span>{event.time}</span>
            </div>
          )}
          {event.venue && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{event.venue}</span>
            </div>
          )}
        </div>
      </div>

      {/* Expandable Description */}
      <motion.div
        initial={false}
        animate={{ 
          height: isActive ? 'auto' : 0, 
          opacity: isActive ? 1 : 0,
          marginTop: isActive ? '1.5rem' : 0
        }}
        className="overflow-hidden"
      >
        <p className="text-slate-600 text-lg leading-relaxed max-w-xl">
          {event.description}
        </p>
        <Link 
          to={`/event/${event.id}`} 
          className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full bg-slate-900 text-white font-semibold hover:bg-primary transition-colors duration-300"
        >
          View Full Details
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </div>
  );
}

export default function Events() {
  const [activeIndex, setActiveIndex] = useState(0);

  const sortedEvents = [...eventsData].sort(
    (a, b) =>
      (statusPriority[a.status?.toLowerCase()] ?? 4) -
      (statusPriority[b.status?.toLowerCase()] ?? 4)
  );

  return (
    <section id="events" className="bg-white py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionHeader eyebrow="What We Do" title="Flagship Events" />

        <div className="mt-16 flex flex-col lg:flex-row gap-16 relative">
          
          {/* Left Column: Scrollable List */}
          <div className="w-full lg:w-1/2 flex flex-col pb-[30vh]">
            {sortedEvents.map((event, i) => (
              <EventListItem 
                key={event.id} 
                event={event} 
                index={i} 
                activeIndex={activeIndex} 
                setActiveIndex={setActiveIndex} 
              />
            ))}
          </div>

          {/* Right Column: Sticky Image Carousel */}
          <div className="hidden lg:block w-full lg:w-1/2 h-[70vh] sticky top-32">
            <EventCarousel photos={sortedEvents[activeIndex]?.photos} />
          </div>

          {/* Mobile Carousel representation (shows within the flow since sticky side is hidden) */}
          <div className="block lg:hidden w-full h-[50vh] sticky bottom-10 z-10 pointer-events-none">
             <div className="w-full h-full pointer-events-auto">
               <EventCarousel photos={sortedEvents[activeIndex]?.photos} />
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
