import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef, lazy, Suspense } from 'react';
const DnaWidget = lazy(() => import('../components/three/DnaWidget'));
import Button from '../components/ui/Button';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] } },
};

function DepthCard({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: 8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className={className}
      style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  );
}

export default function Landing() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 60]);

  return (
    <div className="min-h-screen">
      {/* === FULL-SCREEN HERO === */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="relative h-screen flex items-center overflow-hidden"
      >
        {/* Content — two column split */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-12 items-center min-h-[80vh]">

            {/* LEFT — Text */}
            <div className="max-w-xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass-hero mb-8"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-medium text-primary tracking-wide">AI-Powered Risk Assessment</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                className="font-heading text-5xl sm:text-6xl lg:text-[72px] text-ink leading-[1.05] mb-6"
              >
                Catch it early.
                <br />
                <span className="text-primary">Beat it early.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-lg text-neutral/55 max-w-md mb-10 leading-relaxed"
              >
                CancerDetect uses AI-powered analysis to assess cancer risk from medical files, symptoms, and clinical data — giving you clarity when it matters most.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <Link to="/analyze">
                  <Button size="lg" className="px-10 text-base">
                    Start Analysis
                  </Button>
                </Link>
                <Link to="/science">
                  <Button variant="secondary" size="lg" className="px-10 text-base">
                    Learn the Science
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* RIGHT — 3D Scene in contained card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
              className="relative rounded-3xl overflow-hidden liquid-glass-card"
              style={{ aspectRatio: '4/3', minHeight: '400px' }}
            >
              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                </div>
              }>
                <DnaWidget />
              </Suspense>
            </motion.div>

          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span className="text-[11px] font-medium text-neutral/40 tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="w-5 h-8 rounded-full border-2 border-neutral/20 flex justify-center pt-1.5"
          >
            <div className="w-1 h-1.5 rounded-full bg-primary/60" />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* === TRUST BAR === */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6"
          >
            {[
              { icon: '◈', label: 'FDA Compliant' },
              { icon: '◈', label: 'HIPAA Secure' },
              { icon: '◈', label: 'Peer Reviewed' },
              { icon: '◈', label: '99.2% Uptime' },
            ].map((item) => (
              <motion.div
                key={item.label}
                variants={fadeUp}
                className="flex items-center gap-2 text-neutral/30"
              >
                <span className="text-primary/40">{item.icon}</span>
                <span className="text-sm font-medium tracking-wide uppercase">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* === HOW IT WORKS — NARRATIVE WORKFLOW === */}
      <section className="py-28 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.p variants={fadeUp} className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4">
              How It Works
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-heading text-3xl sm:text-4xl lg:text-5xl text-ink mb-20 leading-tight">
              From input to insight<br />in four steps.
            </motion.h2>

            <div className="space-y-20">
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
              ]              .map((item) => (
                <motion.div
                  key={item.step}
                  variants={fadeUp}
                  className="flex gap-8 group"
                >
                  <span className="text-xs font-mono text-primary/40 mt-1.5 shrink-0 group-hover:text-primary transition-colors duration-300">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="font-heading text-2xl text-ink mb-3 group-hover:text-primary transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-neutral/55 leading-[1.8] text-[15px]">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* === FEATURES — 3D DEPTH BENTO === */}
      <section className="py-28 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4">
              Capabilities
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-heading text-3xl sm:text-4xl lg:text-5xl text-ink mb-14 leading-tight">
              Built for clarity,<br />not complexity.
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Large feature card */}
              <DepthCard className="md:col-span-2 rounded-2xl border border-white/20 p-8 sm:p-10 liquid-glass-card hover:shadow-[0_8px_40px_-12px_rgba(24,95,165,0.15)] transition-shadow duration-500" delay={0}>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-heading text-2xl text-ink mb-3">Multi-modal input</h3>
                <p className="text-neutral/55 leading-[1.8] text-[15px]">
                  Upload medical images, describe symptoms in plain language, or ask direct questions. CancerDetect processes each input type through specialized analysis pipelines designed for clinical accuracy.
                </p>
              </DepthCard>

              {/* Small card */}
              <DepthCard className="rounded-2xl border border-white/20 p-8 liquid-glass-card hover:shadow-[0_8px_40px_-12px_rgba(24,95,165,0.15)] transition-shadow duration-500" delay={0.1}>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-heading text-2xl text-ink mb-3">Instant results</h3>
                <p className="text-neutral/55 leading-[1.8] text-[15px]">
                  Risk profiles in seconds. Compare results over time with built-in history tracking.
                </p>
              </DepthCard>

              {/* Small card */}
              <DepthCard className="rounded-2xl border border-white/20 p-8 liquid-glass-card hover:shadow-[0_8px_40px_-12px_rgba(24,95,165,0.15)] transition-shadow duration-500" delay={0.15}>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="font-heading text-2xl text-ink mb-3">Confidence scores</h3>
                <p className="text-neutral/55 leading-[1.8] text-[15px]">
                  Transparent confidence levels for every risk assessment.
                </p>
              </DepthCard>

              {/* Large feature card */}
              <DepthCard className="md:col-span-2 rounded-2xl border border-white/20 p-8 sm:p-10 liquid-glass-card hover:shadow-[0_8px_40px_-12px_rgba(24,95,165,0.15)] transition-shadow duration-500" delay={0.2}>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="font-heading text-2xl text-ink mb-3">Evidence-based recommendations</h3>
                <p className="text-neutral/55 leading-[1.8] text-[15px]">
                  Every recommendation is grounded in clinical guidelines. CancerDetect doesn't just flag risk — it suggests actionable next steps backed by peer-reviewed research and NCCN protocols.
                </p>
              </DepthCard>
            </div>
          </motion.div>
        </div>
      </section>

      {/* === STATS STRIP === */}
      <section className="py-20 relative z-10 border-y border-ink/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { value: '2.4M+', label: 'Clinical samples' },
              { value: '94.7%', label: 'Sensitivity' },
              { value: '14', label: 'Cancer types' },
              { value: '<3s', label: 'Analysis time' },
            ].map((stat) => (
              <motion.div key={stat.label} variants={fadeUp} className="text-center">
                <div className="font-heading text-3xl sm:text-4xl text-ink mb-1">{stat.value}</div>
                <div className="text-xs text-neutral/40 tracking-wide uppercase">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* === SOCIAL PROOF — QUOTE === */}
      <section className="py-28 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.blockquote
              variants={fadeUp}
              className="font-heading text-2xl sm:text-3xl lg:text-4xl text-ink leading-snug mb-8"
            >
              "CancerDetect gave me the clarity I needed to have an informed conversation with my oncologist. The risk breakdown was precise and actionable."
            </motion.blockquote>
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="font-heading text-primary text-lg">S</span>
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-ink">Dr. Sarah Chen</p>
                <p className="text-xs text-neutral/40">Oncologist, Memorial Sloan Kettering</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* === FINAL CTA === */}
      <section className="py-28 relative z-10 border-t border-ink/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
          >
            <motion.h2 variants={fadeUp} className="font-heading text-3xl sm:text-4xl lg:text-5xl text-ink mb-6 leading-tight">
              Your health deserves clarity.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-neutral/50 mb-10 max-w-md mx-auto">
              Start your analysis today and take the first step toward informed decisions.
            </motion.p>
            <motion.div variants={scaleIn}>
              <Link to="/analyze">
                <Button size="lg" className="px-12 text-base">
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
