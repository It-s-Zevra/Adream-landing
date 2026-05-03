'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Check,
  User,
  Mail,
  Building2,
  UserCog,
  Users,
  Target,
  Sparkles,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ScrollReveal } from '@/components/ScrollReveal';
import { cn } from '@/lib/utils';

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().min(1),
  role: z.string().min(1),
  teamSize: z.string().min(1),
  goal: z.string().optional(),
  source: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function ContactCTA() {
  const t = useTranslations('CTA');
  const tForm = useTranslations('CTA.form');
  const locale = useLocale();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const calLink = process.env.NEXT_PUBLIC_CAL_LINK;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, locale }),
      });
      if (res.ok) {
        setSubmitted(true);
        reset();
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-ink-950 py-24 lg:py-32"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 grid-tech-bg opacity-25" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[800px] -translate-x-1/2 animate-blob-1 rounded-full bg-lime/10 blur-[180px]" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-[400px] w-[400px] animate-blob-3 rounded-full bg-fuchsia-500/10 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] animate-blob-4 rounded-full bg-cyan-500/10 blur-[160px]" />

      <div className="container-page relative z-10">
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <Eyebrow tone="lime">{t('eyebrow')}</Eyebrow>
          <h2
            className="mt-4 font-sans font-bold text-balance text-white"
            style={{
              fontSize: 'clamp(3rem, 6vw, 5rem)',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
            }}
          >
            {t('title_1')}{' '}
            <span className="text-lime [text-shadow:0_0_40px_rgba(240,255,95,0.6)]">
              {t('title_highlight')}
            </span>
            {t('title_2')}
          </h2>
          <p className="mt-6 text-lg text-muted-dark md:text-xl">{t('subtitle')}</p>
        </ScrollReveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-5">
          {/* Calendar / fallback — 2 cols */}
          <ScrollReveal delay={0.1} className="lg:col-span-2">
            <div className="relative h-full overflow-hidden rounded-2xl border border-ink-800 bg-gradient-to-br from-ink-900 to-ink-950 p-6 md:p-8">
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-lime/10 blur-3xl" />

              <div className="relative">
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime text-ink-950 shadow-glow-sm">
                    <Calendar className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{t('calendarTitle')}</h3>
                    <p className="text-xs text-muted-dark">{t('calendarSub')}</p>
                  </div>
                </div>

                {calLink ? (
                  <div className="aspect-square w-full overflow-hidden rounded-xl border border-ink-800 bg-ink-950">
                    <iframe
                      src={`https://cal.com/${calLink}?theme=dark`}
                      className="h-full w-full"
                      loading="lazy"
                      title="Cal.com booking"
                    />
                  </div>
                ) : (
                  <CalendarFallback />
                )}
              </div>
            </div>
          </ScrollReveal>

          {/* Form — 3 cols, stronger presence */}
          <ScrollReveal delay={0.2} className="lg:col-span-3">
            <div className="relative h-full rounded-2xl border border-ink-800 bg-ink-900/60 p-6 backdrop-blur-xl md:p-8">
              {/* Glow border on top */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime/50 to-transparent" />

              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{t('formTitle')}</h3>
                  <p className="mt-1 text-sm text-muted-dark">{tForm('responseTime')}</p>
                </div>
                <span className="hidden items-center gap-1.5 rounded-full border border-lime/30 bg-lime/10 px-3 py-1 sm:inline-flex">
                  <Sparkles className="h-3 w-3 text-lime" />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-lime">
                    24h
                  </span>
                </span>
              </div>

              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                    noValidate
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field
                        id="name"
                        label={tForm('name')}
                        icon={<User className="h-3.5 w-3.5" />}
                        error={errors.name && tForm('errorRequired')}
                      >
                        <input
                          id="name"
                          {...register('name')}
                          className="form-input"
                          aria-invalid={!!errors.name}
                        />
                      </Field>
                      <Field
                        id="email"
                        label={tForm('email')}
                        icon={<Mail className="h-3.5 w-3.5" />}
                        error={errors.email && tForm('errorEmail')}
                      >
                        <input
                          id="email"
                          type="email"
                          {...register('email')}
                          className="form-input"
                          aria-invalid={!!errors.email}
                        />
                      </Field>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field
                        id="company"
                        label={tForm('company')}
                        icon={<Building2 className="h-3.5 w-3.5" />}
                        error={errors.company && tForm('errorRequired')}
                      >
                        <input
                          id="company"
                          {...register('company')}
                          className="form-input"
                        />
                      </Field>
                      <Field
                        id="role"
                        label={tForm('role')}
                        icon={<UserCog className="h-3.5 w-3.5" />}
                        error={errors.role && tForm('errorRequired')}
                      >
                        <select
                          id="role"
                          {...register('role')}
                          defaultValue=""
                          className="form-input"
                        >
                          <option value="" disabled>
                            {tForm('rolePlaceholder')}
                          </option>
                          <option value="founder">{tForm('roles.founder')}</option>
                          <option value="innovation">{tForm('roles.innovation')}</option>
                          <option value="hr">{tForm('roles.hr')}</option>
                          <option value="academic">{tForm('roles.academic')}</option>
                          <option value="other">{tForm('roles.other')}</option>
                        </select>
                      </Field>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field
                        id="teamSize"
                        label={tForm('teamSize')}
                        icon={<Users className="h-3.5 w-3.5" />}
                        error={errors.teamSize && tForm('errorRequired')}
                      >
                        <select
                          id="teamSize"
                          {...register('teamSize')}
                          defaultValue=""
                          className="form-input"
                        >
                          <option value="" disabled>
                            {tForm('teamSizePlaceholder')}
                          </option>
                          <option value="1-10">{tForm('sizes.s1')}</option>
                          <option value="11-50">{tForm('sizes.s2')}</option>
                          <option value="51-200">{tForm('sizes.s3')}</option>
                          <option value="200+">{tForm('sizes.s4')}</option>
                        </select>
                      </Field>
                      <Field
                        id="source"
                        label={tForm('source')}
                        icon={<Sparkles className="h-3.5 w-3.5" />}
                      >
                        <select
                          id="source"
                          {...register('source')}
                          defaultValue=""
                          className="form-input"
                        >
                          <option value="">{tForm('sourcePlaceholder')}</option>
                          <option value="google">{tForm('sources.google')}</option>
                          <option value="linkedin">{tForm('sources.linkedin')}</option>
                          <option value="referral">{tForm('sources.referral')}</option>
                          <option value="event">{tForm('sources.event')}</option>
                          <option value="other">{tForm('sources.other')}</option>
                        </select>
                      </Field>
                    </div>

                    <Field id="goal" label={tForm('goal')} icon={<Target className="h-3.5 w-3.5" />}>
                      <textarea
                        id="goal"
                        rows={3}
                        {...register('goal')}
                        className="form-input resize-none"
                      />
                    </Field>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-lime px-6 py-4 text-sm font-semibold text-ink-950 shadow-glow transition hover:bg-lime-soft hover:shadow-glow-lg disabled:opacity-60"
                    >
                      {submitting ? tForm('submitting') : tForm('submit')}
                      {!submitting && (
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <motion.span
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.1 }}
                      className="flex h-20 w-20 items-center justify-center rounded-full bg-lime shadow-glow"
                    >
                      <Check className="h-10 w-10 text-ink-950" strokeWidth={3} />
                    </motion.span>
                    <h4 className="mt-6 text-2xl font-bold text-white">{t('success.title')}</h4>
                    <p className="mt-2 max-w-sm text-sm text-muted-dark">
                      {t('success.subtitle')}
                    </p>
                    <a
                      href="#product"
                      className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/5"
                    >
                      {t('success.cta')}
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  icon,
  error,
  children,
}: {
  id: string;
  label: string;
  icon?: React.ReactNode;
  error?: string | false;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-dark"
      >
        {icon}
        {label}
      </label>
      <div className={cn('relative', error && 'is-error')}>{children}</div>
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}

function CalendarFallback() {
  const t = useTranslations('CTA');
  const today = new Date();
  const dayInWeek = today.getDay();
  // Build a 14-day strip starting today
  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d;
  });

  const slots: Array<{ key: 'calendarSlot1' | 'calendarSlot2' | 'calendarSlot3' | 'calendarSlot4' }> = [
    { key: 'calendarSlot1' },
    { key: 'calendarSlot2' },
    { key: 'calendarSlot3' },
    { key: 'calendarSlot4' },
  ];

  return (
    <div className="space-y-5">
      {/* Mini calendar strip */}
      <div className="rounded-xl border border-ink-800 bg-ink-950 p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
            {today.toLocaleDateString('default', { month: 'long', year: 'numeric' })}
          </p>
          <span className="flex items-center gap-1.5 text-[10px] text-muted-dark">
            <Clock className="h-3 w-3 text-lime" />
            30 min
          </span>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.slice(0, 7).map((d, i) => {
            const isToday = i === 0;
            const isAvailable = i > 0 && i % 2 === 1;
            return (
              <motion.div
                key={d.toISOString()}
                initial={{ opacity: 0, y: 4 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className={cn(
                  'flex flex-col items-center rounded-lg border py-2 text-center',
                  isToday
                    ? 'border-lime bg-lime/10 text-lime'
                    : isAvailable
                      ? 'border-ink-800 bg-ink-900/60 text-white hover:border-lime/40 cursor-pointer'
                      : 'border-ink-800/60 bg-ink-900/30 text-muted'
                )}
              >
                <span className="font-mono text-[9px] uppercase tracking-wider opacity-70">
                  {d.toLocaleDateString('default', { weekday: 'short' }).slice(0, 3)}
                </span>
                <span className="text-sm font-bold">{d.getDate()}</span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Slots */}
      <div>
        <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-muted">
          {t('calendarFallbackLabel')}
        </p>
        <div className="space-y-2">
          {slots.map((s, i) => (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, x: -6 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.06 }}
              className="group flex items-center justify-between rounded-lg border border-ink-800 bg-ink-950 px-3 py-2 transition hover:border-lime/40"
            >
              <span className="text-xs font-medium text-white">{t(s.key)}</span>
              <span className="font-mono text-[10px] text-lime opacity-0 transition group-hover:opacity-100">
                disponible →
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Reassurance */}
      <div className="rounded-lg border border-lime/20 bg-lime/5 p-3 text-xs text-muted-dark">
        <p className="font-semibold text-white">{t('calendarFallbackTitle')}</p>
        <p className="mt-1 leading-relaxed">{t('calendarFallbackSub')}</p>
      </div>
    </div>
  );
}
