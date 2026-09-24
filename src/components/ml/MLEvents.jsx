import { useRef, useState, useMemo, useEffect } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion';
import { Link } from 'react-router-dom';
import { CalendarDays, MapPin, ArrowUpRight } from 'lucide-react';
import eventsData from '../../data/events';

const CARD_SCROLL_PX = 350;

const statusPriority = { live: 0, register: 1, upcoming: 2, completed: 3 };
const statusLabels = {
  live: 'Live',
  register: 'Register Now',
  upcoming: 'Upcoming',
  completed: 'Completed',
  Completed: 'Completed',
};

const smooth = (t) => { const s = Math.min(t, 1.2) / 1.2; return s * (2 - s); };

function StackedCard({ photo, cardIndex, progressMV, isFirstOfEvent }) {
  const age = useTransform(progressMV, (p) => p - cardIndex);

  const x = useTransform(age, (a) => {
    if (a <= 0) return '0%';
    if (isFirstOfEvent) return '0%';
    return `${smooth(a) * 110}%`;
  });

  const y = useTransform(age, (a) => {
    if (a <= 0) return Math.min(-a, 4) * 22;
    return 0;
  });

  const scale = useTransform(age, (a) => {
    if (a <= 0) return Math.max(1 - Math.min(-a, 4) * 0.03, 0.88);
    if (isFirstOfEvent) return 1;
    return Math.max(1 - smooth(a) * 0.04, 0.96);
  });

  const rotateZ = useTransform(age, (a) => {
    if (a <= 0) {
      const depth = Math.min(-a, 3);
      return depth * (cardIndex % 2 === 0 ? 1 : -1);
    }
    return 0;
  });

  const rotateX = useTransform(age, (a) => {
    if (a <= 0) return Math.min(-a, 3) * 3;
    return 0;
  });

  const opacity = useTransform(age, (a) => {
    if (a < -5) return 0;
    if (a < -2) return 0.25;
    if (a <= 0) return 1 - (-a * 0.06);
    const t = Math.min(a / 1.2, 1);
    return 1 - (t * t);
  });

  const zIndex = useTransform(age, (a) =>
    a > 0 ? 100 : Math.max(Math.round(50 + a * 10), 1)
  );

  const filter = useTransform(age, (a) => {
    const brightness = a <= 0 ? Math.max(1 - (-a) * 0.1, 0.6) : 1;
    return `brightness(${brightness})`;
  });

  const boxShadow = useTransform(age, (a) => {
    if (a > 0.5) return '0 4px 12px rgba(0,0,0,0.06)';
    if (a <= 0) {
      const depth = Math.min(-a, 3);
      return `0 ${20 - depth * 3}px ${28 - depth * 4}px ${-6 - depth * 2}px rgba(0,0,0,${Math.max(0.2 - depth * 0.04, 0.06)})`;
    }
    return '0 16px 32px -8px rgba(0,0,0,0.15)';
  });

  return (
    <motion.div
      style={{
        y,
        x,
        scale,
        opacity,
        rotateX,
        rotateZ,
        zIndex,
        filter,
        boxShadow,
        position: 'absolute',
        inset: 0,
        borderRadius: '20px',
        overflow: 'hidden',
        transformOrigin: 'center center',
        willChange: 'transform, opacity',
      }}
    >
      <img
        src={photo}
        alt=""
        className="w-full h-full object-cover"
        loading="lazy"
        draggable={false}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.04) 25%, transparent 45%)',
        }}
      />
    </motion.div>
  );
}

function StackedCards({ allPhotos, progressMV }) {
  return (
    <div className="relative w-full h-full" style={{ perspective: '1400px' }}>
      {[...allPhotos].reverse().map((photoData, revIdx) => {
        const cardIndex = allPhotos.length - 1 - revIdx;
        return (
          <StackedCard
            key={cardIndex}
            photo={photoData.photo}
            cardIndex={cardIndex}
            progressMV={progressMV}
            isFirstOfEvent={photoData.photoIndex === 0}
          />
        );
      })}
    </div>
  );
}

function MobileSliderCard({ photo, cardIndex, progressMV }) {
  const age = useTransform(progressMV, (p) => p - cardIndex);
  const x = useTransform(age, (a) => `${-a * 100}%`);

  return (
    <motion.div
      style={{
        x,
        position: 'absolute',
        inset: 0,
        borderRadius: '20px',
        overflow: 'hidden',
        willChange: 'transform',
      }}
    >
      <img
        src={photo}
        alt=""
        className="w-full h-full object-cover"
        loading="lazy"
        draggable={false}
      />
    </motion.div>
  );
}

function MobileSliderCards({ allPhotos, progressMV }) {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl" style={{ transform: 'translateZ(0)' }}>
      {allPhotos.map((photoData, idx) => (
        <MobileSliderCard
          key={idx}
          photo={photoData.photo}
          cardIndex={idx}
          progressMV={progressMV}
        />
      ))}
    </div>
  );
}

