import { motion, AnimatePresence } from 'framer-motion';

interface LoadingOverlayProps {
  visible: boolean;
}

export default function LoadingOverlay({ visible }: LoadingOverlayProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl p-8 flex flex-col items-center gap-4 shadow-xl"
          >
            <div className="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin" />
            <div className="text-center">
              <p className="text-neutral font-medium">Analyzing your data...</p>
              <p className="text-xs text-neutral/50 mt-1">Est. 2-3 seconds</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
