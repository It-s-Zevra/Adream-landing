'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Layers,
  Users,
  BarChart3,
  GraduationCap,
} from 'lucide-react';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Tag } from '@/components/ui/Tag';
import { ScrollReveal } from '@/components/ScrollReveal';
import { LiveSessionCard } from '@/components/LiveSessionCard';
import { cn } from '@/lib/utils';

type Feature = {
  key: 'f1' | 'f2' | 'f3' | 'f4' | 'f6';
  icon: React.ReactNode;
  className: string;
  visual: React.ReactNode;
};

export function Features() {
  const t = useTranslations('Features');

  const features: Feature[] = [
    {
      key: 'f1',
      icon: <Sparkles className="h-5 w-5" />,
      className: 'lg:col-span-7',
      visual: (
        <div className="space-y-2">
          {[
            { name: 'Mejora del onboarding', score: 92 },
            { name: 'Programa de referidos', score: 78 },
            { name: 'Bot de soporte interno', score: 64 },
          ].map((idea, i) => (
            <div
              key={idea.name}
              className="flex items-center gap-3 rounded-lg border border-ink-800 bg-ink-950/60 p-3"
            >
              <span className="font-mono text-[10px] text-lime">#{i + 1}</span>
              <span className="flex-1 text-xs text-white">{idea.name}</span>
              <div className="h-1.5 w-20 rounded-full bg-ink-800">
                <div
                  className="h-full rounded-full bg-lime"
                  style={{ width: `${idea.score}%` }}
                />
              </div>
              <span className="font-mono text-[10px] text-muted-dark">{idea.score}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      key: 'f2',
      icon: <Layers className="h-5 w-5" />,
      className: 'lg:col-span-5',
      visual: (
        <div className="grid grid-cols-2 gap-2">
          {['Startup', 'Challenges', 'Improvement', 'Research'].map((tpl, i) => (
            <div
              key={tpl}
              className={cn(
                'rounded-lg border p-3',
                i === 0
                  ? 'border-lime/40 bg-lime/10'
                  : 'border-ink-800 bg-ink-950/60'
              )}
            >
              <div className="mb-2 h-1.5 w-8 rounded-full bg-lime/60" />
              <p className="text-xs font-medium text-white">{tpl}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      key: 'f3',
      icon: <Users className="h-5 w-5" />,
      className: 'lg:col-span-6',
      visual: (
        <div className="space-y-2">
          {[
            { name: 'María José R.', role: 'Head of Innovation' },
            { name: 'Carlos M.', role: 'Facilitator' },
            { name: 'Andrea S.', role: 'Founder' },
          ].map((m) => (
            <div
              key={m.name}
              className="flex items-center gap-3 rounded-lg border border-ink-800 bg-ink-950/60 p-2"
            >
              <span className="h-7 w-7 flex-shrink-0 rounded-full bg-gradient-to-br from-lime to-lime-soft" />
              <div className="flex-1">
                <p className="text-xs font-medium text-white">{m.name}</p>
                <p className="text-[10px] text-muted-dark">{m.role}</p>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      key: 'f4',
      icon: <BarChart3 className="h-5 w-5" />,
      className: 'lg:col-span-6',
      visual: (
        <div className="rounded-lg border border-ink-800 bg-ink-950/60 p-3">
          <div className="mb-3 flex items-end gap-2">
            <span className="text-2xl font-bold text-white">87%</span>
            <span className="font-mono text-[10px] text-lime">+12%</span>
          </div>
          <div className="flex h-16 items-end gap-1">
            {[35, 50, 42, 65, 58, 80, 72, 95].map((h, i) => (
              <span
                key={i}
                className="flex-1 rounded-sm bg-gradient-to-t from-lime/30 to-lime"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      ),
    },
    {
      key: 'f6',
      icon: <GraduationCap className="h-5 w-5" />,
      className: 'lg:col-span-12',
      visual: (
        <div className="grid items-stretch gap-6 md:grid-cols-2">
          <LiveSessionCard />
          <div className="grid grid-cols-3 content-start gap-3">
            {[
              { init: 'MT', name: 'Matías Toro', role: 'IFC Master' },
              { init: 'JR', name: 'Julia Reyes', role: 'IFC Practitioner' },
              { init: 'CB', name: 'Camilo B.', role: 'IFC Master' },
            ].map((f, i) => (
              <motion.div
                key={f.init}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.08 }}
                whileHover={{ y: -3 }}
                className="rounded-xl border border-ink-800 bg-ink-950/60 p-3 text-center transition hover:border-lime/30"
              >
                <span className="relative mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-lime to-lime-soft text-sm font-bold text-ink-950">
                  {f.init}
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-ink-900 bg-emerald-400" />
                </span>
                <p className="truncate text-[10px] font-medium text-white">{f.name}</p>
                <p className="text-[9px] text-muted-dark">{f.role}</p>
              </motion.div>
            ))}
            <div className="col-span-3 mt-1 rounded-xl border border-lime/30 bg-lime/5 p-3">
              <p className="text-[10px] font-mono uppercase tracking-wider text-lime">
                + 12 IFC certificados activos
              </p>
              <div className="mt-2 flex -space-x-1.5">
                {Array.from({ length: 8 }).map((_, i) => (
                  <span
                    key={i}
                    className="h-5 w-5 rounded-full border border-ink-900 bg-gradient-to-br from-lime to-lime-soft"
                  />
                ))}
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-ink-900 bg-ink-800 text-[8px] font-bold text-white">
                  +4
                </span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="product" className="relative bg-ink-950 py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 grid-tech-bg opacity-20" />
      <div className="container-page relative z-10">
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <Eyebrow tone="lime">{t('eyebrow')}</Eyebrow>
          <h2 className="headline-section mt-4 text-balance text-white">{t('title')}</h2>
          <p className="mt-4 text-lg text-muted-dark">{t('subtitle')}</p>
        </ScrollReveal>

        <div className="mt-16 grid gap-4 lg:grid-cols-12">
          {features.map((f, i) => (
            <motion.div
              key={f.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: i * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -4 }}
              className={cn(
                'group relative rounded-2xl border border-ink-800 bg-ink-900 p-6 transition-all hover:border-lime/40 hover:shadow-glow-sm md:p-8',
                f.className
              )}
            >
              <div className="mb-4 flex items-center gap-2 text-lime">
                <Tag tone="lime">{t(`${f.key}.tag`)}</Tag>
              </div>
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime/10 text-lime transition group-hover:scale-110">
                  {f.icon}
                </span>
                <h3 className="text-xl font-semibold text-white md:text-2xl">
                  {t(`${f.key}.title`)}
                </h3>
              </div>
              <p className="text-sm text-muted-dark md:text-base">{t(`${f.key}.desc`)}</p>
              <div className="mt-6">{f.visual}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
