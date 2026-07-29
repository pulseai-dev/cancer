import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { timelineData } from '../../services/timelineData';

const LINES = [
  { key: 'lung', color: '#E24B4A', label: 'Lung' },
  { key: 'breast', color: '#BA7517', label: 'Breast' },
  { key: 'skin', color: '#639922', label: 'Skin' },
  { key: 'other', color: '#5F5E5A', label: 'Other' },
];

export default function TimelineChart() {
  const [hiddenLines, setHiddenLines] = useState<Set<string>>(new Set());

  const toggleLine = (key: string) => {
    setHiddenLines((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <div className="bg-white rounded-card border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading text-lg text-neutral">Risk Timeline (30 Days)</h3>
        <div className="flex gap-2">
          {LINES.map((line) => (
            <button
              key={line.key}
              onClick={() => toggleLine(line.key)}
              className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded-full transition-colors ${
                hiddenLines.has(line.key) ? 'bg-gray-100 text-neutral/40' : 'bg-gray-50 text-neutral'
              }`}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: line.color }} />
              {line.label}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={timelineData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#999" />
          <YAxis tick={{ fontSize: 12 }} stroke="#999" domain={[0, 100]} />
          <Tooltip
            contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '12px' }}
          />
          {LINES.filter((line) => !hiddenLines.has(line.key)).map((line) => (
            <Line
              key={line.key}
              type="monotone"
              dataKey={line.key}
              stroke={line.color}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          ))}
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
