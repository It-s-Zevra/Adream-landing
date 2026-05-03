'use client';

import { useTranslations } from 'next-intl';
import { Linkedin, Instagram, Mail, ArrowUpRight } from 'lucide-react';
import { LanguageToggle } from './LanguageToggle';
import { ScrollReveal } from './ScrollReveal';

export function Footer() {
  const t = useTranslations('Footer');
  const tn = useTranslations('Footer.links');

  const navigateLinks = [
    { key: 'workflows', href: '#workflows' },
    { key: 'features', href: '#product' },
    { key: 'manifesto', href: '#manifesto' },
    { key: 'testimonials', href: '#testimonials' },
  ];

  const ifcaLinks = [
    { key: 'intro', href: '#ifca' },
    { key: 'foundations', href: '#ifca' },
    { key: 'practitioner', href: '#ifca' },
    { key: 'fullPath', href: '#ifca' },
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
          <a href="#top" className="inline-flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://res.cloudinary.com/dg1x0cwdc/image/upload/v1777816472/Group_1264_1_tvzlhd.png"
              alt="Adream"
              className="h-9 w-auto"
            />
          </a>
          <p className="mt-4 max-w-xs text-sm text-muted-dark">{t('tagline')}</p>
          <a
            href="#contact"
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
          <p className="text-xs text-muted">{t('rights')}</p>
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <span className="text-xs text-muted">{t('madeIn')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
