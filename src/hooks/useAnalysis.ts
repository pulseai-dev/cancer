import { useState } from 'react';
import type { AnalysisInput, AnalysisResponse } from '../types';
import { analyzeInput } from '../services/api';
import { validateAnalysisInput } from '../utils/validation';

export function useAnalysis() {
  const [input, setInput] = useState<AnalysisInput>({});
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = async () => {
    const validationError = validateAnalysisInput(input);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await analyzeInput(input);
      setResult(res);
    } catch {
      setError('Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateInput = (updates: Partial<AnalysisInput>) => {
    setInput((prev) => ({ ...prev, ...updates }));
  };

  const clearError = () => setError(null);

  const reset = () => {
    setInput({});
    setResult(null);
    setError(null);
  };

  return { input, updateInput, result, loading, error, clearError, analyze, reset };
}
