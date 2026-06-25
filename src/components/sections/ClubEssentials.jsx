import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';

const essentials = [
  { id: '1', title: 'Workshops & Training', desc: 'Engaging, hands-on sessions covering the latest in AI, Machine Learning, and Full-Stack Development.', color: '#E5243B' },
  { id: '2', title: 'Real-World Projects', desc: 'Collaborate with peers to build intelligent solutions from scratch and deploy them to the world.', color: '#DDA63A' },
  { id: '3', title: 'Hackathons', desc: 'Compete in our flagship hackathons, push your limits, and win exciting prizes while innovating.', color: '#4C9F38' },
  { id: '4', title: 'No Prerequisites', desc: 'Whether you are a beginner or an expert, if you have the passion to learn, you belong here.', color: '#C5192D' },
  { id: '5', title: 'Industry Connect', desc: 'Interact with industry professionals, gain insights, and prepare yourself for the corporate world.', color: '#FF3A21' },
];

const community = [
  { id: '6', title: 'Form a Team', desc: 'Find like-minded individuals, form teams, and tackle challenges together in a collaborative environment.', color: '#26BDE2' },
  { id: '7', title: 'Mentorship', desc: 'Receive dedicated guidance from experienced seniors and faculty members to accelerate your growth.', color: '#FCC30B' },
  { id: '8', title: 'Resource Hub', desc: 'Gain access to a curated repository of premium learning materials, templates, and coding resources.', color: '#A21942' },
  { id: '9', title: 'Interactive Meets', desc: 'Join our regular meetups to discuss emerging tech trends, brainstorm ideas, and network.', color: '#FD6925' },
  { id: '10', title: 'Safe & Inclusive', desc: 'We foster a welcoming, respectful, and highly supportive environment for everyone.', color: '#DD1367' },
];

const allItems = [...essentials, ...community];

function EssentialCard({ item, isSelected }) {
  return (
    <div 
      className={`w-[65vw] sm:w-[35vw] md:w-[230px] flex-shrink-0 overflow-hidden flex flex-col h-[280px] text-white p-6 rounded-xl relative transition-all duration-500 ease-out ${
        isSelected 
          ? 'scale-110 z-20 grayscale-0 opacity-100 border-transparent' 
          : 'scale-95 z-10 grayscale opacity-40 border-transparent hover:opacity-60 hover:grayscale-[50%]'
      }`}
      style={{ 
        backgroundColor: item.color,
        boxShadow: isSelected 
          ? `inset 0 0 0 1000px rgba(0,0,0,0.5), 0 0 0 1px ${item.color}, 0 0 10px ${item.color}90` 
          : 'inset 0 0 0 1000px rgba(0,0,0,0.2)'
      }}
    >
      <div className="flex flex-col gap-3 items-start relative z-10 mb-4">
        <span className="text-6xl font-black opacity-90">{item.id}</span>
        <h4 className="text-xl font-black uppercase leading-tight tracking-tight">
          {item.title}
        </h4>
      </div>
      {/* Decorative large number */}
      <div className="absolute -bottom-4 -right-2 text-9xl font-black text-black/15 select-none transition-transform duration-500">
        {item.id}
      </div>
    </div>
  );
}

export default function ClubEssentials() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  
  // Map scroll progress to a float index
  const floatIndex = useTransform(scrollYProgress, [0, 1], [0, allItems.length - 1]);
  
  // Transform the float index to the exact pixel offset needed to center the active card
  const x = useTransform(floatIndex, (val) => {
    return `calc(50vw - (var(--card-width) / 2) - (${val} * (var(--card-width) + var(--gap))))`;
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let index = Math.round(latest * (allItems.length - 1));
    if (index < 0) index = 0;
    if (index >= allItems.length) index = allItems.length - 1;
    setActiveIndex(index);
  });

  const activeItem = allItems[activeIndex];

  return (
    <section ref={sectionRef} id="essentials" className="relative" style={{ height: '450vh' }}>
      <style>{`
        .filmstrip-wrapper {
          --card-width: 65vw;
          --gap: 16px;
        }
        @media (min-width: 640px) {
          .filmstrip-wrapper {
            --card-width: 35vw;
          }
        }
        @media (min-width: 768px) {
          .filmstrip-wrapper {
            --card-width: 230px;
            --gap: 32px;
          }
        }
      `}</style>
      <div className="sticky top-0 flex flex-col h-[100dvh] overflow-hidden filmstrip-wrapper">
        
        {/* Header */}
        <div className="w-full px-6 md:px-10 mt-20 lg:mt-24 max-w-7xl mx-auto flex-shrink-0 text-center relative z-20">
           <motion.h2 
             className="font-display font-extrabold text-slate-900 tracking-tight leading-tight text-5xl md:text-6xl lg:text-7xl mb-4"
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6, delay: 0.1 }}
           >
             About <span className="text-transparent" style={{ WebkitTextStroke: '2px #111111' }}>US</span>
           </motion.h2>
        </div>

        {/* Filmstrip container */}
        <div className="flex-1 flex items-center justify-start w-full relative z-10 overflow-hidden">

          <motion.div
            style={{ x, gap: 'var(--gap)' }}
            className="flex min-w-max py-10 items-center absolute left-0"
          >
            {allItems.map((item, index) => (
              <EssentialCard key={item.id} item={item} isSelected={activeIndex === index} />
            ))}
          </motion.div>
        </div>

        {/* Full width content below */}
        <div 
          className="w-full h-[35vh] md:h-[30vh] px-6 md:px-12 flex flex-col justify-start items-center text-center z-20 mt-4 md:mt-8"
        >
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeItem.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl mx-auto"
            >
              <h3 
                className="text-2xl md:text-3xl font-display font-bold mb-4"
                style={{ color: activeItem.color }}
              >
                {activeItem.id}. {activeItem.title}
              </h3>
              <p className="text-base md:text-lg text-slate-600 leading-relaxed font-medium">
                {activeItem.desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
