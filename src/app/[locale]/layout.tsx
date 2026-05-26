import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { SmoothScroll } from '@/components/SmoothScroll';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Loader } from '@/components/Loader';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Meta' });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://adream.io';

  const iconUrl =
    'https://res.cloudinary.com/dg1x0cwdc/image/upload/v1777816477/icoA1_ua61ly.png';
  const ogImageUrl =
    'https://res.cloudinary.com/dg1x0cwdc/image/upload/v1779809420/ChatGPT_Image_26_may_2026_11_29_35_1_colth1.png';

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: t('title'),
      template: t('titleTemplate'),
    },
    description: t('description'),
    keywords: t('keywords').split(',').map((k) => k.trim()),
    applicationName: 'ADream',
    authors: [{ name: 'ADream', url: siteUrl }],
    creator: 'ADream',
    publisher: 'ADream',
    category: 'technology',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    icons: {
      icon: iconUrl,
      shortcut: iconUrl,
      apple: iconUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        es: '/es',
        en: '/en',
        'x-default': '/es',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${siteUrl}/${locale}`,
      siteName: t('siteName'),
      locale: locale === 'es' ? 'es_CL' : 'en_US',
      alternateLocale: locale === 'es' ? ['en_US'] : ['es_CL'],
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 2172,
          height: 724,
          alt: t('ogAlt'),
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [ogImageUrl],
      creator: '@adream',
      site: '@adream',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: 'Meta' });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://adream.io';
  const ogImageUrl =
    'https://res.cloudinary.com/dg1x0cwdc/image/upload/v1779809420/ChatGPT_Image_26_may_2026_11_29_35_1_colth1.png';
  const iconUrl =
    'https://res.cloudinary.com/dg1x0cwdc/image/upload/v1777816477/icoA1_ua61ly.png';

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'ADream',
      url: siteUrl,
      logo: iconUrl,
      image: ogImageUrl,
      description: t('description'),
      sameAs: [],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'ADream',
      url: `${siteUrl}/${locale}`,
      inLanguage: locale === 'es' ? 'es-CL' : 'en-US',
      description: t('description'),
      publisher: {
        '@type': 'Organization',
        name: 'ADream',
        logo: { '@type': 'ImageObject', url: iconUrl },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'ADream',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description: t('description'),
      url: siteUrl,
      image: ogImageUrl,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        category: 'free trial',
      },
    },
  ];

  return (
    <html lang={locale} className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>
          <Loader />
          <SmoothScroll>
            <Navbar />
            {children}
            <Footer />
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
