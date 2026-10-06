'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  FileSpreadsheet,
  ChevronDown,
  Layers,
  Scale,
  PiggyBank,
  HeartHandshake,
  Receipt,
  ArrowDown,
  Palmtree,
  Home,
  Heart,
  Package,
  Car,
  Lock,
  HardDrive,
  Users,
  EyeOff,
  ShieldAlert
} from 'lucide-react';
import FairSplitCalculator from './FairSplitCalculator';
import WhatsAppHelpCTA from './WhatsAppHelpCTA';
import FloatingWhatsAppCTA from './FloatingWhatsAppCTA';
import EmailSubscribeSection from './EmailSubscribeSection';
import {
  couplesMoneyPlanner,
  togetherlyBrand,
  TOGETHERLY_CHECKOUT_URL
} from '../config/productConfig';
import { trackProductView, trackCheckoutClick } from '../lib/analytics';

export default function CouplesMoneyPlannerView() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'monthly' | 'bills'>('dashboard');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const showcaseContentRef = useRef<HTMLDivElement>(null);
  const prevTabRef = useRef(activeTab);

  useEffect(() => {
    trackProductView({
      product: 'Togetherly Couples Money Planner',
      price: 19,
      currency: 'USD',
    });
  }, []);

  const handleCheckoutClick = (ctaLocation: string) => {
    trackCheckoutClick({
      product: 'Togetherly Couples Money Planner',
      price: 19,
      currency: 'USD',
      cta_location: ctaLocation,
    });
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const showcaseTabs = [
    {
      id: 'dashboard' as const,
      label: 'Financial Dashboard',
      hasScreen: true,
      screenshot: '/togetherly/dashboard.png',
      alt: 'Togetherly Couples Money Planner Financial Dashboard in Google Sheets',
      title: 'Your Entire Household Cash Flow at a Single Glance',
      description:
        'A unified executive overview tracking monthly household income, actual expenses, savings rate, and real-time fair-split reimbursement balance.',
      highlights: [
        'Total income, expense, and savings rate KPI metric cards',
        'Dynamic monthly budget progress vs. actual cash outflow gauges',
        'Real-time fair-split balance card showing who reimburses whom',
        'Clean high-contrast design optimized for calm, stress-free review',
      ],
    },
    {
      id: 'monthly' as const,
      label: 'Monthly Budget Plan',
      hasScreen: true,
      screenshot: '/togetherly/monthly-plan.png',
      alt: 'Togetherly Monthly Budget Planner in Google Sheets',
      title: 'Planned vs. Actual Spending Across 9 Essential Categories',
      description:
        'Set category budget targets at the start of the month and track actual expenditures in real time without complicated bookkeeping.',
      highlights: [
        '9 pre-built categories: Housing, Groceries, Dining, Utilities, Travel, Health, etc.',
        'Automatic variance tracking: immediately see if you are under or over budget',
        'Clear breakdown separating shared household expenses from personal spending',
        'Zero formulas to type — all totals calculate dynamically and error-free',
      ],
    },
    {
      id: 'bills' as const,
      label: 'Recurring Bills Tracker',
      hasScreen: false,
      screenshot: '',
      alt: 'Togetherly Recurring Bills Tracker in Google Sheets',
      title: 'Keep Recurring Bills From Becoming Recurring Conversations',
      description:
        'Centralize rent, utilities, insurance, subscriptions, and mortgage due dates. Never double-pay or miss a payment again.',
      highlights: [
        'Organized schedule of monthly due dates and autopay flags',
        'Explicit payment ownership: clearly see which partner pays which provider',
        'Monthly paid/pending status checklists to ensure complete visibility',
        'Smoothly integrates into the monthly budget and shared expense totals',
      ],
    },
  ];

  const currentTabItem = showcaseTabs.find((t) => t.id === activeTab) || showcaseTabs[0];

  // Smooth slide animation when switching tabs in the showcase section
  useEffect(() => {
    if (showcaseContentRef.current) {
      const tabOrder = ['dashboard', 'monthly', 'bills'];
      const prevIndex = tabOrder.indexOf(prevTabRef.current);
      const currentIndex = tabOrder.indexOf(activeTab);
      const direction = currentIndex >= prevIndex ? 22 : -22;
      prevTabRef.current = activeTab;

      gsap.fromTo(
        showcaseContentRef.current,
        { opacity: 0, x: direction },
        { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' }
      );
    }
  }, [activeTab]);

  // Schema.org structured data (100% factual)
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Togetherly — Couples Money Planner',
    image: 'https://gettogetherly.tech/togetherly/tablet.png',
    description:
      'The complete 8-sheet Google Sheets financial planning system for couples. Plan monthly budgets, track expenses, automate fair splits, and build savings goals together.',
    brand: {
      '@type': 'Brand',
      name: 'Togetherly',
    },
    offers: {
      '@type': 'Offer',
      price: '19.00',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: TOGETHERLY_CHECKOUT_URL,
      seller: {
        '@type': 'Organization',
        name: 'Togetherly',
      },
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
        name: 'Products',
        item: 'https://gettogetherly.tech/products',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Couples Money Planner',
        item: 'https://gettogetherly.tech/products/couples-money-planner',
      },
    ],
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#FAF6EF] text-[#243B38] font-sans antialiased selection:bg-[#F29B7F]/30 selection:text-[#174F4A]">
      {/* Inject Factual Product & Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />

      <main>
        {/* ========================================================================= */}
        {/* 1. HERO SECTION (Bigger Tablet Mockup, No Outer Frame Div, No Shadows)    */}
        {/* ========================================================================= */}
        <section className="relative pt-8 sm:pt-14 pb-16 sm:pb-24 overflow-hidden bg-[#FAF6EF] border-b border-[#174F4A]/10">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-[#2C7A73]/12 to-transparent rounded-none blur-3xl pointer-events-none -z-10" />
          <div className="absolute bottom-0 left-10 w-[500px] h-[400px] bg-gradient-to-tr from-[#174F4A]/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* LEFT COLUMN: Copy, Price & Actions */}
              <div className="lg:col-span-5 order-2 lg:order-1 space-y-5 text-left">
                {/* Single H1 with refined, balanced typography and dual-green tone */}
                <h1 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-extrabold text-[#174F4A] tracking-tight leading-[1.12]">
                  Plan your money together, <br className="hidden sm:inline" />
                  <span className="text-[#2C7A73]">without making money complicated.</span>
                </h1>

                {/* Copy */}
                <p className="text-sm sm:text-base lg:text-[17px] text-[#6F7F7C] leading-relaxed max-w-lg">
                  The Couples Money Planner gives you one shared couples budget planner and Google Sheets template to plan your monthly budget, track shared expenses, split costs fairly, manage bills, and build toward your goals together.
                </p>

                {/* Price */}
                <div className="pt-0.5 flex items-center gap-3">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#174F4A] tracking-tight leading-none">
                    $19
                  </span>
                  <div className="h-5 w-px bg-[#174F4A]/20" />
                  <span className="text-xs sm:text-[13px] font-medium text-[#6F7F7C]">
                    One-time purchase · Lifetime access
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="pt-1.5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <a
                    href={TOGETHERLY_CHECKOUT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleCheckoutClick('product_hero')}
                    className="inline-flex items-center justify-center gap-2 bg-[#174F4A] hover:bg-[#0F3834] text-[#FAF6EF] text-sm sm:text-[15px] font-bold px-6 sm:px-7 py-3 sm:py-3.5 rounded-none transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-none tracking-tight"
                  >
                    <span>Get the Planner — $19</span>
                    <ArrowRight className="w-4 h-4 ml-0.5" />
                  </a>

                  <a
                    href="#showcase"
                    className="inline-flex items-center justify-center gap-2 bg-[#FFFFFF] hover:bg-[#FAF6EF] text-[#174F4A] text-sm sm:text-[15px] font-semibold px-5 sm:px-6 py-3 sm:py-3.5 rounded-none border border-[#174F4A]/20 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-none"
                  >
                    <span>See what&apos;s inside</span>
                    <ArrowDown className="w-4 h-4 text-[#2C7A73]" />
                  </a>
                </div>

                {/* Trust Line */}
                <div className="flex items-center gap-2 pt-0.5 text-xs text-[#6F7F7C] font-medium">
                  <ShieldCheck className="w-4 h-4 text-[#2C7A73] shrink-0" />
                  <span>Google Sheets · Instant access · No subscription</span>
                </div>
              </div>

              {/* RIGHT COLUMN: Tablet Product Mockup (Bigger, Clean, No Frame Box, No Zoom, No Shadow) */}
              <div className="lg:col-span-7 order-1 lg:order-2 flex justify-center lg:justify-end">
                <img
                  src="/togetherly/tablet.png"
                  alt="Togetherly Couples Money Planner tablet mockup in Google Sheets"
                  className="w-full max-w-xl sm:max-w-2xl lg:max-w-3xl xl:max-w-4xl h-auto object-contain select-none shadow-none"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. QUICK BENEFITS                                                         */}
        {/* ========================================================================= */}
        <section className="py-14 sm:py-20 bg-[#FFFFFF] border-b border-[#174F4A]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center">
              <img
                src={togetherlyBrand.assets.logoPrimary}
                alt="Togetherly"
                className="h-10 sm:h-11 w-auto object-contain mx-auto"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Benefit 1 */}
              <div className="p-6 bg-[#FAF6EF] border border-[#174F4A]/10 rounded-none space-y-2.5 transition-all duration-300 hover:-translate-y-1 hover:border-[#174F4A]/25 hover:shadow-sm">
                <div className="w-9 h-9 rounded-none bg-[#174F4A]/10 text-[#174F4A] flex items-center justify-center font-bold text-sm">
                  <Layers className="w-4 h-4 text-[#2C7A73]" />
                </div>
                <h3 className="text-base font-extrabold text-[#174F4A]">Plan Together</h3>
                <p className="text-xs sm:text-sm text-[#6F7F7C] leading-relaxed">
                  One shared view of your household finances across incomes, budgets, and bills.
                </p>
              </div>

              {/* Benefit 2 */}
              <div className="p-6 bg-[#FAF6EF] border border-[#174F4A]/10 rounded-none space-y-2.5 transition-all duration-300 hover:-translate-y-1 hover:border-[#174F4A]/25 hover:shadow-sm">
                <div className="w-9 h-9 rounded-none bg-[#174F4A]/10 text-[#174F4A] flex items-center justify-center font-bold text-sm">
                  <Scale className="w-4 h-4 text-[#2C7A73]" />
                </div>
                <h3 className="text-base font-extrabold text-[#174F4A]">Split Fairly</h3>
                <p className="text-xs sm:text-sm text-[#6F7F7C] leading-relaxed">
                  Choose 50/50, income-based, or custom splitting with automatic settlement calculations.
                </p>
              </div>

              {/* Benefit 3 */}
              <div className="p-6 bg-[#FAF6EF] border border-[#174F4A]/10 rounded-none space-y-2.5 transition-all duration-300 hover:-translate-y-1 hover:border-[#174F4A]/25 hover:shadow-sm">
                <div className="w-9 h-9 rounded-none bg-[#174F4A]/10 text-[#174F4A] flex items-center justify-center font-bold text-sm">
                  <PiggyBank className="w-4 h-4 text-[#2C7A73]" />
                </div>
                <h3 className="text-base font-extrabold text-[#174F4A]">Save Together</h3>
                <p className="text-xs sm:text-sm text-[#6F7F7C] leading-relaxed">
                  Track the goals you&apos;re building toward: emergency savings, holidays, weddings, and homes.
                </p>
              </div>

              {/* Benefit 4 */}
              <div className="p-6 bg-[#FAF6EF] border border-[#174F4A]/10 rounded-none space-y-2.5 transition-all duration-300 hover:-translate-y-1 hover:border-[#174F4A]/25 hover:shadow-sm">
                <div className="w-9 h-9 rounded-none bg-[#174F4A]/10 text-[#174F4A] flex items-center justify-center font-bold text-sm">
                  <HeartHandshake className="w-4 h-4 text-[#2C7A73]" />
                </div>
                <h3 className="text-base font-extrabold text-[#174F4A]">Review Together</h3>
                <p className="text-xs sm:text-sm text-[#6F7F7C] leading-relaxed">
                  Use your monthly Money Date routine to stay emotionally aligned and celebrate wins.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. PROBLEM → SOLUTION                                                     */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-28 bg-[#FAF6EF] border-b border-[#174F4A]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
              <img
                src={togetherlyBrand.assets.logoPrimary}
                alt="Togetherly"
                className="h-10 sm:h-11 w-auto object-contain mx-auto mb-10"
              />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#174F4A] tracking-tight">
                Money gets complicated when two lives become one household.
              </h2>
              <p className="text-sm sm:text-base text-[#6F7F7C] leading-relaxed max-w-2xl mx-auto">
                Combining lives doesn&apos;t mean losing financial peace. Togetherly brings clarity to the questions every modern couple faces.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Real Situations & Questions */}
              <div className="bg-[#FFFFFF] p-8 sm:p-10 border border-[#174F4A]/10 rounded-none space-y-6 transition-all duration-300 hover:border-[#174F4A]/25">
                <div className="text-xs font-bold uppercase tracking-wider text-[#6F7F7C]">
                  The Daily Reality for Couples
                </div>

                <div className="space-y-3">
                  <div className="text-sm font-semibold text-[#174F4A]">Common shared situations:</div>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#6F7F7C]">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#F29B7F] rounded-full shrink-0" />
                      <span>Different incomes between partners</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#F29B7F] rounded-full shrink-0" />
                      <span>Shared bills mixed with personal accounts</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#F29B7F] rounded-full shrink-0" />
                      <span>Individual spending alongside joint living expenses</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#F29B7F] rounded-full shrink-0" />
                      <span>Recurring subscriptions and scattered utility due dates</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#F29B7F] rounded-full shrink-0" />
                      <span>Long-term savings goals that lack concrete targets</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-2 border-t border-[#174F4A]/10 space-y-2 text-xs sm:text-sm italic text-[#6F7F7C]">
                  <p>&ldquo;Who paid for groceries on Tuesday?&rdquo;</p>
                  <p>&ldquo;How much should each person contribute fairly?&rdquo;</p>
                  <p>&ldquo;Are we staying within our budget this month?&rdquo;</p>
                  <p>&ldquo;How close are we to our shared down payment goal?&rdquo;</p>
                </div>
              </div>

              {/* The Togetherly Solution */}
              <div className="bg-[#174F4A] text-[#FAF6EF] p-8 sm:p-10 border border-[#2C7A73]/30 rounded-none space-y-6 flex flex-col justify-between transition-all duration-300 hover:border-[#2C7A73]/60">
                <div className="space-y-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#F29B7F]">
                    The Togetherly Difference
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#FAF6EF] leading-snug">
                    Togetherly puts the answers in one place.
                  </h3>

                  <p className="text-xs sm:text-sm text-[#FAF6EF]/85 leading-relaxed">
                    Instead of guessing through endless banking apps or arguing over split calculations, both of you open a single synchronized Google Sheet designed for calm clarity.
                  </p>

                  <ul className="space-y-3 pt-2 text-xs sm:text-sm text-[#FAF6EF]/90">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#F29B7F] shrink-0 mt-0.5" />
                      <span>One shared place for joint income, bills, and monthly cash flow.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#F29B7F] shrink-0 mt-0.5" />
                      <span>Transparent math: pick 50/50 or proportional to income without debate.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#F29B7F] shrink-0 mt-0.5" />
                      <span>Automatic settlement displays who owes whom at month end.</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#FAF6EF]/15">
                  <a
                    href={TOGETHERLY_CHECKOUT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleCheckoutClick('product_three_pot_card')}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#FAF6EF] hover:bg-white text-[#174F4A] text-sm font-extrabold py-3.5 px-6 rounded-none transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    <span>Get the Planner — $19</span>
                    <ArrowRight className="w-4 h-4 ml-0.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. PRODUCT SHOWCASE (Static, Clean Background-Matching, No Hover Scaling) */}
        {/* ========================================================================= */}
        <section id="showcase" className="py-20 sm:py-28 bg-[#FFFFFF] border-b border-[#174F4A]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#174F4A] tracking-tight">
                One planner. Your shared financial picture.
              </h2>
              <p className="text-base text-[#6F7F7C] leading-relaxed max-w-2xl mx-auto">
                Explore the actual spreadsheet. High-contrast, beautifully styled Google Sheets designed for clarity, zero formula complexity, and daily ease of use.
              </p>
            </div>

            {/* Tab Navigation Controls */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 border-b border-[#174F4A]/10 pb-4">
              {showcaseTabs.map((item) => {
                const isActive = item.id === activeTab;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold rounded-none transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer ${
                      isActive
                        ? 'bg-[#174F4A] text-[#FAF6EF] shadow-none'
                        : 'bg-[#FAF6EF] text-[#6F7F7C] hover:text-[#174F4A] hover:bg-[#FAF6EF]/80 border border-[#174F4A]/10'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Active Sheet Display (Color matches background, static display, no scaling, no shadows) */}
            <div ref={showcaseContentRef} className="bg-[#FAF6EF] border border-[#174F4A]/10 p-6 sm:p-10 rounded-none space-y-8 shadow-none">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Description Column */}
                <div
                  className={`lg:col-span-5 space-y-5 text-left ${
                    currentTabItem.hasScreen ? 'order-2 lg:order-1' : 'order-1'
                  }`}
                >
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#2C7A73]">
                    Sheet Explorer
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#174F4A] leading-tight">
                    {currentTabItem.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6F7F7C] leading-relaxed">
                    {currentTabItem.description}
                  </p>

                  <ul className="space-y-3 pt-2">
                    {currentTabItem.highlights.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#243B38]">
                        <CheckCircle2 className="w-4 h-4 text-[#2C7A73] shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Screenshot / Details Visual Column */}
                <div
                  className={`lg:col-span-7 ${
                    currentTabItem.hasScreen
                      ? 'order-1 lg:order-2'
                      : 'order-2 self-stretch flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-[#174F4A]/10 pt-8 lg:pt-0 lg:pl-10 xl:pl-12'
                  }`}
                >
                  {currentTabItem.hasScreen ? (
                    <div className="bg-[#FAF6EF] flex items-center justify-center">
                      <img
                        src={currentTabItem.screenshot}
                        alt={currentTabItem.alt}
                        className="w-full h-auto object-contain select-none rounded-none border-none shadow-none"
                      />
                    </div>
                  ) : (
                    /* Recurring Bills: clean direct content separated by the divider line */
                    <div className="flex flex-col items-center justify-center space-y-5 text-center py-6 sm:py-10">
                      <img
                        src={togetherlyBrand.assets.logoPrimary}
                        alt="Togetherly"
                        className="h-10 sm:h-12 w-auto object-contain mx-auto"
                      />
                      <div className="space-y-2 max-w-md mx-auto">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#2C7A73] block">
                          Integrated 8-Sheet Architecture
                        </span>
                        <h4 className="text-xl sm:text-2xl font-extrabold text-[#174F4A]">
                          Recurring Bills & Subscriptions
                        </h4>
                        <p className="text-xs sm:text-sm text-[#6F7F7C] leading-relaxed">
                          Organized schedule of monthly due dates, autopay statuses, and payment ownership that automatically feeds into the household budget.
                        </p>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-xs text-[#243B38] font-medium pt-1">
                        <CheckCircle2 className="w-4 h-4 text-[#2C7A73]" />
                        <span>Built directly into the Google Sheets template</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. FAIR SPLIT FEATURE SECTION                                             */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-28 bg-[#FAF6EF] border-b border-[#174F4A]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
            <div className="max-w-3xl mx-auto text-center space-y-4">
             
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#174F4A] tracking-tight">
                50/50 isn’t the only way to split a life together.
              </h2>
              <p className="text-base text-[#6F7F7C] leading-relaxed max-w-2xl mx-auto">
                Every couple has unique financial dynamics. Togetherly never forces a single rigid formula — you choose what feels equitable and fair for your household.
              </p>
            </div>

            {/* Three Split Approaches */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-[#FFFFFF] p-7 border border-[#174F4A]/10 rounded-none space-y-3 shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-sm">
                <div className="text-xs font-bold uppercase tracking-wider text-[#2C7A73]">Option 1</div>
                <h3 className="text-xl font-extrabold text-[#174F4A]">50 / 50 Equal Split</h3>
                <p className="text-xs sm:text-sm text-[#6F7F7C] leading-relaxed">
                  Shared living expenses are divided straight down the middle. Best when partners have similar earnings or prefer identical contribution amounts.
                </p>
              </div>

              <div className="bg-[#FFFFFF] p-7 border border-[#2C7A73]/30 rounded-none space-y-3 relative shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-sm">
                <div className="text-xs font-bold uppercase tracking-wider text-[#F29B7F]">Option 2 (Popular)</div>
                <h3 className="text-xl font-extrabold text-[#174F4A]">Income-Based Split</h3>
                <p className="text-xs sm:text-sm text-[#6F7F7C] leading-relaxed">
                  Contributions are calculated proportionally based on each partner&apos;s income (e.g., 60/40), so both partners retain fair discretionary income.
                </p>
              </div>

              <div className="bg-[#FFFFFF] p-7 border border-[#174F4A]/10 rounded-none space-y-3 shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-sm">
                <div className="text-xs font-bold uppercase tracking-wider text-[#2C7A73]">Option 3</div>
                <h3 className="text-xl font-extrabold text-[#174F4A]">Custom Splitting</h3>
                <p className="text-xs sm:text-sm text-[#6F7F7C] leading-relaxed">
                  Couples define their own bespoke percentage split or designate specific bills to specific partners while sharing the rest.
                </p>
              </div>
            </div>

            {/* Embedded Live Calculator (Single bottom border, no double underline) */}
            <div className="pt-4">
              <FairSplitCalculator embedded={true} />
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. MONTHLY PLANNING (Background Matching #FAF6EF, No Differentiation)      */}
        {/* ========================================================================= */}
        

        {/* ========================================================================= */}
        {/* 7. SHARED GOALS (Background Matching, No Shadows, Lucide Icons)           */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-28 bg-[#FAF6EF] border-b border-[#174F4A]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-3xl mx-auto text-center space-y-4">
             
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#174F4A] tracking-tight">
                Budget for today. Build toward what’s next.
              </h2>
              <p className="text-base text-[#6F7F7C] leading-relaxed max-w-2xl mx-auto">
                Daily budgeting is only half the battle. Togetherly helps you turn dreams into actionable milestones with visual progress bars and dynamic timeline calculations.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Screenshot matching section background, no borders, no shadow */}
              <div className="lg:col-span-7 order-2 lg:order-1 flex items-center justify-center bg-[#FAF6EF]">
                <img
                  src="/togetherly/goals.png"
                  alt="Togetherly Shared Goals tracker screenshot in Google Sheets"
                  className="w-full h-auto object-contain select-none rounded-none border-none shadow-none"
                />
              </div>

              <div className="lg:col-span-5 order-1 lg:order-2 space-y-5 text-left">
                <div className="space-y-2.5 pt-2 text-xs sm:text-sm text-[#243B38]">
                  <p className="font-semibold text-[#174F4A]">Real goal examples you can track:</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="inline-flex items-center gap-1.5 bg-[#FFFFFF] border border-[#174F4A]/10 px-3 py-1.5 font-medium text-[#174F4A] shadow-none transition-transform duration-200 hover:-translate-y-0.5">
                      <Palmtree className="w-3.5 h-3.5 text-[#2C7A73]" />
                      <span>Dream Vacation</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-[#FFFFFF] border border-[#174F4A]/10 px-3 py-1.5 font-medium text-[#174F4A] shadow-none transition-transform duration-200 hover:-translate-y-0.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#2C7A73]" />
                      <span>6-Month Emergency Fund</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-[#FFFFFF] border border-[#174F4A]/10 px-3 py-1.5 font-medium text-[#174F4A] shadow-none transition-transform duration-200 hover:-translate-y-0.5">
                      <Home className="w-3.5 h-3.5 text-[#2C7A73]" />
                      <span>Home Deposit</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-[#FFFFFF] border border-[#174F4A]/10 px-3 py-1.5 font-medium text-[#174F4A] shadow-none transition-transform duration-200 hover:-translate-y-0.5">
                      <Heart className="w-3.5 h-3.5 text-[#F29B7F]" />
                      <span>Wedding Celebration</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-[#FFFFFF] border border-[#174F4A]/10 px-3 py-1.5 font-medium text-[#174F4A] shadow-none transition-transform duration-200 hover:-translate-y-0.5">
                      <Package className="w-3.5 h-3.5 text-[#2C7A73]" />
                      <span>Moving / Furniture</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-[#FFFFFF] border border-[#174F4A]/10 px-3 py-1.5 font-medium text-[#174F4A] shadow-none transition-transform duration-200 hover:-translate-y-0.5">
                      <Car className="w-3.5 h-3.5 text-[#2C7A73]" />
                      <span>New Vehicle Fund</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8. BILLS SECTION (With Logo and Clean Treatment, No Shadow)               */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-28 bg-[#FFFFFF] border-b border-[#174F4A]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#174F4A] tracking-tight">
                Keep recurring bills from becoming recurring conversations.
              </h2>
              <p className="text-base text-[#6F7F7C] leading-relaxed max-w-2xl mx-auto">
                No more wondering if the Wi-Fi was paid or whose card is on file for rent. Togetherly organizes all recurring obligations in one clear, reliable schedule.
              </p>
            </div>

            {/* Branded Card with Togetherly Logo for Bills (No Shadow) */}
            <div className="relative bg-[#174F4A] text-[#FAF6EF] p-8 sm:p-12 border border-[#2C7A73]/40 rounded-none shadow-none overflow-hidden max-w-5xl mx-auto">
              <div
                className="absolute inset-0 w-full h-full pointer-events-none select-none mix-blend-overlay opacity-25"
                style={{
                  backgroundImage: 'url(/togetherly/indian-wedding-pattern.png)',
                  backgroundRepeat: 'repeat',
                  backgroundSize: '300px 225px',
                }}
              />
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-4 text-center md:text-left max-w-md">
                  <img
                    src={togetherlyBrand.assets.logoLight}
                    alt="Togetherly"
                    className="h-9 sm:h-10 w-auto object-contain mx-auto md:mx-0 shadow-none"
                  />
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#FAF6EF]">
                    Recurring Bills & Autopay Sync
                  </h3>
                  <p className="text-xs sm:text-sm text-[#FAF6EF]/85 leading-relaxed">
                    Designed to give both partners 100% visibility over rent, insurance, streaming, and utilities without sharing bank passwords.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3.5 w-full md:w-auto">
                  <div className="bg-[#FAF6EF]/10 border border-[#FAF6EF]/15 p-4 rounded-none text-xs text-[#FAF6EF] flex items-center gap-3 transition-transform duration-200 hover:translate-x-1">
                    <Receipt className="w-5 h-5 text-[#F29B7F] shrink-0" />
                    <span><strong>Due Date & Auto-Pay Clarity:</strong> Pre-scheduled tracking prevents late fees.</span>
                  </div>
                  <div className="bg-[#FAF6EF]/10 border border-[#FAF6EF]/15 p-4 rounded-none text-xs text-[#FAF6EF] flex items-center gap-3 transition-transform duration-200 hover:translate-x-1">
                    <Scale className="w-5 h-5 text-[#91B7A0] shrink-0" />
                    <span><strong>Explicit Ownership:</strong> Clearly reveals which partner pays which provider.</span>
                  </div>
                  <div className="bg-[#FAF6EF]/10 border border-[#FAF6EF]/15 p-4 rounded-none text-xs text-[#FAF6EF] flex items-center gap-3 transition-transform duration-200 hover:translate-x-1">
                    <CheckCircle2 className="w-5 h-5 text-[#FAF6EF] shrink-0" />
                    <span><strong>Monthly Checklists:</strong> Live checkmarks confirm cleared status.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 9. MONEY DATE SECTION (Content on Left, Screen Grounded at Bottom on Right)*/}
        {/* ========================================================================= */}
        <section className="pt-16 sm:pt-20 lg:pt-28 pb-0 bg-[#FAF6EF] border-b border-[#174F4A]/10 overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 items-end">
              {/* LEFT COLUMN: All Content */}
              <div className="lg:col-span-5 order-1 space-y-6 text-left pb-10 sm:pb-14 lg:pb-16 xl:pb-20 max-w-lg lg:max-w-none">
                <div className="space-y-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#2C7A73]">
                    Relationship Ritual
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-extrabold text-[#174F4A] tracking-tight leading-[1.12]">
                    Turn money management into a 20-minute conversation.
                  </h2>
                  <p className="text-sm sm:text-base lg:text-[17px] text-[#6F7F7C] leading-relaxed">
                    Financial stress dissolves when you replace sporadic arguments with a structured, calm monthly check-in. Pour a drink, open your sheet, and review in total harmony.
                  </p>
                </div>

                <div className="space-y-3 pt-2 text-xs sm:text-sm text-[#243B38] border-t border-[#174F4A]/10 pt-5">
                  <p className="font-bold text-[#174F4A] text-sm sm:text-base">
                    What couples review during the Money Date:
                  </p>
                  <ul className="space-y-2.5">
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#2C7A73] shrink-0" />
                      <span>Monthly spending &amp; shared expense totals</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#2C7A73] shrink-0" />
                      <span>Upcoming recurring bills &amp; cash commitments</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#2C7A73] shrink-0" />
                      <span>Shared savings milestones &amp; goal progress</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#2C7A73] shrink-0" />
                      <span>Single final reimbursement settlement</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#2C7A73] shrink-0" />
                      <span>Next month&apos;s financial priorities &amp; commitments</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* RIGHT COLUMN: Significantly Bigger Screen Mockup starting from the bottom of the section */}
              <div className="lg:col-span-7 order-2 flex items-end justify-center lg:justify-end">
                <img
                  src="/togetherly/mac-screen.png"
                  alt="Togetherly Couples Money Planner Screen Display"
                  style={{
                    filter:
                      'drop-shadow(0 -12px 28px rgba(15, 56, 52, 0.14)) drop-shadow(0 -4px 12px rgba(0, 0, 0, 0.22)) drop-shadow(0 24px 45px rgba(15, 56, 52, 0.32)) drop-shadow(0 8px 18px rgba(0, 0, 0, 0.20))',
                  }}
                  className="w-full lg:w-[130%] xl:w-[142%] max-w-none lg:-mr-16 xl:-mr-28 2xl:-mr-36 h-auto object-contain select-none block"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 10. HOW IT WORKS                                                          */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-28 bg-[#FFFFFF] border-b border-[#174F4A]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <img
                src={togetherlyBrand.assets.logoPrimary}
                alt="Togetherly"
                className="h-10 sm:h-11 w-auto object-contain mx-auto mb-10"
              />
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#174F4A] tracking-tight">
                From purchase to planning in minutes.
              </h2>
              <p className="text-base text-[#6F7F7C] leading-relaxed max-w-xl mx-auto">
                No complex software installation, no credit checks, and no waiting for approvals. Start budgeting together today.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="p-8 bg-[#FAF6EF] border border-[#174F4A]/10 rounded-none space-y-4 shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-[#174F4A]/25">
                <span className="text-2xl font-black text-[#F29B7F]">01</span>
                <h3 className="text-xl font-extrabold text-[#174F4A]">Get the planner</h3>
                <p className="text-xs sm:text-sm text-[#6F7F7C] leading-relaxed">
                  Purchase once for $19 through our secure Gumroad checkout. Zero subscription fees, ever.
                </p>
              </div>

              <div className="p-8 bg-[#FAF6EF] border border-[#174F4A]/10 rounded-none space-y-4 shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-[#174F4A]/25">
                <span className="text-2xl font-black text-[#F29B7F]">02</span>
                <h3 className="text-xl font-extrabold text-[#174F4A]">Make your private copy</h3>
                <p className="text-xs sm:text-sm text-[#6F7F7C] leading-relaxed">
                  Click your instant access link to save the official template directly into your personal Google Drive.
                </p>
              </div>

              <div className="p-8 bg-[#FAF6EF] border border-[#174F4A]/10 rounded-none space-y-4 shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-[#174F4A]/25">
                <span className="text-2xl font-black text-[#F29B7F]">03</span>
                <h3 className="text-xl font-extrabold text-[#174F4A]">Make it yours</h3>
                <p className="text-xs sm:text-sm text-[#6F7F7C] leading-relaxed">
                  Customize partner names, currency, incomes, categories and splitting preferences in seconds.
                </p>
              </div>
            </div>

            <div className="text-center pt-2">
              <a
                href={TOGETHERLY_CHECKOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleCheckoutClick('product_three_steps')}
                className="inline-flex items-center justify-center gap-2 bg-[#174F4A] hover:bg-[#0F3834] text-[#FAF6EF] text-sm sm:text-base font-extrabold px-9 py-4 rounded-none transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-none tracking-tight"
              >
                <span>Get the Planner — $19</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </a>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 11. PRIVACY & SECURITY ARCHITECTURE                                       */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-28 bg-[#FAF6EF] border-b border-[#174F4A]/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 text-center">
            {/* Header */}
            <div className="space-y-4 max-w-3xl mx-auto">
              <img
                src={togetherlyBrand.assets.logoPrimary}
                alt="Togetherly"
                className="h-10 sm:h-11 w-auto object-contain mx-auto mb-10"
              />
             
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#174F4A] tracking-tight">
                Your financial data stays yours. Forever.
              </h2>
              <p className="text-sm sm:text-base lg:text-[17px] text-[#6F7F7C] leading-relaxed max-w-2xl mx-auto">
                No Plaid bank logins. No remote servers reading your transactions. You duplicate your own private copy in Google Sheets, and your household numbers never leave your personal Google account.
              </p>
            </div>

            {/* Visual 4-Step Architecture Flow */}
            <div className="relative">
              {/* Desktop Horizontal Connecting Line behind cards */}
              <div className="hidden lg:block absolute top-[52px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-[#2C7A73]/20 via-[#174F4A]/30 to-[#2C7A73]/20 -z-0 origin-left" />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10 text-left">
                {/* Step 1 */}
                <div className="bg-white border border-[#174F4A]/15 p-6 rounded-none space-y-4 shadow-none hover:border-[#174F4A]/40 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="w-9 h-9 bg-[#174F4A] text-[#FAF6EF] flex items-center justify-center font-extrabold text-sm">
                        01
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#2C7A73] bg-[#2C7A73]/10 px-2 py-0.5">
                        Instant Delivery
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[#174F4A] pt-1">
                      <Lock className="w-4 h-4 text-[#2C7A73] shrink-0" />
                      <h3 className="font-extrabold text-base sm:text-lg">Secure Purchase</h3>
                    </div>
                    <p className="text-xs text-[#6F7F7C] leading-relaxed">
                      Instant checkout via Gumroad with 256-bit SSL encryption. Receive your template link immediately in your inbox.
                    </p>
                  </div>

                  {/* Micro Visual Card */}
                  <div className="bg-[#FAF6EF] p-2.5 border border-[#174F4A]/10 text-[11px] font-mono space-y-1">
                    <div className="flex items-center gap-1.5 text-[#2C7A73] font-bold text-[10px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2C7A73] animate-pulse" />
                      <span>256-Bit SSL Encrypted</span>
                    </div>
                    <div className="text-[#6F7F7C] text-[10px] truncate">No account forms needed</div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="bg-white border border-[#174F4A]/15 p-6 rounded-none space-y-4 shadow-none hover:border-[#174F4A]/40 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="w-9 h-9 bg-[#174F4A] text-[#FAF6EF] flex items-center justify-center font-extrabold text-sm">
                        02
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#2C7A73] bg-[#2C7A73]/10 px-2 py-0.5">
                        1-Click Duplicate
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[#174F4A] pt-1">
                      <FileSpreadsheet className="w-4 h-4 text-[#2C7A73] shrink-0" />
                      <h3 className="font-extrabold text-base sm:text-lg">Make a Copy</h3>
                    </div>
                    <p className="text-xs text-[#6F7F7C] leading-relaxed">
                      Click the official master template link. Google prompts you to generate your own independent, clean copy.
                    </p>
                  </div>

                  {/* Micro Visual Card */}
                  <div className="bg-[#FAF6EF] p-2.5 border border-[#174F4A]/10 text-[11px] font-mono space-y-1.5">
                    <div className="text-[#6F7F7C] text-[10px] truncate">docs.google.com/.../copy</div>
                    <div className="inline-flex items-center gap-1 bg-[#174F4A] text-[#FAF6EF] px-2 py-0.5 font-sans font-bold text-[10px]">
                      <span>Make a copy</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-white border border-[#174F4A]/15 p-6 rounded-none space-y-4 shadow-none hover:border-[#174F4A]/40 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="w-9 h-9 bg-[#174F4A] text-[#FAF6EF] flex items-center justify-center font-extrabold text-sm">
                        03
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#2C7A73] bg-[#2C7A73]/10 px-2 py-0.5">
                        Client Cloud
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[#174F4A] pt-1">
                      <HardDrive className="w-4 h-4 text-[#2C7A73] shrink-0" />
                      <h3 className="font-extrabold text-base sm:text-lg">Saved in Drive</h3>
                    </div>
                    <p className="text-xs text-[#6F7F7C] leading-relaxed">
                      The sheet lives 100% inside your personal Google Drive. Togetherly has zero servers or databases storing your entries.
                    </p>
                  </div>

                  {/* Micro Visual Card */}
                  <div className="bg-[#FAF6EF] p-2.5 border border-[#174F4A]/10 text-[10px] font-mono space-y-1">
                    <div className="flex items-center justify-between text-[#174F4A] font-bold">
                      <span>Google Drive:</span>
                      <span className="text-[#2C7A73]">Encrypted</span>
                    </div>
                    <div className="flex items-center justify-between text-[#6F7F7C]">
                      <span>Togetherly Servers:</span>
                      <span className="font-bold text-[#174F4A]">0 KB</span>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="bg-white border border-[#174F4A]/15 p-6 rounded-none space-y-4 shadow-none hover:border-[#174F4A]/40 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="w-9 h-9 bg-[#174F4A] text-[#FAF6EF] flex items-center justify-center font-extrabold text-sm">
                        04
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#2C7A73] bg-[#2C7A73]/10 px-2 py-0.5">
                        Private Sharing
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[#174F4A] pt-1">
                      <Users className="w-4 h-4 text-[#2C7A73] shrink-0" />
                      <h3 className="font-extrabold text-base sm:text-lg">Invite Partner</h3>
                    </div>
                    <p className="text-xs text-[#6F7F7C] leading-relaxed">
                      Share editing permissions only with your partner&apos;s email. Collaborate seamlessly in real time with bank-grade Google protection.
                    </p>
                  </div>

                  {/* Micro Visual Card */}
                  <div className="bg-[#FAF6EF] p-2.5 border border-[#174F4A]/10 text-[10px] font-mono space-y-1">
                    <div className="flex items-center gap-1.5 text-[#174F4A] font-semibold">
                      <span className="w-1.5 h-1.5 bg-[#2C7A73]" />
                      <span>Partner #1 (Owner)</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#2C7A73] font-semibold">
                      <span className="w-1.5 h-1.5 bg-[#2C7A73]" />
                      <span>Partner #2 (Editor)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Architecture Comparison: Traditional Apps vs Togetherly System */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
              {/* The Old / Invasive Way */}
              <div className="bg-white p-6 sm:p-8 border border-[#E57373]/30 space-y-4 transition-all duration-300 hover:border-[#E57373]/60">
                <div className="flex items-center gap-2 text-[#E57373] text-xs font-bold uppercase tracking-wider">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Traditional Budgeting Apps</span>
                </div>
                <h4 className="text-lg font-extrabold text-[#174F4A]">
                  Third-party servers &amp; bank scraping
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm text-[#6F7F7C]">
                  <li className="flex items-start gap-2">
                    <EyeOff className="w-4 h-4 text-[#E57373] shrink-0 mt-0.5" />
                    <span>Requires you to hand over bank logins via Plaid or Yodlee</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <EyeOff className="w-4 h-4 text-[#E57373] shrink-0 mt-0.5" />
                    <span>Your spending history is scraped and stored on their servers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <EyeOff className="w-4 h-4 text-[#E57373] shrink-0 mt-0.5" />
                    <span>Vulnerable to corporate data breaches, acquisitions, or shutdowns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <EyeOff className="w-4 h-4 text-[#E57373] shrink-0 mt-0.5" />
                    <span>Locks your historical data behind recurring monthly subscriptions</span>
                  </li>
                </ul>
              </div>

              {/* The Togetherly Sovereign Way */}
              <div className="bg-[#174F4A] p-6 sm:p-8 text-[#FAF6EF] space-y-4 transition-all duration-300 hover:border-[#2C7A73]/60">
                <div className="flex items-center gap-2 text-[#91B7A0] text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-[#91B7A0]" />
                  <span>The Togetherly Google Sheets Way</span>
                </div>
                <h4 className="text-lg font-extrabold text-[#FAF6EF]">
                  Zero bank credentials. 100% private to you.
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm text-[#FAF6EF]/85">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#91B7A0] shrink-0 mt-0.5" />
                    <span><strong>No bank logins ever:</strong> We never see or request passwords</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#91B7A0] shrink-0 mt-0.5" />
                    <span><strong>Lives in your Google Drive:</strong> Protected by your own Google 2FA</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#91B7A0] shrink-0 mt-0.5" />
                    <span><strong>Permanent lifetime ownership:</strong> Works offline, never expires</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#91B7A0] shrink-0 mt-0.5" />
                    <span><strong>Zero data harvesting:</strong> Your transactions are never tracked or monetized</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Trust Metric Counters */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto pt-2">
              <div className="bg-white p-4 sm:p-5 border border-[#174F4A]/10 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-[#174F4A]/30">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#174F4A]">0</div>
                <div className="text-xs text-[#6F7F7C] font-semibold mt-1">Bank Passwords Required</div>
              </div>
              <div className="bg-white p-4 sm:p-5 border border-[#174F4A]/10 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-[#174F4A]/30">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#174F4A]">0 KB</div>
                <div className="text-xs text-[#6F7F7C] font-semibold mt-1">Data Stored On Our Servers</div>
              </div>
              <div className="bg-white p-4 sm:p-5 border border-[#174F4A]/10 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-[#174F4A]/30">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#174F4A]">100%</div>
                <div className="text-xs text-[#6F7F7C] font-semibold mt-1">Private In Your Google Drive</div>
              </div>
              <div className="bg-white p-4 sm:p-5 border border-[#174F4A]/10 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-[#174F4A]/30">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#174F4A]">Lifetime</div>
                <div className="text-xs text-[#6F7F7C] font-semibold mt-1">Offline &amp; Online Ownership</div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 12. WHAT'S INCLUDED (GREEN & FLOWER PATTERN CARD MATCHING USER SCREENSHOT) */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-28 bg-[#FFFFFF] border-b border-[#174F4A]/10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <img
                src={togetherlyBrand.assets.logoPrimary}
                alt="Togetherly"
                className="h-10 sm:h-11 w-auto object-contain mx-auto mb-10"
              />
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#174F4A] tracking-tight">
                Everything included with your purchase.
              </h2>
              <p className="text-base text-[#6F7F7C] leading-relaxed max-w-xl mx-auto">
                The complete Couples Money Planner Google Sheets system, ready to use immediately.
              </p>
            </div>

            {/* Green and Flower Pattern Card (No Shadow) */}
            <div className="relative bg-[#174F4A] text-[#FAF6EF] p-8 sm:p-12 border border-[#2C7A73]/40 rounded-none shadow-none overflow-hidden">
              {/* Flower / Indian Wedding Pattern Overlay */}
              <div
                className="absolute inset-0 w-full h-full pointer-events-none select-none mix-blend-overlay opacity-35"
                style={{
                  backgroundImage: 'url(/togetherly/indian-wedding-pattern.png)',
                  backgroundRepeat: 'repeat',
                  backgroundSize: '300px 225px',
                }}
              />

              <div className="relative z-10 space-y-8">
                {/* 3 Columns of 4 Checklist Items (Matching image exactly) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6 text-sm text-[#FAF6EF] font-semibold">
                  {/* Column 1 */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2.5 transition-transform duration-200 hover:translate-x-1">
                      <CheckCircle2 className="w-4 h-4 text-[#91B7A0] shrink-0" />
                      <span>Financial Dashboard</span>
                    </div>
                    <div className="flex items-center gap-2.5 transition-transform duration-200 hover:translate-x-1">
                      <CheckCircle2 className="w-4 h-4 text-[#91B7A0] shrink-0" />
                      <span>Shared vs Personal Expenses</span>
                    </div>
                    <div className="flex items-center gap-2.5 transition-transform duration-200 hover:translate-x-1">
                      <CheckCircle2 className="w-4 h-4 text-[#91B7A0] shrink-0" />
                      <span>Custom Splitting</span>
                    </div>
                    <div className="flex items-center gap-2.5 transition-transform duration-200 hover:translate-x-1">
                      <CheckCircle2 className="w-4 h-4 text-[#91B7A0] shrink-0" />
                      <span>Shared Savings Goals</span>
                    </div>
                  </div>

                  {/* Column 2 */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2.5 transition-transform duration-200 hover:translate-x-1">
                      <CheckCircle2 className="w-4 h-4 text-[#91B7A0] shrink-0" />
                      <span>Monthly Budget Planner</span>
                    </div>
                    <div className="flex items-center gap-2.5 transition-transform duration-200 hover:translate-x-1">
                      <CheckCircle2 className="w-4 h-4 text-[#91B7A0] shrink-0" />
                      <span>50/50 Expense Splitting</span>
                    </div>
                    <div className="flex items-center gap-2.5 transition-transform duration-200 hover:translate-x-1">
                      <CheckCircle2 className="w-4 h-4 text-[#91B7A0] shrink-0" />
                      <span>Who-Owes-Whom Settlement</span>
                    </div>
                    <div className="flex items-center gap-2.5 transition-transform duration-200 hover:translate-x-1">
                      <CheckCircle2 className="w-4 h-4 text-[#91B7A0] shrink-0" />
                      <span>Monthly Money Date</span>
                    </div>
                  </div>

                  {/* Column 3 */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2.5 transition-transform duration-200 hover:translate-x-1">
                      <CheckCircle2 className="w-4 h-4 text-[#91B7A0] shrink-0" />
                      <span>Transaction & Expense Tracker</span>
                    </div>
                    <div className="flex items-center gap-2.5 transition-transform duration-200 hover:translate-x-1">
                      <CheckCircle2 className="w-4 h-4 text-[#91B7A0] shrink-0" />
                      <span>Income-Based Splitting</span>
                    </div>
                    <div className="flex items-center gap-2.5 transition-transform duration-200 hover:translate-x-1">
                      <CheckCircle2 className="w-4 h-4 text-[#91B7A0] shrink-0" />
                      <span>Recurring Bills Tracker</span>
                    </div>
                    <div className="flex items-center gap-2.5 transition-transform duration-200 hover:translate-x-1">
                      <CheckCircle2 className="w-4 h-4 text-[#91B7A0] shrink-0" />
                      <span>Customizable Setup</span>
                    </div>
                  </div>
                </div>

                {/* Horizontal Divider Line & Action Row */}
                <div className="border-t border-[#FAF6EF]/20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="space-y-1 text-center sm:text-left">
                    <div className="text-3xl sm:text-4xl font-extrabold text-[#FAF6EF] tracking-tight">
                      $19
                    </div>
                    <div className="text-xs text-[#FAF6EF]/80">
                      One-time payment · No subscription · Free updates
                    </div>
                  </div>

                  <a
                    href={TOGETHERLY_CHECKOUT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleCheckoutClick('product_pricing_banner')}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FAF6EF] hover:bg-white text-[#174F4A] text-sm sm:text-base font-extrabold px-8 py-4 rounded-none transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-none tracking-tight"
                  >
                    <span>Get the Planner — $19</span>
                    <ArrowRight className="w-4 h-4 ml-0.5 text-[#174F4A]" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 13. FAQ (ACCESSIBLE ACCORDION)                                            */}
        {/* ========================================================================= */}
        <section id="faq" className="py-20 sm:py-28 bg-[#FAF6EF] border-b border-[#174F4A]/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-4">
              <img
                src={togetherlyBrand.assets.logoPrimary}
                alt="Togetherly"
                className="h-10 sm:h-11 w-auto object-contain mx-auto mb-10"
              />
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#174F4A] tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-base text-[#6F7F7C] leading-relaxed max-w-xl mx-auto">
                Clear answers to common questions about using the Couples Money Planner in Google Sheets.
              </p>
            </div>

            <div className="space-y-3.5">
              {couplesMoneyPlanner.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="bg-[#FFFFFF] border border-[#174F4A]/10 rounded-none overflow-hidden transition-all duration-300 shadow-none hover:border-[#174F4A]/25"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${idx}`}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                    >
                      <span className="text-base sm:text-lg font-bold text-[#174F4A]">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#2C7A73] shrink-0 transition-transform duration-300 ease-out ${
                          isOpen ? 'rotate-180 text-[#174F4A]' : ''
                        }`}
                      />
                    </button>

                    <div
                      id={`faq-answer-${idx}`}
                      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                        isOpen
                          ? 'grid-rows-[1fr] opacity-100 border-t border-[#174F4A]/10'
                          : 'grid-rows-[0fr] opacity-0 border-t border-transparent pointer-events-none'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-5 sm:px-6 pb-6 pt-2 text-xs sm:text-sm text-[#6F7F7C] leading-relaxed">
                          <p>{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 13.5. FINAL CTA TO GET THE PLANNER                                        */}
        {/* ========================================================================= */}
        <section className="relative py-24 sm:py-28 bg-[#174F4A] text-[#FAF6EF] w-full border-t border-[#2C7A73]/30 overflow-hidden">
          <div
            className="absolute inset-0 w-full h-full pointer-events-none select-none mix-blend-overlay opacity-80"
            style={{
              backgroundImage: 'url(/togetherly/indian-wedding-pattern.png)',
              backgroundRepeat: 'repeat',
              backgroundSize: '300px 225px',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#174F4A]/50 via-[#174F4A]/20 to-[#174F4A]/60 pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <div className="space-y-4 max-w-2xl mx-auto">
              <img
                src={togetherlyBrand.assets.logoLight}
                alt="Togetherly"
                className="h-10 sm:h-12 w-auto object-contain mx-auto mb-2"
              />
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#FAF6EF] tracking-tight leading-tight">
                Build the money system you&apos;ll actually use together.
              </h2>
              <p className="text-base sm:text-lg text-[#FAF6EF]/90 leading-relaxed font-normal">
                One place to plan, track, split, save and review your money as a couple.
              </p>
              <div className="text-sm font-semibold text-[#F29B7F]">
                $19 · One-time purchase
              </div>
            </div>

            {/* Final CTA Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <a
                href={TOGETHERLY_CHECKOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleCheckoutClick('product_final_cta')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FAF6EF] hover:bg-white text-[#174F4A] text-base sm:text-lg font-extrabold px-10 py-4 rounded-none transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-none tracking-tight"
              >
                <span>Get the Couples Money Planner</span>
                <ArrowRight className="w-5 h-5 ml-1" />
              </a>
            </div>

            <p className="text-xs text-[#FAF6EF]/75 pt-2">
              Google Sheets · Instant access · No subscription
            </p>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 14. WHATSAPP SUPPORT SECTION (Full Width, Content Left, Illustration Right) */}
        {/* ========================================================================= */}
        <WhatsAppHelpCTA
          variant="section"
          topic="product_support"
          headline="Have questions or need help with anything?"
          subtext="Message Togetherly directly on WhatsApp (0770566628). We're happy to answer questions about the Couples Money Planner, guide your setup, or help you decide if it's the right fit for your situation."
          message="Hi Togetherly! I'm on the Couples Money Planner page and have a question."
          sourcePage="/products/couples-money-planner"
          contentCluster="Product Support"
          ctaLocation="product_whatsapp_section"
          buttonText="Contact Support for Anything"
          illustrationSrc="/togetherly/illustration.png"
        />

        {/* ========================================================================= */}
        {/* 14.5. SUBSCRIBE FOR FREE TOOLS & STARTER PLANNER (iPhone Section)         */}
        {/* ========================================================================= */}
        <EmailSubscribeSection
          sourcePage="/products/couples-money-planner"
          contentCluster="Product Showcase"
          ctaLocation="product_iphone_subscribe_section"
        />
      </main>

      {/* Floating Rounded WhatsApp Button */}
      <FloatingWhatsAppCTA
        sourcePage="/products/couples-money-planner"
        topic="product_page"
        message="Hi Togetherly! I'm looking at the Couples Money Planner and have a question."
      />
    </div>
  );
}
