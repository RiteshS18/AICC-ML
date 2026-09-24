import { FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { Mail } from 'lucide-react';

const contacts = {
  faculty: [
    { name: 'Ms. S. Hamsanandhini', phone: '+91 85086 09209' },
  ],
  secretaries: [
    { name: 'Hariharan J', phone: '+91 93631 04647' },
  ],
};

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Events', href: '#events' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Team', href: '#members' },
];

const socials = [
  {
    icon: FaLinkedinIn,
    href: 'https://linkedin.com/company/kec-ai-coding-club/',
    label: 'LinkedIn',
  },
  {
    icon: FaInstagram,
    href: 'https://www.instagram.com/kec_aicc',
    label: 'Instagram',
  },
  {
    icon: Mail,
    href: 'mailto:kecaicodingclub@gmail.com',
    label: 'Email',
    isLucide: true,
  },
];

function handleSmoothScroll(e, href) {
  e.preventDefault();
  const target = document.querySelector(href);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

export default function MLFooter() {
  const logoSrc = '/aiml-logo.jpg';
  const titleText = 'AIML Coding Club';

  return (
    <footer className="pt-12 pb-8 text-sm" style={{ backgroundColor: 'var(--surface)', borderTop: '1px solid var(--border)', color: 'var(--text)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Column 1 — About */}
          <div>
            <div className="flex items-center gap-3">
              <img 
                src={logoSrc} 
                alt={`${titleText} Logo`} 
                className="w-10 h-10 object-contain drop-shadow-sm rounded-full" 
                style={{ border: '1.5px solid var(--border)' }}
              />
              <span className="font-display font-bold text-xl" style={{ color: 'var(--text)' }}>
                {titleText}
              </span>
            </div>
            <p className="text-sm mt-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Empowering students to lead and learn in AI and coding.
            </p>
            <p className="text-sm mt-3 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Department of AI, Kongu Engineering College, Perundurai, Erode - 638060
            </p>
          </div>

          {/* Column 2 — Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--gold-text)' }}>
              Contact Us
            </h4>

            <p className="text-xs uppercase tracking-wider mb-2 font-medium" style={{ color: 'var(--text-muted)' }}>
              Faculty Coordinators
            </p>
            {contacts.faculty.map((contact) => (
              <a
                key={contact.name}
                href={`tel:${contact.phone.replace(/\s/g, '')}`}
                className="block text-sm transition-colors py-0.5 hover:underline"
                style={{ color: 'var(--text-secondary)' }}
              >
                {contact.name} — {contact.phone}
              </a>
            ))}

            {contacts.secretaries.length > 0 && (
              <>
                <p className="text-xs uppercase tracking-wider mb-2 mt-4 font-medium" style={{ color: 'var(--text-muted)' }}>
                  Secretaries
                </p>
                {contacts.secretaries.map((contact) => (
                  <a
                    key={contact.name}
                    href={`tel:${contact.phone.replace(/\s/g, '')}`}
                    className="block text-sm transition-colors py-0.5 hover:underline"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {contact.name} — {contact.phone}
                  </a>
                ))}
              </>
            )}
          </div>

          {/* Column 3 — Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--gold-text)' }}>
              Quick Links
            </h4>
            {quickLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="block text-sm py-1 hover:translate-x-1 transition-all duration-200"
                style={{ color: 'var(--text-secondary)' }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Social Row & Copyright */}
        <div className="mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid var(--border)' }}>
          <div className="flex gap-4">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={social.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105"
                  style={{
                    backgroundColor: 'var(--surface-2)',
                    border: '1px solid var(--border)',
                    color: 'var(--gold-text)',
                  }}
                >
                  <Icon size={social.isLucide ? 18 : 16} />
                </a>
              );
            })}
          </div>

          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} {titleText}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
