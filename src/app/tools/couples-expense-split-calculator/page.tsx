import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Calculator,
  ArrowRight,
  CheckCircle2,
  Scale,
  Percent,
  HelpCircle,
  FileSpreadsheet,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import FairSplitCalculator from '@/components/FairSplitCalculator';
import WhatsAppHelpCTA from '@/components/WhatsAppHelpCTA';
import EmailCapture from '@/components/EmailCapture';
import TrackedProductLink from '@/components/TrackedProductLink';


export const metadata: Metadata = {
  title: 'Couples Expense Split Calculator (50/50 vs. Proportional)',
  description:
    'Free couples expense split calculator. Compare equal 50/50 splitting against income-weighted proportional contributions toward shared living costs, rent, and bills.',
  alternates: {
    canonical: '/tools/couples-expense-split-calculator',
  },
  openGraph: {
    title: 'Couples Expense Split Calculator (50/50 vs. Proportional) | Togetherly',
    description:
      'Calculate fair contributions based on each partner’s income. Free interactive calculator comparing 50/50 vs. proportional splitting with zero sign-up.',
    url: 'https://gettogetherly.tech/tools/couples-expense-split-calculator',
    siteName: 'Togetherly',
    type: 'website',
  },
};

export default function CouplesExpenseSplitCalculatorPage() {
  const webAppJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Togetherly Couples Expense Split Calculator',
    url: 'https://gettogetherly.tech/tools/couples-expense-split-calculator',
    description:
      'Free interactive calculator that helps couples compare equal 50/50 and income-proportional shared expense splitting.',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    creator: {
      '@type': 'Organization',
      name: 'Togetherly',
      url: 'https://gettogetherly.tech',
    },
  };

  const breadcrumbsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://gettogetherly.tech/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Tools',
        item: 'https://gettogetherly.tech/tools',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Couples Expense Split Calculator',
        item: 'https://gettogetherly.tech/tools/couples-expense-split-calculator',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#FAF6EF] text-[#243B38] py-12 sm:py-20">
      {/* Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#6F7F7C]">
          <Link href="/" className="hover:text-[#174F4A] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#6F7F7C]/60" />
          <Link href="/tools" className="hover:text-[#174F4A] transition-colors">
            Tools
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#6F7F7C]/60" />
          <span className="text-[#174F4A] font-semibold">Expense Split Calculator</span>
        </nav>

        {/* Page Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#2C7A73]/10 text-xs font-bold text-[#174F4A] uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5 text-[#2C7A73]" />
            <span>Free Interactive Calculator</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#174F4A] tracking-tight leading-tight">
            Couples Expense Split Calculator
          </h1>

          <p className="text-base sm:text-lg text-[#6F7F7C] leading-relaxed max-w-2xl mx-auto">
            Compare a traditional 50/50 split against an income-weighted proportional fair split.
            Enter your monthly net take-home incomes and shared household expenses below.
          </p>
        </header>

        {/* Interactive Calculator Engine (Single card, full width) */}
        <FairSplitCalculator hideHeading={true} embedded={true} />

        {/* Educational Content Sections */}
        <div className="space-y-12 max-w-6xl mx-auto pt-6 text-left">
          {/* Section 1: Overview of Splitting Approaches */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#174F4A] tracking-tight">
              How expense splitting works for couples
            </h2>
            <p className="text-sm sm:text-base text-[#6F7F7C] leading-relaxed">
              When two people share a household, deciding how to fund rent, groceries, utilities, and dining is one of the most frequent financial conversations. Couples typically evaluate two main approaches:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              <div className="bg-[#FFFFFF] p-6 border border-[#174F4A]/10 space-y-2.5">
                <div className="flex items-center gap-2 text-sm font-bold text-[#174F4A]">
                  <Scale className="w-4 h-4 text-[#2C7A73]" />
                  <span>The 50/50 Equal Split</span>
                </div>
                <p className="text-xs text-[#6F7F7C] leading-relaxed">
                  Both partners contribute exactly half of every shared obligation, regardless of individual earnings.
                </p>
                <div className="text-[11px] text-[#2C7A73] font-semibold pt-1">
                  Works well when: Incomes are similar and discretionary spending power remains balanced.
                </div>
              </div>

              <div className="bg-[#FFFFFF] p-6 border border-[#174F4A]/10 space-y-2.5">
                <div className="flex items-center gap-2 text-sm font-bold text-[#174F4A]">
                  <Percent className="w-4 h-4 text-[#F29B7F]" />
                  <span>The Proportional (Income-Based) Split</span>
                </div>
                <p className="text-xs text-[#6F7F7C] leading-relaxed">
                  Contributions are weighted proportionally to what each partner takes home (for example, 60/40 or 55/45).
                </p>
                <div className="text-[11px] text-[#F29B7F] font-semibold pt-1">
                  Works well when: One partner earns significantly more, ensuring both maintain equitable fun money.
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Mathematical Formula */}
          <section className="space-y-4 border-t border-[#174F4A]/10 pt-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#174F4A] tracking-tight">
              The math behind proportional splitting
            </h2>
            <p className="text-sm sm:text-base text-[#6F7F7C] leading-relaxed">
              Proportional splitting calculates each partner’s contribution percentage based on their share of the total household net income:
            </p>

            <div className="bg-[#174F4A] text-[#FAF6EF] p-5 sm:p-6 font-mono text-xs sm:text-sm space-y-2">
              <p className="text-[#91B7A0] font-bold">Step 1: Total Household Net Income</p>
              <p>Total Income = Partner A Income + Partner B Income</p>
              <p className="text-[#91B7A0] font-bold pt-2">Step 2: Individual Percentage Shares</p>
              <p>Partner A Share % = Partner A Income / Total Income</p>
              <p>Partner B Share % = Partner B Income / Total Income</p>
              <p className="text-[#91B7A0] font-bold pt-2">Step 3: Dollar Contributions</p>
              <p>Partner A Contribution = Shared Expenses × Partner A Share %</p>
              <p>Partner B Contribution = Shared Expenses × Partner B Share %</p>
            </div>

            <p className="text-xs sm:text-sm text-[#6F7F7C] leading-relaxed pt-1">
              For example, if Partner A earns $4,800 (60%) and Partner B earns $3,200 (40%), with $3,200 in shared monthly expenses, Partner A covers $1,920 and Partner B covers $1,280.
            </p>
          </section>

          {/* Section 3: When couples choose different approaches */}
          <section className="space-y-4 border-t border-[#174F4A]/10 pt-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#174F4A] tracking-tight">
              Choosing the right system for your relationship
            </h2>
            <p className="text-sm sm:text-base text-[#6F7F7C] leading-relaxed">
              No single budgeting method is universally right for every couple. Healthy financial partnerships often evolve through different stages:
            </p>

            <ul className="space-y-3 text-xs sm:text-sm text-[#243B38]">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2C7A73] shrink-0 mt-0.5" />
                <span>
                  <strong>When incomes are similar:</strong> A 50/50 split is intuitive, straightforward, and avoids regular percentage adjustments.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2C7A73] shrink-0 mt-0.5" />
                <span>
                  <strong>When incomes differ significantly:</strong> Proportional splitting protects the lower-earning partner from feeling financially stretched or guilty, while allowing the higher-earning partner to contribute proportionally without feeling taken advantage of.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2C7A73] shrink-0 mt-0.5" />
                <span>
                  <strong>The 3-Pot hybrid:</strong> Many couples pair proportional splitting with personal accounts: joint shared expenses are funded proportionally, while personal fun money remains completely separate.
                </span>
              </li>
            </ul>
          </section>

          {/* Section 4: Contextual Blog Link */}
          <section className="bg-[#FFFFFF] border border-[#174F4A]/15 p-6 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-[#2C7A73] uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>Explore Deeper</span>
            </div>
            <h3 className="text-base font-bold text-[#174F4A]">
              Want more frameworks on couples money management?
            </h3>
            <p className="text-xs sm:text-sm text-[#6F7F7C]">
              Read our editorial essays on running a 20-minute monthly money date, setting shared savings milestones, and building financial intimacy without friction.
            </p>
            <div className="pt-1">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#174F4A] hover:text-[#2C7A73] transition-colors"
              >
                <span>Browse Togetherly Blog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </section>

          {/* Section 5: Contextual WhatsApp Help CTA */}
          <WhatsAppHelpCTA
            topic="couples_expense_split_calculator"
            headline="Have a question about your result?"
            subtext="Ask Togetherly — we're happy to help."
            message="Hi Togetherly! I was using your Couples Expense Split Calculator and I have a question about our situation."
            sourcePage="/tools/couples-expense-split-calculator"
            contentCluster="Finance Tools / Calculators"
            ctaLocation="calculator_middle"
            buttonText="Ask on WhatsApp"
          />

          {/* Section 6: Natural Commercial Product CTA */}
          <section className="bg-[#174F4A] text-[#FAF6EF] p-8 sm:p-10 space-y-5 rounded-none relative overflow-hidden">
            <div
              className="absolute inset-0 w-full h-full pointer-events-none select-none mix-blend-overlay opacity-30"
              style={{
                backgroundImage: 'url(/togetherly/indian-wedding-pattern.png)',
                backgroundRepeat: 'repeat',
                backgroundSize: '300px 225px',
              }}
            />
            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#FAF6EF]/15 text-[11px] font-bold text-[#FAF6EF] uppercase tracking-wider">
                <FileSpreadsheet className="w-3.5 h-3.5 text-[#F29B7F]" />
                <span>Want to manage this every month?</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Togetherly — Couples Money Planner
              </h2>

              <p className="text-xs sm:text-sm text-[#FAF6EF]/85 leading-relaxed max-w-xl">
                A one-time calculation helps you align today. The Couples Money Planner gives you an 8-sheet synchronized Google Sheets system to track monthly actuals, manage bills, and balance settlements every single month.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <TrackedProductLink
                  href="/products/couples-money-planner"
                  sourceType="calculator"
                  sourcePage="/tools/couples-expense-split-calculator"
                  ctaLocation="calculator_bottom"
                  className="inline-flex items-center justify-center gap-2 bg-[#FAF6EF] hover:bg-white text-[#174F4A] text-sm sm:text-base font-extrabold px-8 py-3.5 rounded-none transition-colors shadow-sm tracking-tight"
                >
                  <span>Explore the Full 8-Sheet Planner ($19)</span>
                  <ArrowRight className="w-4 h-4 ml-0.5" />
                </TrackedProductLink>
              </div>

              <p className="text-[11px] text-[#FAF6EF]/70 pt-1">
                One-time purchase · Native Google Sheets · 100% private in your own Google Drive
              </p>
            </div>
          </section>

          {/* Section 7: Email Notification Capture */}
          <EmailCapture
            sourcePage="/tools/couples-expense-split-calculator"
            contentCluster="Finance Tools / Calculators"
            ctaLocation="tool_bottom"
          />

        </div>
      </div>
    </div>
  );
}
