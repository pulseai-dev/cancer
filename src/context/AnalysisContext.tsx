import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { useAnalysis } from '../hooks/useAnalysis';
import type { AnalysisInput, AnalysisResponse } from '../types';

interface AnalysisContextType {
  input: AnalysisInput;
  updateInput: (updates: Partial<AnalysisInput>) => void;
  result: AnalysisResponse | null;
  loading: boolean;
  error: string | null;
  clearError: () => void;
  analyze: () => void;
  reset: () => void;
}

const AnalysisContext = createContext<AnalysisContextType | null>(null);

export function AnalysisProvider({ children }: { children: ReactNode }) {
  const analysis = useAnalysis();

  const value = useMemo(() => analysis, [
    analysis.input,
    analysis.result,
    analysis.loading,
    analysis.error,
    analysis.updateInput,
    analysis.analyze,
    analysis.reset,
    analysis.clearError,
  ]);

  return (
    <AnalysisContext.Provider value={value}>
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysisContext() {
  const ctx = useContext(AnalysisContext);
  if (!ctx) throw new Error('useAnalysisContext must be used within AnalysisProvider');
  return ctx;
}
