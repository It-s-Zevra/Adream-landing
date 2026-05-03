'use client';

import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ScrollReveal } from '@/components/ScrollReveal';

const SCULPTUR_IMAGE =
  'https://res.cloudinary.com/dg1x0cwdc/image/upload/v1777816474/SCULPTUR_COLLAGE_-_6_1_kogatg.png';

export function Manifesto() {
  const t = useTranslations('Manifesto');
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const yImage = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);
  const scaleImage = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);

  return (
    <section
      id="manifesto"
      ref={ref}
      className="relative overflow-hidden bg-ink-950 py-24 lg:py-32"
    >
      {/* Background glows */}
      <div className="pointer-events-none absolute -left-32 top-1/3 h-[400px] w-[400px] rounded-full bg-fuchsia-500/10 blur-[180px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[400px] w-[400px] rounded-full bg-lime/15 blur-[160px]" />
      <div className="pointer-events-none absolute inset-0 grid-tech-bg opacity-20" />

      <div className="container-page relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          {/* Left — Image */}
          <ScrollReveal className="lg:col-span-6">
            <div className="relative">
              {/* Frame ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-4 rounded-3xl border border-dashed border-lime/20"
              />
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-ink-800 bg-ink-900">
                <motion.div
                  style={{ y: yImage, scale: scaleImage }}
                  className="absolute inset-0"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={SCULPTUR_IMAGE}
                    alt={t('imageAlt')}
                    className="h-full w-full object-cover"
                  />
                </motion.div>

                {/* Color overlay para tinte de marca */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-ink-950/40 via-transparent to-lime/15 mix-blend-overlay" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent" />

                {/* Floating tag */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-6 left-6 rounded-full border border-lime/40 bg-ink-950/80 px-4 py-2 backdrop-blur"
                >
                  <span className="font-mono text-[10px] uppercase tracking-wider text-lime">
                    Made for builders
                  </span>
                </motion.div>

                {/* Scanline */}
                <div className="scanline-overlay" />
              </div>
            </div>
          </ScrollReveal>

          {/* Right — Manifesto text */}
          <div className="lg:col-span-6">
            <ScrollReveal>
              <Eyebrow tone="lime">{t('eyebrow')}</Eyebrow>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h2 className="mt-4 font-sans font-bold text-balance text-white" style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
                {t('title_1')}{' '}
                <span className="relative inline-block text-lime">
                  {t('title_highlight')}
                  <motion.span
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute bottom-0 left-0 right-0 h-1 origin-left bg-lime/40"
                  />
                </span>{' '}
                {t('title_2')}
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-dark">
                {t('body')}
              </p>
            </ScrollReveal>

            {/* Manifest stats */}
            <ScrollReveal delay={0.2}>
              <div className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-ink-800 bg-ink-800">
                {(['stat1', 'stat2', 'stat3'] as const).map((k) => (
                  <div key={k} className="bg-ink-950 px-4 py-5 text-left">
                    <p className="text-2xl font-bold text-lime md:text-3xl">
                      {t(`${k}Value`)}
                    </p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted-dark">
                      {t(`${k}Label`)}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <a
                href="#workflows"
                className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white underline-offset-4 hover:underline"
              >
                {t('cta')}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
