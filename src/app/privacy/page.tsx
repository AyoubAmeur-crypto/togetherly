import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Lock, EyeOff, Server, Mail, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Togetherly privacy policy. Learn how we handle customer data, website analytics, and why our Google Sheets products keep your financial records 100% private.',
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | Togetherly',
    description:
      'Togetherly privacy policy. Zero financial data stored on our servers. 100% private in your personal Google Drive.',
    url: 'https://gettogetherly.tech/privacy',
    siteName: 'Togetherly',
    type: 'website',
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FAF6EF] text-[#243B38] py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-left">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#6F7F7C]">
          <Link href="/" className="hover:text-[#174F4A] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#6F7F7C]/60" />
          <span className="text-[#174F4A] font-semibold">Privacy Policy</span>
        </nav>

        {/* Page Header */}
        <header className="space-y-4 border-b border-[#174F4A]/10 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2C7A73]/10 text-xs font-bold text-[#174F4A] uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2C7A73]" />
            <span>Data Transparency</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#174F4A] tracking-tight">
            Privacy Policy
          </h1>

          <p className="text-xs sm:text-sm text-[#6F7F7C]">
            Last updated: October 2026 · Effective immediately
          </p>
        </header>

        {/* Core Architecture Highlight */}
        <div className="bg-[#FFFFFF] p-6 sm:p-8 border border-[#174F4A]/15 space-y-3">
          <div className="flex items-center gap-2 font-bold text-[#174F4A] text-base">
            <EyeOff className="w-5 h-5 text-[#2C7A73]" />
            <span>The Togetherly Privacy Guarantee: Your Numbers Stay Yours</span>
          </div>
          <p className="text-xs sm:text-sm text-[#6F7F7C] leading-relaxed">
            Togetherly digital products are built natively as Google Sheets templates. When you purchase our planner, you create your own private copy directly inside your personal Google Drive account. Togetherly never accesses, collects, reads, or transmits your income, transactions, expenses, bills, or bank passwords.
          </p>
        </div>

        {/* Document Sections */}
        <div className="space-y-10 text-sm sm:text-base leading-relaxed text-[#243B38]">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#174F4A]">1. Information We Do Not Collect</h2>
            <p className="text-[#6F7F7C]">
              Unlike traditional budgeting software or bank-linking fintech applications, Togetherly does not connect to your financial institutions via Plaid, MX, Yodlee, or any aggregator. Specifically:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#6F7F7C] text-xs sm:text-sm">
              <li>We do not collect or store your bank credentials, passwords, or account numbers.</li>
              <li>We do not see or record the salary, income, or debt figures you enter into your spreadsheet.</li>
              <li>We do not monitor your expense categorizations, transaction history, or savings balances.</li>
            </ul>
          </section>

          <section className="space-y-3 border-t border-[#174F4A]/10 pt-8">
            <h2 className="text-xl font-bold text-[#174F4A]">2. Information Collected During Purchase</h2>
            <p className="text-[#6F7F7C]">
              Payments for Togetherly digital products are processed securely through Gumroad (Gumroad, Inc.), our merchant of record.
            </p>
            <p className="text-[#6F7F7C]">
              When you purchase a product, Gumroad collects necessary payment information (such as your email address, billing country, and payment card details) to fulfill the transaction and issue receipts. Togetherly does not store payment card numbers on its servers. For details on Gumroad’s security and privacy practices, please review the Gumroad Privacy Policy.
            </p>
          </section>

          <section className="space-y-3 border-t border-[#174F4A]/10 pt-8">
            <h2 className="text-xl font-bold text-[#174F4A]">3. Website Analytics & Technical Logs</h2>
            <p className="text-[#6F7F7C]">
              When you visit gettogetherly.tech, standard technical information may be recorded by our hosting infrastructure and web performance tooling:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#6F7F7C] text-xs sm:text-sm">
              <li>IP address, browser user-agent, operating system, and language settings.</li>
              <li>Pages visited, referring URLs, and general site interaction events (such as button clicks).</li>
            </ul>
            <p className="text-[#6F7F7C] text-xs sm:text-sm pt-1">
              This information is used strictly to maintain website security, monitor site speed, and evaluate high-level site usability.
            </p>
          </section>

          <section className="space-y-3 border-t border-[#174F4A]/10 pt-8">
            <h2 className="text-xl font-bold text-[#174F4A]">4. Third-Party Services</h2>
            <p className="text-[#6F7F7C]">
              Our site and product operations rely on trusted third-party providers:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#6F7F7C] text-xs sm:text-sm">
              <li><strong>Google LLC (Google Sheets):</strong> Hosts your copied spreadsheet under your own Google account subject to Google’s Privacy Policy and Terms of Service.</li>
              <li><strong>Gumroad, Inc.:</strong> Processes payments and handles initial digital download delivery.</li>
            </ul>
          </section>

          <section className="space-y-3 border-t border-[#174F4A]/10 pt-8">
            <h2 className="text-xl font-bold text-[#174F4A]">5. Your Data Rights</h2>
            <p className="text-[#6F7F7C]">
              Because your financial calculations reside entirely within your own Google Drive, you retain full and complete control over your data. You may delete your spreadsheet, revoke partner sharing permissions, or export your numbers at any time directly through Google Drive without contacting Togetherly.
            </p>
          </section>

          <section className="space-y-3 border-t border-[#174F4A]/10 pt-8">
            <h2 className="text-xl font-bold text-[#174F4A]">6. Contact Us</h2>
            <p className="text-[#6F7F7C]">
              If you have any questions about this Privacy Policy or our data protection architecture, please contact us at:
            </p>
            <div className="p-4 bg-[#FFFFFF] border border-[#174F4A]/10 inline-block text-xs sm:text-sm">
              <span className="font-semibold text-[#174F4A]">Togetherly Support:</span>{' '}
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
