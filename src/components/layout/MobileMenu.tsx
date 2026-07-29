import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  items: { label: string; path: string }[];
  currentPath: string;
}

export default function MobileMenu({ open, onClose, items, currentPath }: MobileMenuProps) {
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
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-bg-light border-l border-ink/5 shadow-xl"
          >
            <div className="flex items-center justify-between h-[72px] px-4 border-b border-ink/5">
              <span className="font-heading text-lg text-ink">Menu</span>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-ink/5 transition-colors"
                aria-label="Close menu"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="p-4 space-y-1">
              {items.map((item) => {
                const isActive = currentPath === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-ink/5 text-ink'
                        : 'text-neutral/60 hover:text-ink hover:bg-ink/[0.03]'
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
