'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, usePathname } from '@/i18n/routing';
import { LanguageToggle } from './LanguageToggle';
import { cn } from '@/lib/utils';

export function Navbar() {
  const t = useTranslations('Nav');
  const locale = useLocale();
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  type NavLink = {
    label: string;
    hash?: string;
    route?: '/' | '/ifca';
  };

  const links: NavLink[] = [
    { hash: '#product', label: t('product') },
    { hash: '#workflows', label: t('workflows') },
    { route: '/ifca', label: t('ifca') },
    { hash: '#resources', label: t('resources') },
  ];

  const hashHref = (hash: string) => (isHome ? hash : `/${locale}${hash}`);
  const contactHref = isHome ? '#contact' : `/${locale}#contact`;

  const linkClass = cn(
    'text-sm font-medium transition',
    scrolled
      ? 'text-white/70 hover:text-white'
      : 'text-ink-950/70 hover:text-ink-950'
  );

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-40 transition-all duration-300',
          scrolled
            ? 'border-b border-ink-800 bg-ink-950/80 backdrop-blur-lg'
            : 'border-b border-ink-950/5 bg-white/70 backdrop-blur-lg'
        )}
      >
        <nav className="container-page flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://res.cloudinary.com/dg1x0cwdc/image/upload/v1777816472/Group_1264_1_tvzlhd.png"
              alt="Adream"
              className={cn(
                'h-7 w-auto transition',
                scrolled ? 'brightness-100' : 'brightness-0'
              )}
            />
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 lg:flex">
            {links.map((l) =>
              l.route ? (
                <li key={l.route}>
                  <Link href={l.route} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ) : (
                <li key={l.hash}>
                  <a href={hashHref(l.hash!)} className={linkClass}>
                    {l.label}
                  </a>
                </li>
              )
            )}
          </ul>

          {/* Right cluster */}
          <div className="hidden items-center gap-3 lg:flex">
            <LanguageToggle />
            <a href="#signin" className={linkClass}>
              {t('signIn')}
            </a>
            <a
              href={contactHref}
              className={cn(
                'inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition',
                scrolled
                  ? 'bg-lime text-ink-950 shadow-glow-sm hover:bg-lime-soft hover:shadow-glow'
                  : 'bg-ink-950 text-white hover:bg-ink-900'
              )}
            >
              {t('bookDemo')}
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={t('openMenu')}
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-full border lg:hidden',
              scrolled
                ? 'border-white/15 text-white'
                : 'border-ink-950/15 text-ink-950'
            )}
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </header>

      {/* Mobile drawer — rendered outside header to avoid backdrop-filter containing block */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-ink-950 lg:hidden"
          >
            <div className="container-page flex h-16 items-center justify-between">
              <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://res.cloudinary.com/dg1x0cwdc/image/upload/v1777816472/Group_1264_1_tvzlhd.png"
                  alt="Adream"
                  className="h-7 w-auto"
                />
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t('closeMenu')}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.05 } },
              }}
              className="container-page mt-8 flex flex-col"
            >
              {links.map((l) => (
                <motion.li
                  key={l.route ?? l.hash}
                  variants={{
                    hidden: { opacity: 0, y: 8 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="border-b border-ink-800"
                >
                  {l.route ? (
                    <Link
                      href={l.route}
                      onClick={() => setOpen(false)}
                      className="block py-4 text-2xl font-semibold tracking-tight text-white transition hover:text-lime"
                    >
                      {l.label}
                    </Link>
                  ) : (
                    <a
                      href={hashHref(l.hash!)}
                      onClick={() => setOpen(false)}
                      className="block py-4 text-2xl font-semibold tracking-tight text-white transition hover:text-lime"
                    >
                      {l.label}
                    </a>
                  )}
                </motion.li>
              ))}
            </motion.ul>
            <div className="container-page mt-10 flex flex-col gap-4">
              <LanguageToggle />
              <a
                href={contactHref}
                onClick={() => setOpen(false)}
                className="inline-flex w-full items-center justify-center rounded-full bg-lime px-6 py-3.5 text-sm font-semibold text-ink-950 shadow-glow"
              >
                {t('bookDemo')}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
