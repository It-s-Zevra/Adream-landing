'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

const ADREAM_ICON =
  'https://res.cloudinary.com/dg1x0cwdc/image/upload/v1777816477/icoA1_ua61ly.png';

const SESSION_KEY = 'adream:loader:shown';
const LETTERS = ['A', 'D', 'R', 'E', 'A', 'M'];

export function Loader() {
  const t = useTranslations('Loader');
  const phrases = t.raw('phrases') as string[];
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [phraseIdx, setPhraseIdx] = useState(0);

  useEffect(() => {
    setMounted(true);

    if (sessionStorage.getItem(SESSION_KEY)) {
      setVisible(false);
      return;
    }

    document.body.style.overflow = 'hidden';

    const start = performance.now();
    const minDuration = 1600;
    const total = 2200;

    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(100, (elapsed / total) * 100);
      setProgress(p);
      if (elapsed < total) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const phraseInterval = setInterval(
      () => setPhraseIdx((i) => (i + 1) % phrases.length),
      700
    );

    const finish = () => {
      const elapsed = performance.now() - start;
      const wait = Math.max(0, minDuration - elapsed);
      setTimeout(() => {
        setVisible(false);
        sessionStorage.setItem(SESSION_KEY, '1');
        document.body.style.overflow = '';
      }, wait);
    };

    if (document.readyState === 'complete') finish();
    else window.addEventListener('load', finish, { once: true });

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(phraseInterval);
      window.removeEventListener('load', finish);
      document.body.style.overflow = '';
    };
  }, [phrases.length]);

  // Render nothing on the server to avoid hydration mismatch with progress/phrase
  if (!mounted) {
    return (
      <div
        aria-hidden
        className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950"
      />
    );
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02, filter: 'blur(12px)' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-ink-950"
        >
          {/* Soft radial glow centered on logo */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 60% 50% at 50% 45%, rgba(240,255,95,0.10), transparent 70%)',
            }}
          />
          <div className="pointer-events-none absolute inset-0 grid-tech-bg opacity-[0.08]" />

          {/* Logo + halo */}
          <div className="relative flex items-center justify-center">
            {/* Concentric pulse halos */}
            {[0, 0.6, 1.2].map((delay, i) => (
              <motion.span
                key={i}
                aria-hidden
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [0.9, 1.7], opacity: [0.55, 0] }}
                transition={{
                  duration: 2.4,
                  delay,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
                className="absolute h-40 w-40 rounded-full border border-lime/40"
              />
            ))}

            {/* Orbiting dot */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              className="absolute h-44 w-44"
            >
              <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-lime shadow-[0_0_12px_rgba(240,255,95,0.9)]" />
            </motion.div>

            {/* Soft glow behind logo */}
            <span
              aria-hidden
              className="absolute h-32 w-32 rounded-full bg-lime/20 blur-3xl"
            />

            {/* Logo */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{
                scale: [1, 1.04, 1],
                opacity: 1,
              }}
              transition={{
                scale: { duration: 2.6, repeat: Infinity, ease: 'easeInOut' },
                opacity: { duration: 0.5 },
              }}
              className="relative z-10 flex h-28 w-28 items-center justify-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ADREAM_ICON}
                alt="Adream"
                className="h-full w-full object-contain drop-shadow-[0_0_28px_rgba(240,255,95,0.55)]"
              />
            </motion.div>
          </div>

          {/* Brand letters */}
          <div className="mt-12 flex items-center gap-2">
            {LETTERS.map((l, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.5,
                  delay: 0.35 + i * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-2xl font-semibold tracking-[0.42em] text-white"
              >
                {l}
              </motion.span>
            ))}
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.4 }}
            className="mt-3 font-mono text-[10px] font-medium uppercase tracking-[0.4em] text-lime"
          >
            {t('tagline')}
          </motion.p>

          {/* Cycling phrase */}
          <div className="relative mt-6 h-5 w-72 overflow-hidden text-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={phraseIdx}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.32 }}
                className="text-sm text-muted-dark"
              >
                {phrases[phraseIdx]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Progress bar */}
          <div className="mt-6 flex items-center gap-3">
            <div className="h-[2px] w-56 overflow-hidden rounded-full bg-ink-800">
              <div
                className="h-full bg-gradient-to-r from-lime via-lime-soft to-lime shadow-glow-sm transition-[width] duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="font-mono text-[10px] tabular-nums text-muted-dark">
              {Math.floor(progress).toString().padStart(3, '0')}%
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
