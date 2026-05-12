import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { IFCA } from '@/sections/IFCA';
import { ContactCTA } from '@/sections/ContactCTA';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'IFCA' });
  return {
    title: `IFC · ${t('title')}`,
    description: t('subtitle'),
  };
}

export default async function IFCAPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-white text-ink-950">
      <div className="pt-20" />
      <IFCA />
      <ContactCTA />
    </main>
  );
}
