import type { Metadata } from 'next';
import StoryView from '@/components/StoryView';

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
    url: 'https://gettogetherly.tech/',
    siteName: 'Togetherly',
    images: ['/togetherly/togetherly.png'],
    type: 'website',
  },
};

export default function StoryPage() {
  return <StoryView />;
}
