import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { projectsData } from '../../data/projects';

export default function Projects({ wing }) {
  const sectionRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(true);

  // Filter by wing if provided
  const filteredProjects = wing
    ? projectsData.filter(p => p.wing === wing || p.wing === 'both')
    : projectsData;

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Tall section so scroll drives everything
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Slide horizontally when scrolling on desktop
  const xTransform = useTransform(scrollYProgress, [0, 1], ['0%', '-54.5%']);
  const x = isDesktop ? xTransform : 0;

  return (
    <section 
      id="projects" 
      ref={sectionRef} 
      className="relative bg-white" 
      style={{ height: isDesktop ? '300vh' : 'auto', padding: isDesktop ? 0 : '6rem 0' }}
    >
      <div className={isDesktop ? "sticky top-0 h-[100dvh] flex flex-col justify-center overflow-hidden" : ""}>
        <div className="max-w-7xl mx-auto w-full px-6 md:px-10">
          
          {/* Title */}
          <div className="text-center mb-16">
            <h2
              className="font-display font-black leading-none tracking-tight mb-4"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)' }}
            >
              <span className="text-black">AICC Guided </span>
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: '2px #111111' }}
              >
                Projects.
              </span>
            </h2>
          </div>

          <motion.div style={{ x }} className={isDesktop ? "w-full lg:w-[190%]" : "w-full"}>
            <div className={`grid gap-6 ${isDesktop ? 'grid-cols-6' : 'grid-cols-1 sm:grid-cols-2'}`}>
              {filteredProjects.map((project, index) => (
                <div key={project.id} className="h-full">
                  <a
                    href={project.link || "#"}
                    className="group flex flex-col bg-slate-50 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-2 border border-slate-100 h-full cursor-pointer block"
                  >
                    {/* Image Section */}
                    <div className="w-full h-48 relative overflow-hidden bg-slate-200 shrink-0">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                  </div>

                  {/* Content Section */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="mb-3">
                      <h3 className="text-xl font-bold font-display text-slate-900 leading-snug">
                        {project.title}
                      </h3>
                    </div>
                    
                    <p className="text-slate-600 text-sm mb-5 flex-1 line-clamp-3">
                      {project.shortDescription}
                    </p>

                    {/* Team Members */}
                    {project.team && project.team.length > 0 && (
                      <div className="mt-auto pt-4 border-t border-slate-200">
                        <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-2">Developed By</p>
                        <div className="flex flex-wrap gap-1.5">
                          {project.team.map((member, i) => (
                            member === "Jaisanth K" ? (
                              <a 
                                key={i} 
                                href="https://jaisanth.tech" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="px-2 py-0.5 bg-indigo-50 text-indigo-700 hover:text-indigo-900 text-[10px] font-semibold rounded-md border border-indigo-100 hover:bg-indigo-100 transition-colors cursor-pointer"
                              >
                                {member}
                              </a>
                            ) : (
                              <span key={i} className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-semibold rounded-md border border-indigo-100">
                                {member}
                              </span>
                            )
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  </a>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
