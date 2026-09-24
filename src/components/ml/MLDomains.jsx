import { motion } from 'framer-motion';
import {
  BrainCircuit,
  Network,
  MessageSquareCode,
  Eye,
  Sparkles,
  Terminal,
  ArrowUpRight,
} from 'lucide-react';

const domains = [
  {
    id: 'ml',
    title: 'Machine Learning',
    icon: BrainCircuit,
    description:
      'Master supervised and unsupervised learning algorithms, feature engineering, regression, classification, and statistical modeling.',
    tags: ['Scikit-learn', 'XGBoost', 'Feature Engineering', 'Ensemble Models'],
    gradient: 'from-blue-500/20 to-indigo-500/20',
    borderGlow: 'group-hover:border-blue-500/50',
    iconColor: 'text-blue-400',
  },
  {
    id: 'dl',
    title: 'Deep Learning',
    icon: Network,
    description:
      'Dive into deep neural architectures, backpropagation dynamics, CNNs, RNNs, and custom model training using modern accelerators.',
    tags: ['PyTorch', 'TensorFlow', 'Convolutional Nets', 'Attention Mechanisms'],
    gradient: 'from-purple-500/20 to-pink-500/20',
    borderGlow: 'group-hover:border-purple-500/50',
    iconColor: 'text-purple-400',
  },
  {
    id: 'nlp',
    title: 'Natural Language Processing',
    icon: MessageSquareCode,
    description:
      'Extract meaning from text through sentiment analysis, tokenization, semantic search, vector embeddings, and transformer architectures.',
    tags: ['HuggingFace', 'Transformers', 'BERT', 'Vector Embeddings'],
    gradient: 'from-indigo-500/20 to-violet-500/20',
    borderGlow: 'group-hover:border-indigo-500/50',
    iconColor: 'text-indigo-400',
  },
  {
    id: 'cv',
    title: 'Computer Vision',
    icon: Eye,
    description:
      'Train machines to interpret visual data with real-time object detection, image segmentation, facial landmark analysis, and tracking.',
    tags: ['OpenCV', 'YOLOv8', 'MediaPipe', 'Object Tracking'],
    gradient: 'from-amber-500/20 to-orange-500/20',
    borderGlow: 'group-hover:border-amber-500/50',
    iconColor: 'text-amber-400',
  },
  {
    id: 'genai',
    title: 'Generative AI & LLMs',
    icon: Sparkles,
    description:
      'Harness cutting-edge large language models, retrieval-augmented generation (RAG) pipelines, diffusion models, and prompt optimization.',
    tags: ['Llama-3', 'LangChain', 'RAG Pipelines', 'Vector Databases'],
    gradient: 'from-fuchsia-500/20 to-pink-500/20',
    borderGlow: 'group-hover:border-fuchsia-500/50',
    iconColor: 'text-fuchsia-400',
  },
  {
    id: 'mlops',
    title: 'MLOps & Deployment',
    icon: Terminal,
    description:
      'Bridge the gap between model prototyping and production with fast REST APIs, Docker containerization, ONNX runtimes, and cloud scaling.',
    tags: ['FastAPI', 'Docker', 'ONNX Runtime', 'Cloud APIs'],
    gradient: 'from-emerald-500/20 to-teal-500/20',
    borderGlow: 'group-hover:border-emerald-500/50',
    iconColor: 'text-emerald-400',
  },
];

export default function MLDomains() {
  return (
    <section id="domains" className="py-24 lg:py-32 relative overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none -z-10" style={{ background: 'var(--shadow-glow)' }} />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none -z-10" style={{ background: 'var(--shadow-glow)' }} />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4"
            style={{
              backgroundColor: 'var(--gold-subtle)',
              border: '1px solid var(--border)',
              color: 'var(--gold-text)',
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Technical Focus</span>
          </div>

          <h2
            className="font-display font-black tracking-tight mb-4"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: 'var(--text)' }}
          >
            Domains We{' '}
            <span className="text-hollow">
              Explore.
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-base md:text-lg" style={{ color: 'var(--text-secondary)' }}>
            From foundational algorithms to cutting-edge generative models, our hands-on workshops and projects prepare you for real-world tech challenges.
          </p>
        </div>

        {/* Domain Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {domains.map((domain, index) => {
            const Icon = domain.icon;
            return (
              <motion.div
                key={domain.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="glass-card p-6 md:p-8 rounded-2xl transition-all duration-300 group relative flex flex-col justify-between hover:-translate-y-1.5 shadow-lg hover:shadow-xl"
                style={{
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)',
                }}
              >
                {/* Background tint on hover */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${domain.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                    style={{
                      backgroundColor: 'var(--surface-2)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <Icon className={`w-6 h-6 ${domain.iconColor}`} />
                  </div>

                  {/* Title */}
                  <h3
                    className="text-xl font-display font-bold mb-3 transition-colors"
                    style={{ color: 'var(--text)' }}
                  >
                    {domain.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                    {domain.description}
                  </p>
                </div>

                {/* Tags */}
                <div
                  className="relative z-10 pt-4 flex flex-wrap gap-1.5 mt-auto"
                  style={{ borderTop: '1px solid var(--border)' }}
                >
                  {domain.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md text-[11px] font-medium"
                      style={{
                        backgroundColor: 'var(--surface-2)',
                        color: 'var(--text-secondary)',
                        border: '1px solid var(--border)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
