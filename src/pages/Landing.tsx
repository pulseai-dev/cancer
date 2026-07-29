import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import DnaHelix from '../components/three/DnaHelix';
import Button from '../components/ui/Button';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <DnaHelix />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-sm font-medium tracking-widest uppercase text-primary mb-4"
            >
              Early Detection Technology
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="font-heading text-5xl sm:text-6xl lg:text-7xl text-ink leading-[1.05] mb-6"
            >
              Catch it early.
              <br />
              <span className="text-primary">Beat it early.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-lg text-neutral/70 max-w-lg mb-10 leading-relaxed"
            >
              CancerDetect uses AI-powered analysis to assess cancer risk from medical files, symptoms, and clinical data — giving you clarity when it matters most.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/analyze">
                <Button size="lg" className="px-8">
                  Start Analysis
                </Button>
              </Link>
              <Link to="/science">
                <Button variant="secondary" size="lg" className="px-8">
                  Learn the Science
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-16 border-t border-ink/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="flex flex-wrap items-center justify-center gap-12 text-neutral/40"
          >
            {['FDA Compliant', 'HIPAA Secure', 'Peer Reviewed', '99.2% Uptime'].map((item) => (
              <motion.span
                key={item}
                variants={fadeUp}
                className="text-sm font-medium tracking-wide uppercase"
              >
                {item}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works — Narrative Workflow */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.p variants={fadeUp} className="text-sm font-medium tracking-widest uppercase text-primary mb-3">
              How It Works
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-heading text-3xl sm:text-4xl text-ink mb-16">
              From input to insight in four steps.
            </motion.h2>

            <div className="space-y-16">
              {[
                {
                  step: '01',
                  title: 'Upload your data',
                  desc: 'Share medical images, lab reports, or symptom descriptions. Our system accepts PNG, JPG, and PDF formats with end-to-end encryption.',
                },
                {
                  step: '02',
                  title: 'AI analyzes risk factors',
                  desc: 'Our engine cross-references your input against a trained model built on peer-reviewed oncology data and clinical patterns.',
                },
                {
                  step: '03',
                  title: 'Receive your risk profile',
                  desc: 'Get a clear breakdown of cancer-type-specific risk levels, confidence scores, and priority recommendations.',
                },
                {
                  step: '04',
                  title: 'Take informed action',
                  desc: 'Use your results to have informed conversations with your physician and plan next steps with confidence.',
                },
              ].map((item) => (
                <motion.div key={item.step} variants={fadeUp} className="flex gap-6">
                  <span className="text-xs font-mono text-primary/60 mt-1.5 shrink-0">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="font-heading text-xl text-ink mb-2">{item.title}</h3>
                    <p className="text-neutral/60 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features — Asymmetric Bento */}
      <section className="py-24 bg-ink/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="text-sm font-medium tracking-widest uppercase text-primary mb-3">
              Capabilities
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-heading text-3xl sm:text-4xl text-ink mb-12">
              Built for clarity, not complexity.
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div variants={fadeUp} className="md:col-span-2 rounded-card border border-ink/5 p-8 bg-bg-light">
                <div className="text-primary mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl text-ink mb-2">Multi-modal input</h3>
                <p className="text-neutral/60 leading-relaxed">
                  Upload medical images, describe symptoms in plain language, or ask direct questions. CancerDetect processes each input type through specialized analysis pipelines.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="rounded-card border border-ink/5 p-8 bg-bg-light">
                <div className="text-primary mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl text-ink mb-2">Instant results</h3>
                <p className="text-neutral/60 leading-relaxed">
                  Risk profiles generated in seconds, not days. Compare results over time with built-in history tracking.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="rounded-card border border-ink/5 p-8 bg-bg-light">
                <div className="text-primary mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl text-ink mb-2">Confidence scores</h3>
                <p className="text-neutral/60 leading-relaxed">
                  Every risk assessment comes with transparent confidence levels so you understand the certainty behind each result.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="md:col-span-2 rounded-card border border-ink/5 p-8 bg-bg-light">
                <div className="text-primary mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl text-ink mb-2">Evidence-based recommendations</h3>
                <p className="text-neutral/60 leading-relaxed">
                  Every recommendation is grounded in clinical guidelines. CancerDetect doesn't just flag risk — it suggests actionable next steps backed by peer-reviewed research.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof — Pull Quote */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.blockquote variants={fadeUp} className="font-heading text-2xl sm:text-3xl text-ink leading-snug mb-6">
              "CancerDetect gave me the clarity I needed to have an informed conversation with my oncologist. The risk breakdown was precise and actionable."
            </motion.blockquote>
            <motion.div variants={fadeUp}>
              <p className="text-sm font-medium text-ink">Dr. Sarah Chen</p>
              <p className="text-xs text-neutral/50">Oncologist, Memorial Sloan Kettering</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 border-t border-ink/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
          >
            <motion.h2 variants={fadeUp} className="font-heading text-3xl sm:text-4xl text-ink mb-6">
              Your health deserves clarity.
            </motion.h2>
            <motion.div variants={fadeUp}>
              <Link to="/analyze">
                <Button size="lg" className="px-10">
                  Start Your Analysis
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
