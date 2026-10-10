import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FileSpreadsheet,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Calculator,
  Users,
  ChevronRight,
  Layers,
  HeartHandshake,
} from 'lucide-react';
import EmailCapture from '@/components/EmailCapture';
import TrackedProductLink from '@/components/TrackedProductLink';
import WhatsAppHelpCTA from '@/components/WhatsAppHelpCTA';
import { absoluteUrl } from '@/config/site';
import { getBreadcrumbListSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Couples Budget Template: Free Google Sheets Starter & Planner',
  description:
    'Download the free couples budget template for Google Sheets. Track shared expenses, proportional bill splits, dual incomes, and joint savings without subscription apps.',
  alternates: {
    canonical: '/templates/couples-budget-template',
  },
  openGraph: {
    title: 'Couples Budget Template: Free Google Sheets Starter & Planner | Togetherly',
    description:
      'Download the free couples budget template for Google Sheets. Track shared expenses, proportional bill splits, dual incomes, and joint savings without subscription apps.',
    url: absoluteUrl('/templates/couples-budget-template'),
    siteName: 'Togetherly',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Couples Budget Template: Free Google Sheets Starter & Planner | Togetherly',
    description:
      'Download the free couples budget template for Google Sheets. Track shared expenses, proportional bill splits, dual incomes, and joint savings without subscription apps.',
  },
};

