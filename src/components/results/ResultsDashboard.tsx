import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAnalysisContext } from '../../context/AnalysisContext';
import RiskCard from './RiskCard';
import ConfidenceBadge from './ConfidenceBadge';
import Recommendations from './Recommendations';
import Button from '../ui/Button';
import TimelineChart from '../timeline/TimelineChart';
import WellnessPlanModal from '../wellness/WellnessPlanModal';
import type { Analysis } from '../../types/analysis';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

interface ResultsDashboardProps {
  onSaveAnalysis?: (analysis: Omit<Analysis, 'id' | 'timestamp'>) => void;
}

export default function ResultsDashboard({ onSaveAnalysis: _onSaveAnalysis }: ResultsDashboardProps) {
  const { result, reset } = useAnalysisContext();
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline'>('overview');
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showWellness, setShowWellness] = useState(false);

  if (!result) return null;

  const handleExportCSV = () => {
    const headers = ['Cancer Type', 'Risk %', 'Level', 'Confidence'];
    const rows = result.risks.map((r) => [
      r.cancer_type,
      r.risk_pct.toString(),
      r.level,
      (r.confidence * 100).toFixed(0) + '%',
    ]);
    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cancer-data-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setShowExportMenu(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowExportMenu(false);
  };

  const topRisk = result.risks.reduce((prev, curr) => (curr.risk_pct > prev.risk_pct ? curr : prev));
  const riskProfile = topRisk.risk_pct > 30 ? 'high' : topRisk.risk_pct > 15 ? 'moderate' : 'low';

  return (
    <>
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-2xl sm:text-3xl text-neutral">
              Risk Assessment Results
            </h2>
            <div className="flex items-center gap-2">
              {/* Export Menu */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowExportMenu(!showExportMenu)}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Export
                </Button>
                {showExportMenu && (
                  <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10 min-w-[140px]">
                    <button
                      onClick={handleExportCSV}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      CSV Data
                    </button>
                    <button
                      onClick={handleCopyLink}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                      Copy Link
                    </button>
                  </div>
                )}
              </div>

              <Button variant="secondary" size="sm" onClick={reset}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                New Analysis
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'overview'
                  ? 'bg-white text-neutral shadow-sm'
                  : 'text-neutral/60 hover:text-neutral'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('timeline')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'timeline'
                  ? 'bg-white text-neutral shadow-sm'
                  : 'text-neutral/60 hover:text-neutral'
              }`}
            >
              Timeline
            </button>
          </div>

          {activeTab === 'overview' ? (
            <>
              {/* Risk Cards Grid with Staggered Animation */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-3 mb-8"
              >
                {result.risks.map((risk) => (
                  <RiskCard key={risk.cancer_type} risk={risk} />
                ))}
              </motion.div>

              {/* Metrics Row */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap items-center justify-center gap-6 mb-8"
              >
                <ConfidenceBadge confidence={result.overall_confidence} />
                <div className="text-sm text-neutral/60">
                  Analysis completed in{' '}
                  <span className="font-mono font-medium text-neutral">
                    {result.analysis_time_ms}ms
                  </span>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setShowWellness(true)}
                >
                  Get Wellness Plan
                </Button>
              </motion.div>

              {/* Recommendations */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Recommendations items={result.recommendations} />
              </motion.div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <TimelineChart />
            </motion.div>
          )}
        </div>
      </section>

      {/* Wellness Plan Modal */}
      <WellnessPlanModal
        isOpen={showWellness}
        riskProfile={riskProfile}
        onClose={() => setShowWellness(false)}
      />
    </>
  );
}
