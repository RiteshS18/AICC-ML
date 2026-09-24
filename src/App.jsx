import { useEffect, lazy, Suspense } from 'react'
import { Routes, Route, useLocation, Navigate, useParams } from 'react-router-dom'
import Layout from './components/layout/Layout'
import MLHomePage from './pages/ml/MLHomePage'

// Lazy-loaded pages for optimized bundle size and performance
const EventDetails = lazy(() => import('./components/shared/EventDetails'))
const GalleryPage = lazy(() => import('./pages/GalleryPage'))
const MLMembersPage = lazy(() => import('./pages/ml/MLMembersPage'))

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="w-10 h-10 rounded-full border-2 animate-spin" style={{ borderColor: 'var(--border)', borderTopColor: 'var(--gold)' }} />
    </div>
  )
}

function LegacyEventRedirect() {
  const { id } = useParams();
  return <Navigate to={`/event/${id}`} replace />;
}

// ────────────────────────────────────────────────────────────────────────────
// App — Router (AIML-only site, no wing selection)
// ────────────────────────────────────────────────────────────────────────────
export default function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* ── Main Routes ────────────────────────────────────────────── */}
        <Route path='/'
          element={<Layout><MLHomePage /></Layout>}
        />
        <Route path='/members'
          element={<Layout><MLMembersPage /></Layout>}
        />
        <Route path='/gallery'
          element={<Layout><GalleryPage /></Layout>}
        />
        <Route path='/event/:id' element={<EventDetails />} />

        {/* ── Legacy ML wing redirects ──────────────────────────────── */}
        <Route path='/ml' element={<Navigate to="/" replace />} />
        <Route path='/ml/members' element={<Navigate to="/members" replace />} />
        <Route path='/ml/gallery' element={<Navigate to="/gallery" replace />} />
        <Route path='/ml/event/:id' element={<LegacyEventRedirect />} />
        <Route path='/ml/*' element={<Navigate to="/" replace />} />

        {/* ── Removed DS wing redirects ─────────────────────────────── */}
        <Route path='/ds' element={<Navigate to="/" replace />} />
        <Route path='/ds/*' element={<Navigate to="/" replace />} />

        {/* ── Catch-all ─────────────────────────────────────────────── */}
        <Route path='*' element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}
