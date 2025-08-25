import { motion, AnimatePresence } from "framer-motion";
import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../ThemeContext";
import "../index.css";

export default function About() {
  const { theme } = useContext(ThemeContext);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    // Trigger expansion after "AI" animates in
    const timer = setTimeout(() => {
      setExpanded(true);
    }, 2000); // Increased delay to make the "AI" more noticeable before expansion
    return () => clearTimeout(timer);
  }, []);

  const paragraphText = `AI Coding Club (AICC) is dedicated to empowering students to learn, build, and innovate in the fields of Artificial Intelligence and software development. We provide hands on learning opportunities through workshops, hackathons, and collaborative projects. Our goal is to help students gain real world experience by working on practical problems. We encourage teamwork, creativity, and continuous learning. AICC empowers growth and innovation.`;

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.02 },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const bgGradient =
    theme === "dark"
      ? "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"
      : "bg-gradient-to-r from-white via-blue-50 to-white";

  const headingColor = theme === "dark" ? "#FFFFFF" : "#3B82F6";
  const paragraphColor = theme === "dark" ? "text-gray-300" : "text-gray-600";

  return (
    <section
      id="about"
      className={`w-full py-20 sm:py-28 md:py-36 px-4 sm:px-6 md:px-16 lg:px-24 ${bgGradient} transition-colors duration-500`}
    >
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Animated Heading */}
        <h2
          className="flex flex-wrap justify-center gap-3 font-bold glowing-black"
          style={{
            color: headingColor,
            fontSize: "clamp(2rem, 5vw, 4rem)",
          }}
        >
          <motion.span
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0 }}
          >
            About
          </motion.span>

          {/* Expanding AI */}
          <AnimatePresence mode="wait">
            {!expanded ? (
              <motion.span
                key="AI"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                AI
              </motion.span>
            ) : (
              <motion.span
                key="ArtificialIntelligence"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, type: "spring", bounce: 0.3 }}
              >
                Artificial Intelligence
              </motion.span>
            )}
          </AnimatePresence>

          <motion.span
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Coding Club
          </motion.span>
        </h2>

        {/* Paragraph letter-by-letter animation */}
        <motion.p
          variants={container}
          initial="hidden"
          whileInView="visible"
          className={`${paragraphColor} text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed break-words transition-all duration-500`}
        >
          {paragraphText.split("").map((char, index) => (
            <motion.span key={index} variants={letter}>
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.p>
      </div>
    </section>
  );
}
