import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Coming Soon — Togetherly',
  description: 'Upcoming digital financial planning systems and templates for couples.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function ComingSoonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
