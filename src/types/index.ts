export interface RiskResult {
  cancer_type: string;
  risk_pct: number;
  confidence: number;
  level: 'High' | 'Moderate' | 'Low' | 'Very Low';
}

export interface AnalysisResponse {
  risks: RiskResult[];
  overall_confidence: number;
  analysis_time_ms: number;
  recommendations: string[];
}

export interface AnalysisInput {
  file?: File;
  symptoms?: string;
  question?: string;
}

export type RiskLevel = 'High' | 'Moderate' | 'Low' | 'Very Low';

export const RISK_COLORS: Record<RiskLevel, string> = {
  High: '#E24B4A',
  Moderate: '#BA7517',
  Low: '#639922',
  'Very Low': '#639922',
};
