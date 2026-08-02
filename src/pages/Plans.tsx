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

const plans = [
  {
    name: 'Explorer',
    price: 'Free',
    period: '',
    description: 'For individuals exploring cancer risk awareness.',
    features: [
      '1 analysis per month',
      'Basic risk profile',
      'Risk level indicators',
      'Email support',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Professional',
    price: '$29',
    period: '/month',
    description: 'For patients and caregivers who need regular monitoring.',
    features: [
      'Unlimited analyses',
      'Full risk breakdown with confidence scores',
      'Timeline tracking & history',
      'Wellness plan generation',
      'Priority support',
      'Export reports (CSV, PDF)',
    ],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Clinical',
    price: 'Custom',
    period: '',
    description: 'For healthcare practices integrating AI-assisted screening.',
    features: [
      'Everything in Professional',
      'API access for EHR integration',
      'Multi-patient batch analysis',
      'Custom risk model calibration',
      'Dedicated account manager',
      'SLA & compliance documentation',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

const faqs = [
  {
    q: 'Is CancerDetect a replacement for clinical diagnosis?',
    a: 'No. CancerDetect is a decision-support tool. It provides risk assessments to inform conversations with your physician — it does not diagnose or treat cancer.',
  },
  {
    q: 'How accurate are the risk assessments?',
    a: 'Our model achieves 94.7% sensitivity across 14 cancer types in validated clinical cohorts. Confidence scores indicate the model\'s certainty for each individual assessment.',
  },
  {
    q: 'Is my medical data secure?',
    a: 'Yes. All data is encrypted in transit and at rest. We are HIPAA compliant and never share identifiable data with third parties. Analysis data is deleted after 90 days unless you opt to save it.',
  },
  {
    q: 'Can I cancel my subscription anytime?',
    a: 'Yes. There are no long-term contracts. Cancel anytime from your account settings. You\'ll retain access until the end of your current billing period.',
  },
  {
    q: 'Do you offer refunds?',
    a: 'We offer a full refund within 14 days of your first paid subscription. After that, you can cancel anytime but refunds are not provided for partial billing periods.',
  },
];

export default function Plans() {
  return (
    <div className="min-h-screen">
      {/* Hero Stat */}
      <section className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.p variants={fadeUp} className="text-sm font-medium tracking-widest uppercase text-primary mb-4">
              Plans & Pricing
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl text-ink leading-tight mb-6"
            >
              Early detection saves{' '}
              <span className="text-primary">9 out of 10</span>{' '}
              lives.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-neutral/60 leading-relaxed">
              Choose the plan that fits your monitoring needs. All plans include our core AI analysis engine.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start"
          >
            {plans.map((plan) => (
              <motion.div
                key={plan.name}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className={`rounded-2xl p-8 liquid-glass-card border transition-all duration-300 ${
                  plan.highlighted
                    ? 'border-primary/50 relative shadow-[0_8px_32px_-8px_rgba(24,95,165,0.25)]'
                    : 'border-white/20'
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-8 text-xs font-medium tracking-wide uppercase bg-primary text-white px-3 py-1 rounded-full shadow-depth-sm">
                    Recommended
                  </span>
                )}

                <p className="text-xs font-medium tracking-widest uppercase text-neutral/40 mb-2">
                  {plan.name}
                </p>

                <div className="flex items-baseline gap-1 mb-3">
                  <span className="font-heading text-4xl text-ink">{plan.price}</span>
                  {plan.period && (
                    <span className="text-sm text-neutral/50">{plan.period}</span>
                  )}
                </div>

                <p className="text-sm text-neutral/60 mb-6 leading-relaxed">
                  {plan.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-neutral/70">
                      <svg className="w-4 h-4 text-primary mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link to={plan.name === 'Clinical' ? '/contact' : '/analyze'}>
                  <Button
                    variant={plan.highlighted ? 'primary' : 'secondary'}
                    fullWidth
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 border-t border-ink/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="max-w-2xl"
          >
            <motion.h2 variants={fadeUp} className="font-heading text-2xl sm:text-3xl text-ink mb-12">
              Frequently asked questions
            </motion.h2>

            <div className="space-y-8">
              {faqs.map((faq) => (
                <motion.div key={faq.q} variants={fadeUp}>
                  <h3 className="font-medium text-ink mb-2">{faq.q}</h3>
                  <p className="text-sm text-neutral/60 leading-relaxed">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
