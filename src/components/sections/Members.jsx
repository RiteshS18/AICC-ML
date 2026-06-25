import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import { membersData as members } from '../../data/members.js';

const positionOrder = [
  'Secretary',
  'Additional Secretary',
  'Joint Secretary',
  'Treasurer',
  'Technical Head',
  'Multimedia Team',
  'Executive Member',
];

export default function Members() {
  const grouped = members.reduce((acc, member) => {
    if (!acc[member.position]) acc[member.position] = [];
    acc[member.position].push(member);
    return acc;
  }, {});

  const isLeadership = (position) =>
    ['Secretary', 'Additional Secretary'].includes(position);

  return (
    <section id="members" className="py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          eyebrow="Our Team"
          title="Meet the Team"
        />

        {positionOrder.map((position, groupIndex) => {
          const group = grouped[position];
          if (!group || group.length === 0) return null;

          return (
            <div key={position}>
              {/* Group Header */}
              <div className={`flex items-center gap-3 mb-6 ${groupIndex === 0 ? 'mt-16' : 'mt-12'}`}>
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent flex-shrink-0" />
                <h3 className="text-lg font-display font-semibold text-text whitespace-nowrap">
                  {position}
                </h3>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* Members Grid */}
              <div
                className={
                  isLeadership(position)
                    ? 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-2xl mx-auto'
                    : 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'
                }
              >
                {group.map((member, memberIndex) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{
                      duration: 0.4,
                      delay: memberIndex * 0.06,
                      ease: 'easeOut',
                    }}
                    className="group cursor-pointer"
                  >
                    {/* Photo */}
                    <div className="relative overflow-hidden rounded-2xl aspect-square mb-3 shadow-sm group-hover:shadow-lg transition-shadow duration-300">
                      <img
                        src={member.image}
                        alt={member.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Info */}
                    <div className="transition-transform duration-300 group-hover:-translate-y-0.5">
                      <p className="text-sm font-semibold text-text text-center truncate">
                        {member.name}
                      </p>
                      <p className="text-xs text-text-muted text-center">
                        {member.position}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
