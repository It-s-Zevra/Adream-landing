'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  Menu,
  Search,
  Briefcase,
  Grid3x3,
  MessageSquare,
  Bell,
  Mail,
  Lock,
  LogOut,
  Clock,
  CheckCircle2,
  UserPlus,
  Sparkles,
  Star,
  MoreVertical,
  Check,
  Plus,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const ADREAM_LOGO_WHITE =
  'https://res.cloudinary.com/dg1x0cwdc/image/upload/v1777816472/Group_1264_1_tvzlhd.png';

type Project = {
  id: string;
  name: string;
  badges: { label: string; variant: 'magenta' | 'green' | 'cyan' | 'violet' }[];
  rightTag: string;
  active?: boolean;
};

const projects: Project[] = [
  {
    id: 'p1',
    name: 'Pasarela de Pago Inteligente',
    badges: [
      { label: 'IA', variant: 'magenta' },
      { label: '2026-Q3', variant: 'green' },
    ],
    rightTag: 'Equipo',
    active: true,
  },
  {
    id: 'p2',
    name: 'Silver Economy',
    badges: [
      { label: 'FINTECH', variant: 'cyan' },
      { label: '2025-Q2', variant: 'violet' },
    ],
    rightTag: 'Tema',
  },
];

const filterPills = [
  { label: 'Equipo', tone: 'gray' as const },
  { label: 'Tema', tone: 'gray' as const },
  { label: 'Research', tone: 'gray' as const },
  { label: 'Ideación', tone: 'gray' as const },
  { label: 'MVP', tone: 'gray' as const },
  { label: 'IA', tone: 'magenta' as const },
  { label: '2026-Q3', tone: 'green' as const },
  { label: 'Fintech', tone: 'cyan' as const },
  { label: '2025-Q2', tone: 'violet' as const },
];

const badgeStyles: Record<string, string> = {
  magenta: 'bg-fuchsia-500/90 text-white shadow-[0_0_12px_rgba(217,70,239,0.4)]',
  green: 'bg-emerald-500/90 text-white shadow-[0_0_12px_rgba(16,185,129,0.4)]',
  cyan: 'bg-sky-400/90 text-white shadow-[0_0_12px_rgba(56,189,248,0.4)]',
  violet: 'bg-violet-500/90 text-white shadow-[0_0_12px_rgba(139,92,246,0.4)]',
};

const pillBorders: Record<string, string> = {
  gray: 'border-ink-800 text-muted-dark',
  magenta: 'border-fuchsia-400/60 text-fuchsia-400 bg-fuchsia-500/5',
  green: 'border-emerald-400/60 text-emerald-400 bg-emerald-500/5',
  cyan: 'border-sky-400/60 text-sky-400 bg-sky-500/5',
  violet: 'border-violet-400/60 text-violet-400 bg-violet-500/5',
};

