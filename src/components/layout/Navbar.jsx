import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Sparkles,
  ChevronRight,
  Users,
  Camera,
  CalendarDays,
  FolderGit2,
  Trophy,
  HelpCircle,
  Layers,
  Info,
  Home as HomeIcon,
} from 'lucide-react';
import { FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import ThemeToggle from '../ui/ThemeToggle';

const navLinks = [
  { id: 'home', label: 'Home', isPage: false, path: '/', icon: HomeIcon },
  { id: 'about', label: 'About', isPage: false, path: '/#about', icon: Info },
  { id: 'domains', label: 'Domains', isPage: false, path: '/#domains', icon: Layers },
  { id: 'events', label: 'Events', isPage: false, path: '/#events', icon: CalendarDays },
  { id: 'projects', label: 'Projects', isPage: false, path: '/#projects', icon: FolderGit2 },
  { id: 'leaderboard', label: 'Leaderboard', isPage: false, path: '/#leaderboard', icon: Trophy },
  { id: 'members', label: 'Team', isPage: true, path: '/members', icon: Users },
  { id: 'gallery', label: 'Gallery', isPage: true, path: '/gallery', icon: Camera },
  { id: 'faq', label: 'FAQ', isPage: false, path: '/#faq', icon: HelpCircle },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll detection for navbar background + shrink
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Active section tracking via IntersectionObserver on homepage
  useEffect(() => {
    if (location.pathname === '/members') {
      setActiveSection('members');
      return;
    }
    if (location.pathname === '/gallery') {
      setActiveSection('gallery');
      return;
    }

    if (location.pathname !== '/') {
      setActiveSection('');
      return;
    }

    const sectionIds = ['home', 'about', 'domains', 'events', 'projects', 'leaderboard', 'faq', 'join'];
    const observers = [];

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0.05,
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        observers.push({ observer, el });
      }
    });

    return () => {
      observers.forEach(({ observer: obs, el }) => obs.unobserve(el));
    };
  }, [location.pathname]);

  // Handle hash scrolling if navigating from another page
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location]);

  const handleNavClick = (link) => {
    setMobileMenuOpen(false);

    if (link.isPage) {
      navigate(link.path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (location.pathname === '/') {
      if (link.id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(link.id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      navigate(`/#${link.id}`);
    }
  };

  const handleJoinClick = () => {
    setMobileMenuOpen(false);
    if (location.pathname === '/') {
      const el = document.getElementById('join') || document.getElementById('contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/#join');
    }
  };

  return (
    <header
      role="banner"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? 'var(--nav-bg)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--nav-border)' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        boxShadow: scrolled ? '0 4px 24px -4px var(--shadow-color)' : 'none',
        padding: scrolled ? '8px 0' : '14px 0',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Club Name */}
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 group cursor-pointer"
            aria-label="AIML Coding Club Home"
            style={{ textDecoration: 'none' }}
          >
            <div className="relative">
              <div
                className="w-10 h-10 rounded-xl overflow-hidden p-0.5 transition-all duration-300"
                style={{
                  border: '1.5px solid var(--border)',
                  backgroundColor: 'var(--surface)',
                }}
              >
                <img
                  src="/aiml-logo.jpg"
                  alt="AIML Coding Club Logo"
                  className="w-full h-full object-cover rounded-lg transform group-hover:scale-105 transition-transform duration-300"
                  width={36}
                  height={36}
                />
              </div>
              {/* Gold glow on hover */}
              <div
                className="absolute -inset-0.5 rounded-xl blur opacity-0 group-hover:opacity-40 transition-opacity duration-300 -z-10"
                style={{ background: 'var(--gold-gradient)' }}
              />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span
                  className="font-display font-extrabold text-lg tracking-tight"
                  style={{
                    background: 'var(--gold-gradient)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  AIML
                </span>
                <span
                  className="font-display font-semibold text-base tracking-tight"
                  style={{ color: 'var(--text)' }}
                >
                  Coding Club
                </span>
              </div>
              <span
                className="text-[10px] tracking-wider uppercase font-medium"
                style={{ color: 'var(--text-muted)' }}
              >
                Kongu Engineering College
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            role="navigation"
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-1 xl:gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--surface) 80%, transparent)',
              border: '1px solid var(--border)',
            }}
          >
            {navLinks.map((link) => {
              const isActive =
                (link.isPage && location.pathname === link.path) ||
                (!link.isPage && location.pathname === '/' && activeSection === link.id);

              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link)}
                  className="relative px-3 py-1.5 rounded-full text-xs xl:text-sm font-medium transition-all duration-200 cursor-pointer"
                  style={{
                    color: isActive ? 'var(--gold-text)' : 'var(--text-secondary)',
                    fontWeight: isActive ? 600 : 500,
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = 'var(--text)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = 'var(--text-secondary)';
                  }}
                >
                  {link.label}
                  {/* Gold underline active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active-underline"
                      className="absolute -bottom-0.5 left-2 right-2 h-[2px] rounded-full"
                      style={{ background: 'var(--gold-gradient)' }}
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop Right Side: Theme Toggle + Socials + CTA */}
          <div className="hidden lg:flex items-center gap-2.5">
            <ThemeToggle />

            <div className="flex items-center gap-1 mr-1" style={{ color: 'var(--text-muted)' }}>
              <a
                href="https://www.linkedin.com/company/ai-coding-club-kec/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--gold-text)'; e.currentTarget.style.backgroundColor = 'var(--surface-2)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.backgroundColor = 'transparent'; }}
                aria-label="AIML Club LinkedIn"
              >
                <FaLinkedinIn className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.instagram.com/ai_codingclub/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--gold-text)'; e.currentTarget.style.backgroundColor = 'var(--surface-2)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.backgroundColor = 'transparent'; }}
                aria-label="AIML Club Instagram"
              >
                <FaInstagram className="w-3.5 h-3.5" />
              </a>
            </div>

            <button
              onClick={handleJoinClick}
              className="btn-gold text-xs !py-2 !px-4 !rounded-xl"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Join Us</span>
            </button>
          </div>

          {/* Mobile: Theme Toggle + Join + Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle className="!w-9 !h-9" />

            <button
              onClick={handleJoinClick}
              className="btn-gold text-xs !py-1.5 !px-3 !rounded-lg !min-h-[36px]"
            >
              <Sparkles className="w-3 h-3" />
              <span>Join</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors cursor-pointer"
              style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                color: 'var(--text)',
              }}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden overflow-hidden backdrop-blur-2xl"
            style={{
              backgroundColor: 'var(--nav-bg)',
              borderBottom: '1px solid var(--border)',
            }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-4">
              <nav className="grid grid-cols-2 gap-2" aria-label="Mobile Navigation">
                {navLinks.map((link, idx) => {
                  const Icon = link.icon;
                  const isActive =
                    (link.isPage && location.pathname === link.path) ||
                    (!link.isPage && location.pathname === '/' && activeSection === link.id);

                  return (
                    <motion.button
                      key={link.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.03, duration: 0.2 }}
                      onClick={() => handleNavClick(link)}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left text-sm transition-all cursor-pointer"
                      style={{
                        backgroundColor: isActive ? 'var(--gold-subtle)' : 'var(--surface)',
                        color: isActive ? 'var(--gold-text)' : 'var(--text-secondary)',
                        border: isActive ? '1px solid var(--border-hover)' : '1px solid var(--border)',
                        fontWeight: isActive ? 600 : 500,
                      }}
                    >
                      <Icon
                        className="w-4 h-4"
                        style={{ color: isActive ? 'var(--gold-text)' : 'var(--gold-deep)' }}
                      />
                      <span className="truncate">{link.label}</span>
                    </motion.button>
                  );
                })}
              </nav>

              {/* Mobile Drawer Bottom Section */}
              <div
                className="pt-4 flex items-center justify-between"
                style={{ borderTop: '1px solid var(--border)' }}
              >
                <div className="flex items-center gap-2">
                  <a
                    href="https://www.linkedin.com/company/ai-coding-club-kec/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{
                      backgroundColor: 'var(--surface)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-muted)',
                    }}
                    aria-label="LinkedIn"
                  >
                    <FaLinkedinIn className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.instagram.com/ai_codingclub/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{
                      backgroundColor: 'var(--surface)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-muted)',
                    }}
                    aria-label="Instagram"
                  >
                    <FaInstagram className="w-4 h-4" />
                  </a>
                </div>

                <button
                  onClick={handleJoinClick}
                  className="btn-gold text-xs !py-2.5 !px-5 !rounded-xl"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Join AIML Club</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
