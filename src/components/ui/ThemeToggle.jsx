import { useState, useEffect, useCallback } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ThemeToggle — Sun / Moon toggle button.
 *
 * • Reads initial theme from <html data-theme> (set by index.html inline script)
 * • Persists choice to localStorage
 * • Listens for system preference changes
 * • Applies a brief .theme-transition class for smooth colour crossfade
 */
export default function ThemeToggle({ className = '' }) {
  const [theme, setTheme] = useState(() => {
    // Read the attribute set by the blocking <script> in index.html
    return document.documentElement.getAttribute('data-theme') || 'light';
  });

  const applyTheme = useCallback((newTheme) => {
    const root = document.documentElement;

    // Add transition class, apply theme, then remove after animation
    root.classList.add('theme-transition');
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);

    const timer = setTimeout(() => {
      root.classList.remove('theme-transition');
    }, 350);

    return () => clearTimeout(timer);
  }, []);

  // Listen for system preference changes (only when no explicit stored choice)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => {
      if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [applyTheme]);

  const toggleTheme = () => {
    applyTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-10 h-10 rounded-xl flex items-center justify-center
        border border-[var(--border)] hover:border-[var(--border-hover)]
        bg-[var(--surface)] hover:bg-[var(--surface-hover)]
        transition-all duration-200 cursor-pointer
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]
        ${className}`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="w-[18px] h-[18px]" style={{ color: 'var(--gold-text)' }} />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className="w-[18px] h-[18px]" style={{ color: 'var(--gold-text)' }} />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
