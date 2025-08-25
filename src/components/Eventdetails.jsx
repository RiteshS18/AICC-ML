import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../ThemeContext";

export default function EventDetails() {
  const { theme } = useContext(ThemeContext);
  const { state } = useLocation();
  const navigate = useNavigate();
  const event = state?.event;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  if (!event)
    return (
      <p className="text-center mt-10 text-gray-500 dark:text-gray-300">
        No event data found.
      </p>
    );

  const bgGradient =
    theme === "dark"
      ? "bg-gray-900 text-gray-100"
      : "bg-white text-gray-900";

  const cardBg =
    theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200";

  // Carousel auto-loop for past year photos
  useEffect(() => {
    if (!event.photos || event.photos.length === 0) return;

    const interval = setInterval(() => {
      if (!paused) {
        setCurrentIndex((prev) => (prev + 1) % event.photos.length);
      }
    }, 3000); // 3 seconds per image
    return () => clearInterval(interval);
  }, [paused, event.photos]);

  return (
    <div
      className={`${bgGradient} transition-colors duration-500 min-h-screen px-4 sm:px-8 md:px-12 lg:px-16 py-10 md:py-14`}
    >
      {/* Back Button */}
      <motion.button
        onClick={() => navigate(-1)}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgba(0,0,0,0.5)" }}
        className={`mb-6 px-4 py-2 rounded-lg font-medium transition duration-300 ${
          theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-800"
        }`}
      >
        ⬅ Back
      </motion.button>

      {/* Event Title */}
      <motion.h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center mb-10 leading-tight">
        {event.title.split("").map((char, idx) => (
          <motion.span
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            whileHover={{ scale: 1.2, color: "#3B82F6" }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.h1>

      {/* Main Section */}
      <div className="flex flex-col md:flex-row md:items-start md:gap-6">
        {/* Left Column: Poster + Info */}
        <div className="flex-1 flex flex-col items-center md:items-start md:max-w-[400px]">
          <motion.img
            src={event.poster}
            alt={event.title}
            className="w-full h-[400px] object-cover rounded-xl mb-4 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
          />

          <div className="text-center md:text-left space-y-2">
            {event.time && <p className="font-semibold text-lg">🕒 {event.time}</p>}
            {event.venue && <p className="font-semibold text-lg">📍 {event.venue}</p>}

            {event.status === "register" && event.registrationLink ? (
              <motion.a
                href={event.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative inline-block mt-3 px-8 py-3 text-lg font-bold rounded-lg
                  overflow-hidden bg-transparent border-2 border-blue-500/50
                  hover:border-blue-400 transition-all duration-300
                  before:absolute before:inset-0 
                  before:bg-gradient-to-r before:from-blue-600 before:to-blue-500
                  before:transition-transform before:duration-500
                  before:translate-x-[-100%] hover:before:translate-x-0 before:-z-10
                  hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]
                  hover:scale-105 active:scale-95`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent group-hover:text-white transition-colors duration-300">
                  REGISTER NOW
                </span>
                <div className="absolute inset-0 -z-20 bg-gradient-to-r from-blue-600/20 to-blue-500/20 backdrop-blur-[2px]"></div>
              </motion.a>
            ) : event.status === "live" ? (
              <span className="mt-3 inline-block px-4 py-1 rounded-full bg-red-600 text-white text-sm font-bold shadow-md animate-pulse">
                🔴 LIVE
              </span>
            ) : (
              <span
                className={`mt-3 inline-block px-4 py-1 rounded-full text-sm font-medium ${
                  event.status === "upcoming"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                }`}
              >
                {event.status?.toUpperCase()}
              </span>
            )}
          </div>
        </div>

        {/* Right Column: About + How Cards */}
        <div className="flex-1 flex flex-col gap-4 mt-6 md:mt-0">
          <motion.div
            className={`p-6 ${cardBg} rounded-3xl border transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-200 text-center flex-1 mb-[10px] min-h-[180px] h-[400px]`}
          >
            <h2 className="text-2xl font-bold mb-2 text-indigo-600">About</h2>
            <p className="text-base sm:text-lg leading-relaxed overflow-auto">
              {event.about || event.description || "This event inspires learning and innovation."}
            </p>
          </motion.div>

          <motion.div
            className={`p-6 ${cardBg} rounded-3xl border transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-200 text-center flex-1 min-h-[150px] h-[400px]`}
          >
            <h2 className="text-2xl font-bold mb-2 text-green-600">How It's Conducted</h2>
            <p className="text-base sm:text-lg leading-relaxed overflow-auto">
              {event.how || "Interactive coding sessions, workshops, and peer learning."}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Past Year Photos Carousel */}
      {event.photos && event.photos.length > 0 && (
        <div className="mt-12 w-full flex flex-col items-center">
          <h2 className="text-3xl font-semibold mb-4">Past Year Photos</h2>
          <motion.div
            className="w-full md:w-[700px] h-[350px] overflow-hidden rounded-xl shadow-lg"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <motion.img
              src={event.photos[currentIndex]}
              alt={`Past ${currentIndex + 1}`}
              className="w-full h-full object-cover transition-all duration-500"
              key={currentIndex}
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        </div>
      )}
    </div>
  );
}
