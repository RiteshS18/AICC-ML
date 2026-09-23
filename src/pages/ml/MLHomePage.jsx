/**
 * AIML Coding Club — Home Page
 * ─────────────────────────────────────────────────────────────────────────────
 * The main landing page for the AIML Coding Club website.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import MLHero from '../../components/ml/MLHero';
import MLAbout from '../../components/ml/MLAbout';
import MLDomains from '../../components/ml/MLDomains';
import MLClubEssentials from '../../components/ml/MLClubEssentials';
import MLEvents from '../../components/ml/MLEvents';
import MLProjects from '../../components/ml/MLProjects';
import MLLeaderboard from '../../components/ml/MLLeaderboard';
import MLHallOfFame from '../../components/ml/MLHallOfFame';
import MLHighlights from '../../components/ml/MLHighlights';
import MLFAQ from '../../components/ml/MLFAQ';
import MLJoinUs from '../../components/ml/MLJoinUs';
import MLFooter from '../../components/ml/MLFooter';

export default function MLHomePage() {
  return (
    <>
      {/* ── 1. Hero ── */}
      <MLHero />

      {/* ── 2. About the Club ── */}
      <MLAbout />

      {/* ── 3. Domains / Technical Focus ── */}
      <MLDomains />

      {/* ── 4. Club Essentials ── */}
      <MLClubEssentials />

      {/* ── 5. Events & Workshops ── */}
      <MLEvents />

      {/* ── 6. Featured Projects ── */}
      <MLProjects />

      {/* ── 7. Leaderboard ── */}
      <MLLeaderboard />

      {/* ── 8. Hall of Fame ── */}
      <MLHallOfFame />

      {/* ── 9. Highlights ── */}
      <MLHighlights />

      {/* ── 10. FAQ ── */}
      <MLFAQ />

      {/* ── 11. Join Us & Contact ── */}
      <MLJoinUs />

      {/* ── 12. Footer ── */}
      <MLFooter />
    </>
  );
}
