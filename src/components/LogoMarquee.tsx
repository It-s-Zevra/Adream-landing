'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

type Logo = { name: string; src?: string };

export function LogoMarquee({
  logos,
  tone = 'dark',
}: {
  logos: Logo[];
  tone?: 'dark' | 'light';
}) {
  const reduce = useReducedMotion();
  const items = [...logos, ...logos];
  const isLight = tone === 'light';

  return (
    <div className="group relative w-full overflow-hidden">
      <div
        className={cn(
          'pointer-events-none absolute inset-y-0 left-0 z-10 w-24',
          isLight
            ? 'bg-gradient-to-r from-white to-transparent'
            : 'bg-gradient-to-r from-ink-950 to-transparent'
        )}
      />
      <div
        className={cn(
          'pointer-events-none absolute inset-y-0 right-0 z-10 w-24',
          isLight
            ? 'bg-gradient-to-l from-white to-transparent'
            : 'bg-gradient-to-l from-ink-950 to-transparent'
        )}
      />
      <motion.div
        className="flex w-max gap-16 py-4"
        animate={reduce ? undefined : { x: ['0%', '-50%'] }}
        transition={{
          duration: 30,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        {items.map((logo, i) => (
          <div
            key={`${logo.name}-${i}`}
            className={cn(
              'flex h-10 min-w-[140px] items-center justify-center text-lg font-semibold grayscale transition hover:grayscale-0',
              isLight
                ? 'text-ink-950/40 hover:text-ink-950'
                : 'text-white/40 hover:text-white'
            )}
          >
            {logo.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logo.src}
                alt={logo.name}
                className="h-full w-auto object-contain"
              />
            ) : (
              <span>{logo.name}</span>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