function EventInfoPanel({ event, photoIndex, totalEventPhotos }) {
  if (!event) return null;
  const status = event.status?.toLowerCase();

  return (
    <motion.div
      key={event.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-5 px-4"
    >
      <span className={`badge badge-${status} self-start text-sm`}>
        {statusLabels[event.status] || event.status}
      </span>

      <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold leading-[1.05]" style={{ color: 'var(--text)' }}>
        {event.title}
      </h3>

      <div className="flex flex-wrap items-center gap-x-4 lg:gap-x-6 gap-y-2 text-sm lg:text-base font-medium" style={{ color: 'var(--text-secondary)' }}>
        {event.time && (
          <div className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--gold-text)' }} />
            <span>{event.time}</span>
          </div>
        )}
        {event.venue && (
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--gold-text)' }} />
            <span>{event.venue}</span>
          </div>
        )}
      </div>

      <p className="text-sm lg:text-base leading-relaxed max-w-lg line-clamp-3 lg:line-clamp-4" style={{ color: 'var(--text-secondary)' }}>
        {event.description}
      </p>

      <div className="flex items-center gap-4 lg:gap-6 mt-1">
        <Link
          to={`/event/${event.id}`}
          className="btn-moon inline-flex items-center gap-2"
          style={{ fontSize: '0.95rem', padding: '10px 24px' }}
        >
          View Details
          <ArrowUpRight className="w-4 h-4" />
        </Link>

        {totalEventPhotos > 1 && (
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalEventPhotos }, (_, i) => (
              <div
                key={i}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: i === photoIndex ? 24 : 8,
                  background: i === photoIndex ? 'var(--gold)' : 'var(--border)'
                }}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function MLEvents() {
  const sectionRef = useRef(null);
  const [currentGlobal, setCurrentGlobal] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const sortedEvents = useMemo(() =>
    [...eventsData].sort(
      (a, b) =>
        (statusPriority[a.status?.toLowerCase()] ?? 4) -
        (statusPriority[b.status?.toLowerCase()] ?? 4)
    ), []);

  const allPhotos = useMemo(() =>
    sortedEvents.flatMap((event, eventIndex) =>
      (event.photos?.length ? event.photos : [event.poster || '/placeholder.jpg']).map(
        (photo, photoIndex) => ({
          photo,
          eventIndex,
          photoIndex,
          totalEventPhotos: event.photos?.length || 1,
        })
      )
    ), [sortedEvents]);

  const totalPhotos = allPhotos.length;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const progressMV = useTransform(scrollYProgress, [0, 1], [0, totalPhotos - 0.001]);

  useMotionValueEvent(progressMV, 'change', (p) => {
    setCurrentGlobal(Math.max(0, Math.min(Math.round(p), totalPhotos - 1)));
  });

  const currentPhotoData = allPhotos[currentGlobal] ?? allPhotos[0];
  const currentEvent = sortedEvents[currentPhotoData.eventIndex];

  return (
    <section
      id="events"
      ref={sectionRef}
      className="relative"
      style={{
        height: `calc(100svh + ${totalPhotos * CARD_SCROLL_PX}px)`,
        backgroundColor: 'var(--bg)',
      }}
    >
      <div className="sticky top-0 h-[100svh] flex flex-col overflow-hidden">
        {/* Title */}
        <div className="flex-shrink-0 pt-16 pb-4 text-center">
          <h2
            className="font-display font-black leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)' }}
          >
            <span style={{ color: 'var(--text)' }}>Our </span>
            <span className="text-hollow">Events.</span>
          </h2>
        </div>

        {/* Two column layout */}
        <div className="flex-1 flex flex-col-reverse lg:flex-row gap-2 lg:gap-6 px-4 md:px-10 pb-6 overflow-hidden min-h-0">
          <div className="flex w-full lg:w-[45%] h-1/2 lg:h-auto flex-col justify-center relative py-2 lg:py-6 overflow-hidden">
            <AnimatePresence mode="wait">
              <EventInfoPanel
                key={currentEvent?.id}
                event={currentEvent}
                photoIndex={currentPhotoData.photoIndex}
                totalEventPhotos={currentPhotoData.totalEventPhotos}
              />
            </AnimatePresence>
          </div>

          <div className="w-full lg:w-[55%] h-1/2 lg:h-auto relative flex items-center justify-center min-h-0">
            <div className="h-full w-auto aspect-[4/5] sm:aspect-[3/4] relative mt-2 lg:mt-0 flex-shrink-0">
              {isDesktop ? (
                <StackedCards allPhotos={allPhotos} progressMV={progressMV} />
              ) : (
                <MobileSliderCards allPhotos={allPhotos} progressMV={progressMV} />
              )}
            </div>

            <motion.div
              className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none select-none"
              initial={{ opacity: 1 }}
              animate={{ opacity: currentGlobal > 0 ? 0 : 1 }}
              transition={{ duration: 0.5 }}
            >
              <span
                className="text-xs font-medium backdrop-blur-sm px-3 py-1 rounded-full"
                style={{
                  backgroundColor: 'var(--surface-2)',
                  color: 'var(--text-muted)',
                  border: '1px solid var(--border)',
                }}
              >
                Scroll to explore
              </span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
                className="w-0.5 h-4 rounded-full"
                style={{ backgroundColor: 'var(--gold)' }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
