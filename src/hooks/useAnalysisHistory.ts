import { useState, useEffect, useCallback } from 'react';
import type { Analysis } from '../types/analysis';

const STORAGE_KEY = 'analyses';
const MAX_HISTORY = 10;

function loadHistory(): Analysis[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveHistory(history: Analysis[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function useAnalysisHistory() {
  const [history, setHistory] = useState<Analysis[]>(() => loadHistory());

  useEffect(() => {
    saveHistory(history);
  }, [history]);

  const addAnalysis = useCallback((analysis: Omit<Analysis, 'id' | 'timestamp'>) => {
    const newAnalysis: Analysis = {
      ...analysis,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
    };
    setHistory((prev) => [newAnalysis, ...prev].slice(0, MAX_HISTORY));
    return newAnalysis;
  }, []);

  const deleteAnalysis = useCallback((id: string) => {
    setHistory((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return { history, addAnalysis, deleteAnalysis, clearHistory };
}
