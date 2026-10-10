import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Calculator,
  ArrowRight,
  Scale,
  Percent,
  FileSpreadsheet,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import FairSplitCalculator from '@/components/FairSplitCalculator';
import WhatsAppHelpCTA from '@/components/WhatsAppHelpCTA';
import EmailCapture from '@/components/EmailCapture';
import TrackedProductLink from '@/components/TrackedProductLink';
import { absoluteUrl } from '@/config/site';
import { getCalculatorWebApplicationSchema, getBreadcrumbListSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Split Bills Based on Income Calculator (Free)',
  description:
    "Calculate how to split shared bills based on each partner's income. Enter your incomes and shared expenses to see each person's proportional contribution.",
  alternates: {
    canonical: '/tools/couples-expense-split-calculator',
  },
  openGraph: {
    title: 'Split Bills Based on Income Calculator (Free) | Togetherly',
    description:
      "Calculate how to split shared bills based on each partner's income. Enter your incomes and shared expenses to see each person's proportional contribution.",
    url: absoluteUrl('/tools/couples-expense-split-calculator'),
    siteName: 'Togetherly',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Split Bills Based on Income Calculator (Free) | Togetherly',
    description:
      "Calculate how to split shared bills based on each partner's income. Enter your incomes and shared expenses to see each person's proportional contribution.",
  },
};

