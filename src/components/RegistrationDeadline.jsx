import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../ThemeContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { eventsData } from '../data/events';

export default function RegistrationDeadline({ className = '' }) {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  
  const hackvotrixEvent = eventsData.find((event) =>
    event.title.toLowerCase().includes("hackvotrix")
  );

  const goToHackvotrix = () => {
    if (hackvotrixEvent) {
      navigate(`/event/${hackvotrixEvent.id}`, {
        state: { event: hackvotrixEvent },
      });
    }
  };

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Set your target date here
  const targetDate = new Date('September 12, 2025 23:59:59').getTime();

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

  const bgColor = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const accentColor = theme === 'dark' ? 'text-blue-400' : 'text-blue-600';

  const TimeUnit = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
        className={`w-20 h-20 ${theme === 'dark' ? 'bg-gray-800/10' : 'bg-white/10'} backdrop-blur-sm border ${theme === 'dark' ? 'border-blue-500/30' : 'border-blue-400/30'} rounded-full flex items-center justify-center mb-2 shadow-lg ring-2 ring-blue-500/20 ring-offset-2 ring-offset-transparent`}
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
        
        <div className="flex flex-wrap justify-center gap-8 mb-8">
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
  onClick={goToHackvotrix}
  className={`px-8 py-3 ${theme === 'dark' ? 'bg-blue-600' : 'bg-blue-600'} 
  text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-lg cursor-pointer`}
>
  REGISTER NOW
</button>

        </motion.div>

        <p className={`text-center mt-4 ${textColor} text-sm`}>
          SEPTEMBER 12, 2025 - FRIDAY
        </p>
      </motion.div>
    </div>
  );
}
