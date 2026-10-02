import type { Metadata } from 'next';
import Link from 'next/link';
import { BadgeCheck, ChevronRight, Mail, Clock, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Refund Policy',
  description:
    'Togetherly refund policy. Read about our 30-day money-back guarantee for the Couples Money Planner and how to easily request a refund.',
  alternates: {
    canonical: '/refund-policy',
  },
  openGraph: {
    title: 'Refund Policy | Togetherly',
    description:
      'Togetherly refund policy. Simple 30-day money-back guarantee for all digital products.',
    url: 'https://gettogetherly.tech/refund-policy',
    siteName: 'Togetherly',
    type: 'website',
  },
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FAF6EF] text-[#243B38] py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-left">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#6F7F7C]">
          <Link href="/" className="hover:text-[#174F4A] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#6F7F7C]/60" />
          <span className="text-[#174F4A] font-semibold">Refund Policy</span>
        </nav>

        {/* Page Header */}
        <header className="space-y-4 border-b border-[#174F4A]/10 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2C7A73]/10 text-xs font-bold text-[#174F4A] uppercase tracking-wider">
            <BadgeCheck className="w-3.5 h-3.5 text-[#2C7A73]" />
            <span>Customer Peace of Mind</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#174F4A] tracking-tight">
            Refund Policy
          </h1>

          <p className="text-xs sm:text-sm text-[#6F7F7C]">
            Last updated: October 2026 · 30-day money-back guarantee
          </p>
        </header>

        {/* Guarantee Callout Box */}
        <div className="bg-[#FFFFFF] p-6 sm:p-8 border border-[#174F4A]/15 space-y-3">
          <div className="flex items-center gap-2 font-bold text-[#174F4A] text-lg">
            <BadgeCheck className="w-5 h-5 text-[#2C7A73]" />
            <span>Our 30-Day Money-Back Guarantee</span>
          </div>
          <p className="text-xs sm:text-sm text-[#6F7F7C] leading-relaxed">
            We want you and your partner to feel completely confident trying Togetherly. If the Couples Money Planner does not simplify your shared household finances or is not the right fit for your relationship, you can request a 100% full refund within 30 days of purchase.
          </p>
        </div>

        {/* Policy Details */}
        <div className="space-y-10 text-sm sm:text-base leading-relaxed text-[#243B38]">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#174F4A]">1. Eligibility Window</h2>
            <p className="text-[#6F7F7C]">
              Refund requests must be submitted within 30 calendar days from the date of your purchase. Because Togetherly digital products are delivered with instant lifetime access, this 30-day window gives you ample time to set up your numbers, test your monthly budget, and experience a full monthly money date.
            </p>
          </section>

          <section className="space-y-3 border-t border-[#174F4A]/10 pt-8">
            <h2 className="text-xl font-bold text-[#174F4A]">2. How to Request a Refund</h2>
            <p className="text-[#6F7F7C]">
              To initiate a refund, simply send an email to our support team:
            </p>
            <div className="p-5 bg-[#FFFFFF] border border-[#174F4A]/15 space-y-2 text-xs sm:text-sm">
              <p>
                <strong>Email:</strong>{' '}
                <a href="mailto:support@gettogetherly.tech" className="text-[#2C7A73] font-bold hover:underline">
                  support@gettogetherly.tech
                </a>
              </p>
              <p>
                <strong>Subject line:</strong> Refund Request — [Your Gumroad Order #]
              </p>
              <p>
                <strong>Required details:</strong> Please include the email address used during purchase and your Gumroad receipt number so we can locate your order immediately.
              </p>
            </div>
            <p className="text-xs text-[#6F7F7C] pt-1">
              You are never required to justify your decision, though any constructive feedback on how we can improve our spreadsheet formulas or onboarding guide is always appreciated.
            </p>
          </section>

          <section className="space-y-3 border-t border-[#174F4A]/10 pt-8">
            <h2 className="text-xl font-bold text-[#174F4A]">3. Processing & Settlement Timeline</h2>
            <p className="text-[#6F7F7C]">
              Once we receive your email, your refund is processed directly through Gumroad within 1 to 2 business days. The funds will be credited back to your original payment method (credit card, debit card, or PayPal). Depending on your bank or card issuer, the credit typically reflects on your statement within 3 to 7 business days.
            </p>
          </section>

          <section className="space-y-3 border-t border-[#174F4A]/10 pt-8">
            <h2 className="text-xl font-bold text-[#174F4A]">4. Need Help Before Refunding?</h2>
            <p className="text-[#6F7F7C]">
              If you ran into a technical hurdle — such as customizing a specific currency symbol, adding unique expense categories, or understanding the proportional math engine — our team is glad to assist you:
            </p>
            <p className="pt-1">
              <a
                href="mailto:support@gettogetherly.tech"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#174F4A] hover:text-[#2C7A73] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#2C7A73]" />
                <span>Contact Priority Support (support@gettogetherly.tech)</span>
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
