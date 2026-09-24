import { motion } from 'framer-motion';
import { ExternalLink, Code2, Users, Sparkles } from 'lucide-react';
import { projectsData } from '../../data/projects';

export default function MLProjects() {
  return (
    <section id="projects" className="py-24 lg:py-32 relative overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none -z-10" style={{ background: 'var(--shadow-glow)' }} />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4"
            style={{
              backgroundColor: 'var(--gold-subtle)',
              border: '1px solid var(--border)',
              color: 'var(--gold-text)',
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Student Innovations</span>
          </div>

          <h2
            className="font-display font-black tracking-tight mb-4"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: 'var(--text)' }}
          >
            <span>Featured </span>
            <span className="text-hollow">
              Projects.
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-base md:text-lg" style={{ color: 'var(--text-secondary)' }}>
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
              className="glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col group"
              style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
              }}
            >
              {/* Image Banner */}
              <div className="w-full h-56 relative overflow-hidden" style={{ backgroundColor: 'var(--surface-2)' }}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                {/* Tech Badges */}
                {project.techStack && (
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-full text-xs font-semibold bg-black/70 backdrop-blur-md text-white border border-white/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 flex flex-col flex-1">
                <h3
                  className="text-2xl font-bold font-display transition-colors mb-3"
                  style={{ color: 'var(--text)' }}
                >
                  {project.title}
                </h3>

                <p className="text-sm md:text-base leading-relaxed mb-6 flex-1" style={{ color: 'var(--text-secondary)' }}>
                  {project.shortDescription}
                </p>

                {/* Team Members */}
                {project.team && project.team.length > 0 && (
                  <div className="pt-4 mt-auto" style={{ borderTop: '1px solid var(--border)' }}>
                    <div className="flex items-center gap-1.5 text-xs mb-2 font-medium" style={{ color: 'var(--text-muted)' }}>
                      <Users className="w-3.5 h-3.5" />
                      <span>Developed by</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.team.map((member, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium"
                          style={{
                            backgroundColor: 'var(--surface-2)',
                            color: 'var(--text-secondary)',
                            border: '1px solid var(--border)',
                          }}
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
