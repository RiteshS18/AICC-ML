import { motion } from 'framer-motion';
import { ExternalLink, Code2, Users, Sparkles } from 'lucide-react';
import { projectsData } from '../../data/projects';

export default function MLProjects() {
  return (
    <section id="projects" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Student Innovations</span>
          </div>

          <h2
            className="font-display font-black tracking-tight mb-4"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}
          >
            <span className="text-white">Featured </span>
            <span className="text-transparent" style={{ WebkitTextStroke: '2px rgba(255, 255, 255, 0.5)' }}>
              Projects.
            </span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-base md:text-lg">
            Intelligent solutions and AI-powered platforms engineered by our club members.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col group border border-white/10 hover:border-primary/40"
            >
              {/* Image Banner */}
              <div className="w-full h-56 relative overflow-hidden bg-[#161622]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12121a] via-transparent to-transparent opacity-80" />

                {/* Tech Badges */}
                {project.techStack && (
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-full text-xs font-semibold bg-black/60 backdrop-blur-md text-white/90 border border-white/15"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 flex flex-col flex-1">
                <h3 className="text-2xl font-bold font-display text-white group-hover:text-primary-light transition-colors mb-3">
                  {project.title}
                </h3>

                <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-6 flex-1">
                  {project.shortDescription}
                </p>

                {/* Team Members */}
                {project.team && project.team.length > 0 && (
                  <div className="pt-4 border-t border-white/10 mt-auto">
                    <div className="flex items-center gap-1.5 text-xs text-text-muted mb-2 font-medium">
                      <Users className="w-3.5 h-3.5" />
                      <span>Developed by</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.team.map((member, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/[0.04] text-slate-300 border border-white/10"
                        >
                          {member}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
