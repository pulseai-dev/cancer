import type { AnalysisInput, AnalysisResponse } from '../types';
import { mockAnalysisResponse } from './mockData';

const USE_MOCK = true;

export async function analyzeInput(input: AnalysisInput): Promise<AnalysisResponse> {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 1500 + Math.random() * 1000));
    return { ...mockAnalysisResponse };
  }

  const formData = new FormData();
  if (input.file) formData.append('file', input.file);
  if (input.symptoms) formData.append('symptoms', input.symptoms);
  if (input.question) formData.append('question', input.question);

  const res = await fetch('/api/analyze', {
    method: 'POST',
    body: formData,
  });
  return res.json();
}
