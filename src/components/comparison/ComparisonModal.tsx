import { motion, AnimatePresence } from 'framer-motion';
import type { Analysis } from '../../types/analysis';
import { RISK_COLORS } from '../../types';

interface ComparisonModalProps {
  isOpen: boolean;
  analysisA: Analysis | null;
  analysisB: Analysis | null;
  onClose: () => void;
}

function getDelta(a: number, b: number) {
  const diff = b - a;
  if (diff > 0) return { text: `+${diff}`, color: 'text-danger' };
  if (diff < 0) return { text: `${diff}`, color: 'text-success' };
  return { text: '0', color: 'text-neutral/50' };
}

export default function ComparisonModal({ isOpen, analysisA, analysisB, onClose }: ComparisonModalProps) {
  if (!analysisA || !analysisB) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-heading text-lg text-neutral">Compare Analyses</h3>
              <button onClick={onClose} className="p-1 rounded hover:bg-gray-100">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4 overflow-y-auto">
              {/* Date Headers */}
              <div className="grid grid-cols-[1fr_100px_100px_100px] gap-2 mb-4 text-sm">
                <div></div>
                <div className="text-center font-medium text-neutral/60">Analysis 1</div>
                <div className="text-center font-medium text-neutral/60">Analysis 2</div>
                <div className="text-center font-medium text-neutral/60">Delta</div>
              </div>

              {/* Risk Rows */}
              {analysisA.results.map((riskA) => {
                const riskB = analysisB.results.find((r) => r.cancer_type === riskA.cancer_type);
                if (!riskB) return null;
                const delta = getDelta(riskA.risk_pct, riskB.risk_pct);

                return (
                  <div key={riskA.cancer_type} className="grid grid-cols-[1fr_100px_100px_100px] gap-2 items-center py-2 border-b border-gray-50">
                    <div className="text-sm font-medium text-neutral">{riskA.cancer_type}</div>
                    <div className="text-center">
                      <span className="text-sm font-mono" style={{ color: RISK_COLORS[riskA.level] }}>
                        {riskA.risk_pct}%
                      </span>
                    </div>
                    <div className="text-center">
                      <span className="text-sm font-mono" style={{ color: RISK_COLORS[riskB.level] }}>
                        {riskB.risk_pct}%
                      </span>
                    </div>
                    <div className={`text-center text-sm font-mono ${delta.color}`}>
                      {delta.text}
                    </div>
                  </div>
                );
              })}

              {/* Confidence Row */}
              <div className="grid grid-cols-[1fr_100px_100px_100px] gap-2 items-center py-2 mt-2">
                <div className="text-sm font-medium text-neutral">Confidence</div>
                <div className="text-center text-sm font-mono text-neutral">
                  {(analysisA.overallConfidence * 100).toFixed(0)}%
                </div>
                <div className="text-center text-sm font-mono text-neutral">
                  {(analysisB.overallConfidence * 100).toFixed(0)}%
                </div>
                <div className="text-center text-sm font-mono text-neutral">
                  {getDelta(analysisA.overallConfidence * 100, analysisB.overallConfidence * 100).text}
                </div>
              </div>

              {/* Date Row */}
              <div className="grid grid-cols-[1fr_100px_100px_100px] gap-2 items-center py-2 text-xs text-neutral/50">
                <div>Date</div>
                <div className="text-center">{new Date(analysisA.timestamp).toLocaleDateString()}</div>
                <div className="text-center">{new Date(analysisB.timestamp).toLocaleDateString()}</div>
                <div></div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
