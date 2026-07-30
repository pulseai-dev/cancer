import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../ui/ThemeProvider';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  items: { label: string; path: string }[];
  currentPath: string;
}

export default function MobileMenu({ open, onClose, items, currentPath }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    if (open) {
      document.body.classList.add('no-scroll');
      setTimeout(() => firstLinkRef.current?.focus(), 100);
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => document.body.classList.remove('no-scroll');
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
      if (e.key === 'Tab' && menuRef.current) {
        const focusable = menuRef.current.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          (last as HTMLElement).focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          (first as HTMLElement).focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-ink/20 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-label="Mobile navigation"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={`fixed top-0 right-0 bottom-0 z-50 w-72 border-l border-ink/5 shadow-xl ${
              isDark ? 'bg-bg-dark' : 'bg-bg-light'
            }`}
          >
            <div className="flex items-center justify-between h-[72px] px-4 border-b border-ink/5">
              <span className={`font-heading text-lg ${isDark ? 'text-white' : 'text-ink'}`}>Menu</span>
              <button
                onClick={onClose}
                className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-white/10 text-white/60' : 'hover:bg-ink/5 text-neutral/60'}`}
                aria-label="Close menu"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="p-4 space-y-1">
              {items.map((item, i) => {
                const isActive = currentPath === item.path;
                return (
                  <Link
                    key={item.path}
                    ref={i === 0 ? firstLinkRef : undefined}
                    to={item.path}
                    onClick={onClose}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? isDark ? 'bg-white/10 text-white' : 'bg-ink/5 text-ink'
                        : isDark ? 'text-white/50 hover:text-white hover:bg-white/5' : 'text-neutral/60 hover:text-ink hover:bg-ink/[0.03]'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-ink/5">
              <Link
                to="/analyze"
                onClick={onClose}
                className="block w-full text-center px-5 py-3 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Start Analysis
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
