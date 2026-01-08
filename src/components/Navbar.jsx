import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";
import { ThemeContext } from "../ThemeContext";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const goToMembersPage = () => {
    navigate("/members");
  };

  const [active, setActive] = useState("Home");
  const [isScrolling, setIsScrolling] = useState(false); // disable listener while smooth scrolling
  const menuItems = ["Home", "About", "Events", "Life@AICC", "Members"];
  const logoText = "AI Coding Club";

  // Smooth scroll + active section tracking
  useEffect(() => {
    if (location.pathname === "/members") {
      setActive("Members");
      return;
    }

    const handleScroll = () => {
      if (isScrolling) return; // ignore scroll updates during smooth scroll
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
  }, [location.pathname, isScrolling]);

  const scrollToSection = (id) => {
    if (id === "members") {
      goToMembersPage();
      setActive("Members");
      return;
    }

    // If we're on the members page, navigate to home first
    if (location.pathname === "/members") {
      navigate("/");
      setTimeout(() => {
        const section = document.getElementById(id);
        if (section) {
          setIsScrolling(true);
          section.scrollIntoView({ behavior: "smooth" });
          setActive(menuItems.find(item => 
            item.toLowerCase().replace(/[^a-z0-9]/g, "") === id
          ));
          setTimeout(() => setIsScrolling(false), 800); // match scroll duration
        }
      }, 100);
      return;
    }

    const section = document.getElementById(id);
    if (section) {
      setIsScrolling(true);
      section.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => setIsScrolling(false), 800);
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed w-full top-0 left-0 z-50 transition-all shadow-md md:block ${
          theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-2 md:flex md:justify-between md:items-center relative">
          {/* Logo */}
          <div className="flex w-full justify-between items-center mb-2 md:mb-0">
            <motion.div
              className="flex items-center cursor-pointer hide-logo-below-300"
              onClick={() => scrollToSection("home")}
            >
              <motion.img
                src="/aicc-logo.webp"
                alt="AICC Logo"
                className="h-10 w-10 rounded-full"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 1 }}
              />
              <div className="flex space-x-0.5 text-2xl lg:text-3xl font-bold tracking-wide" style={{ fontFamily: "'Gentium Basic', serif" }}>
                {logoText.split("").map((letter, index) => (
                  <motion.span
                    key={index}
                    whileHover={{
                      textShadow: "0 0 8px #2563EB, 0 0 16px #2563EB",
                      color: "#2563EB",
                      scale: 1.2,
                    }}
                    style={{ color: theme === "dark" ? "#fff" : "#111827" }}
                    transition={{ duration: 0.3 }}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Theme & Menu (mobile) */}
            <div className="flex items-center md:hidden navbar-btn-group">
              <motion.button
                onClick={toggleTheme}
                className={`ml-2 text-xl p-2 rounded-full transition shadow-lg
                  ${theme === "dark" 
                    ? "bg-gray-800 text-yellow-300 hover:bg-gray-700" 
                    : "bg-white text-gray-800 hover:bg-gray-100"
                  }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {theme === "dark" ? <FaSun /> : <FaMoon />}
              </motion.button>
              <button
                className={`ml-2 text-2xl ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? "✖" : "☰"}
              </button>
            </div>
          </div>

          {/* Menu Items */}
          <div className={`w-full ${isOpen ? 'flex' : 'hidden'} flex-col md:flex md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6 font-medium`}>
            {menuItems.map((item) => {
              const sectionId = item.toLowerCase().replace(/[^a-z0-9]/g, "");
              return (
                <button
                  key={item}
                  onClick={() => {
                    setActive(item);
                    scrollToSection(sectionId);
                    setIsOpen(false);
                  }}
                  className={`px-3 py-2 md:py-1 transition-all relative text-lg lg:text-xl
                    ${theme === "dark"
                      ? "text-white hover:text-blue-400"
                      : "text-gray-900 hover:text-blue-600"
                    } ${active === item && "after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600 after:animate-underlineEffect after:shadow-[0_0_5px_#2563eb] after:rounded-full"}`}
                >
                  {item}
                </button>
              );
            })}

            {/* Desktop Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="hidden md:block text-xl p-2 rounded-full hover:bg-gray-700 hover:text-yellow-300 transition"
            >
              {theme === "dark" ? <FaSun /> : <FaMoon />}
            </button>
          </div>
        </div>
      </motion.nav>
    </>
  );
}