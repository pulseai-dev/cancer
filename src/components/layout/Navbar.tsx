import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MobileMenu from './MobileMenu';

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Analyze', path: '/analyze' },
  { label: 'Science', path: '/science' },
  { label: 'Stories', path: '/stories' },
  { label: 'Plans', path: '/plans' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          scrolled
            ? 'h-[64px] bg-white/70 backdrop-blur-xl border-b border-ink/[0.06] shadow-depth-sm'
            : 'h-[72px] bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 group">
            <span className="font-heading text-xl text-ink group-hover:text-primary transition-colors duration-300">
              CancerDetect
            </span>
          </Link>

          {/* Desktop Nav Pills */}
          <div className="hidden lg:flex items-center gap-0.5 bg-white/60 backdrop-blur-sm rounded-full px-1.5 py-1 border border-ink/[0.04] shadow-depth-sm">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'text-ink'
                      : 'text-neutral/50 hover:text-ink'
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-0 bg-white rounded-full shadow-depth-sm" />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              to="/analyze"
              className="hidden sm:inline-flex px-5 py-2.5 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-all duration-300 shadow-depth-sm hover:shadow-glow active:scale-[0.97]"
            >
              Start Analysis
            </Link>

            <button
              className="lg:hidden p-2 rounded-xl hover:bg-ink/5 transition-colors"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        items={NAV_ITEMS}
        currentPath={location.pathname}
      />
    </>
  );
}
