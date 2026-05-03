'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ScrollReveal } from '@/components/ScrollReveal';

type Item = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

export function Testimonials() {
  const t = useTranslations('Testimonials');
  const items = t.raw('items') as Item[];

  return (
    <section id="testimonials" className="bg-cream py-24 lg:py-28">
      <div className="container-page">
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <Eyebrow tone="muted">{t('eyebrow')}</Eyebrow>
          <h2 className="headline-section mt-4 text-balance text-ink-950">{t('title')}</h2>
          <p className="mt-4 text-lg text-muted">{t('subtitle')}</p>
        </ScrollReveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((it, i) => (
            <motion.figure
              key={it.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col rounded-2xl border border-line-light bg-white p-7 transition hover:shadow-xl"
            >
              <blockquote className="flex-1 font-serif text-lg italic leading-relaxed text-ink-950">
                “{it.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-line-light pt-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-ink-900 to-ink-800 text-sm font-semibold text-lime">
                  {it.name
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')}
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink-950">{it.name}</p>
                  <p className="text-xs text-muted">
                    {it.role} · {it.company}
                  </p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
