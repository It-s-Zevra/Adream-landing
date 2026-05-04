'use client';

import { useEffect, useState } from 'react';
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
  X,
  Inbox,
  AlertCircle,
} from 'lucide-react';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ScrollReveal } from '@/components/ScrollReveal';
import { cn } from '@/lib/utils';

const MAILER_ENDPOINT =
  'https://mailer-backend-production-5f37.up.railway.app/api/v1/contact/adream';

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

type ErrorKind = 'rate' | 'generic' | null;

export function ContactCTA() {
  const t = useTranslations('CTA');
  const tForm = useTranslations('CTA.form');
  const tSuccess = useTranslations('CTA.success');
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorKind, setErrorKind] = useState<ErrorKind>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    setErrorKind(null);
    try {
      const res = await fetch(MAILER_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          company: data.company,
          role: data.role,
          teamSize: data.teamSize,
          goal: data.goal ?? '',
          source: data.source ?? '',
        }),
      });

      if (res.ok) {
        setSubmittedEmail(data.email);
        setSubmitted(true);
        reset();
      } else if (res.status === 429) {
        setErrorKind('rate');
      } else {
        setErrorKind('generic');
      }
    } catch {
      setErrorKind('generic');
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
          {/* Calendar — coming soon */}
          <ScrollReveal delay={0.1} className="lg:col-span-2">
            <ComingSoonCalendar />
          </ScrollReveal>

          {/* Form — 3 cols */}
          <ScrollReveal delay={0.2} className="lg:col-span-3">
            <div className="relative h-full rounded-2xl border border-ink-800 bg-ink-900/60 p-6 backdrop-blur-xl md:p-8">
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

              <form
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

                {errorKind && (
                  <div
                    role="alert"
                    className="flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                    <span>
                      {errorKind === 'rate' ? tForm('errorRate') : tForm('errorGeneric')}
                    </span>
                  </div>
                )}

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
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <SuccessModal
        open={submitted}
        email={submittedEmail}
        onClose={() => setSubmitted(false)}
        t={tSuccess}
      />
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

function ComingSoonCalendar() {
  const t = useTranslations('CTA');
  return (
    <div className="relative h-full overflow-hidden rounded-2xl border border-ink-800 bg-gradient-to-br from-ink-900 to-ink-950 p-6 md:p-8">
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-lime/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-fuchsia-500/10 blur-3xl" />

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

        {/* Coming soon hero */}
        <div className="relative overflow-hidden rounded-xl border border-ink-800 bg-ink-950 p-6">
          <div className="pointer-events-none absolute inset-0 grid-tech-bg opacity-20" />

          <div className="relative">
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-lime/40 bg-lime/10 px-3 py-1">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime" />
              </span>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-lime">
                {t('comingSoon.badge')}
              </span>
            </div>

            <h4 className="text-xl font-bold text-white">{t('comingSoon.title')}</h4>
            <p className="mt-2 text-sm leading-relaxed text-muted-dark">
              {t('comingSoon.subtitle')}
            </p>

            <ul className="mt-5 space-y-2">
              {(['feature1', 'feature2', 'feature3'] as const).map((key, i) => (
                <motion.li
                  key={key}
                  initial={{ opacity: 0, x: -6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.08 }}
                  className="flex items-center gap-2.5 text-xs text-white"
                >
                  <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-lime/15 text-lime">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {t(`comingSoon.${key}`)}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Reassurance */}
        <div className="mt-4 rounded-lg border border-lime/20 bg-lime/5 p-3 text-xs text-muted-dark">
          <p className="flex items-center gap-1.5 font-semibold text-white">
            <Clock className="h-3.5 w-3.5 text-lime" />
            {t('comingSoon.responseTitle')}
          </p>
          <p className="mt-1 leading-relaxed">{t('comingSoon.responseBody')}</p>
        </div>
      </div>
    </div>
  );
}

function SuccessModal({
  open,
  email,
  onClose,
  t,
}: {
  open: boolean;
  email: string;
  onClose: () => void;
  t: ReturnType<typeof useTranslations>;
}) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[120] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-title"
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label={t('close')}
            onClick={onClose}
            className="absolute inset-0 bg-ink-950/85 backdrop-blur-md"
          />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-ink-800 bg-gradient-to-br from-ink-900 to-ink-950 p-7 shadow-2xl md:p-8"
          >
            {/* Glow accent */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-lime/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-fuchsia-500/15 blur-3xl" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime/60 to-transparent" />

            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label={t('close')}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-ink-800 bg-ink-900/60 text-muted-dark transition hover:border-white/20 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative flex flex-col items-center text-center">
              {/* Animated check */}
              <div className="relative">
                <motion.span
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 220,
                    damping: 14,
                    delay: 0.15,
                  }}
                  className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-lime shadow-glow"
                >
                  <Check className="h-10 w-10 text-ink-950" strokeWidth={3} />
                </motion.span>
                {/* Pulse rings */}
                {[0, 0.4].map((delay, i) => (
                  <motion.span
                    key={i}
                    aria-hidden
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: [0.9, 1.6], opacity: [0.5, 0] }}
                    transition={{
                      duration: 1.8,
                      delay: 0.3 + delay,
                      repeat: Infinity,
                      ease: 'easeOut',
                    }}
                    className="absolute inset-0 rounded-full border border-lime/50"
                  />
                ))}
              </div>

              <motion.h4
                id="success-title"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-6 text-2xl font-bold text-white md:text-3xl"
              >
                {t('title')}
              </motion.h4>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42 }}
                className="mt-2 max-w-sm text-sm text-muted-dark"
              >
                {t('subtitle')}
              </motion.p>

              {/* Response time card */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6 w-full rounded-2xl border border-lime/30 bg-lime/5 p-4 text-left"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-lime/15 text-lime">
                    <Clock className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-lime">
                      {t('etaLabel')}
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-white">
                      {t('etaValue')}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-dark">
                      {t('etaSub')}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Email confirmation */}
              {email && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.58 }}
                  className="mt-3 w-full rounded-2xl border border-ink-800 bg-ink-950/60 p-4 text-left"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-ink-800 text-white">
                      <Inbox className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-[10px] uppercase tracking-wider text-muted-dark">
                        {t('emailSentTo')}
                      </p>
                      <p className="mt-0.5 truncate text-sm font-semibold text-white">
                        {email}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-muted-dark">
                        {t('checkInbox')}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.66 }}
                className="mt-6 flex w-full flex-col gap-2 sm:flex-row"
              >
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex flex-1 items-center justify-center rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white/90 transition hover:border-white/30 hover:bg-white/5"
                >
                  {t('close')}
                </button>
                <a
                  href="#product"
                  onClick={onClose}
                  className="group inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-lime px-5 py-3 text-sm font-semibold text-ink-950 shadow-glow-sm transition hover:bg-lime-soft hover:shadow-glow"
                >
                  {t('cta')}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
