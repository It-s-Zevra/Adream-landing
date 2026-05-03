import { cn } from '@/lib/utils';

export function Eyebrow({
  children,
  className,
  tone = 'lime',
}: {
  children: React.ReactNode;
  className?: string;
  tone?: 'lime' | 'muted';
}) {
  return (
    <p
      className={cn(
        'eyebrow-mono',
        tone === 'lime' ? 'text-lime' : 'text-muted',
        className
      )}
    >
      {children}
    </p>
  );
}
