import { useState, useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import IntroScreen from './components/layout/IntroScreen'
import Layout from './components/layout/Layout'
import EventDetails from './components/sections/EventDetails'
import GalleryPage from './pages/GalleryPage'
import SDGPage from './pages/SDGPage'
import ExamInvigilator from './pages/projects/ExamInvigilator/ExamInvigilator'

// ── DS Wing (original, unchanged) ───────────────────────────────────────────
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Events from './components/sections/Events'
import Leaderboard from './components/sections/Leaderboard'
import ClubEssentials from './components/sections/ClubEssentials'
import YearCards from './components/sections/YearCards'
import Members from './components/sections/Members'
import Highlights from './components/sections/Highlights'
import Projects from './components/sections/Projects'
import FAQ from './components/sections/FAQ'
import Footer from './components/sections/Footer'
import HallOfFame from './components/sections/HallOfFame'

// ── ML Wing (separate pages) ─────────────────────────────────────────────────
import MLHomePage from './pages/ml/MLHomePage'
import MLMembersPage from './pages/ml/MLMembersPage'

// ────────────────────────────────────────────────────────────────────────────
// DS Home Page  ← DS team's page — DO NOT MODIFY (edit ML pages instead)
// ────────────────────────────────────────────────────────────────────────────
function DSHomePage({ intro, setTheme }) {
  return (
    <>
      <Hero intro={intro} setTheme={setTheme} wing="ds" />
      <About />
      <ClubEssentials />
      <Events />
      <Leaderboard wing="ds" />
      <HallOfFame />
      <YearCards />
      <Highlights />
      <Projects wing="ds" />
      <FAQ />
      <Footer />
    </>
  )
}

// DS Members Page  ← DS team's members page — DO NOT MODIFY
function DSMembersPage() {
  return (
    <>
      <Members wing="ds" />
      <Footer />
    </>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// App — Router
// ────────────────────────────────────────────────────────────────────────────
export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // Derive wing from URL path so direct navigation works without intro
  const wingFromPath = location.pathname.startsWith('/ds') ? 'ds'
    : location.pathname.startsWith('/ml') ? 'ml'
    : null;

  // Only show intro when landing on root '/'
  const [intro, setIntro] = useState(() => wingFromPath === null);

  const [theme, setThemeState] = useState(() => {
    if (wingFromPath === 'ml') return 'gold';
    if (wingFromPath === 'ds') return 'blue';
    return localStorage.getItem('theme') || 'blue';
  });

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    navigate(newTheme === 'gold' ? '/ml' : '/ds');
  };

  useEffect(() => {
    if (!intro) window.scrollTo(0, 0);
  }, [location.pathname, intro]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // IntroScreen calls this with 'ds' or 'ml' when user selects a logo
  const handleIntroComplete = (wing) => {
    const selectedTheme = wing === 'ml' ? 'gold' : 'blue';
    setThemeState(selectedTheme);
    document.documentElement.setAttribute('data-theme', selectedTheme);
    localStorage.setItem('theme', selectedTheme);
    setIntro(false);
    navigate(wing === 'ml' ? '/ml' : '/ds');
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {intro && <IntroScreen key="intro" onComplete={handleIntroComplete} />}
      </AnimatePresence>

      <div style={{ opacity: intro ? 0 : 1, transition: 'opacity 0.5s ease' }}>
        <Routes>

          {/* ── DS Wing Routes ─────────────────────────────────────────── */}
          <Route path='/ds'
            element={<Layout><DSHomePage intro={intro} setTheme={setTheme} /></Layout>}
          />
          <Route path='/ds/members'
            element={<Layout><DSMembersPage /></Layout>}
          />
          <Route path='/ds/gallery'
            element={<Layout><GalleryPage /></Layout>}
          />
          <Route path='/ds/sdg'
            element={<Layout><SDGPage /></Layout>}
          />

          {/* ── ML Wing Routes ─────────────────────────────────────────── */}
          <Route path='/ml'
            element={<Layout><MLHomePage intro={intro} setTheme={setTheme} /></Layout>}
          />
          <Route path='/ml/members'
            element={<Layout><MLMembersPage /></Layout>}
          />
          <Route path='/ml/gallery'
            element={<Layout><GalleryPage /></Layout>}
          />
          <Route path='/ml/sdg'
            element={<Layout><SDGPage /></Layout>}
          />

          {/* ── Shared / Legacy Routes ─────────────────────────────────── */}
          {/* Root: show intro then redirect; handled by handleIntroComplete */}
          <Route path='/'
            element={<Layout><DSHomePage intro={intro} setTheme={setTheme} /></Layout>}
          />
          {/* Shared legacy paths kept for backward compatibility */}
          <Route path='/members'
            element={<Layout><DSMembersPage /></Layout>}
          />
          <Route path='/gallery'
            element={<Layout><GalleryPage /></Layout>}
          />
          <Route path='/sdg'
            element={<Layout><SDGPage /></Layout>}
          />
          <Route path='/event/:id' element={<EventDetails />} />
          <Route path='/exam-invigilator' element={<ExamInvigilator />} />

        </Routes>
      </div>
    </>
  )
}