export default function CouplesExpenseSplitCalculatorPage() {
  const webAppJsonLd = getCalculatorWebApplicationSchema();
  const breadcrumbsJsonLd = getBreadcrumbListSchema([
    { name: 'Home', path: '/' },
    { name: 'Tools', path: '/tools' },
    { name: 'Split Bills Based on Income Calculator', path: '/tools/couples-expense-split-calculator' },
  ]);

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
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
          <span className="text-[#174F4A] font-semibold">Split Bills Based on Income Calculator</span>
        </nav>

        {/* Page Header (Above the fold) */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#2C7A73]/10 text-xs font-bold text-[#174F4A] uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5 text-[#2C7A73]" />
            <span>Free Interactive Calculator · No Sign-Up Required</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#174F4A] tracking-tight leading-tight">
            Split Bills Based on Income Calculator
          </h1>

          <p className="text-base sm:text-lg text-[#6F7F7C] leading-relaxed max-w-2xl mx-auto">
            Calculate how to split shared household bills proportionally based on each partner’s take-home pay, or compare with a traditional 50/50 split. Enter your monthly incomes and shared expenses below.
          </p>
        </header>

        {/* Interactive Calculator Engine (Prominent, High on page) */}
        <FairSplitCalculator hideHeading={true} embedded={true} />

        {/* Supporting Editorial Content Underneath the Calculator */}
        <div className="space-y-12 max-w-4xl mx-auto pt-6 text-left">
          
          {/* Section 1: How the Calculator Works */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#174F4A] tracking-tight">
              How the Split Bills Based on Income Calculator Works
            </h2>
            <p className="text-sm sm:text-base text-[#6F7F7C] leading-relaxed">
              When couples earn different salaries, splitting bills equally down the middle often places a heavy burden on the lower-earning partner while the higher earner saves easily. This calculator uses an <strong>income-weighted proportional formula</strong> to balance your shared costs.
            </p>
            <p className="text-sm sm:text-base text-[#6F7F7C] leading-relaxed">
              Instead of paying arbitrary dollar figures, each partner contributes a percentage equal to their share of total household take-home income. If you earn 60% of your household’s combined earnings, you cover 60% of the rent, utilities, and joint groceries. Both partners contribute the exact same share of their paycheck toward home life, preserving an equitable share of personal income for individual savings and spending.
            </p>
          </section>

          {/* Section 2: How the Calculation Is Made */}
          <section className="space-y-4 border-t border-[#174F4A]/10 pt-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#174F4A] tracking-tight">
              How the Calculation Is Made
            </h2>
            <p className="text-sm sm:text-base text-[#6F7F7C] leading-relaxed">
              The calculation runs automatically in three transparent steps using your take-home figures:
            </p>

            <div className="bg-[#174F4A] text-[#FAF6EF] p-5 sm:p-6 font-mono text-xs sm:text-sm space-y-3 rounded-none">
              <div>
                <p className="text-[#91B7A0] font-bold">Step 1: Combined Household Net Income</p>
                <p className="pl-3">Combined Income = Partner A Income + Partner B Income</p>
              </div>
              <div>
                <p className="text-[#91B7A0] font-bold">Step 2: Individual Percentage Shares</p>
                <p className="pl-3">Partner A Share % = (Partner A Income ÷ Combined Income) × 100</p>
                <p className="pl-3">Partner B Share % = (Partner B Income ÷ Combined Income) × 100</p>
              </div>
              <div>
                <p className="text-[#91B7A0] font-bold">Step 3: Monthly Dollar Contributions</p>
                <p className="pl-3">Partner A Contribution = Shared Monthly Bills × (Partner A Share % ÷ 100)</p>
                <p className="pl-3">Partner B Contribution = Shared Monthly Bills × (Partner B Share % ÷ 100)</p>
              </div>
            </div>
          </section>

          {/* Section 3: Worked Example */}
          <section className="space-y-4 border-t border-[#174F4A]/10 pt-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#174F4A] tracking-tight">
              Example: $6,000 vs $4,000 Income
            </h2>
            <p className="text-sm sm:text-base text-[#6F7F7C] leading-relaxed">
              Consider a couple living together with a moderate income disparity and $3,000 in monthly shared expenses:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              <div className="bg-[#FFFFFF] p-5 border border-[#174F4A]/10 space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-[#6F7F7C] font-semibold">Partner A</span>
                <p className="text-xl font-extrabold text-[#174F4A]">$6,000 / mo</p>
                <p className="text-xs text-[#2C7A73] font-semibold">60% of combined income</p>
                <p className="text-xs text-[#6F7F7C] pt-2 border-t border-[#174F4A]/10">Pays $1,800/mo (30% of pay)</p>
              </div>

              <div className="bg-[#FFFFFF] p-5 border border-[#174F4A]/10 space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-[#6F7F7C] font-semibold">Partner B</span>
                <p className="text-xl font-extrabold text-[#174F4A]">$4,000 / mo</p>
                <p className="text-xs text-[#2C7A73] font-semibold">40% of combined income</p>
                <p className="text-xs text-[#6F7F7C] pt-2 border-t border-[#174F4A]/10">Pays $1,200/mo (30% of pay)</p>
              </div>

              <div className="bg-[#FAF6EF] p-5 border border-[#174F4A]/15 space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-[#6F7F7C] font-semibold">Shared Bills</span>
                <p className="text-xl font-extrabold text-[#174F4A]">$3,000 / mo</p>
                <p className="text-xs text-[#6F7F7C]">100% funded equitably</p>
                <p className="text-xs text-[#2C7A73] font-semibold pt-2 border-t border-[#174F4A]/10">Both keep 70% of pay</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#6F7F7C] leading-relaxed pt-1">
              Notice what happens under this arrangement: both partners dedicate exactly 30% of their net pay toward household costs. Partner A retains $4,200 (70%) and Partner B retains $2,800 (70%) for personal savings, retirement funds, and solo spending.
            </p>
          </section>

          {/* Section 4: 50/50 vs Proportional */}
          <section className="space-y-4 border-t border-[#174F4A]/10 pt-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#174F4A] tracking-tight">
              50/50 vs Proportional Bill Splitting
            </h2>
            <p className="text-sm sm:text-base text-[#6F7F7C] leading-relaxed">
              Couples generally choose between two primary approaches. Neither is universally right for every relationship; they serve different income balances:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              <div className="bg-[#FFFFFF] p-6 border border-[#174F4A]/10 space-y-3">
                <div className="flex items-center gap-2 text-base font-bold text-[#174F4A]">
                  <Scale className="w-4 h-4 text-[#2C7A73]" />
                  <span>The 50/50 Equal Split</span>
                </div>
                <p className="text-xs sm:text-sm text-[#6F7F7C] leading-relaxed">
                  Both partners pay exactly half of every shared obligation ($1,500 each in the example above).
                </p>
                <div className="text-xs text-[#2C7A73] font-semibold pt-1">
                  Works best when: Incomes are virtually identical (within 10-15%) and discretionary cash remains balanced.
                </div>
              </div>

              <div className="bg-[#FFFFFF] p-6 border border-[#174F4A]/10 space-y-3">
                <div className="flex items-center gap-2 text-base font-bold text-[#174F4A]">
                  <Percent className="w-4 h-4 text-[#F29B7F]" />
                  <span>The Proportional Split</span>
                </div>
                <p className="text-xs sm:text-sm text-[#6F7F7C] leading-relaxed">
                  Each partner pays based on their percentage of combined earnings ($1,800 vs $1,200 in the example).
                </p>
                <div className="text-xs text-[#F29B7F] font-semibold pt-1">
                  Works best when: Incomes differ noticeably, ensuring the lower earner is not burdened with a 38%+ drain on their paycheck.
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#6F7F7C] pt-2">
              For a detailed comparison of psychological tradeoffs, read our analysis of{' '}
              <Link href="/blog/50-50-vs-proportional-expense-splitting" className="text-[#2C7A73] font-bold underline hover:text-[#174F4A]">
                50/50 vs proportional expense splitting
              </Link>.
            </p>
          </section>

          {/* Section 5: Gross vs Net Income */}
          <section className="space-y-4 border-t border-[#174F4A]/10 pt-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#174F4A] tracking-tight">
              Should You Enter Gross or Net Income?
            </h2>
            <p className="text-sm sm:text-base text-[#6F7F7C] leading-relaxed">
              <strong>Enter net take-home pay.</strong> Net pay represents the actual cash deposited into your checking accounts each month after federal, state, and local payroll taxes, mandatory pension contributions, and healthcare deductions.
            </p>
            <p className="text-sm sm:text-base text-[#6F7F7C] leading-relaxed">
              Because you cannot pay rent or electricity with pre-tax withholdings, net pay provides a realistic reflection of your actual household purchasing power. If one partner has unusually large voluntary deductions (such as aggressive optional 401(k) contributions), you can agree to calculate based on take-home pay before those voluntary elections.
            </p>
          </section>

          {/* Section 6: What Expenses Should You Include? */}
          <section className="space-y-4 border-t border-[#174F4A]/10 pt-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#174F4A] tracking-tight">
              What Expenses Should You Include?
            </h2>
            <p className="text-sm sm:text-base text-[#6F7F7C] leading-relaxed">
              When entering your monthly shared bills into the calculator, include costs that benefit both partners:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="bg-[#FFFFFF] p-5 border border-[#174F4A]/10 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2C7A73] block">Include in Shared Bills:</span>
                <ul className="text-xs text-[#243B38] space-y-1.5 list-disc list-inside">
                  <li>Rent or mortgage payment</li>
                  <li>Utilities (power, water, gas, internet)</li>
                  <li>Joint groceries & household supplies</li>
                  <li>Shared streaming services & subscriptions</li>
                  <li>Joint pet care, food, and vet bills</li>
                </ul>
              </div>

              <div className="bg-[#FFFFFF] p-5 border border-[#174F4A]/10 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#E57373] block">Keep as Individual Costs:</span>
                <ul className="text-xs text-[#243B38] space-y-1.5 list-disc list-inside">
                  <li>Personal student loans & credit card debt</li>
                  <li>Individual clothing and personal grooming</li>
                  <li>Solo hobbies and individual tech purchases</li>
                  <li>Solo dining out with coworkers or friends</li>
                  <li>Personal vehicle payments (unless jointly shared)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 7: Prominent Contextual Bridge to the Educational Guide */}
          <section className="bg-[#FFFFFF] border-2 border-[#174F4A]/20 p-6 sm:p-8 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#2C7A73] uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>Complete In-Depth Guide</span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-[#174F4A]">
              Want the full step-by-step breakdown with banking setups?
            </h3>
            <p className="text-xs sm:text-sm text-[#6F7F7C] leading-relaxed">
              Our comprehensive guide explains how to set up the 3-account banking system, navigate changes in income, discuss debt, and align your financial boundaries without tension.
            </p>
            <div className="pt-2">
              <Link
                href="/blog/split-bills-based-on-income"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#174F4A] hover:text-[#2C7A73] transition-colors"
              >
                <span>Read our complete guide to splitting bills based on income</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

          {/* Section 8: Related Cluster Links */}
          <section className="space-y-4 border-t border-[#174F4A]/10 pt-8">
            <h3 className="text-lg font-bold text-[#174F4A]">
              More Guides for Couples Managing Shared Money:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                href="/blog/50-50-vs-proportional-expense-splitting"
                className="p-4 bg-[#FFFFFF] border border-[#174F4A]/10 hover:border-[#174F4A]/30 transition-all text-xs space-y-1 block"
              >
                <span className="font-bold text-[#174F4A] block">50/50 vs Proportional Splitting</span>
                <span className="text-[#6F7F7C]">Understand the psychological and financial tradeoffs.</span>
              </Link>

              <Link
                href="/blog/how-should-couples-split-expenses"
                className="p-4 bg-[#FFFFFF] border border-[#174F4A]/10 hover:border-[#174F4A]/30 transition-all text-xs space-y-1 block"
              >
                <span className="font-bold text-[#174F4A] block">4 Ways Couples Split Expenses</span>
                <span className="text-[#6F7F7C]">Explore equal, proportional, hybrid, and pooled systems.</span>
              </Link>

              <Link
                href="/blog/how-to-budget-as-a-couple"
                className="p-4 bg-[#FFFFFF] border border-[#174F4A]/10 hover:border-[#174F4A]/30 transition-all text-xs space-y-1 block"
              >
                <span className="font-bold text-[#174F4A] block">How to Budget as a Couple</span>
                <span className="text-[#6F7F7C]">Step-by-step framework to budget together without stress.</span>
              </Link>
            </div>
          </section>

          {/* Section 9: Frequently Asked Questions */}
          <section className="space-y-6 border-t border-[#174F4A]/10 pt-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#174F4A] tracking-tight">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              <div className="bg-[#FFFFFF] p-5 border border-[#174F4A]/10 space-y-2">
                <h3 className="text-sm font-bold text-[#174F4A]">
                  How does this calculator split bills based on income?
                </h3>
                <p className="text-xs sm:text-sm text-[#6F7F7C] leading-relaxed">
                  The calculator sums both partners’ take-home pay to find total household income, calculates each person’s percentage share of that total, and multiplies each percentage by your total shared monthly expenses.
                </p>
              </div>

              <div className="bg-[#FFFFFF] p-5 border border-[#174F4A]/10 space-y-2">
                <h3 className="text-sm font-bold text-[#174F4A]">
                  Should I enter gross or net take-home pay?
                </h3>
                <p className="text-xs sm:text-sm text-[#6F7F7C] leading-relaxed">
                  Net take-home pay is recommended. Taxes, healthcare premiums, and required payroll deductions cannot be used to pay household bills, so take-home pay gives an accurate picture of spendable money.
                </p>
              </div>

              <div className="bg-[#FFFFFF] p-5 border border-[#174F4A]/10 space-y-2">
                <h3 className="text-sm font-bold text-[#174F4A]">
                  What is the difference between 50/50 and proportional splitting?
                </h3>
                <p className="text-xs sm:text-sm text-[#6F7F7C] leading-relaxed">
                  In a 50/50 split, each partner pays the exact same dollar amount regardless of salary. In a proportional split, each partner contributes in direct ratio to what they earn, so both partners sacrifice the same proportion of their paycheck.
                </p>
              </div>

              <div className="bg-[#FFFFFF] p-5 border border-[#174F4A]/10 space-y-2">
                <h3 className="text-sm font-bold text-[#174F4A]">
                  Can we recalculate when one partner’s salary changes?
                </h3>
                <p className="text-xs sm:text-sm text-[#6F7F7C] leading-relaxed">
                  Yes. Whenever either partner experiences a promotion, raise, job change, or period of unpaid leave, enter the updated take-home numbers to re-balance your contributions.
                </p>
              </div>

              <div className="bg-[#FFFFFF] p-5 border border-[#174F4A]/10 space-y-2">
                <h3 className="text-sm font-bold text-[#174F4A]">
                  Is my financial data saved or transmitted anywhere?
                </h3>
                <p className="text-xs sm:text-sm text-[#6F7F7C] leading-relaxed">
                  No. All calculations run 100% locally in your browser. We never collect, store, or transmit your income figures or expenses.
                </p>
              </div>
            </div>
          </section>

          {/* Section 10: WhatsApp Help CTA */}
          <WhatsAppHelpCTA
            topic="couples_expense_split_calculator"
            headline="Have a question about your result?"
            subtext="Ask Togetherly — we're happy to help."
            message="Hi Togetherly! I was using your Split Bills Based on Income Calculator and I have a question about our situation."
            sourcePage="/tools/couples-expense-split-calculator"
            contentCluster="Finance Tools / Calculators"
            ctaLocation="calculator_middle"
            buttonText="Ask on WhatsApp"
          />

          {/* Section 11: Product CTA: Couples Money Planner */}
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

          {/* Section 12: Email Notification Capture */}
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