export function AdreamHubMockup({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'relative w-full overflow-hidden rounded-2xl border border-ink-800 bg-ink-950 shadow-2xl shadow-lime/10',
        className
      )}
    >
      {/* Subtle gradient bg in card */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-lime/[0.04] via-transparent to-fuchsia-500/[0.04]" />

      {/* Browser top bar */}
      <div className="relative flex items-center gap-3 border-b border-ink-800 bg-ink-950/80 px-4 py-2.5 backdrop-blur">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="mx-auto flex items-center gap-1.5 rounded-md bg-ink-800/80 px-3 py-0.5 font-mono text-[10px] text-muted-dark">
          <Lock className="h-2.5 w-2.5 text-emerald-400" />
          app.adream.io
        </div>
      </div>

      {/* App header */}
      <div className="relative flex items-center justify-between gap-2 border-b border-ink-800 bg-ink-950/60 px-3 py-2.5 backdrop-blur md:px-4">
        <div className="flex min-w-0 items-center gap-2 md:gap-3">
          <Menu className="h-4 w-4 flex-shrink-0 text-muted-dark" />
          {/* Lime/yellow Adream Hub pill with glow */}
          <div className="flex flex-shrink-0 items-center gap-1.5 rounded-full bg-lime px-2.5 py-1 shadow-glow-sm md:gap-2 md:px-3 md:py-1.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ADREAM_LOGO_WHITE} alt="Adream Hub" className="h-3.5 w-3.5 object-contain brightness-0 md:h-4 md:w-4" />
            <span className="whitespace-nowrap text-[11px] font-bold text-ink-950 md:text-xs">Adream Hub</span>
          </div>
          <div className="hidden flex-shrink-0 items-center gap-1 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-medium text-emerald-300 sm:flex">
            <Sparkles className="h-3 w-3" />
            Organización
          </div>
        </div>

        <div className="hidden items-center gap-1 md:flex">
          <NavPill icon={<Briefcase className="h-3 w-3" />} label="Proyectos" active />
          <NavPill icon={<Grid3x3 className="h-3 w-3" />} label="HUB" />
          <NavPill icon={<MessageSquare className="h-3 w-3" />} label="IA CHAT" aiPing />
        </div>

        <div className="flex flex-shrink-0 items-center gap-1.5 text-muted md:gap-2">
          <Bell className="h-3.5 w-3.5 hover:text-white md:h-4 md:w-4" />
          <Mail className="hidden h-3.5 w-3.5 hover:text-white sm:block md:h-4 md:w-4" />
          <Lock className="hidden h-3.5 w-3.5 hover:text-white sm:block md:h-4 md:w-4" />
          <LogOut className="h-3.5 w-3.5 hover:text-white md:h-4 md:w-4" />
        </div>
      </div>

      {/* Body */}
      <div className="relative bg-ink-950 p-3 md:p-5">
        {/* Subtle radial behind body */}
        <div className="pointer-events-none absolute -top-20 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-lime/5 blur-3xl" />

        {/* Title row */}
        <div className="relative mb-4 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <h3 className="whitespace-nowrap text-base font-bold text-white md:text-lg">My Panel</h3>
            <p className="mt-0.5 font-mono text-[9px] uppercase tracking-wider text-muted">
              Dashboard
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="hidden items-center gap-1.5 rounded-lg border border-blue-400/30 bg-blue-500/15 px-3 py-1.5 text-[11px] font-semibold text-blue-300 transition hover:bg-blue-500/25 sm:inline-flex">
              <UserPlus className="h-3 w-3" />
              Invitar Empleados
            </button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-lime px-3 py-1.5 text-[11px] font-semibold text-ink-950 shadow-glow-sm transition hover:shadow-glow"
            >
              <Plus className="h-3 w-3" strokeWidth={3} />
              Empezar Proyecto
            </motion.button>
          </div>
        </div>

        {/* Stats */}
        <div className="relative mb-3 grid grid-cols-2 gap-2.5">
          <StatCard icon={<Clock className="h-3.5 w-3.5" />} label="En proceso" value="2" highlight />
          <StatCard icon={<CheckCircle2 className="h-3.5 w-3.5" />} label="Completados" value="0" />
        </div>

        {/* Search + filters */}
        <div className="relative mb-4 rounded-xl border border-ink-800 bg-ink-900/60 p-3 backdrop-blur">
          <div className="mb-2 flex items-center gap-2 rounded-lg border border-ink-800 bg-ink-950 px-3 py-2">
            <Search className="h-3 w-3 text-muted" />
            <span className="text-[10px] text-muted">Buscar por proyecto, equipo o miembro…</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1.1, repeat: Infinity }}
              className="ml-auto inline-block h-3 w-px bg-lime"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {filterPills.map((p, i) => (
              <motion.span
                key={p.label}
                initial={{ opacity: 0, y: 4 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 + i * 0.03 }}
                className={cn(
                  'rounded-full border px-2.5 py-1 text-[10px] font-medium',
                  pillBorders[p.tone]
                )}
              >
                {p.label}
              </motion.span>
            ))}
          </div>
        </div>

        {/* En Progreso heading */}
        <div className="relative mb-2 flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/15 ring-1 ring-blue-400/40">
            <Clock className="h-3 w-3 text-blue-400" />
          </span>
          <span className="text-xs font-semibold text-white">En Progreso</span>
          <span className="text-[10px] text-muted">(Haz click para continuar)</span>
        </div>

        {/* Project rows */}
        <div className="relative space-y-2">
          {projects.map((p, i) => (
            <ProjectRow key={p.id} project={p} index={i} />
          ))}
        </div>

        {/* AI thinking strip — sleek dark version */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="relative mt-4 overflow-hidden rounded-lg border border-fuchsia-400/30 bg-gradient-to-r from-fuchsia-500/10 via-violet-500/10 to-lime/10 px-3 py-2"
        >
          {/* shimmer */}
          <motion.div
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          />
          <div className="relative flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fuchsia-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-fuchsia-400" />
            </span>
            <span className="text-[10px] font-medium text-fuchsia-200">
              IA analizando 24 ideas para sugerir el próximo paso…
            </span>
            <span className="ml-auto flex gap-0.5 text-fuchsia-300">
              <Dot delay={0} />
              <Dot delay={0.15} />
              <Dot delay={0.3} />
            </span>
          </div>
        </motion.div>
      </div>

      {/* Scanline */}
      <div className="scanline-overlay" />

      {/* Inner border highlight */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5" />
    </div>
  );
}

