import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
const ParticleField = lazy(() => import('../components/three/ParticleField'));
const MolecularScene = lazy(() => import('../components/three/MolecularScene'));
const OncologyNetworkGlobe = lazy(() => import('../components/three/OncologyNetworkGlobe'));
const CancerCellMatrix = lazy(() => import('../components/three/CancerCellMatrix'));

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function Science() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <Suspense fallback={null}>
            <ParticleField />
          </Suspense>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-sm font-medium tracking-widest uppercase text-primary mb-4"
            >
              The Science
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="font-heading text-4xl sm:text-5xl text-ink leading-tight mb-6"
            >
              How CancerDetect works
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-lg text-neutral/60 leading-relaxed"
            >
              A transparent look at the AI engine behind our risk assessments — the data, the methodology, and the clinical evidence that powers every result.
            </motion.p>
          </div>
        </div>
      </section>

      {/* The Pipeline */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.h2 variants={fadeUp} className="font-heading text-2xl sm:text-3xl text-ink mb-12">
              The detection pipeline
            </motion.h2>

      {/* Interactive 3D Research Domains Section (Reset Studios Style) */}
      <section className="py-28 relative z-10 border-t border-ink/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4">
              Advanced Research Architecture
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-heading text-3xl sm:text-4xl lg:text-5xl text-ink mb-6 leading-tight">
              3D Detection & Analysis Domains
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-neutral/60 max-w-2xl leading-relaxed mb-12">
              Explore each specialized 3D analytical engine driving our diagnostic precision across molecular, cellular, and global network paradigms.
            </motion.p>

            {/* Showcase 1: Molecular Biomarkers */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24 p-8 sm:p-12 rounded-3xl liquid-glass-card border border-white/20">
              <div>
                <span className="text-xs font-mono text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full inline-block mb-4">
                  Domain 01 — Biomarkers
                </span>
                <h3 className="font-heading text-3xl text-ink mb-4">
                  Molecular Biomarkers Analysis
                </h3>
                <p className="text-neutral/60 leading-relaxed mb-6">
                  Extracts and analyzes sub-nanometer molecular mutations, amino acid sequences, and protein binding affinities using high-resolution 3D spatial simulation.
                </p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {['DNA Methylation', 'RNA Sequence Alignment', 'Enzyme Affinity', 'Somatic Variants'].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-neutral/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
                <div className="pt-6 border-t border-ink/10 flex gap-8">
                  <div>
                    <div className="font-heading text-2xl text-ink">99.4%</div>
                    <div className="text-xs text-neutral/40 uppercase font-mono">Precision Rate</div>
                  </div>
                  <div>
                    <div className="font-heading text-2xl text-ink">&lt; 0.8s</div>
                    <div className="text-xs text-neutral/40 uppercase font-mono">Compute Time</div>
                  </div>
                </div>
              </div>
              <div className="h-[360px] lg:h-[420px] rounded-2xl overflow-hidden relative shadow-depth-lg border border-white/10">
                <Suspense fallback={<div className="w-full h-full flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>}>
                  <MolecularScene />
                </Suspense>
              </div>
            </div>

            {/* Showcase 2: Cellular Matrix Bounding */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24 p-8 sm:p-12 rounded-3xl liquid-glass-card border border-white/20">
              <div className="order-2 lg:order-1 h-[360px] lg:h-[420px] rounded-2xl overflow-hidden relative shadow-depth-lg border border-white/10">
                <Suspense fallback={<div className="w-full h-full flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>}>
                  <CancerCellMatrix />
                </Suspense>
              </div>
              <div className="order-1 lg:order-2">
                <span className="text-xs font-mono text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full inline-block mb-4">
                  Domain 02 — Cellular Spatialing
                </span>
                <h3 className="font-heading text-3xl text-ink mb-4">
                  Cellular Matrix Bounding
                </h3>
                <p className="text-neutral/60 leading-relaxed mb-6">
                  Evaluates 3D tissue density, cell cluster morphology, and abnormal growth vectors inside volumetric spatial bounding matrices.
                </p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {['Volumetric Density', 'Morphology Classification', 'Tissue Clustering', 'Vector Growth Mapping'].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-neutral/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
                <div className="pt-6 border-t border-ink/10 flex gap-8">
                  <div>
                    <div className="font-heading text-2xl text-ink">14</div>
                    <div className="text-xs text-neutral/40 uppercase font-mono">Tissue Types</div>
                  </div>
                  <div>
                    <div className="font-heading text-2xl text-ink">3D Spatial</div>
                    <div className="text-xs text-neutral/40 uppercase font-mono">Resolution</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Showcase 3: Global Oncology Network */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-8 sm:p-12 rounded-3xl liquid-glass-card border border-white/20">
              <div>
                <span className="text-xs font-mono text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full inline-block mb-4">
                  Domain 03 — Global Data Hub
                </span>
                <h3 className="font-heading text-3xl text-ink mb-4">
                  Global Oncology Network
                </h3>
                <p className="text-neutral/60 leading-relaxed mb-6">
                  Real-time cross-referencing against 2.4M+ patient clinical records across premier global oncology institutes including MSKCC, Johns Hopkins, and Karolinska.
                </p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {['HIPAA Secure Sync', 'Peer-Reviewed Correlates', 'Global Cohort Matching', 'Real-time Telemetry'].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-neutral/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
                <div className="pt-6 border-t border-ink/10 flex gap-8">
                  <div>
                    <div className="font-heading text-2xl text-ink">2.4M+</div>
                    <div className="text-xs text-neutral/40 uppercase font-mono">Global Records</div>
                  </div>
                  <div>
                    <div className="font-heading text-2xl text-ink">99.2%</div>
                    <div className="text-xs text-neutral/40 uppercase font-mono">Network Uptime</div>
                  </div>
                </div>
              </div>
              <div className="h-[360px] lg:h-[420px] rounded-2xl overflow-hidden relative shadow-depth-lg border border-white/10">
                <Suspense fallback={<div className="w-full h-full flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>}>
                  <OncologyNetworkGlobe />
                </Suspense>
              </div>
            </div>

          </motion.div>
        </div>
      </section>

            <div className="space-y-12">
              {[
                {
                  num: '01',
                  title: 'Data Ingestion',
                  body: 'CancerDetect accepts multi-modal inputs: medical images (X-rays, MRIs, histopathology slides), structured symptom descriptions, and free-text clinical questions. Each input type is routed to a specialized preprocessing pipeline that normalizes format, validates integrity, and extracts relevant features.',
                },
                {
                  num: '02',
                  title: 'Feature Extraction',
                  body: 'Our model uses a combination of convolutional neural networks for image analysis and transformer-based architectures for textual clinical data. The feature extraction layer identifies patterns associated with known cancer biomarkers — cell morphology, tissue density anomalies, symptom clustering, and risk factor correlations.',
                },
                {
                  num: '03',
                  title: 'Risk Modeling',
                  body: 'Extracted features are fed into an ensemble risk model trained on de-identified clinical datasets. The model produces per-cancer-type risk probabilities with calibrated confidence intervals. We use Monte Carlo dropout at inference time to estimate epistemic uncertainty — the model knows what it doesn\'t know.',
                },
                {
                  num: '04',
                  title: 'Output & Recommendations',
                  body: 'Results are presented as a structured risk profile: cancer type, risk percentage, confidence score, and clinical priority level. Recommendations are generated from a rule-based layer that maps risk profiles to established clinical guidelines (NCCN, ACS, USPSTF). Every recommendation includes its evidence source.',
                },
              ].map((item) => (
                <motion.div key={item.num} variants={fadeUp} className="flex gap-6">
                  <span className="text-xs font-mono text-primary/60 mt-1 shrink-0">
                    {item.num}
                  </span>
                  <div>
                    <h3 className="font-heading text-xl text-ink mb-3">{item.title}</h3>
                    <p className="text-neutral/60 leading-[1.75]">{item.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Evidence & References */}
      <section className="py-24 bg-ink/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
          >
            <motion.h2 variants={fadeUp} className="font-heading text-2xl sm:text-3xl text-ink mb-12">
              Supporting evidence
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: 'Training Data',
                  stat: '2.4M+',
                  label: 'clinical samples',
                  desc: 'De-identified datasets from partnered research institutions, spanning 14 cancer types across diverse demographics.',
                },
                {
                  title: 'Model Accuracy',
                  stat: '94.7%',
                  label: 'sensitivity',
                  desc: 'Validated against held-out clinical cohorts with independent reviewer confirmation. Full validation study pending peer review.',
                },
                {
                  title: 'Cancer Coverage',
                  stat: '14',
                  label: 'types supported',
                  desc: 'Lung, breast, skin, colorectal, prostate, ovarian, pancreatic, liver, stomach, bladder, kidney, thyroid, cervical, and brain.',
                },
                {
                  title: 'Response Time',
                  stat: '<3s',
                  label: 'average analysis',
                  desc: 'From upload to results in under three seconds. Complex multi-modal inputs may take slightly longer.',
                },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className="rounded-card border border-ink/5 p-6 bg-bg-light"
                >
                  <p className="text-xs font-medium tracking-widest uppercase text-neutral/40 mb-2">
                    {item.title}
                  </p>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="font-heading text-3xl text-ink">{item.stat}</span>
                    <span className="text-sm text-neutral/50">{item.label}</span>
                  </div>
                  <p className="text-sm text-neutral/60 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Limitations */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.h2 variants={fadeUp} className="font-heading text-2xl sm:text-3xl text-ink mb-6">
              Important limitations
            </motion.h2>
            <motion.div variants={fadeUp} className="space-y-4 text-neutral/60 leading-[1.75]">
              <p>
                CancerDetect is a decision-support tool, not a diagnostic device. It provides risk assessments to inform conversations between patients and physicians — it does not replace clinical judgment.
              </p>
              <p>
                Risk percentages represent model-estimated probabilities based on input data quality. Incomplete or low-quality inputs may reduce confidence scores. All results should be reviewed by a qualified healthcare provider.
              </p>
              <p>
                Our training data represents specific demographics and cancer types. Performance may vary across populations underrepresented in the training set. We are actively working to expand dataset diversity.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
