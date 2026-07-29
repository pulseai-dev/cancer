import { motion } from 'framer-motion';
import type { RiskResult } from '../../types';
import { RISK_COLORS } from '../../types';
import ProgressBar from './ProgressBar';

const itemVariants = {
  hidden: { y: 24, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const } },
};

export default function RiskCard({ risk }: { risk: RiskResult }) {
  const color = RISK_COLORS[risk.level];

  return (
    <motion.div
      variants={itemVariants}
      className="rounded-card border-[0.5px] p-4 transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
      style={{ borderColor: `${color}30` }}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-heading text-lg text-neutral">{risk.cancer_type}</h3>
        <motion.span
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="text-xs font-medium px-2 py-0.5 rounded-full"
          style={{ backgroundColor: `${color}15`, color }}
        >
          {risk.level}
        </motion.span>
      </div>

      <div className="mb-3">
        <ProgressBar value={risk.risk_pct} color={color} />
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-neutral/60">Risk Level</span>
        <span className="font-mono font-medium text-neutral">{risk.risk_pct}%</span>
      </div>

      <div className="flex items-center justify-between text-sm mt-1">
        <span className="text-neutral/60">Confidence</span>
        <span className="font-mono text-neutral/70">{Math.round(risk.confidence * 100)}%</span>
      </div>
    </motion.div>
  );
}
