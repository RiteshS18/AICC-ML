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
  const titleText = 'AI&ML Coding Club';

  return (
    <footer className="bg-dark text-white pt-10 pb-6 text-sm">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Column 1 — About */}
          <div>
            <div className="flex items-center gap-3">
              <img 
                src={logoSrc} 
                alt={`${titleText} Logo`} 
                className="w-10 h-10 object-contain drop-shadow-sm rounded-full" 
              />
              <span className="font-display font-bold text-xl text-white">
                {titleText}
              </span>
            </div>
            <p className="text-sm text-white/60 mt-4 leading-relaxed">
              Empowering students to lead and learn in AI and coding.
            </p>
            <p className="text-sm text-white/50 mt-3 leading-relaxed">
              Department of AI, Kongu Engineering College, Perundurai, Erode - 638060
            </p>
          </div>

          {/* Column 2 — Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-4">
              Contact Us
            </h4>

            <p className="text-xs text-white/30 uppercase tracking-wider mb-2">
              Faculty Coordinators
            </p>
            {contacts.faculty.map((contact) => (
              <a
                key={contact.name}
                href={`tel:${contact.phone.replace(/\s/g, '')}`}
                className="block text-sm text-white/60 hover:text-white transition-colors py-0.5"
              >
                {contact.name} — {contact.phone}
              </a>
            ))}

            {contacts.secretaries.length > 0 && (
              <>
                <p className="text-xs text-white/30 uppercase tracking-wider mb-2 mt-4">
                  Secretaries
                </p>
                {contacts.secretaries.map((contact) => (
                  <a
                    key={contact.name}
                    href={`tel:${contact.phone.replace(/\s/g, '')}`}
                    className="block text-sm text-white/60 hover:text-white transition-colors py-0.5"
                  >
                    {contact.name} — {contact.phone}
                  </a>
                ))}
              </>
            )}
          </div>

          {/* Column 3 — Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-4">
              Quick Links
            </h4>
            {quickLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="block text-sm text-white/60 py-1 hover:text-white hover:translate-x-1 transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Social Row & Copyright */}
        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
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
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-white/60 hover:text-white"
                >
                  <Icon size={social.isLucide ? 18 : 16} />
                </a>
              );
            })}
          </div>

          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} {titleText}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
