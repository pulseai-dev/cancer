import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../ui/ThemeProvider';
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
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const location = useLocation();
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 20);
      setHidden(currentY > lastScrollY.current && currentY > 100);
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          hidden ? '-translate-y-full' : 'translate-y-0'
        } ${
          scrolled
            ? 'h-[64px] liquid-glass-hero border-b border-white/10 shadow-glass'
            : 'h-[72px] bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 group">
            <span className={`font-heading text-xl group-hover:text-primary transition-colors duration-300 ${isDark ? 'text-white' : 'text-ink'}`}>
              CancerDetect
            </span>
          </Link>

          {/* Desktop Nav Pills */}
          <div className="hidden lg:flex items-center gap-0.5 liquid-glass-hero rounded-full px-1.5 py-1">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? isDark ? 'text-white' : 'text-ink'
                      : isDark ? 'text-white/50 hover:text-white' : 'text-neutral/50 hover:text-ink'
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-0 bg-white/80 rounded-full shadow-depth-sm" />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* CTA + Theme Toggle + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              to="/analyze"
              className="hidden sm:inline-flex px-5 py-2.5 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-all duration-300 shadow-depth-sm hover:shadow-glow active:scale-[0.97]"
            >
              Start Analysis
            </Link>

            <button
              onClick={toggle}
              className={`p-2 rounded-xl transition-colors ${isDark ? 'hover:bg-white/10 text-white/60 hover:text-white' : 'hover:bg-ink/5 text-neutral/60 hover:text-ink'}`}
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
              {isDark ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            <button
              className="lg:hidden p-2 rounded-xl hover:bg-ink/5 transition-colors"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
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
