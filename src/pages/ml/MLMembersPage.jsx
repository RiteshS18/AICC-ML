/**
 * ML Wing Members Page
 * ─────────────────────────────────────────────────────────────────────────────
 * Standalone members page for the AI & ML wing.
 * The branch tab selector is hidden — only AI-ML members are shown.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import MLMembers from '../../components/ml/MLMembers';
import MLFooter from '../../components/ml/MLFooter';

export default function MLMembersPage() {
  return (
    <>
      <MLMembers />
      <MLFooter />
    </>
  );
}
