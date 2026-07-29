import type { Analysis } from '../types/analysis';

export async function exportPDF(_analysis: Analysis) {
  const html2pdf = (await import('html2pdf.js')).default;
  const element = document.getElementById('results-report');
  if (!element) return;

  const opt = {
    margin: 10,
    filename: `cancer-report-${new Date().toISOString().split('T')[0]}.pdf`,
    image: { type: 'jpeg' as const, quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const },
  };

  await html2pdf().set(opt).from(element).save();
}

export function exportCSV(analysis: Analysis) {
  const headers = ['Cancer Type', 'Risk %', 'Level', 'Confidence'];
  const rows = analysis.results.map((r) => [
    r.cancer_type,
    r.risk_pct.toString(),
    r.level,
    (r.confidence * 100).toFixed(0) + '%',
  ]);

  const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `cancer-data-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export function copyShareLink(analysis: Analysis) {
  const data = btoa(JSON.stringify(analysis));
  const link = `${window.location.origin}?analysis=${data}`;
  navigator.clipboard.writeText(link);
  return link;
}
