import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="text-center max-w-md"
      >
        <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-8">
          <span className="font-mono text-3xl text-primary font-medium">404</span>
        </div>
        <h1 className="font-heading text-3xl text-ink mb-4">Page not found</h1>
        <p className="text-neutral/60 mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            to="/"
            className="px-6 py-3 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors shadow-depth-sm hover:shadow-glow"
          >
            Back to Home
          </Link>
          <Link
            to="/analyze"
            className="px-6 py-3 rounded-full border border-ink/10 text-ink text-sm font-medium hover:bg-ink/5 transition-colors"
          >
            Start Analysis
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
