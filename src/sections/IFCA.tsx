'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ScrollReveal } from '@/components/ScrollReveal';
import { cn } from '@/lib/utils';

type PlanKey = 'intro' | 'foundations' | 'practitioner' | 'fullPath';

export function IFCA() {
  const t = useTranslations('IFCA');

  const plans: Array<{
    key: PlanKey;
    highlighted?: boolean;
    badge?: 'free' | 'popular';
  }> = [
    { key: 'intro', badge: 'free' },
    { key: 'foundations' },
    { key: 'practitioner', highlighted: true, badge: 'popular' },
    { key: 'fullPath' },
  ];

  return (
    <section id="ifca" className="bg-white py-24 lg:py-32">
      <div className="container-page">
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <Eyebrow tone="muted">{t('eyebrow')}</Eyebrow>
          <h2 className="headline-section mt-4 text-balance text-ink-950">{t('title')}</h2>
          <p className="mt-4 text-lg text-muted">{t('subtitle')}</p>
        </ScrollReveal>

        <div id="pricing" className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan, i) => {
            const features = t.raw(`plans.${plan.key}.features`) as string[];
            return (
              <motion.div
                key={plan.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -4 }}
                className={cn(
                  'group relative flex flex-col rounded-2xl border p-7 transition-all',
                  plan.highlighted
                    ? 'border-ink-950 bg-ink-950 text-white shadow-2xl lg:scale-[1.04]'
                    : 'border-line-light bg-white hover:border-ink-950/50 hover:shadow-xl'
                )}
              >
                {plan.badge === 'popular' && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span
                      className="inline-block rounded-full bg-lime px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-ink-950 shadow-glow-sm"
                      style={{
                        backgroundImage:
                          'linear-gradient(110deg, #F0FF5F 30%, #FFFFFF 50%, #F0FF5F 70%)',
                        backgroundSize: '200% 100%',
                        animation: 'shimmer 2.5s linear infinite',
                      }}
                    >
                      {t('popularBadge')}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <h3
                    className={cn(
                      'text-xl font-semibold',
                      plan.highlighted ? 'text-white' : 'text-ink-950'
                    )}
                  >
                    {t(`plans.${plan.key}.name`)}
                  </h3>
                  {plan.badge === 'free' && (
                    <span className="rounded-full bg-lime px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-ink-950">
                      {t('freeBadge')}
                    </span>
                  )}
                </div>

                <div className="mt-4">
                  <p
                    className={cn(
                      'text-4xl font-bold tracking-tight',
                      plan.highlighted ? 'text-lime' : 'text-ink-950'
                    )}
                  >
                    {t(`plans.${plan.key}.price`)}
                  </p>
                  <p
                    className={cn(
                      'mt-2 text-sm',
                      plan.highlighted ? 'text-muted-dark' : 'text-muted'
                    )}
                  >
                    {t(`plans.${plan.key}.subtitle`)}
                  </p>
                </div>

                <ul className="mt-6 flex-1 space-y-3">
                  {features.map((f) => (
                    <li
                      key={f}
                      className={cn(
                        'flex items-start gap-3 text-sm',
                        plan.highlighted ? 'text-muted-dark' : 'text-ink-950'
                      )}
                    >
                      <span
                        className={cn(
                          'mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full',
                          plan.highlighted ? 'bg-lime' : 'bg-ink-950'
                        )}
                      >
                        <Check
                          className={cn(
                            'h-3 w-3',
                            plan.highlighted ? 'text-ink-950' : 'text-white'
                          )}
                          strokeWidth={3}
                        />
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={cn(
                    'mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition',
                    plan.highlighted
                      ? 'bg-lime text-ink-950 shadow-glow hover:bg-lime-soft hover:shadow-glow-lg'
                      : 'border border-ink-950 text-ink-950 hover:bg-ink-950 hover:text-white'
                  )}
                >
                  {t(`plans.${plan.key}.cta`)}
                </a>
              </motion.div>
            );
          })}
        </div>

        <ScrollReveal className="mt-12 text-center">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-ink-950 underline-offset-4 hover:underline"
          >
            {t('enterprise')}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
