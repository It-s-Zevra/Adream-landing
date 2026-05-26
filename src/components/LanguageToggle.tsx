'use client';

import { useLocale } from 'next-intl';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function LanguageToggle({
  className,
  variant = 'dark',
}: {
  className?: string;
  variant?: 'dark' | 'light';
}) {
  const locale = useLocale();
  const [pending, setPending] = useState<string | null>(null);

  const switchTo = (next: 'es' | 'en') => {
    if (next === locale || typeof window === 'undefined') return;
    setPending(next);
    const newPath = window.location.pathname.replace(/^\/(es|en)(?=\/|$)/, `/${next}`);
    window.location.href = newPath + window.location.search + window.location.hash;
  };

  const isLight = variant === 'light';

  return (
    <div
      role="group"
      aria-label="Change language"
      className={cn(
        'inline-flex items-center rounded-full border p-0.5 text-xs font-medium backdrop-blur',
        isLight
          ? 'border-ink-950/15 bg-ink-950/5'
          : 'border-white/15 bg-white/5',
        pending && 'opacity-70',
        className
      )}
    >
      {(['es', 'en'] as const).map((lng) => {
        const active = locale === lng;
        return (
          <button
            key={lng}
            type="button"
            onClick={() => switchTo(lng)}
            aria-pressed={active}
            disabled={!!pending}
            className={cn(
              'rounded-full px-3 py-1.5 uppercase tracking-wider transition',
              active
                ? 'bg-lime text-ink-950 shadow-glow-sm'
                : isLight
                  ? 'text-ink-950/60 hover:text-ink-950'
                  : 'text-white/70 hover:text-white'
            )}
          >
            {lng}
          </button>
        );
      })}
    </div>
  );
}
