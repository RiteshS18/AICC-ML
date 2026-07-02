import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { membersData as members } from '../../data/members.js';

const positionOrder = [
  'Secretary',
  'Additional Secretary',
  'Joint Secretary',
  'Treasurer',
  'Technical Team',
  'Multimedia Team',
  'Executive Member',
];

const years = [
  { id: '2026-27', label: '2026-27' },
  { id: '2025-26', label: '2025-26' },
];

const branches = [
  { id: 'AI-DS', label: 'AI-DS' },
  { id: 'AI-ML', label: 'AI-ML' },
];

// ── Helper: get initials from name ───────────────────────────────────────────
function getInitials(name) {
  return name
    .split(' ')
    .filter((w) => w.length > 0)
    .map((w) => w[0].toUpperCase())
    .slice(0, 2)
    .join('');
}

// ── Scroll-animated member card ──────────────────────────────────────────────
function MemberCard({ member, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  const hasImage = !!member.image;
  const isClassCard = !!member.isClassCard;

  const CardWrapper = member.link ? 'a' : 'div';
  const wrapperProps = member.link ? { href: member.link, target: "_blank", rel: "noopener noreferrer", className: "block" } : { className: "block" };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="group cursor-pointer"
    >
      <CardWrapper {...wrapperProps}>
        {/* Photo or Placeholder */}
        <div className="relative overflow-hidden rounded-2xl aspect-square mb-3 shadow-sm group-hover:shadow-lg transition-shadow duration-300">
        {hasImage ? (
          <>
            <img
              src={member.image}
              alt={member.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </>
        ) : (
          /* Dummy card — initials or class label */
          <div
            className="w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-105"
            style={{
              background: isClassCard
                ? 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 50%, #ddd6fe 100%)'
                : 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 50%, #ede9fe 100%)',
            }}
          >
            <span
              className="font-display font-bold select-none"
              style={{
                fontSize: isClassCard ? 'clamp(0.75rem, 2.5vw, 1.1rem)' : 'clamp(1.5rem, 4vw, 2.5rem)',
                color: isClassCard ? '#4f46e5' : '#6366f1',
                letterSpacing: isClassCard ? '0.05em' : '0.04em',
                textAlign: 'center',
                lineHeight: 1.3,
                padding: '0.5rem',
              }}
            >
              {isClassCard ? member.name : getInitials(member.name)}
            </span>
          </div>
        )}
      </div>

      {/* Name */}
      <div className="transition-transform duration-300 group-hover:-translate-y-0.5">
        <p className="text-sm font-semibold text-text text-center truncate">
          {isClassCard ? member.name : member.name}
        </p>
      </div>
      </CardWrapper>
    </motion.div>
  );
}

// ── Scroll-animated group header ─────────────────────────────────────────────
function GroupHeader({ position, isFirst, count }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  let displayTitle = position;
  if (count > 1 && !position.includes('Team')) {
    if (position.endsWith('y')) {
      displayTitle = position.slice(0, -1) + 'ies';
    } else {
      displayTitle = position + 's';
    }
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className={`flex items-center gap-3 mb-6 ${isFirst ? 'mt-12' : 'mt-10'}`}
    >
      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent flex-shrink-0" />
      <h3 className="text-lg font-display font-semibold text-text whitespace-nowrap">
        {displayTitle}
      </h3>
      <div className="flex-1 h-px bg-border" />
    </motion.div>
  );
}

// ── Underline Tab Selector ───────────────────────────────────────────────────
function UnderlineTabs({ items, selected, onSelect, layoutId }) {
  return (
    <div className="flex items-center gap-6">
      {items.map((item) => {
        const isActive = selected === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className="relative pb-2 text-sm font-semibold transition-colors duration-300 cursor-pointer"
            style={{
              color: isActive ? '#0f172a' : '#94a3b8',
            }}
          >
            {item.label}
            {isActive && (
              <motion.div
                layoutId={layoutId}
                className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #4f46e5, #7c3aed)',
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

// ── Slide direction variants ─────────────────────────────────────────────────
const slideVariants = {
  enterFromRight: { opacity: 0, x: 60, filter: 'blur(4px)' },
  enterFromLeft: { opacity: 0, x: -60, filter: 'blur(4px)' },
  center: { opacity: 1, x: 0, filter: 'blur(0px)' },
  exitToLeft: { opacity: 0, x: -60, filter: 'blur(4px)' },
  exitToRight: { opacity: 0, x: 60, filter: 'blur(4px)' },
};

export default function Members() {
  const [selectedYear, setSelectedYear] = useState('2026-27');
  const [selectedBranch, setSelectedBranch] = useState('AI-DS');
  const [slideDirection, setSlideDirection] = useState(1); // 1 = right, -1 = left

  const filtered = members.filter((m) => {
    if (m.year !== selectedYear) return false;
    if (selectedYear === '2026-27' && m.branch !== selectedBranch) return false;
    return true;
  });

  const grouped = filtered.reduce((acc, member) => {
    if (!acc[member.position]) acc[member.position] = [];
    acc[member.position].push(member);
    return acc;
  }, {});

  const isLeadership = (position) =>
    ['Secretary', 'Additional Secretary'].includes(position);

  const handleYearChange = (newYear) => {
    const oldIndex = years.findIndex((y) => y.id === selectedYear);
    const newIndex = years.findIndex((y) => y.id === newYear);
    setSlideDirection(newIndex > oldIndex ? 1 : -1);
    setSelectedYear(newYear);
  };

  const handleBranchChange = (newBranch) => {
    const oldIndex = branches.findIndex((b) => b.id === selectedBranch);
    const newIndex = branches.findIndex((b) => b.id === newBranch);
    setSlideDirection(newIndex > oldIndex ? 1 : -1);
    setSelectedBranch(newBranch);
  };

  return (
    <section id="members" className="pt-12 pb-24 lg:pt-16 lg:pb-32">
      <div className="max-w-6xl mx-auto px-6">

        {/* ── Title Row: "Office Bearers" on left, Year on right ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex items-end justify-between flex-wrap gap-4 mb-2"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-text">
            Office Bearers
          </h2>
          <UnderlineTabs
            items={years}
            selected={selectedYear}
            onSelect={handleYearChange}
            layoutId="year-underline"
          />
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="h-px bg-border mb-6 origin-left"
        />

        {/* ── Branch Selector (centered, underline style — only for 2026-27) ── */}
        <AnimatePresence>
          {selectedYear === '2026-27' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex justify-center overflow-hidden mb-6"
            >
              <UnderlineTabs
                items={branches}
                selected={selectedBranch}
                onSelect={handleBranchChange}
                layoutId="branch-underline"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Members Grid with directional slide ── */}
        <AnimatePresence mode="wait" custom={slideDirection}>
          <motion.div
            key={`${selectedYear}-${selectedBranch}`}
            custom={slideDirection}
            initial={slideDirection > 0 ? 'enterFromRight' : 'enterFromLeft'}
            animate="center"
            exit={slideDirection > 0 ? 'exitToLeft' : 'exitToRight'}
            variants={slideVariants}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {positionOrder.map((position, groupIndex) => {
              const group = grouped[position];
              if (!group || group.length === 0) return null;

              return (
                <div key={position}>
                  {/* Group Header */}
                  <GroupHeader position={position} isFirst={groupIndex === 0} count={group.length} />

                  {/* Members Grid */}
                  <div
                    className={
                      isLeadership(position)
                        ? 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-2xl mx-auto'
                        : 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'
                    }
                  >
                    {group.map((member, memberIndex) => (
                      <MemberCard
                        key={`${member.name}-${memberIndex}`}
                        member={member}
                        index={memberIndex}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
