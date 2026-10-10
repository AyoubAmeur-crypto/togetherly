import type { Metadata } from 'next';
import StoryView from '@/components/StoryView';
import { absoluteUrl } from '@/config/site';
import { getOrganizationSchema, getWebSiteSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Togetherly — Money Made Simpler, Life More Together',
  description:
    'Togetherly creates calm couples budgeting tools and Google Sheets templates to track shared expenses, automate fair bill splits, and build financial harmony.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Togetherly — Money Made Simpler, Life More Together',
    description:
      'Togetherly creates calm couples budgeting tools and Google Sheets templates to track shared expenses, automate fair bill splits, and build financial harmony.',
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
