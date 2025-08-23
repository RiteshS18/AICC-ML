import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";
import { ThemeContext } from "../ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("Home");

  const menuItems = ["Home", "About", "Events", "Life@AICC"];
  const logoText = "AI Coding Club";

  // Smooth scroll + active section tracking
  useEffect(() => {
    const handleScroll = () => {
      menuItems.forEach((item) => {
        const sectionId = item.toLowerCase().replace(/[^a-z0-9]/g, "");
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActive(item);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      className={`fixed w-full top-0 left-0 z-50 transition-all shadow-md ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div className="flex items-center space-x-2 cursor-pointer" onClick={() => scrollToSection("home")}>
          <motion.img
            src="/logo.jpg"
            alt="AICC Logo"
            className="h-10 w-10 rounded-full"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 1 }}
          />
          <div className="flex space-x-0.5 font-mono text-xl font-bold tracking-wide">
            {logoText.split("").map((letter, index) => (
              <motion.span
                key={index}
                whileHover={{ textShadow: "0 0 8px #2563EB, 0 0 16px #2563EB", color: "#2563EB", scale: 1.2 }}
                style={{ color: theme === "dark" ? "#fff" : "#111827" }}
                transition={{ duration: 0.3 }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 font-medium items-center">
          {menuItems.map((item) => {
            const sectionId = item.toLowerCase().replace(/[^a-z0-9]/g, "");
            return (
              <button
                key={item}
                onClick={() => scrollToSection(sectionId)}
                className={`px-3 py-1 rounded-lg transition-all ${
                  active === item
                    ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-md"
                    : theme === "dark"
                    ? "text-white hover:text-blue-400"
                    : "text-gray-900 hover:text-blue-600"
                }`}
              >
                {item}
              </button>
            );
          })}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="ml-4 text-xl p-2 rounded-full hover:bg-gray-700 hover:text-yellow-300 transition"
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        {/* Mobile Menu */}
        <button
          className={`md:hidden ${theme === "dark" ? "text-white" : "text-gray-900"}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className={`md:hidden px-6 pb-4 ${
            theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
          }`}
        >
          {menuItems.map((item) => {
            const sectionId = item.toLowerCase().replace(/[^a-z0-9]/g, "");
            return (
              <button
                key={item}
                onClick={() => {
                  setIsOpen(false);
                  scrollToSection(sectionId);
                }}
                className={`block w-full py-2 rounded-lg transition ${
                  active === item
                    ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-md"
                    : "hover:scale-105"
                }`}
              >
                {item}
              </button>
            );
          })}
          <button
            onClick={toggleTheme}
            className="mt-2 p-2 rounded-full hover:bg-gray-700 hover:text-yellow-300 w-full transition text-xl flex justify-center"
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      )}
    </motion.nav>
  );
}
