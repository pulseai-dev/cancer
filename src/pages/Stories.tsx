import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const stories = [
  {
    name: 'Maria Gonzalez',
    role: 'Breast cancer survivor',
    quote: 'The analysis picked up on patterns in my mammography report that prompted my doctor to order additional testing. That early call made all the difference.',
    result: 'Stage 1 detected',
    featured: true,
  },
  {
    name: 'James Mitchell',
    role: 'Stage 2 colorectal cancer',
    quote: 'I had no symptoms. CancerDetect flagged elevated risk based on my routine bloodwork upload. Six months later, I was in treatment — and my prognosis was excellent.',
    result: 'Early intervention',
    featured: false,
  },
  {
    name: 'Dr. Anika Patel',
    role: 'Radiologist, Johns Hopkins',
    quote: 'I use CancerDetect as a second-opinion tool. It doesn\'t replace my reading, but it catches edge cases I might glance past on a busy shift.',
    result: 'Clinical tool',
    featured: false,
  },
  {
    name: 'Robert Kim',
    role: 'Thyroid cancer survivor',
    quote: 'My physician recommended CancerDetect after I described a lump I found. The risk assessment was detailed enough to justify an immediate biopsy — which confirmed malignancy.',
    result: 'Stage 1 detected',
    featured: false,
  },
  {
    name: 'Linda Okafor',
    role: 'Pancreatic cancer, family history',
    quote: 'With my family history, I wanted proactive screening. CancerDetect helped me quantify my risk and build a screening schedule with my doctor.',
    result: 'Risk profiling',
    featured: false,
  },
  {
    name: 'Dr. Thomas Weber',
    role: 'Oncologist, Mayo Clinic',
    quote: 'The confidence scoring is what sets this apart. I can see exactly how certain the model is about each risk factor, which helps me prioritize diagnostic workups.',
    result: 'Clinical validation',
    featured: false,
  },
];

export default function Stories() {
  const featured = stories.find((s) => s.featured);
  const others = stories.filter((s) => !s.featured);

  return (
    <div className="min-h-screen">
      {/* Hero — Featured Quote */}
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-4xl"
          >
            <motion.p variants={fadeUp} className="text-sm font-medium tracking-widest uppercase text-primary mb-4">
              Real Stories
            </motion.p>

            {featured && (
              <>
                <motion.blockquote
                  variants={fadeUp}
                  className="font-heading text-3xl sm:text-4xl lg:text-5xl text-ink leading-snug mb-8"
                >
                  "{featured.quote}"
                </motion.blockquote>
                <motion.div variants={fadeUp} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-heading text-primary text-lg">
                      {featured.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-ink">{featured.name}</p>
                    <p className="text-xs text-neutral/50">{featured.role}</p>
                  </div>
                  <span className="ml-auto text-xs font-mono text-primary bg-primary/5 px-3 py-1 rounded-full">
                    {featured.result}
                  </span>
                </motion.div>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* Story Grid */}
      <section className="py-16 border-t border-ink/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {others.map((story) => (
              <motion.div
                key={story.name}
                variants={fadeUp}
                className="rounded-card border border-ink/5 p-6 bg-bg-light flex flex-col"
              >
                <blockquote className="text-neutral/70 leading-relaxed mb-6 flex-1">
                  "{story.quote}"
                </blockquote>
                <div className="flex items-center gap-3 pt-4 border-t border-ink/5">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="font-heading text-primary text-sm">
                      {story.name.charAt(0)}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-ink truncate">{story.name}</p>
                    <p className="text-xs text-neutral/50 truncate">{story.role}</p>
                  </div>
                  <span className="ml-auto text-[11px] font-mono text-primary bg-primary/5 px-2 py-0.5 rounded-full shrink-0">
                    {story.result}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Doctor Section */}
      <section className="py-24 bg-ink/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.p variants={fadeUp} className="text-sm font-medium tracking-widest uppercase text-primary mb-3">
              Clinical Perspective
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-heading text-2xl sm:text-3xl text-ink mb-6">
              What physicians are saying
            </motion.h2>
            <motion.div variants={fadeUp} className="space-y-6">
              <blockquote className="border-l-2 border-primary/30 pl-6 text-neutral/70 leading-relaxed">
                "The model's strength is in its uncertainty quantification. When it's confident, I trust it. When it's not, it tells me to look closer. That's exactly what a decision-support tool should do."
                <footer className="mt-3 text-sm text-ink">
                  — Dr. Sarah Chen, Oncologist at Memorial Sloan Kettering
                </footer>
              </blockquote>
              <blockquote className="border-l-2 border-primary/30 pl-6 text-neutral/70 leading-relaxed">
                "We've integrated CancerDetect into our second-opinion workflow. It's particularly valuable for rare cancer types where clinical intuition alone may miss early indicators."
                <footer className="mt-3 text-sm text-ink">
                  — Dr. James Liu, Diagnostic Radiology, Stanford Medicine
                </footer>
              </blockquote>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-ink/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
          >
            <motion.h2 variants={fadeUp} className="font-heading text-3xl sm:text-4xl text-ink mb-6">
              Your story matters
            </motion.h2>
            <motion.p variants={fadeUp} className="text-neutral/60 mb-8 max-w-md mx-auto">
              Every early detection is a life changed. Start your analysis and take the first step.
            </motion.p>
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
