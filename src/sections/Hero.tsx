'use client';

import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Users, TrendingUp } from 'lucide-react';
import { AuroraBackground } from '@/components/ui/AuroraBackground';
import { AdreamHubMockup } from '@/components/AdreamHubMockup';
import { FloatingCard } from '@/components/FloatingCard';
import { LogoMarquee } from '@/components/LogoMarquee';
import { Counter } from '@/components/Counter';

export function Hero() {
  const t = useTranslations('Hero');
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative">
      <AuroraBackground intensity="normal" className="pt-28 lg:pt-32">
        <div className="container-page relative z-10 flex flex-col items-center text-center">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="eyebrow-mono text-lime"
          >
            {t('eyebrow')}
          </motion.p>

          {/* Headline */}
          <h1 className="headline-hero mt-6 max-w-[900px] text-balance text-white">
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block"
              >
                {t('headline_1')}
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block"
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    textShadow: reduce
                      ? 'none'
                      : [
                          '0 0 0px rgba(240,255,95,0)',
                          '0 0 60px rgba(240,255,95,0.7)',
                          '0 0 30px rgba(240,255,95,0.5)',
                        ],
                  }}
                  transition={{ duration: 1.2, delay: 0.9 }}
                  className="inline text-lime"
                >
                  {t('headline_highlight')}
                </motion.span>
              </motion.span>
            </span>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-8 max-w-[680px] text-balance text-lg text-muted-dark md:text-xl"
          >
            {t('subtitle')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
          >
            <a
              href="#contact"
              className="group relative inline-flex items-center justify-center gap-1.5 overflow-hidden rounded-full bg-lime px-5 py-2.5 text-sm font-semibold text-ink-950 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-glow"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">{t('ctaPrimary')}</span>
              <ArrowRight className="relative h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
            <a
              href="#ifca"
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white/90 transition-colors duration-200 hover:border-white/40 hover:text-white"
            >
              {t('ctaSecondary')}
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-4 text-xs text-muted"
          >
            {t('microcopy')}
          </motion.p>

          {/* Trust bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="mt-16 w-full"
          >
            <p className="eyebrow-mono mb-6 text-muted">{t('trustBar')}</p>
            <LogoMarquee
              logos={[
                { name: 'TechCorp' },
                { name: 'Verdeo' },
                { name: 'U. Pacífico' },
                { name: 'Innova SA' },
                { name: 'Foresta' },
                { name: 'Quanta' },
                { name: 'Móvil+' },
                { name: 'Atlas Co' },
              ]}
            />
          </motion.div>

          {/* Mockup with floating cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto mt-16 w-full max-w-[1100px]"
          >
            {/* Glow halo */}
            <div className="pointer-events-none absolute -inset-10 -z-10 rounded-[40px] bg-lime/15 blur-3xl" />

            <AdreamHubMockup />

            {/* Floating cards around mockup */}
            <FloatingCard
              className="-left-4 top-12 hidden sm:block lg:-left-16"
              delay={0}
              duration={4}
              yRange={10}
              initialDelay={1.0}
            >
              <div className="w-[200px] rounded-2xl border border-ink-800 bg-ink-900/95 p-4 shadow-2xl backdrop-blur">
                <div className="mb-2 inline-flex items-center gap-1 rounded-full bg-lime/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-lime">
                  <Sparkles className="h-3 w-3" />
                  {t('card1Tag')}
                </div>
                <p className="text-left text-sm font-semibold text-white">{t('card1Text')}</p>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-ink-800">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '66%' }}
                    transition={{ duration: 1.5, delay: 1.4 }}
                    className="h-full rounded-full bg-lime shadow-glow-sm"
                  />
                </div>
              </div>
            </FloatingCard>

            <FloatingCard
              className="-right-4 top-20 hidden sm:block lg:-right-12"
              delay={0.5}
              duration={5}
              yRange={8}
              initialDelay={1.1}
            >
              <div className="w-[180px] rounded-2xl border border-lime/40 bg-ink-900/95 p-4 shadow-glow-sm backdrop-blur">
                <Zap className="mb-2 h-5 w-5 text-lime" />
                <p className="text-left text-sm font-semibold text-white">{t('card2Title')}</p>
                <p className="text-left text-xs text-muted-dark">{t('card2Sub')}</p>
              </div>
            </FloatingCard>

            <FloatingCard
              className="-left-2 bottom-24 hidden md:block lg:-left-20"
              delay={1}
              duration={4.5}
              yRange={12}
              initialDelay={1.2}
            >
              <div className="w-[200px] rounded-2xl border border-line-light bg-white p-4 shadow-2xl">
                <div className="mb-2 flex -space-x-2">
                  {[0, 1, 2, 3].map((i) => (
                    <span
                      key={i}
                      className="h-7 w-7 rounded-full border-2 border-white bg-ink-900"
                    />
                  ))}
                </div>
                <p className="flex items-center gap-1 text-left text-sm font-semibold text-ink-950">
                  <Users className="h-4 w-4" />
                  {t('card3Text')}
                </p>
                <div className="mt-2 flex h-6 items-end gap-1">
                  {[40, 70, 50, 90, 60, 80].map((h, i) => (
                    <span
                      key={i}
                      className="flex-1 rounded-sm bg-ink-950/80"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </FloatingCard>

            <FloatingCard
              className="-right-2 bottom-16 hidden md:block lg:-right-16"
              delay={1.5}
              duration={5}
              yRange={10}
              initialDelay={1.3}
            >
              <div className="w-[180px] rounded-2xl border border-ink-800 bg-ink-900/95 p-4 shadow-2xl backdrop-blur">
                <p className="text-left text-3xl font-bold text-white">{t('card4Number')}</p>
                <p className="mt-1 flex items-center gap-1 text-left text-xs text-muted-dark">
                  <TrendingUp className="h-3 w-3 text-lime" />
                  {t('card4Sub')}
                </p>
              </div>
            </FloatingCard>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-20 grid w-full grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink-800 bg-ink-800 md:grid-cols-4"
          >
            {(['stat1', 'stat2', 'stat3', 'stat4'] as const).map((key) => {
              const value = t(`stats.${key}Value`);
              const label = t(`stats.${key}Label`);
              const numeric = parseInt(value.replace(/\D/g, ''), 10) || 0;
              const prefix = value.startsWith('+') ? '+' : '';
              const suffix =
                value.includes('%') ? '%' : value.includes('★') ? '★' : '';
              return (
                <div
                  key={key}
                  className="bg-ink-950/90 px-6 py-8 text-left backdrop-blur"
                >
                  <p className="text-3xl font-bold text-lime md:text-4xl">
                    {value.includes('.') ? (
                      value
                    ) : (
                      <Counter value={numeric} prefix={prefix} suffix={suffix} />
                    )}
                  </p>
                  <p className="mt-2 font-mono text-xs uppercase tracking-wider text-muted-dark">
                    {label}
                  </p>
                </div>
              );
            })}
          </motion.div>

          {/* Spacer */}
          <div className="h-20" />
        </div>
      </AuroraBackground>
    </section>
  );
}
