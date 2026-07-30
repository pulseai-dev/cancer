import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnalysisProvider } from './context/AnalysisContext';
import { ThemeProvider, useTheme } from './components/ui/ThemeProvider';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import PageTransition from './components/layout/PageTransition';
import ErrorBoundary from './components/ui/ErrorBoundary';
import CustomCursor from './components/ui/CustomCursor';
import LoadingSpinner from './components/ui/LoadingSpinner';

const Landing = lazy(() => import('./pages/Landing'));
const Analyze = lazy(() => import('./pages/Analyze'));
const Science = lazy(() => import('./pages/Science'));
const Stories = lazy(() => import('./pages/Stories'));
const Plans = lazy(() => import('./pages/Plans'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

function RouteFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center" role="status" aria-label="Loading page content">
      <span className="sr-only">Loading...</span>
      <LoadingSpinner />
    </div>
  );
}

function AppContent() {
  const { theme } = useTheme();

  useEffect(() => {
    document.body.style.background = theme === 'dark' ? '#1a1a1a' : '#F1EFE8';
    document.body.style.color = theme === 'dark' ? '#e0e0e0' : '#5F5E5A';
  }, [theme]);

  return (
    <div className={`min-h-screen grid-bg relative overflow-x-clip ${theme === 'dark' ? 'bg-bg-dark' : 'bg-bg-light'}`}>
      <CustomCursor />
      <Navbar />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-primary focus:text-white focus:text-sm focus:font-semibold"
      >
        Skip to content
      </a>
      <main id="main-content" className="relative">
        <Suspense fallback={<RouteFallback />}>
          <PageTransition>
            <Routes>
              <Route path="/" element={<ErrorBoundary><Landing /></ErrorBoundary>} />
              <Route path="/analyze" element={<ErrorBoundary><Analyze /></ErrorBoundary>} />
              <Route path="/science" element={<ErrorBoundary><Science /></ErrorBoundary>} />
              <Route path="/stories" element={<ErrorBoundary><Stories /></ErrorBoundary>} />
              <Route path="/plans" element={<ErrorBoundary><Plans /></ErrorBoundary>} />
              <Route path="/contact" element={<ErrorBoundary><Contact /></ErrorBoundary>} />
              <Route path="*" element={<ErrorBoundary><NotFound /></ErrorBoundary>} />
            </Routes>
          </PageTransition>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary fallback={
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 rounded-2xl bg-danger/10 flex items-center justify-center mx-auto mb-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-danger">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="font-heading text-3xl text-ink mb-3">Something went wrong</h1>
        <p className="text-neutral/60 mb-6 max-w-md">The application encountered an unexpected error. Please try refreshing the page.</p>
        <button onClick={() => window.location.reload()} className="px-6 py-3 rounded-full bg-primary text-white text-sm font-medium shadow-depth-sm hover:shadow-glow transition-shadow">
          Refresh page
        </button>
      </div>
    }>
      <BrowserRouter>
        <ThemeProvider>
          <AnalysisProvider>
            <AppContent />
          </AnalysisProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
