import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";

export default function Home() {
  const { theme } = useContext(ThemeContext);

  const sentence = "Empowering students to learn, build, and innovate in AI and coding.";
  const words = sentence.split(" ");

  const bgGradient =
    theme === "dark"
      ? "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"
      : "bg-gradient-to-r from-white via-blue-50 to-white";

  const headingColor = theme === "dark" ? "#FFFFFF" : "#3B82F6";
  const paragraphColor = theme === "dark" ? "text-gray-300" : "text-gray-600";

  const exploreBtnClasses =
    theme === "dark"
      ? "bg-blue-600 text-white hover:shadow-[0_0_12px_rgba(0,0,0,0.6)]"
      : "bg-blue-600 text-white hover:shadow-[0_0_12px_rgba(0,0,0,0.6)]";

  const learnBtnClasses =
    theme === "dark"
      ? "border border-blue-400 text-blue-400 hover:scale-105 hover:shadow-lg hover:shadow-blue-200"
      : "border border-blue-600 text-blue-600 hover:scale-105 hover:shadow-lg hover:shadow-blue-200";

  return (
    <section
      id="home"
      className={`w-full min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-16 lg:px-24 ${bgGradient}`}
    >
      <div className="max-w-5xl mx-auto text-center space-y-6">
        {/* Typewriter Heading */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <div
            className="text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] font-sans font-bold leading-tight"
            style={{
              color: headingColor,
              textShadow:
                theme === "dark"
                  ? "0 0 8px rgba(255,255,255,0.2), 0 0 16px rgba(255,255,255,0.1)"
                  : "0 0 8px rgba(0,0,0,0.2), 0 0 16px rgba(0,0,0,0.1)",
            }}
          >
            <Typewriter
              words={[
                'console.log("Welcome to AI Coding Club");',
                "Learn, Build, Innovate...",
                "Empowering Future Innovators",
                "Code, Create, Conquer!",
              ]}
              loop={Infinity}
              cursor
              cursorStyle="|"
              typeSpeed={80}
              deleteSpeed={50}
              delaySpeed={2000}
              textStyle={{ fontFamily: "monospace" }}
            />
          </div>
        </motion.div>

        {/* Subheading */}
        <motion.p className={`${paragraphColor} text-base sm:text-lg md:text-xl lg:text-2xl transition-all duration-300 hover:font-bold cursor-pointer flex flex-wrap justify-center`}>
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="mr-2 mb-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {word}
            </motion.span>
          ))}
        </motion.p>

        <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8, delay: 2.5 }}
  className="flex flex-col sm:flex-row justify-center gap-4 mt-6 w-full sm:w-auto"
>
  {/* Explore Events Button */}
  <a
    href="#events"
    className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-lg transition text-base sm:text-lg shadow-[0_0_6px_rgba(0,0,0,0.4)] 
               hover:scale-105 hover:shadow-lg hover:shadow-blue-200 text-center"
  >
    Explore Events
  </a>

  {/* Learn More Button */}
  <a
    href="#about"
    className="w-full sm:w-auto px-6 py-3 border border-blue-600 text-blue-600 font-medium rounded-lg transition text-base sm:text-lg 
               hover:scale-105 hover:shadow-lg hover:shadow-blue-200 text-center"
  >
    Learn More
  </a>
</motion.div>

      </div>
    </section>
  );
}
