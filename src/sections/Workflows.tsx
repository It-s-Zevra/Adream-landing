'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ScrollReveal } from '@/components/ScrollReveal';
import { MockupBrowserFrame } from '@/components/MockupBrowserFrame';
import { cn } from '@/lib/utils';

type WfKey = 'wf1' | 'wf2' | 'wf3' | 'wf4';

export function Workflows() {
  const t = useTranslations('Workflows');
  const [active, setActive] = useState<WfKey>('wf1');

  const tabs: Array<{ key: WfKey; label: string }> = [
    { key: 'wf1', label: t('tabs.tab1') },
    { key: 'wf2', label: t('tabs.tab2') },
    { key: 'wf3', label: t('tabs.tab3') },
    { key: 'wf4', label: t('tabs.tab4') },
  ];

  const wf = {
    title: t(`${active}.title`),
    desc: t(`${active}.desc`),
    nodes: t.raw(`${active}.nodes`) as string[],
    bullets: t.raw(`${active}.bullets`) as string[],
  };

  return (
    <section id="workflows" className="bg-white py-24 lg:py-32">
      <div className="container-page">
        {/* Heading */}
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <Eyebrow tone="muted">{t('eyebrow')}</Eyebrow>
          <h2 className="headline-section mt-4 text-balance text-ink-950">{t('title')}</h2>
          <p className="mt-4 text-lg text-muted">{t('subtitle')}</p>
        </ScrollReveal>

        {/* Tabs */}
        <ScrollReveal className="mt-12">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {tabs.map((tab) => {
              const isActive = active === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActive(tab.key)}
                  className={cn(
                    'rounded-full border px-4 py-2 text-sm font-medium transition-all md:px-5 md:py-2.5',
                    isActive
                      ? 'border-ink-950 bg-ink-950 text-white shadow-md'
                      : 'border-line-light bg-white text-muted hover:border-ink-950/30 hover:text-ink-950'
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Active workflow content */}
        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${active}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="text-3xl font-semibold tracking-tight text-ink-950 md:text-4xl">
                {wf.title}
              </h3>
              <p className="mt-4 text-lg text-muted">{wf.desc}</p>

              {/* Nodes diagram */}
              <div className="mt-8 flex flex-wrap items-center gap-2">
                {wf.nodes.map((node, i) => (
                  <div key={node} className="flex items-center gap-2">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                      className="rounded-xl border border-line-light bg-cream px-4 py-3 text-sm font-medium text-ink-950"
                    >
                      {node}
                    </motion.div>
                    {i < wf.nodes.length - 1 && (
                      <motion.svg
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
                        width="32"
                        height="12"
                        viewBox="0 0 32 12"
                        fill="none"
                      >
                        <motion.path
                          d="M0 6 H28 M22 1 L28 6 L22 11"
                          stroke="#F0FF5F"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                        />
                      </motion.svg>
                    )}
                  </div>
                ))}
              </div>

              {/* Bullets */}
              <ul className="mt-8 space-y-3">
                {wf.bullets.map((b, i) => (
                  <motion.li
                    key={b}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.08 }}
                    className="flex items-start gap-3 text-ink-950"
                  >
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-lime">
                      <Check className="h-3 w-3 text-ink-950" strokeWidth={3} />
                    </span>
                    <span>{b}</span>
                  </motion.li>
                ))}
              </ul>

              <a
                href="#contact"
                className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink-950 underline-offset-4 hover:underline"
              >
                {t('ctaTab')}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`mockup-${active}`}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <MockupBrowserFrame variant="light" url="app.adream.io">
                <div className="flex h-full flex-col gap-3 p-3 sm:grid sm:grid-cols-12 sm:gap-3 sm:p-4">
                  {/* Sidebar — top strip on mobile, left rail on desktop */}
                  <div className="flex flex-row gap-1.5 overflow-x-auto rounded-lg border border-line-light bg-cream p-2 sm:col-span-3 sm:flex-col sm:gap-1 sm:overflow-visible sm:p-3">
                    <div className="hidden h-2 w-16 rounded bg-line-light sm:block" />
                    {wf.nodes.map((n) => (
                      <div
                        key={n}
                        className="flex-shrink-0 whitespace-nowrap rounded px-2 py-1 text-[10px] font-medium text-ink-950 sm:px-2 sm:py-2"
                      >
                        {n}
                      </div>
                    ))}
                  </div>

                  {/* Main */}
                  <div className="flex flex-1 flex-col gap-3 sm:col-span-9">
                    <div className="rounded-lg border border-line-light bg-white p-3 sm:p-4">
                      <div className="mb-3 flex items-center justify-between gap-2">
                        <span className="truncate text-[11px] font-semibold text-ink-950 sm:text-xs">
                          {wf.title}
                        </span>
                        <span className="flex-shrink-0 rounded-full bg-ink-950 px-2 py-0.5 text-[9px] font-mono text-lime sm:text-[10px]">
                          ACTIVE
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4 sm:gap-2">
                        {wf.nodes.map((n, i) => (
                          <div
                            key={n}
                            className={cn(
                              'rounded-md border px-2 py-2 text-center text-[10px] font-medium sm:py-3',
                              i < 2
                                ? 'border-ink-950 bg-white text-ink-950'
                                : 'border-line-light text-muted'
                            )}
                          >
                            {n}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
                      {wf.bullets.slice(0, 2).map((b) => (
                        <div
                          key={b}
                          className="rounded-lg border border-line-light bg-white p-2.5 text-[10px] text-muted sm:p-3"
                        >
                          {b}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </MockupBrowserFrame>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
