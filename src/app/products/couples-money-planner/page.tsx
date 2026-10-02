import type { Metadata } from 'next';
import CouplesMoneyPlannerView from '@/components/CouplesMoneyPlannerView';

export const metadata: Metadata = {
  title: 'Couples Budget Planner for Google Sheets',
  description:
    'The Couples Money Planner gives you one shared Google Sheets system to plan your monthly budget, track expenses, split shared costs fairly, manage bills, and build toward your goals together.',
  alternates: {
    canonical: '/products/couples-money-planner',
  },
  openGraph: {
    title: 'Couples Budget Planner for Google Sheets | Togetherly',
    description:
      'Plan your money together, without making money complicated. Instant Google Sheets access, automated 50/50 or income-based splits, and lifetime access for $19.',
    url: 'https://gettogetherly.tech/products/couples-money-planner',
    siteName: 'Togetherly',
    images: ['/togetherly/tablet.png', '/togetherly/dashboard.png'],
    type: 'website',
  },
};

export default function CouplesMoneyPlannerProductPage() {
  return <CouplesMoneyPlannerView />;
}
