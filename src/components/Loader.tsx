'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

const ADREAM_ICON =
  'https://res.cloudinary.com/dg1x0cwdc/image/upload/v1777816477/icoA1_ua61ly.png';

const SESSION_KEY = 'adream:loader:shown';
const LETTERS = ['A', 'D', 'R', 'E', 'A', 'M'];

export function Loader() {
  const t = useTranslations('Loader');
  const phrases = t.raw('phrases') as string[];
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [phraseIdx, setPhraseIdx] = useState(0);

  // Random particle positions (stable per mount)
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: 60 + Math.random() * 40,
        size: 2 + Math.random() * 3,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 3,
      })),
    []
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem(SESSION_KEY)) {
      setVisible(false);
      return;
    }

    document.body.style.overflow = 'hidden';

    const start = performance.now();
    const minDuration = 1800;
    const total = 2400;

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
      650
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

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: 'blur(16px)' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-ink-950"
        >
          {/* Aurora-like blobs */}
          <div className="pointer-events-none absolute -top-20 left-1/2 h-[500px] w-[500px] -translate-x-1/2 animate-blob-1 rounded-full bg-lime/20 blur-[140px]" />
          <div className="pointer-events-none absolute bottom-0 right-1/4 h-[400px] w-[400px] animate-blob-3 rounded-full bg-fuchsia-500/15 blur-[140px]" />
          <div className="pointer-events-none absolute left-1/4 top-1/3 h-[400px] w-[400px] animate-blob-4 rounded-full bg-violet-500/15 blur-[140px]" />

          {/* Grid */}
          <div className="pointer-events-none absolute inset-0 grid-tech-bg opacity-25" />

          {/* Floating particles */}
          {particles.map((p) => (
            <motion.span
              key={p.id}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.8, 0],
                y: ['0%', '-200%'],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: 'linear',
              }}
              className="pointer-events-none absolute rounded-full bg-lime/60 shadow-[0_0_8px_rgba(240,255,95,0.6)]"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
              }}
            />
          ))}

          {/* Ring system */}
          <div className="relative flex h-44 w-44 items-center justify-center">
            {/* Outer dashed */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border border-dashed border-lime/30"
            />
            {/* Outer dot orbit */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0"
            >
              <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-lime shadow-glow" />
            </motion.div>

            {/* Mid solid ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-3 rounded-full border border-lime/20"
            >
              <span className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-fuchsia-400 shadow-[0_0_10px_rgba(217,70,239,0.8)]" />
            </motion.div>

            {/* Inner ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-6 rounded-full border border-cyan-400/20"
            >
              <span className="absolute left-1/2 top-0 h-1 w-1 -translate-x-1/2 rounded-full bg-cyan-400" />
            </motion.div>

            {/* Inner pulsing glow */}
            <motion.div
              animate={{
                scale: [1, 1.18, 1],
                opacity: [0.4, 0.9, 0.4],
              }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-10 rounded-full bg-lime/25 blur-md"
            />

            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: [0.95, 1.04, 0.95],
                opacity: 1,
              }}
              transition={{
                scale: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' },
                opacity: { duration: 0.5, delay: 0.1 },
              }}
              className="relative z-10 flex h-20 w-20 items-center justify-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ADREAM_ICON}
                alt="Adream"
                className="h-full w-full object-contain drop-shadow-[0_0_24px_rgba(240,255,95,0.7)]"
              />
            </motion.div>
          </div>

          {/* Brand letters reveal */}
          <div className="mt-10 flex items-center gap-1.5">
            {LETTERS.map((l, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.5,
                  delay: 0.5 + i * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-2xl font-bold tracking-[0.3em] text-white"
              >
                {l}
              </motion.span>
            ))}
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-4 font-mono text-[10px] font-medium uppercase tracking-[0.4em] text-lime"
          >
            {t('tagline')}
          </motion.p>

          {/* Cycling phrase */}
          <div className="relative mt-3 h-5 w-72 overflow-hidden text-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={phraseIdx}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="text-sm text-muted-dark"
              >
                {phrases[phraseIdx]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Progress bar */}
          <div className="mt-8 flex items-center gap-3">
            <div className="h-[3px] w-64 overflow-hidden rounded-full bg-ink-800">
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
