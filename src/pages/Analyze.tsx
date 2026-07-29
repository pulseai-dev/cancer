import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/hero/HeroSection';
import ResultsDashboard from '../components/results/ResultsDashboard';
import { useAnalysisContext } from '../context/AnalysisContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const RiskGlobe = lazy(() => import('../components/three/RiskGlobe'));

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] } },
};

export default function Analyze() {
  const { result } = useAnalysisContext();

  return (
    <div className="min-h-screen">
      {/* Hero / Tool Header */}
      <section className="pt-28 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            <motion.p variants={fadeUp} className="text-sm font-medium tracking-widest uppercase text-primary mb-3">
              Risk Assessment
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-heading text-3xl sm:text-4xl text-ink mb-4">
              Cancer risk analysis
            </motion.h1>
            <motion.p variants={fadeUp} className="text-neutral/60 max-w-lg">
              Upload medical files, describe symptoms, or ask a question. Our AI engine provides instant risk assessment with confidence scores.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Tool Interface */}
      <HeroSection />

      {/* 3D Risk Visualization + Results */}
      {result && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
              {/* Main Results */}
              <ResultsDashboard />

              {/* 3D Risk Globe Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="hidden lg:block"
              >
                <div className="sticky top-28 rounded-card border border-ink/5 bg-bg-light p-4">
                  <p className="text-xs font-medium tracking-widest uppercase text-neutral/40 mb-3">
                    Risk Overview
                  </p>
                  <div className="aspect-square rounded-lg overflow-hidden bg-ink/[0.02]">
                    <Suspense fallback={<div className="w-full h-full flex items-center justify-center"><LoadingSpinner /></div>}>
                      <RiskGlobe risks={result.risks} />
                    </Suspense>
                  </div>
                  <p className="text-[11px] text-neutral/40 mt-2 text-center">
                    Drag to rotate · Hover for details
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
