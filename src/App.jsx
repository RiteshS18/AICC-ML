import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import IntroScreen from './components/layout/IntroScreen'
import Layout from './components/layout/Layout'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Events from './components/sections/Events'
import Leaderboard from './components/sections/Leaderboard'
import EventDetails from './components/sections/EventDetails'
import ClubEssentials from './components/sections/ClubEssentials'
import YearCards from './components/sections/YearCards'
import Members from './components/sections/Members'
import Highlights from './components/sections/Highlights'
import Projects from './components/sections/Projects'
import FAQ from './components/sections/FAQ'
import Footer from './components/sections/Footer'
import GalleryPage from './pages/GalleryPage'
import HallOfFame from './components/sections/HallOfFame'
import SDGPage from './pages/SDGPage'
import ExamInvigilator from './pages/projects/ExamInvigilator/ExamInvigilator'

function HomePage({ intro }) {
  return (
    <>
      <Hero intro={intro} />
      <About />
      <ClubEssentials />
      <Events />
      <Leaderboard />
      <HallOfFame />
      <YearCards />
      <Highlights />
      <Projects />
      <FAQ />
      <Footer />
    </>
  )
}

function MembersPage() {
  return (
    <>
      <Members />
      <Footer />
    </>
  )
}

export default function App() {
  const [intro, setIntro] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (!intro) window.scrollTo(0, 0);
  }, [location.pathname, intro]);

  return (
    <>
      <AnimatePresence mode="wait">
        {intro && <IntroScreen key="intro" onComplete={() => setIntro(false)} />}
      </AnimatePresence>

      <div style={{ opacity: intro ? 0 : 1, transition: 'opacity 0.5s ease' }}>
        <Routes>
          <Route path='/' element={<Layout><HomePage intro={intro} /></Layout>} />
          <Route path='/members' element={<Layout><MembersPage /></Layout>} />
          <Route path='/gallery' element={<Layout><GalleryPage /></Layout>} />
          <Route path='/sdg' element={<Layout><SDGPage /></Layout>} />
          <Route path='/event/:id' element={<EventDetails />} />
          <Route path='/exam-invigilator' element={<ExamInvigilator />} />
        </Routes>
      </div>
    </>
  )
}
