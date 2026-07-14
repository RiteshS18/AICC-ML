/**
 * ML Wing Home Page
 * ─────────────────────────────────────────────────────────────────────────────
 * This is the dedicated page for the AI & ML Coding Club wing.
 * It is completely separate from the DS page (src/App.jsx → /ds route).
 * All ML-specific sections, data, and customizations go here.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import MLHero from '../../components/ml/MLHero';
import MLAbout from '../../components/ml/MLAbout';
import MLClubEssentials from '../../components/ml/MLClubEssentials';
import MLEvents from '../../components/ml/MLEvents';
import MLLeaderboard from '../../components/ml/MLLeaderboard';
import MLHallOfFame from '../../components/ml/MLHallOfFame';
import MLHighlights from '../../components/ml/MLHighlights';
import MLProjects from '../../components/ml/MLProjects';
import MLFAQ from '../../components/ml/MLFAQ';
import MLFooter from '../../components/ml/MLFooter';

/**
 * MLHomePage
 * Props passed from App.jsx:
 *  - intro    : boolean — whether the intro screen is still active
 *  - setTheme : function — call setTheme('gold') or setTheme('blue') to switch wing
 */
export default function MLHomePage({ intro, setTheme }) {
  return (
    <>
      {/* ── Hero ── */}
      <MLHero intro={intro} setTheme={setTheme} />

      {/* ── About ── */}
      <MLAbout />

      {/* ── Club Essentials ── */}
      <MLClubEssentials />

      {/* ── Events ── */}
      <MLEvents />

      {/* ── Leaderboard ── */}
      <MLLeaderboard />

      {/* ── Hall of Fame ── */}
      <MLHallOfFame />

      {/* ── Highlights ── */}
      <MLHighlights />

      {/* ── Projects ── */}
      <MLProjects />

      {/* ── FAQ (ML version — no QR section) ── */}
      <MLFAQ />

      {/* ── Footer ── */}
      <MLFooter />
    </>
  );
}
