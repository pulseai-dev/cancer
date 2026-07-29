import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnalysisProvider } from './context/AnalysisContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import PageTransition from './components/layout/PageTransition';
import Landing from './pages/Landing';
import Analyze from './pages/Analyze';
import Science from './pages/Science';
import Stories from './pages/Stories';
import Plans from './pages/Plans';
import Contact from './pages/Contact';

export default function App() {
  return (
    <BrowserRouter>
      <AnalysisProvider>
        <div className="min-h-screen bg-bg-light grid-bg relative overflow-hidden">
          <Navbar />
          <main className="relative">
            <PageTransition>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/analyze" element={<Analyze />} />
                <Route path="/science" element={<Science />} />
                <Route path="/stories" element={<Stories />} />
                <Route path="/plans" element={<Plans />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </PageTransition>
          </main>
          <Footer />
        </div>
      </AnalysisProvider>
    </BrowserRouter>
  );
}
