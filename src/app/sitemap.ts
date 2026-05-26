import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://adream.io';
  const lastModified = new Date();

  const paths = ['', '/ifca'];

  return paths.flatMap((path) =>
    routing.locales.map((locale) => {
      const url = `${siteUrl}/${locale}${path}`;
      const languages = Object.fromEntries(
        routing.locales.map((l) => [l, `${siteUrl}/${l}${path}`])
      );

      return {
        url,
        lastModified,
        changeFrequency: 'weekly' as const,
        priority: path === '' ? 1 : 0.8,
        alternates: {
          languages: {
            ...languages,
            'x-default': `${siteUrl}/${routing.defaultLocale}${path}`,
          },
        },
      };
    })
  );
}
