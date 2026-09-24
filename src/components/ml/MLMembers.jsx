import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
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



function getInitials(name) {
  return name
    .split(' ')
    .filter((w) => w.length > 0)
    .map((w) => w[0].toUpperCase())
    .slice(0, 2)
    .join('');
}

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
        <div className="relative overflow-hidden rounded-2xl aspect-square mb-3 shadow-sm group-hover:shadow-lg transition-shadow duration-300">
          {hasImage ? (
            <>
              <img
                src={member.image}
                alt={member.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={member.imageFocus ? { objectPosition: member.imageFocus } : undefined}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </>
          ) : (
            <div
              className="w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-105"
              style={{
                backgroundColor: 'var(--surface-2)',
                border: '1px solid var(--border)',
              }}
            >
              <span
                className="font-display font-bold select-none"
                style={{
                  fontSize: isClassCard ? 'clamp(0.75rem, 2.5vw, 1.1rem)' : 'clamp(1.5rem, 4vw, 2.5rem)',
                  color: 'var(--gold-text)',
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

        <div className="transition-transform duration-300 group-hover:-translate-y-0.5">
          <p className="text-sm font-semibold text-center truncate" style={{ color: 'var(--text)' }}>
            {member.name}
          </p>
        </div>
      </CardWrapper>
    </motion.div>
  );
}

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
      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: 'var(--gold-gradient)' }} />
      <h3 className="text-lg font-display font-semibold whitespace-nowrap" style={{ color: 'var(--text)' }}>
        {displayTitle}
      </h3>
      <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border)' }} />
    </motion.div>
  );
}

export default function MLMembers() {
  const filtered = members;

  const grouped = filtered.reduce((acc, member) => {
    if (!acc[member.position]) acc[member.position] = [];
    acc[member.position].push(member);
    return acc;
  }, {});

  const isLeadership = (position) =>
    ['Secretary', 'Additional Secretary'].includes(position);

  return (
    <section id="members" className="pt-24 pb-24 lg:pt-28 lg:pb-32" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Title Row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex items-end justify-between flex-wrap gap-4 mb-2"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold" style={{ color: 'var(--text)' }}>
              Office Bearers
            </h2>
            <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
              Meet the minds driving AIML Coding Club for 2026–27
            </p>
          </div>
          <span
            className="px-3.5 py-1 rounded-full text-xs font-semibold"
            style={{
              backgroundColor: 'var(--gold-subtle)',
              color: 'var(--gold-text)',
              border: '1px solid var(--border)',
            }}
          >
            2026–27
          </span>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="h-px mb-8 origin-left"
          style={{ backgroundColor: 'var(--border)' }}
        />

        {/* Members Grid */}
        <div className="space-y-12">
          {positionOrder.map((position, groupIndex) => {
            const group = grouped[position];
            if (!group || group.length === 0) return null;

            return (
              <div key={position}>
                <GroupHeader position={position} isFirst={groupIndex === 0} count={group.length} />

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
        </div>
      </div>
    </section>
  );
}
