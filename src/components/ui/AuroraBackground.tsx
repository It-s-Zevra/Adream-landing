'use client';

import { ReactNode, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type Props = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  showRadialGradient?: boolean;
  intensity?: 'soft' | 'normal' | 'strong';
};

export function AuroraBackground({
  className,
  children,
  showRadialGradient = true,
  intensity = 'normal',
  ...props
}: Props) {
  const opacity =
    intensity === 'soft' ? 'opacity-40' : intensity === 'strong' ? 'opacity-90' : 'opacity-70';

  return (
    <div
      className={cn(
        'relative isolate overflow-hidden bg-ink-950 text-white',
        className
      )}
      {...props}
    >
      {/* Aurora curtain — lime only, flowing */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0 overflow-hidden',
          showRadialGradient && 'aurora-mask'
        )}
        aria-hidden
      >
        <div className={cn('aurora-curtain absolute -inset-[20%]', opacity)} />
      </div>

      {/* Grid tech overlay */}
      <div
        className="pointer-events-none absolute inset-0 grid-tech-bg opacity-[0.12]"
        aria-hidden
      />

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-ink-950/30 to-ink-950"
        aria-hidden
      />

      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
