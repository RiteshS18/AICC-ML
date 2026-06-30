import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Wrench, Users } from 'lucide-react';
import { projectsData } from '../data/projects';
import { motion } from 'framer-motion';

export default function ProjectDetails() {
  const { id } = useParams();
  const project = projectsData.find(p => p.id === id);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-8 font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-slate-900 mb-6 leading-tight">
            {project.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-slate-600 font-medium">
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full ${project.status === 'ongoing' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                {project.status}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-xl mb-12 bg-white"
        >
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover" 
          />
        </motion.div>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 prose prose-lg prose-slate"
          >
            <h2 className="text-2xl font-bold font-display text-slate-900 mb-4">About the Project</h2>
            <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
              {project.description}
            </p>

            {/* Team Members */}
            {project.team && (
              <div className="mt-10">
                <h2 className="text-2xl font-bold font-display text-slate-900 flex items-center gap-2 mb-6">
                  <Users className="w-6 h-6 text-primary" />
                  Team Members
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.team.map((member, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">
                        {member.charAt(0)}
                      </div>
                      <span className="font-semibold text-slate-800">{member}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="md:col-span-1"
          >
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 sticky top-28">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-6">
                <Wrench className="w-5 h-5 text-primary" />
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span 
                    key={tech}
                    className="px-4 py-2 bg-slate-50 border border-slate-200 text-slate-700 text-sm font-semibold rounded-lg"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </div>
  );
}
