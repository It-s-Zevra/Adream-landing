'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Play, Users, Zap, Sparkles } from 'lucide-react';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ScrollReveal } from '@/components/ScrollReveal';
import { FloatingCard } from '@/components/FloatingCard';

const VIMEO_ID = '1183927436';

export function VideoShowcase() {
  const t = useTranslations('VideoShowcase');
  const [playing, setPlaying] = useState(false);

  return (
    <section
      id="metodo"
      className="relative overflow-hidden bg-white py-24 lg:py-32"
    >
      {/* Background accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px]"
        style={{
          background:
            'radial-gradient(ellipse 90% 60% at 50% 0%, rgba(240, 255, 95, 0.35), rgba(255, 255, 255, 0) 70%)',
        }}
      />
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[400px] w-[400px] rounded-full bg-lime/20 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-[400px] w-[400px] rounded-full bg-lime/15 blur-[140px]" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #0A0A0A 1px, transparent 1px), linear-gradient(to bottom, #0A0A0A 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="container-page relative z-10">
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <Eyebrow tone="muted">{t('eyebrow')}</Eyebrow>
          <h2 className="headline-section mt-4 text-balance text-ink-950">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-muted">{t('subtitle')}</p>
        </ScrollReveal>

        <ScrollReveal className="relative mx-auto mt-16 max-w-5xl" delay={0.1}>
          {/* Glow halo */}
          <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[48px] bg-lime/40 blur-3xl" />

          {/* Video frame */}
          <div className="relative overflow-hidden rounded-2xl border border-ink-950/10 bg-ink-950 shadow-2xl">
            {/* Browser bar */}
            <div className="flex items-center gap-2 border-b border-ink-800 bg-ink-950 px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
              </div>
              <div className="mx-auto flex items-center gap-1.5 rounded-md bg-ink-800 px-3 py-0.5 font-mono text-[10px] text-muted-dark">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                {t('browserUrl')}
              </div>
              <span className="hidden font-mono text-[10px] text-lime sm:inline">
                {t('liveLabel')}
              </span>
            </div>

            {/* Video / poster */}
            <div className="relative aspect-video w-full bg-ink-950">
              {playing ? (
                <iframe
                  src={`https://player.vimeo.com/video/${VIMEO_ID}?autoplay=1&title=0&byline=0&portrait=0&color=F0FF5F`}
                  title={t('iframeTitle')}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  aria-label={t('playLabel')}
                  className="group relative block h-full w-full overflow-hidden"
                >
                  {/* Poster image from Vimeo */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://vumbnail.com/${VIMEO_ID}.jpg`}
                    alt={t('iframeTitle')}
                    className="absolute inset-0 h-full w-full object-cover opacity-90 transition group-hover:scale-105 group-hover:opacity-100"
                    loading="lazy"
                  />
                  {/* Dark gradient overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/20 to-ink-950/40" />
                  {/* Subtle grid */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 grid-tech-bg opacity-20"
                  />
                  {/* Play button */}
                  <span className="absolute inset-0 flex items-center justify-center">
                    <motion.span
                      initial={{ scale: 1 }}
                      animate={{ scale: [1, 1.06, 1] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                      className="relative flex h-20 w-20 items-center justify-center rounded-full bg-lime shadow-glow transition group-hover:shadow-glow-lg md:h-24 md:w-24"
                    >
                      <Play
                        className="ml-1 h-8 w-8 fill-ink-950 text-ink-950 md:h-10 md:w-10"
                        strokeWidth={0}
                      />
                      {/* Ping rings */}
                      {[0, 0.6].map((delay, i) => (
                        <span
                          key={i}
                          aria-hidden
                          className="absolute inset-0 rounded-full border border-lime/60"
                          style={{
                            animation: `ping 2.4s ${delay}s cubic-bezier(0,0,0.2,1) infinite`,
                          }}
                        />
                      ))}
                    </motion.span>
                  </span>
                  {/* Bottom caption */}
                  <span className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 md:bottom-6 md:left-6 md:right-6">
                    <span className="rounded-full border border-white/15 bg-ink-950/60 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-lime backdrop-blur">
                      {t('chip')}
                    </span>
                    <span className="hidden rounded-full border border-white/15 bg-ink-950/60 px-3 py-1 text-[11px] text-white backdrop-blur sm:inline-flex">
                      {t('duration')}
                    </span>
                  </span>
                </button>
              )}
              {/* Scanline accent over the player */}
              <div className="scanline-overlay" />
            </div>
          </div>

          {/* Floating annotation tags */}
          <FloatingCard
            className="-left-3 top-24 hidden lg:block lg:-left-16"
            delay={0.4}
            duration={5}
            yRange={10}
            initialDelay={0.8}
          >
            <div className="w-[200px] rounded-2xl border border-ink-950/10 bg-white p-3 shadow-xl">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-lime">
                  <Users className="h-4 w-4 text-ink-950" />
                </span>
                <div className="text-left">
                  <p className="text-xs font-semibold text-ink-950">
                    {t('tag1Title')}
                  </p>
                  <p className="text-[10px] text-muted">{t('tag1Sub')}</p>
                </div>
              </div>
            </div>
          </FloatingCard>

          <FloatingCard
            className="-right-3 top-40 hidden lg:block lg:-right-16"
            delay={0.8}
            duration={5.5}
            yRange={12}
            initialDelay={0.9}
          >
            <div className="w-[200px] rounded-2xl border border-ink-950/10 bg-white p-3 shadow-xl">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-ink-950">
                  <Sparkles className="h-4 w-4 text-lime" />
                </span>
                <div className="text-left">
                  <p className="text-xs font-semibold text-ink-950">
                    {t('tag2Title')}
                  </p>
                  <p className="text-[10px] text-muted">{t('tag2Sub')}</p>
                </div>
              </div>
            </div>
          </FloatingCard>

          <FloatingCard
            className="-right-3 bottom-16 hidden lg:block lg:-right-20"
            delay={1.2}
            duration={5}
            yRange={9}
            initialDelay={1.0}
          >
            <div className="w-[180px] rounded-2xl border border-lime/40 bg-ink-950 p-3 text-white shadow-2xl">
              <Zap className="mb-1.5 h-4 w-4 text-lime" />
              <p className="text-left text-xs font-semibold text-white">
                {t('tag3Title')}
              </p>
              <p className="mt-0.5 text-left text-[10px] text-muted-dark">
                {t('tag3Sub')}
              </p>
            </div>
          </FloatingCard>
        </ScrollReveal>

        {/* Bottom strip — quick context */}
        <ScrollReveal
          className="mx-auto mt-12 grid max-w-4xl gap-3 sm:grid-cols-3"
          delay={0.25}
        >
          {(['stat1', 'stat2', 'stat3'] as const).map((key) => (
            <div
              key={key}
              className="rounded-2xl border border-ink-950/10 bg-cream/60 px-5 py-4 text-center backdrop-blur"
            >
              <p className="text-2xl font-bold text-ink-950 md:text-3xl">
                {t(`${key}Value`)}
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted">
                {t(`${key}Label`)}
              </p>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
