import { motion } from "framer-motion";
import { useContext, useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { eventsData } from "../data/events";
import { ThemeContext } from "../ThemeContext";

export default function Events() {
  const { theme } = useContext(ThemeContext);
  const sliderRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();
  const pauseTimeout = useRef(null);

  const sortedEvents = [...eventsData].sort((a, b) => {
    const order = { live: 1, register: 2, upcoming: 3, completed: 4 };
    return order[a.status] - order[b.status];
  });

  const loopedEvents = [...sortedEvents, ...sortedEvents]; // for loop effect

  const goToEventDetails = (event) => {
    if (!isDragging) navigate(`/event/${event.id}`, { state: { event } });
  };

  const triggerPause = () => {
    setPaused(true);
    if (pauseTimeout.current) clearTimeout(pauseTimeout.current);
    pauseTimeout.current = setTimeout(() => setPaused(false), 4000);
  };

  // Auto-scroll loop
  useEffect(() => {
    if (paused) return;
    const container = sliderRef.current;
    if (!container) return;

    const scrollSpeed = 1; // px per frame
    let animationFrame;

    const step = () => {
      container.scrollLeft += scrollSpeed;
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      }
      animationFrame = requestAnimationFrame(step);
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [paused]);

  // Theme colors
  const containerBg =
    theme === "dark"
      ? "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"
      : "bg-gradient-to-r from-white via-blue-50 to-white";
  const cardBg = theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900";
  const titleColor = theme === "dark" ? "#FFFFFF" : "#3B82F6"; // match About title
  const titleShadow = theme === "dark" ? "0 0 8px rgba(255,255,255,0.3)" : "0 0 8px rgba(59,130,246,0.3)";

  // Animation Variants for Letter-by-letter
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const letterVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 15 } } };

  return (
    <section
      id="events"
      className={`py-16 relative ${containerBg} transition-colors duration-500 select-none`}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="flex justify-center mb-12">
          <motion.h2
            className="flex flex-wrap justify-center font-bold text-[clamp(2rem,6vw,4rem)] relative cursor-pointer"
            style={{ color: titleColor, textShadow: titleShadow }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {"Events".split("").map((letter, idx) => (
              <motion.span key={idx} variants={letterVariants}>
                {letter}
              </motion.span>
            ))}
          </motion.h2>
        </div>

        {/* Card Row */}
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide py-4 px-2 cursor-grab active:cursor-grabbing"
          onMouseDown={() => setIsDragging(false)}
          onMouseMove={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseEnter={triggerPause} // pause on hover
          onTouchStart={triggerPause}
        >
          {loopedEvents.map((event, idx) => (
            <motion.div
              key={idx}
              onClick={() => goToEventDetails(event)}
              className={`${cardBg} w-[280px] min-w-[280px] rounded-lg shadow-md flex-shrink-0 flex flex-col cursor-pointer overflow-visible border border-transparent hover:border-blue-500 transition-all duration-300`}
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(0,0,0,0.6)" }}
            >
              <img
                src={event.poster}
                alt={event.title}
                className="h-52 w-full object-cover rounded-t-lg"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-semibold text-lg line-clamp-2">{event.title}</h3>
                <span className="mt-2 block text-sm">{event.time || "Time: TBA"}</span>
                <span className="block text-sm">{event.venue || "Venue: TBA"}</span>
                <div className="mt-auto">
                  {event.status === "completed" && (
                    <span className="mt-3 inline-block px-4 py-2 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                      Completed
                    </span>
                  )}
                  {event.status === "upcoming" && (
                    <span className="mt-3 inline-block px-4 py-2 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                      Upcoming
                    </span>
                  )}
                  {event.status === "register" && (
                    <span className="mt-3 inline-block px-4 py-2 text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-full transition">
                      Register Now
                    </span>
                  )}
                  {event.status === "live" && (
                    <span className="mt-3 inline-block px-4 py-2 text-xs font-medium bg-red-600 text-white rounded-full animate-pulse">
                      🔴 LIVE Now
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
