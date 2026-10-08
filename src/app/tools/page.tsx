import type { Metadata } from 'next';
import Link from 'next/link';
import { Calculator, ArrowRight, Scale, Percent } from 'lucide-react';

import { absoluteUrl } from '@/config/site';
import { getBreadcrumbListSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Free Financial Tools for Couples',
  description:
    'Free, interactive financial planning tools and calculators designed for couples. Split expenses equitably and plan shared money with confidence.',
  alternates: {
    canonical: '/tools',
  },
  openGraph: {
    title: 'Free Financial Tools for Couples | Togetherly',
    description:
      'Free, interactive financial planning tools and calculators designed for couples. Split expenses equitably and plan shared money with confidence.',
    url: absoluteUrl('/tools'),
    siteName: 'Togetherly',
    type: 'website',
  },
};

export default function ToolsDirectoryPage() {
  const breadcrumbsJsonLd = getBreadcrumbListSchema([
    { name: 'Home', path: '/' },
    { name: 'Tools', path: '/tools' },
  ]);

  return (
    <div className="min-h-screen bg-[#FAF6EF] text-[#243B38] py-16 sm:py-24">
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2C7A73]/10 text-xs font-bold text-[#174F4A] uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5 text-[#2C7A73]" />
            <span>Interactive Utilities</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#174F4A] tracking-tight leading-tight">
            Free Financial Tools for Couples
          </h1>

          <p className="text-base sm:text-lg text-[#6F7F7C] leading-relaxed">
            Practical, zero-sign-up calculators designed to help modern partners communicate openly, split shared costs equitably, and build financial teamwork.
          </p>
        </div>

        {/* Tools Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Tool 1: Couples Expense Split Calculator */}
          <div className="bg-[#FFFFFF] p-8 border border-[#174F4A]/10 flex flex-col justify-between space-y-6 hover:border-[#174F4A]/30 transition-all shadow-none">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#2C7A73] uppercase tracking-wider text-[11px] bg-[#2C7A73]/10 px-2.5 py-1">
                  Interactive Calculator
                </span>
                <span className="text-[11px] font-semibold text-[#174F4A] bg-[#FAF6EF] border border-[#174F4A]/15 px-2 py-0.5">
                  100% Free
                </span>
              </div>

              <h2 className="text-2xl font-extrabold text-[#174F4A] leading-snug">
                <Link
                  href="/tools/couples-expense-split-calculator"
                  className="hover:text-[#2C7A73] transition-colors"
                >
                  Couples Expense Split Calculator
                </Link>
              </h2>

              <p className="text-sm text-[#6F7F7C] leading-relaxed">
                Compare a strict 50/50 split against an income-weighted proportional fair split in real time. See exact dollar contributions and discretionary fun money remainders for both partners.
              </p>

              <div className="pt-2 flex items-center gap-4 text-xs text-[#243B38] font-medium">
                <span className="flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-[#2C7A73]" />
                  <span>50/50 Mode</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Percent className="w-3.5 h-3.5 text-[#F29B7F]" />
                  <span>Income Proportional</span>
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#174F4A]/10 flex items-center justify-between">
              <Link
                href="/tools/couples-expense-split-calculator"
                className="inline-flex items-center gap-2 bg-[#174F4A] hover:bg-[#0F3834] text-[#FAF6EF] text-xs font-bold px-5 py-2.5 rounded-none transition-colors cursor-pointer"
              >
                <span>Launch Calculator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Full System: Couples Money Planner */}
          <div className="bg-[#174F4A] text-[#FAF6EF] p-8 border border-[#2C7A73]/40 flex flex-col justify-between space-y-6 rounded-none relative overflow-hidden">
            <div
              className="absolute inset-0 w-full h-full pointer-events-none select-none mix-blend-overlay opacity-30"
              style={{
                backgroundImage: 'url(/togetherly/indian-wedding-pattern.png)',
                backgroundRepeat: 'repeat',
                backgroundSize: '300px 225px',
              }}
            />

            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#F29B7F] uppercase tracking-wider text-[11px] bg-[#FAF6EF]/10 px-2.5 py-1">
                  Complete Digital System
                </span>
                <span className="text-[11px] font-semibold text-[#FAF6EF] bg-[#FAF6EF]/15 px-2 py-0.5">
                  $19 USD
                </span>
              </div>

              <h2 className="text-2xl font-extrabold text-[#FAF6EF] leading-snug">
                <Link
                  href="/products/couples-money-planner"
                  className="hover:text-[#F29B7F] transition-colors"
                >
                  Couples Money Planner
                </Link>
              </h2>

              <p className="text-sm text-[#FAF6EF]/85 leading-relaxed">
                Need more than a one-time calculation? Our complete 8-sheet Google Sheets system tracks monthly budgets, categorizes expenses, handles recurring bills, and automates fair-split settlements every month.
              </p>
            </div>

            <div className="relative z-10 pt-4 border-t border-[#FAF6EF]/20 flex items-center justify-between">
              <Link
                href="/products/couples-money-planner"
                className="inline-flex items-center gap-2 bg-[#FAF6EF] hover:bg-white text-[#174F4A] text-xs font-extrabold px-5 py-2.5 rounded-none transition-colors cursor-pointer shadow-sm tracking-tight"
              >
                <span>View Full System</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
