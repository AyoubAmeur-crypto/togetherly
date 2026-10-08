import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, ChevronRight, AlertCircle } from 'lucide-react';

import { absoluteUrl } from '@/config/site';
import { getBreadcrumbListSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Togetherly terms of service. Understand product license terms, software requirements, and service boundaries for our digital financial systems.',
  alternates: {
    canonical: '/terms',
  },
  openGraph: {
    title: 'Terms of Service | Togetherly',
    description:
      'Togetherly terms of service. Personal license terms and informational usage boundaries for our digital spreadsheet products.',
    url: absoluteUrl('/terms'),
    siteName: 'Togetherly',
    type: 'website',
  },
};

export default function TermsPage() {
  const breadcrumbsJsonLd = getBreadcrumbListSchema([
    { name: 'Home', path: '/' },
    { name: 'Terms of Service', path: '/terms' },
  ]);

  return (
    <div className="min-h-screen bg-[#FAF6EF] text-[#243B38] py-12 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-left">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#6F7F7C]">
          <Link href="/" className="hover:text-[#174F4A] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#6F7F7C]/60" />
          <span className="text-[#174F4A] font-semibold">Terms of Service</span>
        </nav>

        {/* Page Header */}
        <header className="space-y-4 border-b border-[#174F4A]/10 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2C7A73]/10 text-xs font-bold text-[#174F4A] uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5 text-[#2C7A73]" />
            <span>Legal Agreement</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#174F4A] tracking-tight">
            Terms of Service
          </h1>

          <p className="text-xs sm:text-sm text-[#6F7F7C]">
            Last updated: October 2026 · Effective immediately
          </p>
        </header>

        {/* Document Sections */}
        <div className="space-y-10 text-sm sm:text-base leading-relaxed text-[#243B38]">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#174F4A]">1. Agreement to Terms</h2>
            <p className="text-[#6F7F7C]">
              By accessing our website at gettogetherly.tech or purchasing any digital product created by Togetherly, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site and our digital templates.
            </p>
          </section>

          <section className="space-y-3 border-t border-[#174F4A]/10 pt-8">
            <h2 className="text-xl font-bold text-[#174F4A]">2. Digital Product License & Personal Use</h2>
            <p className="text-[#6F7F7C]">
              Upon purchasing the Togetherly Couples Money Planner (or any related digital product), Togetherly grants you a revocable, non-exclusive, non-transferable, personal license to use the Google Sheets template for your own household personal financial organization.
            </p>
            <div className="bg-[#FFFFFF] p-5 border border-[#174F4A]/15 space-y-2 text-xs sm:text-sm">
              <p className="font-bold text-[#174F4A]">License Restrictions:</p>
              <ul className="list-disc pl-5 space-y-1 text-[#6F7F7C]">
                <li>You may share the template with your romantic partner / spouse for joint household management.</li>
                <li>You may not resell, redistribute, sub-license, publicly publish, or commercially exploit the spreadsheet formulas, design, or layout.</li>
                <li>You may not claim authorship or ownership over Togetherly template assets.</li>
              </ul>
            </div>
          </section>

          <section className="space-y-3 border-t border-[#174F4A]/10 pt-8">
            <h2 className="text-xl font-bold text-[#174F4A]">3. Informational Nature & Financial Disclaimer</h2>
            <div className="bg-[#FAF6EF] p-5 border border-[#F29B7F]/40 space-y-2 text-xs sm:text-sm">
              <div className="flex items-center gap-2 font-bold text-[#174F4A]">
                <AlertCircle className="w-4 h-4 text-[#F29B7F]" />
                <span>No Certified Financial, Tax, or Legal Advice</span>
              </div>
              <p className="text-[#6F7F7C] leading-relaxed">
                Togetherly digital templates and educational content are designed solely for personal financial organization, communication, and budgeting. Togetherly is not an investment adviser, certified financial planner (CFP), accountant, or legal professional. Our systems do not provide certified investment advice, tax strategy, or legal counsel. You are solely responsible for your household financial decisions.
              </p>
            </div>
          </section>

          <section className="space-y-3 border-t border-[#174F4A]/10 pt-8">
            <h2 className="text-xl font-bold text-[#174F4A]">4. System Requirements & Google Account</h2>
            <p className="text-[#6F7F7C]">
              Togetherly products are designed specifically for Google Sheets. You must have an active, free Google account to duplicate and use the template. Togetherly is not affiliated with, endorsed by, or sponsored by Google LLC. Google Sheets™ is a trademark of Google LLC.
            </p>
          </section>

          <section className="space-y-3 border-t border-[#174F4A]/10 pt-8">
            <h2 className="text-xl font-bold text-[#174F4A]">5. Orders & Payments</h2>
            <p className="text-[#6F7F7C]">
              Transactions are completed through Gumroad. All prices are listed in USD unless otherwise displayed at checkout. Digital products are delivered immediately upon successful payment via a 1-click Google Drive copy link.
            </p>
          </section>

          <section className="space-y-3 border-t border-[#174F4A]/10 pt-8">
            <h2 className="text-xl font-bold text-[#174F4A]">6. Refunds</h2>
            <p className="text-[#6F7F7C]">
              We honor a 30-day money-back guarantee on the Couples Money Planner. For details on how to submit a refund request, please review our dedicated{' '}
              <Link href="/refund-policy" className="text-[#2C7A73] font-bold hover:underline">
                Refund Policy
              </Link>.
            </p>
          </section>

          <section className="space-y-3 border-t border-[#174F4A]/10 pt-8">
            <h2 className="text-xl font-bold text-[#174F4A]">7. Contact</h2>
            <p className="text-[#6F7F7C]">
              For questions regarding these Terms of Service, please reach out to:
            </p>
            <div className="p-4 bg-[#FFFFFF] border border-[#174F4A]/10 inline-block text-xs sm:text-sm">
              <span className="font-semibold text-[#174F4A]">Email:</span>{' '}
              <a href="mailto:support@gettogetherly.tech" className="text-[#2C7A73] hover:underline font-bold">
                support@gettogetherly.tech
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
