import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Users,
  Code2,
  Rocket,
} from 'lucide-react';
import { FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const perks = [
  {
    icon: Code2,
    title: 'Hands-on Coding Sprints',
    desc: 'Work on production-grade AI systems, hackathons, and real problem statements.',
  },
  {
    icon: Users,
    title: 'Peer Mentorship',
    desc: 'Learn directly from experienced seniors and collaborate across batches like family.',
  },
  {
    icon: Rocket,
    title: 'Career & Placement Edge',
    desc: 'Gain real projects to showcase on GitHub and resume, plus senior placement talks.',
  },
];

export default function MLJoinUs() {
  return (
    <section id="join" className="py-24 lg:py-32 relative overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none -z-10" style={{ background: 'var(--shadow-glow)' }} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="gold-card rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          {/* Subtle top gradient accent */}
          <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'var(--gold-gradient)' }} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column — CTA & Perks */}
            <div className="lg:col-span-7">
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6"
                style={{
                  backgroundColor: 'var(--gold-subtle)',
                  border: '1px solid var(--border)',
                  color: 'var(--gold-text)',
                }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Join Our Community</span>
              </div>

              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight mb-6 leading-tight"
                style={{ color: 'var(--text)' }}
              >
                Ready to Build the Future with{' '}
                <span className="text-gold-gradient">
                  Artificial Intelligence?
                </span>
              </h2>

              <p className="text-base lg:text-lg leading-relaxed mb-8 max-w-xl" style={{ color: 'var(--text-secondary)' }}>
                Whether you're writing your first Python script or training complex neural nets, there is a place for you at AIML Coding Club. No barriers, just passion to innovate.
              </p>

              {/* Perks List */}
              <div className="space-y-4 mb-8">
                {perks.map((perk, i) => {
                  const Icon = perk.icon;
                  return (
                    <div key={i} className="flex items-start gap-3.5">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{
                          backgroundColor: 'var(--gold-subtle)',
                          border: '1px solid var(--border)',
                        }}
                      >
                        <Icon className="w-4 h-4" style={{ color: 'var(--gold-text)' }} />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{perk.title}</h4>
                        <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{perk.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="mailto:kecaicodingclub@gmail.com?subject=Interest%20in%20Joining%20AIML%20Coding%20Club"
                  className="btn-gold group"
                >
                  <span>Get in Touch</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href="https://www.instagram.com/ai_codingclub/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                >
                  <FaInstagram className="w-4 h-4 mr-2" style={{ color: 'var(--gold-text)' }} />
                  <span>Follow on Instagram</span>
                </a>
              </div>
            </div>

            {/* Right Column — Contact Details Card */}
            <div className="lg:col-span-5">
              <div
                className="glass-card p-6 sm:p-8 rounded-2xl space-y-6"
                style={{
                  backgroundColor: 'var(--surface-2)',
                  border: '1px solid var(--border)',
                }}
              >
                <h3
                  className="text-xl font-display font-bold pb-4"
                  style={{
                    color: 'var(--text)',
                    borderBottom: '1px solid var(--border)',
                  }}
                >
                  Club Contacts
                </h3>

                {/* Faculty Coordinator */}
                <div className="space-y-1.5">
                  <span className="text-[11px] uppercase tracking-wider font-semibold" style={{ color: 'var(--text-muted)' }}>
                    Faculty Coordinator
                  </span>
                  <p className="text-base font-semibold" style={{ color: 'var(--text)' }}>Ms. S. Hamsanandhini</p>
                  <a
                    href="tel:+918508609209"
                    className="flex items-center gap-2 text-sm transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <Phone className="w-3.5 h-3.5" style={{ color: 'var(--gold-text)' }} />
                    <span>+91 85086 09209</span>
                  </a>
                </div>

                {/* Student Secretary */}
                <div className="space-y-1.5 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                  <span className="text-[11px] uppercase tracking-wider font-semibold" style={{ color: 'var(--text-muted)' }}>
                    Club Secretary
                  </span>
                  <p className="text-base font-semibold" style={{ color: 'var(--text)' }}>Hariharan J</p>
                  <a
                    href="tel:+919363104647"
                    className="flex items-center gap-2 text-sm transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <Phone className="w-3.5 h-3.5" style={{ color: 'var(--gold-text)' }} />
                    <span>+91 93631 04647</span>
                  </a>
                </div>

                {/* Email & Location */}
                <div className="space-y-3 pt-4 text-xs" style={{ borderTop: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
                  <a
                    href="mailto:kecaicodingclub@gmail.com"
                    className="flex items-center gap-2 transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <Mail className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--gold-text)' }} />
                    <span>kecaicodingclub@gmail.com</span>
                  </a>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--gold-text)' }} />
                    <span>Department of AI, Kongu Engineering College, Perundurai, Erode - 638060</span>
                  </div>
                </div>

                {/* Social Badges */}
                <div className="pt-4 flex items-center justify-between" style={{ borderTop: '1px solid var(--border)' }}>
                  <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Connect with us</span>
                  <div className="flex items-center gap-2">
                    <a
                      href="https://www.linkedin.com/company/ai-coding-club-kec/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                      style={{
                        backgroundColor: 'var(--surface)',
                        border: '1px solid var(--border)',
                        color: 'var(--gold-text)',
                      }}
                      aria-label="LinkedIn"
                    >
                      <FaLinkedinIn className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="https://www.instagram.com/ai_codingclub/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                      style={{
                        backgroundColor: 'var(--surface)',
                        border: '1px solid var(--border)',
                        color: 'var(--gold-text)',
                      }}
                      aria-label="Instagram"
                    >
                      <FaInstagram className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