function NavPill({
  icon,
  label,
  active,
  aiPing,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  aiPing?: boolean;
}) {
  return (
    <div
      className={cn(
        'relative inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium transition',
        active
          ? 'bg-lime/15 text-lime ring-1 ring-lime/40'
          : 'text-muted-dark hover:bg-white/5 hover:text-white'
      )}
    >
      {icon}
      {label}
      {aiPing && (
        <span className="relative ml-0.5 flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fuchsia-400 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
        </span>
      )}
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  highlight,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border bg-ink-900/60 p-3 backdrop-blur transition',
        highlight ? 'border-lime/30' : 'border-ink-800'
      )}
    >
      {highlight && (
        <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-lime/15 blur-2xl" />
      )}
      <div className="relative flex items-center gap-2">
        <span
          className={cn(
            'flex h-7 w-7 items-center justify-center rounded-full',
            highlight ? 'bg-lime/15 text-lime ring-1 ring-lime/30' : 'bg-ink-800 text-muted-dark'
          )}
        >
          {icon}
        </span>
        <div>
          <p className="text-[10px] text-muted">{label}</p>
          <p className={cn('text-base font-bold leading-none', highlight ? 'text-lime' : 'text-white')}>
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
      whileHover={{ x: 2 }}
      className={cn(
        'group relative flex items-center justify-between gap-2 overflow-hidden rounded-xl border px-3 py-2.5 transition',
        project.active
          ? 'border-lime/30 bg-lime/[0.04] shadow-[0_0_20px_rgba(240,255,95,0.08)]'
          : 'border-ink-800 bg-ink-900/60 hover:border-lime/30'
      )}
    >
      {/* Active row scanning line */}
      {project.active && (
        <motion.span
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="pointer-events-none absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-lime/15 to-transparent"
        />
      )}
      <div className="relative flex min-w-0 flex-1 items-center gap-2">
        <span
          className={cn(
            'flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded-sm border',
            project.active ? 'border-lime bg-lime/20' : 'border-muted'
          )}
        >
          {project.active && <Check className="h-2.5 w-2.5 text-lime" strokeWidth={3} />}
        </span>
        <span className="truncate text-[11px] font-semibold text-white">{project.name}</span>
        <div className="hidden flex-shrink-0 items-center gap-1 sm:flex">
          {project.badges.map((b) => (
            <span
              key={b.label}
              className={cn(
                'rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider',
                badgeStyles[b.variant]
              )}
            >
              {b.label}
            </span>
          ))}
        </div>
      </div>
      <div className="relative flex flex-shrink-0 items-center gap-1.5 md:gap-2">
        <span className="hidden items-center gap-1 rounded-full border border-blue-400/40 bg-blue-500/10 px-2 py-0.5 text-[10px] font-medium text-blue-300 md:inline-flex">
          {project.rightTag} <Check className="h-2.5 w-2.5" />
        </span>
        <Star className="h-3.5 w-3.5 text-muted transition group-hover:text-lime" />
        <MoreVertical className="h-3.5 w-3.5 text-muted" />
      </div>
    </motion.div>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <motion.span
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 1.2, repeat: Infinity, delay }}
      className="inline-block h-1 w-1 rounded-full bg-current"
    />
  );
}
