import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function MockupBrowserFrame({
  url = 'app.adream.io',
  children,
  className,
  variant = 'dark',
}: {
  url?: string;
  children?: ReactNode;
  className?: string;
  variant?: 'dark' | 'light';
}) {
  const isDark = variant === 'dark';
  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border shadow-2xl',
        isDark
          ? 'border-ink-800 bg-ink-900 shadow-glow-sm'
          : 'border-line-light bg-white',
        className
      )}
    >
      {/* Browser bar */}
      <div
        className={cn(
          'flex items-center gap-3 border-b px-4 py-3',
          isDark ? 'border-ink-800 bg-ink-950' : 'border-line-light bg-cream'
        )}
      >
        <div className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
          <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
          <span className="h-3 w-3 rounded-full bg-[#28C840]" />
        </div>
        <div
          className={cn(
            'mx-auto rounded-md px-4 py-1 font-mono text-xs',
            isDark ? 'bg-ink-800 text-muted-dark' : 'bg-white text-muted'
          )}
        >
          {url}
        </div>
      </div>
      {/* Content area */}
      <div className="aspect-[16/10] w-full">{children}</div>
    </div>
  );
}
