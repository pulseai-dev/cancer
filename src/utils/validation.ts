import type { AnalysisInput } from '../types';

export function validateAnalysisInput(input: AnalysisInput): string | null {
  if (!input.file && !input.symptoms && !input.question) {
    return 'At least one input method is required';
  }
  if (input.symptoms && input.symptoms.length > 2000) {
    return 'Symptoms text must be under 2000 characters';
  }
  if (input.question && input.question.length > 500) {
    return 'Question must be under 500 characters';
  }
  if (input.file) {
    const allowed = ['image/png', 'image/jpeg', 'application/pdf'];
    if (!allowed.includes(input.file.type)) {
      return 'Only PNG, JPG, and PDF files are accepted';
    }
  }
  return null;
}
