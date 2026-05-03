'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yRange?: number;
  initialDelay?: number;
};

export function FloatingCard({
  children,
  className,
  delay = 0,
  duration = 4,
  yRange = 10,
  initialDelay = 0.6,
}: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: initialDelay + delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn('absolute', className)}
    >
      <motion.div
        animate={
          reduce
            ? undefined
            : {
                y: [0, -yRange, 0],
              }
        }
        transition={{
          duration,
          repeat: Infinity,
          ease: 'easeInOut',
          delay,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
