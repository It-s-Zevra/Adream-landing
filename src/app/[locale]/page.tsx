import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/sections/Hero';
import { Workflows } from '@/sections/Workflows';
import { Features } from '@/sections/Features';
import { Manifesto } from '@/sections/Manifesto';
import { IFCA } from '@/sections/IFCA';
import { Testimonials } from '@/sections/Testimonials';
import { ContactCTA } from '@/sections/ContactCTA';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-ink-950 text-white">
      <Hero />
      <Workflows />
      <Features />
      <Manifesto />
      <IFCA />
      <Testimonials />
      <ContactCTA />
    </main>
  );
}
