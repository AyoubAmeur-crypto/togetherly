import type { Metadata } from 'next';
import CouplesMoneyPlannerView from '@/components/CouplesMoneyPlannerView';

export const metadata: Metadata = {
  title: 'Products — Togetherly (Couples Money Planner)',
  description:
    'Explore Togetherly digital financial systems designed for couples in Google Sheets. Track shared living costs, balance fair proportional splits, and achieve life milestones.',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: '/products/couples-money-planner',
  },
};

export default function ProductsPage() {
  return <CouplesMoneyPlannerView />;
}
