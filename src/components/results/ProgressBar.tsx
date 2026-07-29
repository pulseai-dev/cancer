interface ProgressBarProps {
  value: number;
  color: string;
}

export default function ProgressBar({ value, color }: ProgressBarProps) {
  return (
    <div className="w-full h-2 rounded-full bg-neutral/10 overflow-hidden">
      <div
        className="h-full rounded-full animate-fill-bar"
        style={{ '--bar-width': `${value}%`, backgroundColor: color } as React.CSSProperties}
      />
    </div>
  );
}
