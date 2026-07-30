import { useRef, useState, useEffect } from 'react';
import { useAnalysisContext } from '../../context/AnalysisContext';

const VALID_TYPES = ['image/png', 'image/jpeg', 'application/pdf'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default function FileUpload() {
  const { input, updateInput } = useAnalysisContext();
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (input.file && input.file.type.startsWith('image/')) {
      const url = URL.createObjectURL(input.file);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
    setPreview(null);
  }, [input.file]);

  const handleFile = (file: File) => {
    setError(null);

    if (!VALID_TYPES.includes(file.type)) {
      setError('Invalid file type. Use PNG, JPG, or PDF.');
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError('File too large. Max 5MB per file.');
      return;
    }

    updateInput({ file });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const removeFile = () => {
    updateInput({ file: undefined });
    setError(null);
    setPreview(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-neutral">
        Upload Medical Files
      </label>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); inputRef.current?.click(); }}}
        role="button"
        tabIndex={0}
        aria-label="Upload medical file. Drag and drop or click to browse."
        className={`relative cursor-pointer rounded-card border-2 border-dashed p-6 text-center transition-all duration-200 ${
          dragActive
            ? 'border-primary bg-primary/5'
            : input.file
            ? 'border-success bg-success/5'
            : error
            ? 'border-danger bg-danger/5'
            : 'border-neutral/20 hover:border-neutral/40 hover:bg-white/50'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,application/pdf"
          onChange={handleChange}
          className="hidden"
        />

        {input.file ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-left">
                <p className="text-sm text-neutral font-medium">{input.file.name}</p>
                <p className="text-xs text-neutral/50">{(input.file.size / 1024).toFixed(1)} KB</p>
              </div>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); removeFile(); }}
              className="text-neutral/50 hover:text-danger transition-colors p-1 rounded hover:bg-danger/10"
              aria-label="Remove file"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <>
            <svg className="w-8 h-8 mx-auto mb-2 text-neutral/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-sm text-neutral/60">
              Drag and drop a file, or <span className="text-primary font-medium">browse</span>
            </p>
            <p className="text-xs text-neutral/40 mt-1">PNG, JPG, or PDF (max 5MB)</p>
          </>
        )}
      </div>

      {/* Image Preview */}
      {preview && (
        <div className="mt-2">
          <img
            src={preview}
            alt="File preview"
            className="w-24 h-24 object-cover rounded-lg border border-neutral/10"
          />
        </div>
      )}

      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
}
