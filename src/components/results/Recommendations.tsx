interface RecommendationsProps {
  items: string[];
}

export default function Recommendations({ items }: RecommendationsProps) {
  if (!items.length) return null;

  return (
    <div className="rounded-card border-[0.5px] border-neutral/20 p-5 bg-white/30">
      <h3 className="font-heading text-lg text-neutral mb-3">Recommendations</h3>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-neutral/70">
            <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
