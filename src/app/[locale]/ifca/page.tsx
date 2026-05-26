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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://adream.io';
  const ogImageUrl =
    'https://res.cloudinary.com/dg1x0cwdc/image/upload/v1779809420/ChatGPT_Image_26_may_2026_11_29_35_1_colth1.png';
  const pageTitle = `IFC · ${t('title')}`;

  return {
    title: pageTitle,
    description: t('subtitle'),
    alternates: {
      canonical: `/${locale}/ifca`,
      languages: {
        es: '/es/ifca',
        en: '/en/ifca',
        'x-default': '/es/ifca',
      },
    },
    openGraph: {
      title: pageTitle,
      description: t('subtitle'),
      url: `${siteUrl}/${locale}/ifca`,
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 2172,
          height: 724,
          alt: pageTitle,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: t('subtitle'),
      images: [ogImageUrl],
    },
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
