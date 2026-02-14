import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../ThemeContext';
import { motion } from 'framer-motion';
import { eventsData } from '../data/events';

export default function RegistrationDeadline({ className = '', onRegisterClick }) {
  const { theme } = useContext(ThemeContext);
  
  // Navigate to event page or open registration form
  const handleRegisterClick = () => {
    if (onRegisterClick) {
      onRegisterClick();
    } else {
      const Event = eventsData.find((event) =>
        event.title.toLowerCase().includes("hacksphere")
      );
      const formUrl = Event?.registrationLink || "https://forms.gle/xKcrrP17Cy9Gt3u46";
      window.open(formUrl, "_blank", "noopener,noreferrer");
    }
  };

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Use ISO8601 format to avoid locale-dependent parsing (interpreted as local timezone)
  const targetDate = new Date('2026-02-16T23:59:59').getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const textColor = 'text-white';
  const accentColor = 'text-white';

  const TimeUnit = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
        className="w-20 h-20 bg-white/20 backdrop-blur-sm border border-white/40 rounded-full flex items-center justify-center mb-2 shadow-lg ring-2 ring-white/30 ring-offset-2 ring-offset-transparent"
      >
        <span className={`text-3xl font-bold ${accentColor}`}>
          {value.toString().padStart(2, '0')}
        </span>
      </motion.div>
      <span className={`text-sm font-medium ${textColor}`}>{label}</span>
    </div>
  );

  return (
    <div className={`w-full ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto px-4"
      >
        <h2 className={`text-3xl md:text-4xl font-bold text-blue-500 text-center mb-8 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]`}>
          REGISTRATION DEADLINE
        </h2>
        
        <div className="flex flex-wrap md:flex-nowrap justify-center gap-4 md:gap-8 mb-8">
          <TimeUnit value={timeLeft.days} label="DAYS" />
          <TimeUnit value={timeLeft.hours} label="HOURS" />
          <TimeUnit value={timeLeft.minutes} label="MINS" />
          <TimeUnit value={timeLeft.seconds} label="SECS" />
        </div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex justify-center"
        >
         <button
            onClick={handleRegisterClick}
            className={`group relative px-8 py-3 text-lg font-bold rounded-lg
              overflow-hidden bg-transparent border-2 border-blue-500/50
              hover:border-blue-400 transition-all duration-300
              before:absolute before:inset-0 
              before:bg-gradient-to-r before:from-blue-600 before:to-blue-500
              before:transition-transform before:duration-500
              before:translate-x-[-100%] hover:before:translate-x-0 before:-z-10
              hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]
              hover:scale-105 active:scale-95`}
          >
            <span className="relative z-10 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent group-hover:text-white transition-colors duration-300">
              REGISTER NOW
            </span>
            <div className="absolute inset-0 -z-20 bg-gradient-to-r from-blue-600/20 to-blue-500/20 backdrop-blur-[2px]"></div>
          </button>

        </motion.div>
       
       <p className={`text-center mt-6 ${textColor} text-sm`}>
         Registrations are open now. 
      </p>

      <p className={`text-center mt-2 ${textColor} text-sm`}>
      Deadline : Feb 16, 2026 - Monday
      </p>

      </motion.div>
    </div>
  );
}
