'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, FileSpreadsheet, Sparkles, CheckCircle2, Clock } from 'lucide-react';
import { togetherlyBrand, TOGETHERLY_GOOGLE_SHEET_COPY_URL } from '@/config/productConfig';

export default function ComingSoonPage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
    }
  };

  return (
    <div className="bg-[#FAF6EF] text-[#243B38] py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Header Block */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#174F4A] tracking-tight leading-tight">
            Building the complete suite for couples.
          </h1>

          <p className="text-sm sm:text-base text-[#6F7F7C] leading-relaxed max-w-xl mx-auto">
            We are designing and building specialized financial planning systems to accompany couples throughout every key life milestone.
          </p>
        </div>

        {/* Upcoming Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full text-left">
          {togetherlyBrand.upcomingProducts.map((prod, idx) => (
            <div
              key={idx}
              className="bg-[#FFFFFF] p-6 rounded-none border border-[#174F4A]/15 flex flex-col justify-between space-y-4 shadow-sm"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <FileSpreadsheet className="w-6 h-6 text-[#2C7A73]" />
                  <span className="text-[10px] font-bold text-[#174F4A] uppercase bg-[#2C7A73]/10 px-2.5 py-0.5">
                    {prod.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#174F4A]">{prod.title}</h3>
                <p className="text-xs text-[#6F7F7C] leading-relaxed">{prod.description}</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#2C7A73] font-semibold">
                <Clock className="w-3.5 h-3.5" />
                <span>In active development</span>
              </div>
            </div>
          ))}
        </div>

        {/* Email Notify Block */}
        <div className="w-full max-w-xl mx-auto bg-[#174F4A] text-[#FAF6EF] p-8 rounded-none border border-[#2C7A73]/40 space-y-4 text-center">
          <h3 className="text-lg font-bold text-[#FAF6EF]">Get notified when new templates drop</h3>
          <p className="text-xs text-[#FAF6EF]/75">
            No spam, ever. Just an honest heads-up when we release new templates for couples.
          </p>

          {subscribed ? (
            <div className="flex items-center justify-center gap-2 text-sm text-[#91B7A0] font-semibold py-2">
              <CheckCircle2 className="w-4 h-4 text-[#F29B7F]" />
              <span>You&apos;re on the list! We&apos;ll send you early access.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="partner@example.com"
                className="flex-1 bg-[#0F3834] border border-[#2C7A73]/50 px-4 py-2.5 rounded-none text-sm text-[#FAF6EF] placeholder-[#FAF6EF]/40 focus:outline-none focus:border-[#F29B7F]"
              />
              <button
                type="submit"
                className="bg-[#FAF6EF] hover:bg-white text-[#174F4A] text-sm font-bold px-6 py-2.5 rounded-none transition-colors cursor-pointer shrink-0"
              >
                Notify Me
              </button>
            </form>
          )}
        </div>

        {/* Current Available System CTA */}
        <div className="text-center pt-2 space-y-3">
          <p className="text-xs text-[#6F7F7C] uppercase tracking-widest">
            Ready to use right now
          </p>
          <Link
            href="/products/couples-money-planner"
            className="inline-flex items-center justify-center gap-2 bg-[#174F4A] hover:bg-[#0F3834] text-[#FAF6EF] text-sm sm:text-base font-bold px-8 py-4 rounded-none transition-colors cursor-pointer shadow-md"
          >
            <FileSpreadsheet className="w-4 h-4 text-[#F29B7F]" />
            <span>Explore Couples Money Planner Showcase</span>
            <ArrowRight className="w-4 h-4 ml-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