export default function CouplesBudgetTemplatePage() {
  const breadcrumbsJsonLd = getBreadcrumbListSchema([
    { name: 'Home', path: '/' },
    { name: 'Templates', path: '/templates/couples-budget-template' },
    { name: 'Couples Budget Template', path: '/templates/couples-budget-template' },
  ]);

  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Couples Budget Template (Google Sheets)',
    description:
      'A customizable couples budget template for Google Sheets to track joint expenses, proportional bill splits, and shared savings.',
    url: absoluteUrl('/templates/couples-budget-template'),
    isPartOf: {
      '@type': 'WebSite',
      name: 'Togetherly',
      url: 'https://www.gettogetherly.tech',
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is this couples budget template free to use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. The Togetherly 2-person starter budget template is 100% free. Once copied into your Google Drive, you own your private copy forever with zero recurring subscription charges or hidden fees.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does this template work in Google Sheets and Microsoft Excel?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The template is engineered natively for Google Sheets so partners can collaborate simultaneously in real time from mobile phones, laptops, or tablets. You can also export the spreadsheet as an .xlsx file for Microsoft Excel.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does the template handle couples with different incomes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The spreadsheet includes an automated income-proportional split formula. When you enter both partners net take-home pay, it calculates exact contribution percentages so each partner surrenders the same relative share of their earnings toward household bills.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can married couples use this budget spreadsheet?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. The template supports 100% joint pooling, the 3-pot hybrid system (joint bills plus guilt-free personal allowances), and separate accounts with proportional contributions.',
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#FAF6EF] text-[#243B38] py-12 sm:py-20">
      {/* Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumbs" className="mb-8">
          <ol className="flex items-center space-x-2 text-xs text-[#6F7F7C]">
            <li>
              <Link href="/" className="hover:text-[#2C7A73] transition-colors">
                Home
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3 h-3 text-[#B8C4C1]" />
            </li>
            <li className="text-[#174F4A] font-semibold" aria-current="page">
              Couples Budget Template
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#2C7A73]/10 text-[#2C7A73] text-xs font-bold uppercase tracking-wider mb-4 border border-[#2C7A73]/20">
            <FileSpreadsheet className="w-3.5 h-3.5" />
            Free Spreadsheet Resource
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#174F4A] tracking-tight leading-tight mb-4">
            Couples Budget Template
            <span className="block text-xl sm:text-2xl font-normal text-[#4A5D59] mt-2">
              For Google Sheets • 2-Person Monthly Budget & Bill Splitter
            </span>
          </h1>
          <p className="text-base sm:text-lg text-[#4A5D59] leading-relaxed">
            A collaborative 2-person budget spreadsheet to track shared living expenses, manage unequal incomes with proportional bill splitting, and build joint savings—without bank-sync bugs or $100/yr app subscriptions.
          </p>
        </div>

        {/* Lead Capture Box */}
        <div className="mb-14 p-6 sm:p-8 bg-[#FFFFFF] border-2 border-[#174F4A]/20 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-[#2C7A73]" />
            <h2 className="text-xl font-bold text-[#174F4A]">
              Get the Free Couples Budget Starter Sheet
            </h2>
          </div>
          <p className="text-sm text-[#4A5D59] mb-4 leading-relaxed">
            We are finalizing the public release of our free 2-person Google Sheets template. Enter your email below to receive instant early access as soon as the copy link goes live, along with our weekly couples finance frameworks.
          </p>

          <div className="mb-5 p-3.5 bg-[#FAF6EF] border border-[#174F4A]/10 text-xs text-[#6F7F7C]">
            <strong>Transparent note:</strong> We never fake downloads. This starter asset is currently in final QA testing. Signing up adds you directly to the delivery queue to receive the free copy link in your inbox.
          </div>

          <EmailCapture
            sourcePage="/templates/couples-budget-template"
            contentCluster="Couples Budgeting"
            ctaLocation="template_hero"
            headline="Enter your email to receive the free Google Sheets template"
            subheadline="Instant Google Drive copy link delivered with zero spam. Unsubscribe anytime."
            buttonText="Get Free Template Access"
          />
        </div>

        {/* Template Overview / Anatomy */}
        <div className="mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#174F4A] mb-4">
            What&apos;s Inside the Couples Budget Spreadsheet
          </h2>
          <p className="text-sm text-[#4A5D59] mb-6 leading-relaxed">
            Most budget templates are built for individuals or roommates. This spreadsheet is engineered specifically for couples sharing a home, balancing individual freedom with joint teamwork:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-white border border-[#174F4A]/10">
              <div className="flex items-center gap-2.5 mb-2">
                <Calculator className="w-5 h-5 text-[#2C7A73]" />
                <h3 className="font-bold text-[#174F4A] text-base">1. Proportional Bill Split Engine</h3>
              </div>
              <p className="text-xs text-[#4A5D59] leading-relaxed">
                Enter both partner salaries to automatically calculate proportional contribution percentages. Ensures both partners contribute an equal relative share of their paychecks.
              </p>
            </div>

            <div className="p-5 bg-white border border-[#174F4A]/10">
              <div className="flex items-center gap-2.5 mb-2">
                <Layers className="w-5 h-5 text-[#2C7A73]" />
                <h3 className="font-bold text-[#174F4A] text-base">2. Fixed Household Bills Tracker</h3>
              </div>
              <p className="text-xs text-[#4A5D59] leading-relaxed">
                Log rent, utilities, Wi-Fi, insurance, and recurring joint subscriptions with due dates and payment assignment to prevent missed bills.
              </p>
            </div>

            <div className="p-5 bg-white border border-[#174F4A]/10">
              <div className="flex items-center gap-2.5 mb-2">
                <HeartHandshake className="w-5 h-5 text-[#2C7A73]" />
                <h3 className="font-bold text-[#174F4A] text-base">3. Guilt-Free Personal Allowances</h3>
              </div>
              <p className="text-xs text-[#4A5D59] leading-relaxed">
                Dedicated personal fun-money tabs for Partner A and Partner B. Spend on hobbies, dining, and solo treats with zero justification required.
              </p>
            </div>

            <div className="p-5 bg-white border border-[#174F4A]/10">
              <div className="flex items-center gap-2.5 mb-2">
                <Users className="w-5 h-5 text-[#2C7A73]" />
                <h3 className="font-bold text-[#174F4A] text-base">4. 20-Minute Monthly Review Sheet</h3>
              </div>
              <p className="text-xs text-[#4A5D59] leading-relaxed">
                A structured 4-step checklist to guide your monthly money date. Review actuals vs budget, adjust next month&apos;s calendar, and celebrate savings milestones.
              </p>
            </div>
          </div>
        </div>

        {/* Free Starter vs Paid Planner Comparison */}
        <div className="mb-14 p-6 sm:p-8 bg-[#FFFFFF] border-2 border-[#174F4A]/20">
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2C7A73]">Upgrade Option</span>
            <h2 className="text-2xl font-bold text-[#174F4A] mt-1">
              Free Starter Sheet vs. Full Couples Money Planner ($19)
            </h2>
            <p className="text-sm text-[#4A5D59] mt-2">
              Need more than a simple monthly tracker? Compare our free starter spreadsheet with the complete 8-sheet household financial system.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-[#174F4A]/20 text-[#174F4A]">
                  <th className="py-3 px-3 font-bold">Feature</th>
                  <th className="py-3 px-3 font-bold">Free Starter Template</th>
                  <th className="py-3 px-3 font-bold bg-[#FAF6EF]">Couples Money Planner ($19)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#174F4A]/10 text-[#4A5D59]">
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-[#174F4A]">Monthly Shared Budget Sheet</td>
                  <td className="py-2.5 px-3 text-[#2C7A73] font-bold">Included</td>
                  <td className="py-2.5 px-3 bg-[#FAF6EF] text-[#2C7A73] font-bold">Included (Expanded)</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-[#174F4A]">Proportional Bill Splitting Calculator</td>
                  <td className="py-2.5 px-3 text-[#2C7A73] font-bold">Basic 2-salary</td>
                  <td className="py-2.5 px-3 bg-[#FAF6EF] text-[#2C7A73] font-bold">Advanced (Gross, Net & Debt-adjusted)</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-[#174F4A]">Annual Rollover & 12-Month Dashboard</td>
                  <td className="py-2.5 px-3 text-[#6F7F7C]">Manual copy</td>
                  <td className="py-2.5 px-3 bg-[#FAF6EF] text-[#2C7A73] font-bold">Full 12-Month Auto-Consolidation</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-[#174F4A]">Shared Sinking Funds & Goals Tracker</td>
                  <td className="py-2.5 px-3 text-[#6F7F7C]">Not included</td>
                  <td className="py-2.5 px-3 bg-[#FAF6EF] text-[#2C7A73] font-bold">Included (Vacations, Home, Emergency)</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-[#174F4A]">Debt Payoff & Snowball Calculator</td>
                  <td className="py-2.5 px-3 text-[#6F7F7C]">Not included</td>
                  <td className="py-2.5 px-3 bg-[#FAF6EF] text-[#2C7A73] font-bold">Included (Student loans, cards, auto)</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-[#174F4A]">Format & Platform</td>
                  <td className="py-2.5 px-3">Google Sheets</td>
                  <td className="py-2.5 px-3 bg-[#FAF6EF] font-bold text-[#174F4A]">Google Sheets (Instant copy + Guide)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#174F4A]/10">
            <div>
              <p className="text-sm font-bold text-[#174F4A]">Ready for the complete household system?</p>
              <p className="text-xs text-[#6F7F7C]">Instant delivery • Lifetime updates • 100% private in your Google Drive</p>
            </div>
            <TrackedProductLink
              href="/products/couples-money-planner"
              sourceType="template"
              sourcePage="/templates/couples-budget-template"
              ctaLocation="template_comparison"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2C7A73] hover:bg-[#174F4A] text-white text-xs font-bold transition-colors whitespace-nowrap shadow-sm"
            >
              Get Couples Money Planner ($19)
              <ArrowRight className="w-3.5 h-3.5" />
            </TrackedProductLink>
          </div>
        </div>

        {/* Why Google Sheets Beats Budgeting Apps */}
        <div className="mb-14">
          <h2 className="text-2xl font-bold text-[#174F4A] mb-4">
            Why Spreadsheets Beat Budgeting Apps for Couples
          </h2>
          <div className="space-y-4 text-sm text-[#4A5D59] leading-relaxed">
            <p>
              Many couples start their budgeting journey by downloading bank-linking smartphone apps like Monarch, Copilot, or YNAB. While sleek, over 65% of couples abandon mobile finance apps within two months due to common issues:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Broken Bank Connections:</strong> Financial data aggregators constantly disconnect, requiring two-factor SMS re-authentication every few days.</li>
              <li><strong>Notification Overload:</strong> Constant push alerts turning joint finances into a daily source of phone anxiety.</li>
              <li><strong>Rigid 50/50 Assumptions:</strong> Most apps cannot handle proportional income formulas or 3-pot hybrid account structures.</li>
              <li><strong>Privacy Risks:</strong> Third-party services scraping and storing your transaction data.</li>
            </ul>
            <p>
              A shared Google Sheets budget template gives both partners total privacy, infinite formula customization, and real-time mobile editing with zero ongoing monthly subscription costs.
            </p>
          </div>
        </div>

        {/* Step-by-Step Instructions */}
        <div className="mb-14 p-6 bg-white border border-[#174F4A]/10">
          <h2 className="text-xl font-bold text-[#174F4A] mb-4">
            How to Use the Couples Budget Spreadsheet (Step-by-Step)
          </h2>
          <ol className="list-decimal pl-5 space-y-3 text-sm text-[#4A5D59]">
            <li><strong>Make Your Private Copy:</strong> Click the Google Drive copy link to duplicate the master sheet directly into your own Google Drive.</li>
            <li><strong>Input Net Paychecks:</strong> Enter each partner&apos;s monthly take-home salary to establish your household baseline and proportional split ratios.</li>
            <li><strong>List Fixed Household Overhead:</strong> Populate non-negotiable living expenses (rent, utilities, groceries, Wi-Fi, insurance).</li>
            <li><strong>Set Personal Spending Allowances:</strong> Allocate guilt-free fun money to each partner&apos;s individual checking account.</li>
            <li><strong>Automate Transfers on Payday:</strong> Schedule automatic bank transfers into your joint household bills account.</li>
            <li><strong>Conduct Your 20-Minute Monthly Review:</strong> Meet once a month to review actuals and adjust for upcoming seasonal expenses.</li>
          </ol>
        </div>

        {/* Internal Linking Cluster */}
        <div className="mb-14 p-6 bg-[#FAF6EF] border border-[#174F4A]/10">
          <h2 className="text-lg font-bold text-[#174F4A] mb-3">
            Explore More Couples Finance Resources
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <Link
              href="/tools/couples-expense-split-calculator"
              className="p-3 bg-white border border-[#174F4A]/10 hover:border-[#2C7A73] transition-colors font-medium text-[#174F4A] flex items-center justify-between"
            >
              <span>Split Bills Based on Income Calculator</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#2C7A73]" />
            </Link>
            <Link
              href="/blog/split-bills-based-on-income"
              className="p-3 bg-white border border-[#174F4A]/10 hover:border-[#2C7A73] transition-colors font-medium text-[#174F4A] flex items-center justify-between"
            >
              <span>How to Split Bills Based on Income (Guide)</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#2C7A73]" />
            </Link>
            <Link
              href="/blog/how-to-budget-as-a-couple"
              className="p-3 bg-white border border-[#174F4A]/10 hover:border-[#2C7A73] transition-colors font-medium text-[#174F4A] flex items-center justify-between"
            >
              <span>How to Budget as a Couple (Step-by-Step)</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#2C7A73]" />
            </Link>
            <Link
              href="/blog/how-to-budget-as-a-couple-with-different-incomes"
              className="p-3 bg-white border border-[#174F4A]/10 hover:border-[#2C7A73] transition-colors font-medium text-[#174F4A] flex items-center justify-between"
            >
              <span>Budgeting With Different Incomes</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#2C7A73]" />
            </Link>
            <Link
              href="/blog/how-do-married-couples-split-finances"
              className="p-3 bg-white border border-[#174F4A]/10 hover:border-[#2C7A73] transition-colors font-medium text-[#174F4A] flex items-center justify-between"
            >
              <span>How Married Couples Split Finances</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#2C7A73]" />
            </Link>
            <Link
              href="/blog/how-to-split-finances-with-partner"
              className="p-3 bg-white border border-[#174F4A]/10 hover:border-[#2C7A73] transition-colors font-medium text-[#174F4A] flex items-center justify-between"
            >
              <span>How to Split Finances With Your Partner</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#2C7A73]" />
            </Link>
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-14">
          <h2 className="text-2xl font-bold text-[#174F4A] mb-6 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-[#2C7A73]" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div className="p-5 bg-white border border-[#174F4A]/10">
              <h3 className="font-bold text-[#174F4A] text-sm mb-2">
                Is this couples budget template free to use?
              </h3>
              <p className="text-xs text-[#4A5D59] leading-relaxed">
                Yes. The Togetherly 2-person starter budget template is 100% free. Once copied into your Google Drive, you own your private copy forever with zero recurring subscription charges or hidden fees.
              </p>
            </div>
            <div className="p-5 bg-white border border-[#174F4A]/10">
              <h3 className="font-bold text-[#174F4A] text-sm mb-2">
                Does this template work in Google Sheets and Microsoft Excel?
              </h3>
              <p className="text-xs text-[#4A5D59] leading-relaxed">
                The template is engineered natively for Google Sheets so partners can collaborate simultaneously in real time from mobile phones, laptops, or tablets. You can also export the spreadsheet as an .xlsx file for Microsoft Excel.
              </p>
            </div>
            <div className="p-5 bg-white border border-[#174F4A]/10">
              <h3 className="font-bold text-[#174F4A] text-sm mb-2">
                How does the template handle couples with different incomes?
              </h3>
              <p className="text-xs text-[#4A5D59] leading-relaxed">
                The spreadsheet includes an automated income-proportional split formula. When you enter both partners&apos; net take-home pay, it calculates exact contribution percentages so each partner surrenders the same relative share of their earnings toward household bills.
              </p>
            </div>
            <div className="p-5 bg-white border border-[#174F4A]/10">
              <h3 className="font-bold text-[#174F4A] text-sm mb-2">
                Can married couples use this budget spreadsheet?
              </h3>
              <p className="text-xs text-[#4A5D59] leading-relaxed">
                Yes. The template supports 100% joint pooling, the 3-pot hybrid system (joint bills plus guilt-free personal allowances), and separate accounts with proportional contributions.
              </p>
            </div>
          </div>
        </div>

        {/* WhatsApp & Product Support */}
        <div className="space-y-6">
          <WhatsAppHelpCTA
            topic="couples_budget_template"
            sourcePage="/templates/couples-budget-template"
            headline="Have a question about setting up your budget spreadsheet?"
            subtext="Ask Togetherly — we are happy to guide you through formulas or account setups."
            message="Hi Togetherly! I have a question about setting up a couples budget spreadsheet for our household."
            buttonText="Ask on WhatsApp"
          />
        </div>
      </div>
    </div>
  );
}
