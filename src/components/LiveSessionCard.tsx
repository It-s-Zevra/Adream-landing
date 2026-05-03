'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Mic, MicOff, Video, MessageCircle, Hand } from 'lucide-react';

const initials = ['MT', 'JR', 'CB', 'AS', 'LV', 'PG'];

export function LiveSessionCard() {
  const t = useTranslations('Features.f6');

  return (
    <div className="relative overflow-hidden rounded-xl border border-ink-800 bg-ink-950">
      {/* Background glow */}
      <div className="pointer-events-none absolute -top-10 left-1/2 h-40 w-3/4 -translate-x-1/2 rounded-full bg-lime/10 blur-3xl" />

      {/* Top bar */}
      <div className="relative flex items-center justify-between border-b border-ink-800 bg-ink-950/60 px-3 py-2 backdrop-blur">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
          </span>
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-red-400">
            {t('live')}
          </span>
          <span className="ml-2 font-mono text-[10px] text-muted-dark">23:45</span>
        </div>
        <span className="rounded-full border border-lime/30 bg-lime/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-lime">
          {t('step')}
        </span>
      </div>

      {/* Participants grid */}
      <div className="relative grid grid-cols-3 gap-1.5 p-3">
        {initials.map((init, i) => {
          const isSpeaker = i === 0;
          return (
            <motion.div
              key={init}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.06 }}
              className={
                'relative aspect-video overflow-hidden rounded-lg border bg-ink-900' +
                (isSpeaker ? ' border-lime shadow-[0_0_20px_rgba(240,255,95,0.4)]' : ' border-ink-800')
              }
            >
              {/* Avatar initials */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-base font-bold text-white drop-shadow-md">{init}</span>
              </div>

              {/* Speaking ring animation */}
              {isSpeaker && (
                <motion.div
                  animate={{ scale: [1, 1.05, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                  className="pointer-events-none absolute inset-0 rounded-lg ring-2 ring-lime/60"
                />
              )}

              {/* Bottom info bar inside tile */}
              <div className="absolute inset-x-1 bottom-1 flex items-center gap-1 rounded bg-black/50 px-1.5 py-0.5 backdrop-blur">
                {isSpeaker ? (
                  <>
                    <Mic className="h-2 w-2 text-lime" />
                    <span className="truncate text-[8px] font-medium text-white">
                      {t('speaker')}
                    </span>
                  </>
                ) : (
                  <>
                    {i === 1 ? (
                      <Hand className="h-2 w-2 text-amber-300" />
                    ) : i === 2 ? (
                      <MicOff className="h-2 w-2 text-muted" />
                    ) : (
                      <Mic className="h-2 w-2 text-white/70" />
                    )}
                    <span className="text-[8px] text-white/80">{init}</span>
                  </>
                )}
              </div>

              {/* Audio waveform for active speaker */}
              {isSpeaker && (
                <div className="absolute right-1 top-1 flex items-end gap-0.5">
                  {[0, 1, 2].map((b) => (
                    <motion.span
                      key={b}
                      animate={{ height: ['30%', '90%', '40%', '70%', '30%'] }}
                      transition={{
                        duration: 0.9,
                        repeat: Infinity,
                        delay: b * 0.1,
                      }}
                      className="w-0.5 rounded-full bg-lime"
                      style={{ height: '40%' }}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Bottom controls */}
      <div className="relative flex items-center justify-between border-t border-ink-800 bg-ink-950/60 px-3 py-2 backdrop-blur">
        <div className="flex items-center gap-1.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-lime text-ink-950">
            <Mic className="h-3 w-3" />
          </span>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink-800 text-white">
            <Video className="h-3 w-3" />
          </span>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink-800 text-white">
            <MessageCircle className="h-3 w-3" />
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1">
            {initials.slice(0, 4).map((i) => (
              <span
                key={i}
                className="h-4 w-4 rounded-full border border-ink-950 bg-ink-800"
              />
            ))}
          </div>
          <span className="font-mono text-[10px] text-muted-dark">+ 6</span>
        </div>
      </div>

      <div className="scanline-overlay" />
    </div>
  );
}
