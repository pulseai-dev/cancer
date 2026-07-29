import { useAnalysisContext } from '../../context/AnalysisContext';

export default function QuestionPrompt() {
  const { input, updateInput } = useAnalysisContext();
  const maxChars = 500;
  const currentLength = (input.question || '').length;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-neutral">
        Ask the AI
      </label>
      <div className="relative">
        <input
          type="text"
          value={input.question || ''}
          onChange={(e) => updateInput({ question: e.target.value })}
          placeholder="Ask a specific health question..."
          maxLength={maxChars}
          className="w-full h-9 border border-gray-300 rounded-lg px-4 pr-10 text-sm text-neutral placeholder:text-neutral/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
        />
        <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <p className={`text-xs text-right ${currentLength > maxChars * 0.9 ? 'text-warning' : 'text-neutral/40'}`}>
        {currentLength}/{maxChars}
      </p>
    </div>
  );
}
