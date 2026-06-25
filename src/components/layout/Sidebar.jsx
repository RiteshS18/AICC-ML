import { useState, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Info, CalendarDays, Camera, Users, Mail } from 'lucide-react'
import { FaLinkedinIn, FaInstagram } from 'react-icons/fa'

const navItems = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'about', icon: Info, label: 'About' },
  { id: 'events', icon: CalendarDays, label: 'Events' },
  { id: 'gallery', icon: Camera, label: 'Gallery' },
  { id: 'members', icon: Users, label: 'Team' },
]

const socialLinks = [
  {
    icon: FaLinkedinIn,
    href: 'https://www.linkedin.com/company/ai-coding-club-kec/',
    label: 'LinkedIn',
  },
  {
    icon: FaInstagram,
    href: 'https://www.instagram.com/ai_codingclub/',
    label: 'Instagram',
  },
  {
    icon: Mail,
    href: 'mailto:aicodingclub@kongu.edu',
    label: 'Email',
    isLucide: true,
  },
]

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState('home')
  const [hoveredItem, setHoveredItem] = useState(null)
  const [isSidebarHovered, setIsSidebarHovered] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  // ── Scroll detection for auto-hide ──
  useEffect(() => {
    let scrollTimeout
    const handleScroll = () => {
      setIsScrolling(true)
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false)
      }, 1500)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [])

  // ── IntersectionObserver for active section detection ──
  useEffect(() => {
    if (location.pathname === '/members') {
      setActiveSection('members')
      return
    }
    if (location.pathname === '/gallery') {
      setActiveSection('gallery')
      return
    }

    const sectionIds = navItems.filter(i => i.id !== 'members' && i.id !== 'gallery').map((item) => item.id)
    const observers = []

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -40% 0px',
      threshold: [0.1],
    }

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) {
        const observer = new IntersectionObserver(handleIntersect, observerOptions)
        observer.observe(el)
        observers.push(observer)
      }
    })

    return () => observers.forEach((obs) => obs.disconnect())
  }, [location.pathname])

  // ── Navigation handler ──
  const handleNavClick = useCallback((id) => {
    if (id === 'members') {
      navigate('/members')
    } else if (id === 'gallery') {
      navigate('/gallery')
    } else {
      if (location.pathname !== '/') {
        navigate('/')
        setTimeout(() => {
          const el = document.getElementById(id)
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      } else {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [location.pathname, navigate])

  return (
    <>
      {/* ═══════════════════════════════════
          Desktop Sidebar (≥768px)
         ═══════════════════════════════════ */}
      {/* Desktop Sidebar Trigger Zone */}
      <div 
        className="hidden md:block fixed left-0 top-0 h-screen w-6 z-40"
        onMouseEnter={() => setIsSidebarHovered(true)}
      />

      <motion.nav
        className="hidden md:flex fixed left-0 top-0 h-screen flex-col items-center py-6 z-50"
        onMouseEnter={() => setIsSidebarHovered(true)}
        onMouseLeave={() => setIsSidebarHovered(false)}
        initial={{ x: -72 }}
        animate={{ x: isSidebarHovered || isScrolling ? 0 : -72 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{
          width: '72px',
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(0, 0, 0, 0.06)',
        }}
      >

        {/* ── Navigation Icons (centered vertically) ── */}
        <div className="flex-1 flex flex-col items-center justify-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id

            return (
              <div
                key={item.id}
                className="relative flex items-center justify-center"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {/* Active indicator bar */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className="absolute left-0 rounded-r-full"
                      style={{
                        width: '3px',
                        height: '24px',
                        background: 'linear-gradient(180deg, #4f46e5, #7c3aed)',
                        left: '-16px',
                      }}
                      initial={{ opacity: 0, scaleY: 0 }}
                      animate={{ opacity: 1, scaleY: 1 }}
                      exit={{ opacity: 0, scaleY: 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                    />
                  )}
                </AnimatePresence>

                {/* Icon button */}
                <button
                  onClick={() => handleNavClick(item.id)}
                  className="flex items-center justify-center rounded-xl cursor-pointer transition-all duration-300"
                  style={{
                    width: '44px',
                    height: '44px',
                    color: isActive ? '#4f46e5' : '#94a3b8',
                    background: isActive
                      ? 'rgba(79, 70, 229, 0.08)'
                      : 'transparent',
                  }}
                  onMouseOver={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = '#f1f5f9'
                      e.currentTarget.style.color = '#4f46e5'
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.color = '#94a3b8'
                    }
                  }}
                  aria-label={item.label}
                >
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                </button>

                {/* Tooltip */}
                <AnimatePresence>
                  {hoveredItem === item.id && (
                    <motion.div
                      className="absolute left-full ml-3 px-3 py-1.5 rounded-lg text-xs font-medium text-white whitespace-nowrap pointer-events-none"
                      style={{
                        background: '#0f172a',
                        zIndex: 60,
                      }}
                      initial={{ opacity: 0, scale: 0.8, x: -4, originX: 0 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.8, x: -4 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                    >
                      {item.label}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        {/* ── Social Icons (bottom) ── */}
        <div className="flex flex-col items-center gap-1.5" style={{ flexShrink: 0 }}>
          {socialLinks.map((social) => {
            const Icon = social.icon
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-xl transition-all duration-300"
                style={{
                  width: '36px',
                  height: '36px',
                  color: '#94a3b8',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = '#4f46e5'
                  e.currentTarget.style.background = '#f1f5f9'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = '#94a3b8'
                  e.currentTarget.style.background = 'transparent'
                }}
                aria-label={social.label}
              >
                {social.isLucide ? (
                  <Icon size={16} strokeWidth={2} />
                ) : (
                  <Icon size={14} />
                )}
              </a>
            )
          })}
        </div>
      </motion.nav>

      {/* ═══════════════════════════════════
          Mobile Bottom Bar (<768px)
         ═══════════════════════════════════ */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around"
        style={{
          height: '64px',
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(0, 0, 0, 0.06)',
        }}
      >
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id

          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="flex flex-col items-center justify-center gap-1 cursor-pointer transition-all duration-300"
              style={{
                color: isActive ? '#4f46e5' : '#94a3b8',
                padding: '8px 12px',
              }}
              aria-label={item.label}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />

              {/* Active dot indicator */}
              <div
                className="rounded-full transition-all duration-300"
                style={{
                  width: isActive ? '4px' : '0px',
                  height: isActive ? '4px' : '0px',
                  background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                  opacity: isActive ? 1 : 0,
                }}
              />
            </button>
          )
        })}
      </nav>
    </>
  )
}
