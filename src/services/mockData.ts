import type { AnalysisResponse } from '../types';

export const mockAnalysisResponse: AnalysisResponse = {
  risks: [
    { cancer_type: 'Lung', risk_pct: 12, confidence: 0.87, level: 'Low' },
    { cancer_type: 'Breast', risk_pct: 5, confidence: 0.92, level: 'Very Low' },
    { cancer_type: 'Skin', risk_pct: 34, confidence: 0.78, level: 'Moderate' },
    { cancer_type: 'Other', risk_pct: 8, confidence: 0.85, level: 'Low' },
  ],
  overall_confidence: 0.86,
  analysis_time_ms: 2340,
  recommendations: [
    'Consider dermatological consultation for skin assessment',
    'Schedule routine screening in 6 months',
    'Monitor any changes and report to your physician',
  ],
};
