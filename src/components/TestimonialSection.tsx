'use client';

import React from 'react';
import { Star, Quote, CheckCircle2, TrendingUp, PiggyBank, ShieldCheck } from 'lucide-react';

interface TestimonialSectionProps {
  bgVariant?: 'cream' | 'white';
  className?: string;
  id?: string;
}

export default function TestimonialSection({
  bgVariant = 'cream',
  className = '',
  id = 'testimonial',
}: TestimonialSectionProps) {
  const bgClass = bgVariant === 'white' ? 'bg-[#FFFFFF]' : 'bg-[#FAF6EF]';

  return (
    <section
      id={id}
      className={`py-20 sm:py-28 ${bgClass} border-b border-[#174F4A]/10 transition-colors ${className}`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3.5">
          <div className="inline-flex items-center gap-2 bg-[#174F4A]/10 text-[#174F4A] px-3.5 py-1 text-xs font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2C7A73]" />
            <span>Real User Experience</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#174F4A] tracking-tight leading-[1.15]">
            “I managed to organize my life and saved thousands of dollars.”
          </h2>

          <p className="text-sm sm:text-base text-[#6F7F7C] max-w-xl mx-auto leading-relaxed">
            Real experience managing household spending, split expenses, and personal savings with Togetherly in Google Sheets.
          </p>
        </div>

        {/* Featured Testimonial Card */}
        <div className="relative bg-[#FFFFFF] border border-[#174F4A]/15 p-6 sm:p-10 lg:p-12 shadow-sm rounded-none">
          {/* Subtle decorative quotation mark in top corner */}
          <div className="absolute top-6 right-6 sm:top-8 sm:right-8 text-[#174F4A]/5 pointer-events-none select-none">
            <Quote className="w-20 h-20 sm:w-28 sm:h-28 rotate-180" />
          </div>

          <div className="relative z-10 space-y-8">
            {/* Rating Stars + Trust Tag */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#174F4A]/10 pb-6">
              <div className="flex items-center gap-1.5" aria-label="5 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-[#F29B7F] text-[#F29B7F]"
                    aria-hidden="true"
                  />
                ))}
                <span className="text-xs font-bold text-[#174F4A] ml-2 tracking-tight">
                  5.0 / 5.0 Rating
                </span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#2C7A73]/10 text-[#2C7A73] text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Togetherly User</span>
              </div>
            </div>

            {/* Testimonial Quote */}
            <blockquote className="space-y-4">
              <p className="text-lg sm:text-xl lg:text-2xl text-[#174F4A] font-medium leading-relaxed tracking-tight">
                “Before Togetherly, our finances felt like a constant guessing game spread across different apps, forgotten subscriptions, and awkward end-of-month conversations. Setting this up was the moment everything changed.
              </p>
              <p className="text-base sm:text-lg text-[#4A5D5A] leading-relaxed">
                I managed to completely organize my life and track everything I spent without feeling restricted or bogged down by complex formulas. By having complete clarity on our shared cash flow and splitting bills fairly based on income, we ended up saving thousands of dollars in the first year alone. Having one shared, private Google Sheets system gave us total peace of mind.”
              </p>
            </blockquote>

            {/* Author Profile + Stat Highlights Grid */}
            <div className="pt-4 border-t border-[#174F4A]/10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Author Info */}
              <div className="lg:col-span-5 flex items-center gap-4">
                <div className="relative shrink-0">
                  <img
                    src="/togetherly/ayoubameur.png"
                    alt="Ayoub Ameur"
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-[#174F4A]/20 shadow-sm"
                    width={64}
                    height={64}
                  />
                  <div
                    className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#2C7A73] text-[#FAF6EF] rounded-full flex items-center justify-center border-2 border-[#FFFFFF] shadow-xs"
                    title="Verified User"
                  >
                    <CheckCircle2 className="w-3 h-3 stroke-[3]" />
                  </div>
                </div>

                <div className="space-y-0.5">
                  <div className="text-base sm:text-lg font-extrabold text-[#174F4A] tracking-tight">
                    Ayoub Ameur
                  </div>
                  <div className="text-xs sm:text-sm text-[#6F7F7C] font-medium">
                    Togetherly User • Shared &amp; Personal Budgeting
                  </div>
                </div>
              </div>

              {/* Verified Metrics Chips */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-[#FAF6EF] p-3 sm:p-3.5 border border-[#174F4A]/10 text-left">
                  <div className="flex items-center gap-1.5 text-[#2C7A73] mb-1">
                    <PiggyBank className="w-4 h-4" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Saved</span>
                  </div>
                  <div className="text-base sm:text-lg font-extrabold text-[#174F4A] leading-tight">
                    Thousands $
                  </div>
                  <div className="text-[11px] text-[#6F7F7C] mt-0.5">
                    Cut hidden leaks &amp; double spend
                  </div>
                </div>

                <div className="bg-[#FAF6EF] p-3 sm:p-3.5 border border-[#174F4A]/10 text-left">
                  <div className="flex items-center gap-1.5 text-[#2C7A73] mb-1">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Control</span>
                  </div>
                  <div className="text-base sm:text-lg font-extrabold text-[#174F4A] leading-tight">
                    100% Tracked
                  </div>
                  <div className="text-[11px] text-[#6F7F7C] mt-0.5">
                    Every expense &amp; shared split
                  </div>
                </div>

                <div className="bg-[#FAF6EF] p-3 sm:p-3.5 border border-[#174F4A]/10 text-left">
                  <div className="flex items-center gap-1.5 text-[#2C7A73] mb-1">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Privacy</span>
                  </div>
                  <div className="text-base sm:text-lg font-extrabold text-[#174F4A] leading-tight">
                    Zero Passwords
                  </div>
                  <div className="text-[11px] text-[#6F7F7C] mt-0.5">
                    Private in Google Drive
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
