import type { AnalysisInput, AnalysisResponse } from '../types';
import { mockAnalysisResponse } from './mockData';

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

export async function analyzeInput(
  input: AnalysisInput,
  signal?: AbortSignal
): Promise<AnalysisResponse> {
  if (USE_MOCK) {
    await new Promise((r, j) => {
      const timer = setTimeout(r, 1500 + Math.random() * 1000);
      signal?.addEventListener('abort', () => {
        clearTimeout(timer);
        j(new DOMException('Aborted', 'AbortError'));
      });
    });
    return { ...mockAnalysisResponse };
  }

  const formData = new FormData();
  if (input.file) formData.append('file', input.file);
  if (input.symptoms) formData.append('symptoms', input.symptoms);
  if (input.question) formData.append('question', input.question);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);

  // If external signal is provided, chain it
  if (signal) {
    signal.addEventListener('abort', () => controller.abort());
  }

  try {
    const res = await fetch(import.meta.env.VITE_API_URL || '/api/analyze', {
      method: 'POST',
      body: formData,
      signal: controller.signal,
    });

    if (!res.ok) {
      const errorBody = await res.text().catch(() => '');
      throw new Error(
        `Analysis failed (${res.status}): ${errorBody || res.statusText}`
      );
    }

    return res.json();
  } finally {
    clearTimeout(timeout);
  }
}
