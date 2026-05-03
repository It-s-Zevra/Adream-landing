import { cn } from '@/lib/utils';

export function Tag({
  children,
  className,
  tone = 'lime',
}: {
  children: React.ReactNode;
  className?: string;
  tone?: 'lime' | 'dark' | 'light';
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wider',
        tone === 'lime' && 'border-lime/30 bg-lime/10 text-lime',
        tone === 'dark' && 'border-ink-800 bg-ink-900 text-muted-dark',
        tone === 'light' && 'border-line-light bg-cream text-muted',
        className
      )}
    >
      {children}
    </span>
  );
}
