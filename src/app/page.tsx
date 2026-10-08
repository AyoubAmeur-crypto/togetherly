import type { Metadata } from 'next';
import StoryView from '@/components/StoryView';
import { absoluteUrl } from '@/config/site';
import { getOrganizationSchema, getWebSiteSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Togetherly — Money Made Simpler, Life More Together',
  description:
    'Togetherly creates calm, beautifully structured financial planning systems and Google Sheets templates designed for modern couples. Track shared expenses, fair splits, and life milestones together.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Togetherly — Money Made Simpler, Life More Together',
    description:
      'Togetherly creates calm, beautifully structured financial planning systems and Google Sheets templates designed for modern couples.',
    url: absoluteUrl('/'),
    siteName: 'Togetherly',
    images: ['/togetherly/togetherly.png'],
    type: 'website',
  },
};

export default function StoryPage() {
  const orgSchema = getOrganizationSchema();
  const webSiteSchema = getWebSiteSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <StoryView />
    </>
  );
}
