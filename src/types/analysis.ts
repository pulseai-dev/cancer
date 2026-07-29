import type { RiskResult } from '../types';

export interface Analysis {
  id: string;
  timestamp: number;
  results: RiskResult[];
  inputs: { file?: string; symptoms?: string; question?: string };
  overallConfidence: number;
  analysisTimeMs: number;
  recommendations: string[];
}

export interface WellnessDay {
  day: number;
  diet: { breakfast: string; lunch: string; dinner: string; tips: string };
  exercise: { type: string; duration: string; intensity: 'low' | 'moderate' | 'high' };
}

export interface WellnessPlan {
  riskProfile: 'high' | 'moderate' | 'low';
  days: WellnessDay[];
}
