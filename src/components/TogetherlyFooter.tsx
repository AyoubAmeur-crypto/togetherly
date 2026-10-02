'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Heart,
  ArrowUpRight,
  FileSpreadsheet,
  BadgeCheck,
  Calculator,
  BookOpen,
} from 'lucide-react';
import { togetherlyBrand, TOGETHERLY_CHECKOUT_URL } from '../config/productConfig';
import { trackCheckoutClick } from '../lib/analytics';

export default function TogetherlyFooter() {
  const handleCheckoutClick = () => {
    trackCheckoutClick({
      product: 'Togetherly Couples Money Planner',
      price: 19,
      currency: 'USD',
      cta_location: 'footer_bottom_bar',
    });
  };

  return (
    <footer className="w-full bg-[#FAF6EF] text-[#243B38] pt-14 sm:pt-20 pb-10 sm:pb-12 border-t border-[#174F4A]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 sm:gap-12 lg:gap-16 xl:gap-24 pb-12 sm:pb-16 border-b border-[#174F4A]/10">
          {/* Brand Ethos Column */}
          <div className="w-full lg:w-[32%] xl:w-[28%] space-y-4 sm:space-y-5 shrink-0">
            <Link href="/" className="inline-block cursor-pointer">
              <img
                src={togetherlyBrand.assets.logoPrimary}
                alt="Togetherly"
                className="h-9 sm:h-11 w-auto object-contain"
              />
            </Link>

            <p className="text-xs sm:text-sm font-bold text-[#D96B43] tracking-wide">
              {togetherlyBrand.tagline}
            </p>

            <p className="text-xs text-[#6F7F7C] leading-relaxed max-w-md lg:max-w-none">
              The complete 8-sheet Google Sheets system designed for modern couples. Plan shared living, automate fair income-weighted splits, and build long-term security in total harmony.
            </p>

            {/* Trust Markers */}
            <div className="pt-2 space-y-2.5 text-xs text-[#243B38]/80">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2C7A73] shrink-0" />
                <span>100% Private Google Sheets — Zero Bank Passwords</span>
              </div>
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-[#2C7A73] shrink-0" />
                <span>Works on any web browser, iPad, iOS & Android</span>
              </div>
              <div className="flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-[#2C7A73] shrink-0" />
                <span>One-time payment • Lifetime personal license</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="w-full flex-1 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 lg:gap-10 xl:gap-14 pt-2 lg:pt-0">
            {/* Column 1: Products & Tools */}
            <div className="space-y-3.5 sm:space-y-4">
              <h4 className="text-xs font-bold text-[#174F4A] uppercase tracking-wider">
                Products & Tools
              </h4>
              <ul className="space-y-2.5 sm:space-y-3.5 text-xs text-[#6F7F7C]">
                <li>
                  <Link
                    href="/products/couples-money-planner"
                    className="hover:text-[#174F4A] transition-colors inline-flex items-center gap-1.5 font-semibold text-[#174F4A] py-1"
                  >
                    <span>Couples Money Planner</span>
                    <FileSpreadsheet className="w-3 h-3 text-[#D96B43]" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/couples-money-planner#showcase"
                    className="hover:text-[#174F4A] transition-colors text-left block text-[#6F7F7C] py-1"
                  >
                    8-Sheet Explorer
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tools/couples-expense-split-calculator"
                    className="hover:text-[#174F4A] transition-colors inline-flex items-center gap-1.5 text-[#174F4A] font-medium py-1"
                  >
                    <span>Expense Split Calculator</span>
                    <Calculator className="w-3 h-3 text-[#2C7A73]" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tools"
                    className="hover:text-[#174F4A] transition-colors text-left block text-[#6F7F7C] py-1"
                  >
                    Free Tools Directory
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Explore & Guides */}
            <div className="space-y-3.5 sm:space-y-4">
              <h4 className="text-xs font-bold text-[#174F4A] uppercase tracking-wider">
                Explore & Learn
              </h4>
              <ul className="space-y-2.5 sm:space-y-3.5 text-xs text-[#6F7F7C]">
                <li>
                  <Link href="/" className="hover:text-[#174F4A] transition-colors text-left block cursor-pointer py-1">
                    Story & Brand Philosophy
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-[#174F4A] transition-colors inline-flex items-center gap-1.5 text-[#174F4A] font-medium py-1">
                    <span>Blog & Guides</span>
                    <BookOpen className="w-3 h-3 text-[#2C7A73]" />
                  </Link>
                </li>
                <li>
                  <Link href="/tools/couples-expense-split-calculator#split-guide" className="hover:text-[#174F4A] transition-colors text-left block cursor-pointer py-1">
                    50/50 vs Proportional Splitting
                  </Link>
                </li>
                <li>
                  <Link href="/products/couples-money-planner#faq" className="hover:text-[#174F4A] transition-colors text-left block cursor-pointer py-1">
                    Frequently Asked Questions
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:support@gettogetherly.tech"
                    className="hover:text-[#174F4A] transition-colors text-left block cursor-pointer py-1"
                  >
                    Contact Support
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Trust & Legal */}
            <div className="space-y-3.5 sm:space-y-4">
              <h4 className="text-xs font-bold text-[#174F4A] uppercase tracking-wider">
                Trust & Legal
              </h4>
              <ul className="space-y-2.5 sm:space-y-3.5 text-xs text-[#6F7F7C]">
                <li>
                  <Link href="/privacy" className="hover:text-[#174F4A] transition-colors text-left block cursor-pointer py-1">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-[#174F4A] transition-colors text-left block cursor-pointer py-1">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/refund-policy" className="hover:text-[#174F4A] transition-colors text-left block cursor-pointer py-1">
                    Refund Policy
                  </Link>
                </li>
                <li>
                  <span className="block py-1 text-[#243B38]/70">Zero Bank Linking Required</span>
                </li>
                <li>
                  <span className="block py-1 text-[#243B38]/70">30-Day Money-Back Guarantee</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-5 text-xs text-[#6F7F7C] text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-2 sm:gap-4 flex-wrap">
            <div className="flex items-center justify-center sm:justify-start gap-1.5">
              <span>© {new Date().getFullYear()} Togetherly. Designed with</span>
              <Heart className="w-3.5 h-3.5 text-[#D96B43] fill-[#D96B43]" />
              <span>for couples everywhere.</span>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-[#6F7F7C]">
              <Link href="/privacy" className="hover:underline">Privacy</Link>
              <span>•</span>
              <Link href="/terms" className="hover:underline">Terms</Link>
              <span>•</span>
              <Link href="/refund-policy" className="hover:underline">Refunds</Link>
            </div>
          </div>

          <div className="w-full sm:w-auto flex items-center justify-center">
            <a
              href={TOGETHERLY_CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleCheckoutClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-xs font-extrabold text-[#FAF6EF] bg-[#174F4A] hover:bg-[#0F3834] px-6 py-3 rounded-none transition-colors shadow-none tracking-tight cursor-pointer"
            >
              <span>Buy Couples Money Planner ($19)</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#F29B7F]" />
            </a>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-8 pt-4 border-t border-[#174F4A]/10 text-[11px] text-[#6F7F7C]/80 text-center leading-relaxed">
          Disclaimer: Togetherly digital products provide financial organization and budgeting templates for personal use. They do not constitute certified legal, tax, or investment advice. Google Sheets™ is a registered trademark of Google LLC.
        </div>
      </div>
    </footer>
  );
}
