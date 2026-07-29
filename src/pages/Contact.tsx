import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.p variants={fadeUp} className="text-sm font-medium tracking-widest uppercase text-primary mb-4">
              Reach Us
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="font-heading text-4xl sm:text-5xl text-ink leading-tight mb-6"
            >
              We'd like to hear from you.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-neutral/60 leading-relaxed">
              Whether you have a question about our technology, need help with your account, or want to explore a clinical partnership — we're here.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-16 border-t border-ink/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16">
            {/* Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={stagger}
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-card border border-primary/20 bg-primary/5 p-8 text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-heading text-xl text-ink mb-2">Message sent</h3>
                  <p className="text-sm text-neutral/60">
                    Thank you for reaching out. We'll get back to you within 2 business days.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-ink mb-2">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        className="w-full px-4 py-3 rounded-card border border-ink/10 bg-bg-light text-ink text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-ink mb-2">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        className="w-full px-4 py-3 rounded-card border border-ink/10 bg-bg-light text-ink text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
                        placeholder="you@example.com"
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={fadeUp}>
                    <label htmlFor="subject" className="block text-sm font-medium text-ink mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      className="w-full px-4 py-3 rounded-card border border-ink/10 bg-bg-light text-ink text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
                    >
                      <option value="">Select a topic</option>
                      <option value="general">General inquiry</option>
                      <option value="technical">Technical support</option>
                      <option value="clinical">Clinical partnership</option>
                      <option value="press">Press & media</option>
                      <option value="other">Other</option>
                    </select>
                  </motion.div>

                  <motion.div variants={fadeUp}>
                    <label htmlFor="message" className="block text-sm font-medium text-ink mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      required
                      className="w-full px-4 py-3 rounded-card border border-ink/10 bg-bg-light text-ink text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors resize-none"
                      placeholder="Tell us how we can help..."
                    />
                  </motion.div>

                  <motion.div variants={fadeUp}>
                    <Button type="submit" size="lg" className="px-8">
                      Send Message
                    </Button>
                  </motion.div>
                </form>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={stagger}
              className="space-y-8"
            >
              <motion.div variants={fadeUp}>
                <h3 className="text-xs font-medium tracking-widest uppercase text-neutral/40 mb-3">
                  Office
                </h3>
                <p className="text-sm text-ink leading-relaxed">
                  CancerDetect, Inc.<br />
                  1200 Technology Drive, Suite 400<br />
                  San Francisco, CA 94107
                </p>
              </motion.div>

              <motion.div variants={fadeUp}>
                <h3 className="text-xs font-medium tracking-widest uppercase text-neutral/40 mb-3">
                  Hours
                </h3>
                <p className="text-sm text-ink leading-relaxed">
                  Monday – Friday<br />
                  9:00 AM – 6:00 PM PT
                </p>
              </motion.div>

              <motion.div variants={fadeUp}>
                <h3 className="text-xs font-medium tracking-widest uppercase text-neutral/40 mb-3">
                  Email
                </h3>
                <a
                  href="mailto:hello@cancerdetect.ai"
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  hello@cancerdetect.ai
                </a>
              </motion.div>

              <motion.div variants={fadeUp}>
                <h3 className="text-xs font-medium tracking-widest uppercase text-neutral/40 mb-3">
                  Phone
                </h3>
                <a
                  href="tel:+14155551234"
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  (415) 555-1234
                </a>
              </motion.div>

              <motion.div variants={fadeUp} className="pt-4 border-t border-ink/5">
                <p className="text-xs text-neutral/40 leading-relaxed">
                  For urgent medical questions, please contact your physician or call 911. CancerDetect is not a substitute for emergency medical care.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
