import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../ThemeContext";

const lifeImages = [
  { id: 1, src: "/life/23-24_1.webp", alt: "Hackathon Event", year: "2023-2024" },
  { id: 2, src: "/life/23-24_2.webp", alt: "Team Meetup", year: "2023-2024" },
  { id: 3, src: "/life/24-25_1.webp", alt: "Club Celebration", year: "2024-2025" },
  { id: 4, src: "/life/24-25_2.webp", alt: "Project Showcase", year: "2024-2025" },
  { id: 5, src: "/life/24-25_3.webp", alt: "Casual Fun", year: "2024-2025" },
  { id: 6, src: "/life/25-26_1.webp", alt: "AI Workshop", year: "2025-2026" },
  { id: 7, src: "/life/25-26_2.webp", alt: "Hackathon Winners", year: "2025-2026" },
  { id: 8, src: "/life/25-26_3.webp", alt: "Annual Meet", year: "2025-2026" },
];

export default function Life() {
  const { theme } = useContext(ThemeContext);
  const [currentIndex, setCurrentIndex] = useState(0);

  const bgGradient =
    theme === "dark"
      ? "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"
      : "bg-gradient-to-r from-white via-blue-50 to-white";

  const yearLabelColor =
    theme === "dark" ? "bg-gray-700 text-gray-200" : "bg-white text-gray-700";

  // Auto-loop every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % lifeImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="lifeaicc"
      className={`${bgGradient} py-20 px-6 md:px-16 transition-colors duration-500`}
    >
      {/* Title */}
      <div className="text-center mb-12">
        <motion.h2
          className={`text-4xl md:text-5xl font-extrabold tracking-wide ${
            theme === "dark"
              ? "text-white drop-shadow-[0_0_15px_rgba(0,0,255,0.7)]"
              : "bg-gradient-to-r from-blue-400 via-blue-600 to-purple-500 bg-clip-text text-transparent drop-shadow-lg"
          }`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Life @ AICC
        </motion.h2>
        <motion.p
          className={`mt-3 text-lg ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          A glimpse of our journey, teamwork, and unforgettable moments.
        </motion.p>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden relative w-full max-w-4xl mx-auto rounded-3xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {lifeImages.map((img) => (
            <div
              key={img.id}
              className="flex-shrink-0 w-full flex flex-col items-center"
              style={{ maxHeight: "350px" }} // reduced image size
            >
              {/* Image */}
              <div className="w-full relative rounded-2xl shadow-lg overflow-hidden">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Year Tag */}
              <span
                className={`mt-3 px-4 py-1 rounded-full text-sm font-semibold ${yearLabelColor}`}
              >
                {img.year}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
