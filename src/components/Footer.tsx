'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Linkedin, Instagram, Mail, ArrowUpRight } from 'lucide-react';
import { Link, usePathname } from '@/i18n/routing';
import { LanguageToggle } from './LanguageToggle';
import { ScrollReveal } from './ScrollReveal';

export function Footer() {
  const t = useTranslations('Footer');
  const tn = useTranslations('Footer.links');
  const locale = useLocale();
  const pathname = usePathname();
  const isHome = pathname === '/';

  const hashHref = (hash: string) => (isHome ? hash : `/${locale}${hash}`);
  const ifcaUrl = `/${locale}/ifca`;

  const navigateLinks = [
    { key: 'workflows', href: hashHref('#workflows') },
    { key: 'features', href: hashHref('#product') },
    { key: 'manifesto', href: hashHref('#manifesto') },
    { key: 'testimonials', href: hashHref('#testimonials') },
  ];

  const ifcaLinks = [
    { key: 'intro', href: `${ifcaUrl}#pricing` },
    { key: 'foundations', href: `${ifcaUrl}#pricing` },
    { key: 'practitioner', href: `${ifcaUrl}#pricing` },
    { key: 'fullPath', href: `${ifcaUrl}#pricing` },
  ];

  return (
    <footer
      id="footer"
      className="relative overflow-hidden border-t border-ink-800 bg-ink-950"
    >
      {/* Background blob accent */}
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-lime/5 blur-[140px]" />

      {/* Decorative big text */}
      <ScrollReveal className="container-page pt-20">
        <p
          className="select-none whitespace-nowrap text-center font-bold text-ink-800/70"
          style={{
            fontSize: 'clamp(3rem, 9vw, 9rem)',
            letterSpacing: '-0.04em',
            lineHeight: 0.9,
          }}
          aria-hidden="true"
        >
          {t('decorative')}
        </p>
      </ScrollReveal>

      <div className="container-page relative z-10 grid gap-12 pb-12 pt-16 md:grid-cols-12">
        {/* Brand column */}
        <div className="md:col-span-5">
          <Link href="/" className="inline-flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://res.cloudinary.com/dg1x0cwdc/image/upload/v1777816472/Group_1264_1_tvzlhd.png"
              alt="Adream"
              className="h-9 w-auto"
            />
          </Link>
          <p className="mt-4 max-w-xs text-sm text-muted-dark">{t('tagline')}</p>
          <a
            href={hashHref('#contact')}
            className="group mt-6 inline-flex items-center gap-2 rounded-full bg-lime px-5 py-2.5 text-sm font-semibold text-ink-950 shadow-glow-sm transition hover:shadow-glow"
          >
            {tn('demo')}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        {/* Navigate column */}
        <div className="md:col-span-3">
          <h4 className="mb-4 font-mono text-xs font-medium uppercase tracking-wider text-muted">
            {t('columns.navigate')}
          </h4>
          <ul className="space-y-3">
            {navigateLinks.map((item) => (
              <li key={item.key}>
                <a
                  href={item.href}
                  className="text-sm text-muted-dark transition hover:text-white"
                >
                  {tn(item.key)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* IFCA column */}
        <div className="md:col-span-2">
          <h4 className="mb-4 font-mono text-xs font-medium uppercase tracking-wider text-muted">
            {t('columns.ifca')}
          </h4>
          <ul className="space-y-3">
            {ifcaLinks.map((item) => (
              <li key={item.key}>
                <a
                  href={item.href}
                  className="text-sm text-muted-dark transition hover:text-white"
                >
                  {tn(item.key)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Talk column */}
        <div className="md:col-span-2">
          <h4 className="mb-4 font-mono text-xs font-medium uppercase tracking-wider text-muted">
            {t('columns.talk')}
          </h4>
          <ul className="space-y-3">
            <li>
              <a
                href={`mailto:${t('emailValue')}`}
                className="group flex items-center gap-2 text-sm text-muted-dark transition hover:text-white"
              >
                <Mail className="h-3.5 w-3.5" />
                {tn('email')}
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/company/adreamhub"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-sm text-muted-dark transition hover:text-white"
              >
                <Linkedin className="h-3.5 w-3.5" />
                {tn('linkedin')}
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/adream.hub"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-sm text-muted-dark transition hover:text-white"
              >
                <Instagram className="h-3.5 w-3.5" />
                {tn('instagram')}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-ink-800">
        <div className="container-page flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
          <div className="flex flex-col items-center gap-2 text-xs text-muted md:flex-row md:gap-4">
            <p>{t('rights')}</p>
            <span className="hidden h-3 w-px bg-ink-800 md:inline-block" aria-hidden="true" />
            <a
              href="https://zevraz.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-muted transition hover:text-white"
            >
              <span>{t('craftedBy')}</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://res.cloudinary.com/dg1x0cwdc/image/upload/v1774782823/logosolo_vjar0o.png"
                alt=""
                className="h-3.5 w-3.5 object-contain opacity-70 transition group-hover:opacity-100"
              />
              <span className="font-semibold tracking-wide text-white/80 transition group-hover:text-white">
                Zevra
              </span>
              <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
            </a>
          </div>
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <span className="text-xs text-muted">{t('madeIn')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
