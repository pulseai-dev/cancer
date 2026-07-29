import FileUpload from './FileUpload';
import SymptomInput from './SymptomInput';
import QuestionPrompt from './QuestionPrompt';
import Button from '../ui/Button';
import { useAnalysisContext } from '../../context/AnalysisContext';

export default function HeroSection() {
  const { analyze, loading } = useAnalysisContext();

  return (
    <section className="relative py-16 sm:py-24 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-neutral mb-4">
          Cancer Detection Analysis
        </h1>
        <p className="text-neutral/70 text-lg mb-12 max-w-lg mx-auto">
          Upload medical files, describe symptoms, or ask our AI engine for instant cancer risk assessment.
        </p>

        <div className="space-y-6 text-left">
          <FileUpload />
          <SymptomInput />
          <QuestionPrompt />
        </div>

        <div className="mt-10">
          <Button
            onClick={analyze}
            disabled={loading}
            loading={loading}
            size="lg"
            fullWidth
            className="sm:w-auto sm:px-8"
          >
            Run Analysis
          </Button>
        </div>
      </div>
    </section>
  );
}
