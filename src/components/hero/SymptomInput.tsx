import { useAnalysisContext } from '../../context/AnalysisContext';

export default function SymptomInput() {
  const { input, updateInput } = useAnalysisContext();
  const maxChars = 2000;
  const currentLength = (input.symptoms || '').length;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-neutral">
        Describe Symptoms & Medical History
      </label>
      <textarea
        value={input.symptoms || ''}
        onChange={(e) => updateInput({ symptoms: e.target.value })}
        placeholder="Describe any symptoms, concerns, or relevant medical history..."
        maxLength={maxChars}
        rows={4}
        className="w-full min-h-[100px] border border-gray-300 rounded-lg px-4 py-3 text-sm text-neutral placeholder:text-neutral/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none transition-all duration-200"
      />
      <p className={`text-xs text-right ${currentLength > maxChars * 0.9 ? 'text-warning' : 'text-neutral/40'}`}>
        {currentLength}/{maxChars}
      </p>
    </div>
  );
}
