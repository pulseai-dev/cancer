interface ConfidenceBadgeProps {
  confidence: number;
}

export default function ConfidenceBadge({ confidence }: ConfidenceBadgeProps) {
  const pct = Math.round(confidence * 100);
  const color = pct >= 80 ? 'text-success' : pct >= 60 ? 'text-warning' : 'text-danger';

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-neutral/60">Model Confidence</span>
      <span className={`font-mono font-medium ${color}`}>{pct}%</span>
    </div>
  );
}
