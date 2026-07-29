import { Link } from 'react-router-dom';

const FOOTER_LINKS = [
  {
    title: 'Product',
    links: [
      { label: 'Analysis Tool', path: '/analyze' },
      { label: 'How It Works', path: '/science' },
      { label: 'Plans & Pricing', path: '/plans' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Our Science', path: '/science' },
      { label: 'Real Stories', path: '/stories' },
      { label: 'Contact', path: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', path: '#' },
      { label: 'Terms of Service', path: '#' },
      { label: 'HIPAA Compliance', path: '#' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-ink/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block">
              <span className="font-heading text-xl text-ink">CancerDetect</span>
            </Link>
            <p className="text-sm text-neutral/50 leading-relaxed mt-4 max-w-xs">
              AI-powered cancer risk assessment. Early detection, backed by evidence.
            </p>
          </div>

          {/* Link Columns */}
          {FOOTER_LINKS.map((group) => (
            <div key={group.title}>
              <h4 className="text-xs font-medium tracking-widest uppercase text-neutral/40 mb-4">
                {group.title}
              </h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm text-neutral/60 hover:text-ink transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-6 border-t border-ink/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral/40">
            &copy; {new Date().getFullYear()} CancerDetect, Inc. All rights reserved.
          </p>
          <p className="text-[11px] text-neutral/30">
            For informational purposes only. Not a substitute for professional medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
