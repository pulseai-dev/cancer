import { createContext, useContext, type ReactNode } from 'react';
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
  return (
    <AnalysisContext.Provider value={analysis}>
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysisContext() {
  const ctx = useContext(AnalysisContext);
  if (!ctx) throw new Error('useAnalysisContext must be used within AnalysisProvider');
  return ctx;
}
