import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Analysis } from '../../types/analysis';
import { RISK_COLORS } from '../../types';

interface HistorySidebarProps {
  history: Analysis[];
  onSelect: (analysis: Analysis) => void;
  onCompare: (a: Analysis, b: Analysis) => void;
  onDelete: (id: string) => void;
}

function formatTimeAgo(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function HistorySidebar({ history, onSelect, onCompare, onDelete }: HistorySidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) return prev.filter((i) => i !== id);
      if (prev.length >= 2) return [prev[1], id];
      return [...prev, id];
    });
  };

  const handleCompare = () => {
    if (selectedIds.length !== 2) return;
    const a = history.find((h) => h.id === selectedIds[0]);
    const b = history.find((h) => h.id === selectedIds[1]);
    if (a && b) onCompare(a, b);
    setSelectedIds([]);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-1/2 -translate-y-1/2 z-40 p-2 rounded-lg bg-white/80 backdrop-blur border border-gray-200 shadow-sm hover:shadow-md transition-all"
        aria-label="Toggle history"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-white border-r border-gray-200 z-50 flex flex-col"
            >
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-heading text-lg text-neutral">History</h3>
                <button onClick={() => setIsOpen(false)} className="p-1 rounded hover:bg-gray-100">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {selectedIds.length === 2 && (
                <div className="p-3 bg-primary/5 border-b border-primary/10">
                  <button
                    onClick={handleCompare}
                    className="w-full py-2 px-3 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Compare Selected ({selectedIds.length})
                  </button>
                </div>
              )}

              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {history.length === 0 ? (
                  <p className="text-sm text-neutral/50 text-center py-8">No analyses yet</p>
                ) : (
                  history.map((analysis) => (
                    <div
                      key={analysis.id}
                      className={`p-3 rounded-lg border transition-all cursor-pointer ${
                        selectedIds.includes(analysis.id)
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <button
                          onClick={() => onSelect(analysis)}
                          className="flex-1 text-left"
                        >
                          <p className="text-sm font-medium text-neutral">
                            {formatTimeAgo(analysis.timestamp)}
                          </p>
                          <div className="flex gap-1 mt-1.5 flex-wrap">
                            {analysis.results.slice(0, 3).map((r) => (
                              <span
                                key={r.cancer_type}
                                className="text-xs px-1.5 py-0.5 rounded"
                                style={{ backgroundColor: `${RISK_COLORS[r.level]}15`, color: RISK_COLORS[r.level] }}
                              >
                                {r.cancer_type}: {r.risk_pct}%
                              </span>
                            ))}
                          </div>
                        </button>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleSelect(analysis.id); }}
                            className={`p-1 rounded text-xs ${selectedIds.includes(analysis.id) ? 'bg-primary text-white' : 'bg-gray-100 text-neutral/60 hover:bg-gray-200'}`}
                            title="Select for comparison"
                          >
                            {selectedIds.includes(analysis.id) ? '✓' : '○'}
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); onDelete(analysis.id); }}
                            className="p-1 rounded text-neutral/40 hover:text-danger hover:bg-danger/10"
                            title="Delete"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
