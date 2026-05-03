'use client';

import { motion, useReducedMotion } from 'framer-motion';

type Logo = { name: string; src?: string };

export function LogoMarquee({ logos }: { logos: Logo[] }) {
  const reduce = useReducedMotion();
  const items = [...logos, ...logos];

  return (
    <div className="group relative w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-950 to-transparent" />
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
            className="flex h-10 min-w-[140px] items-center justify-center text-lg font-semibold text-white/40 grayscale transition hover:text-white hover:grayscale-0"
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
