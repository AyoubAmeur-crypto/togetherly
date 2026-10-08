'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  FileSpreadsheet,
  ArrowRight,
  ShieldCheck,
  Lock,
  Zap,
  CheckCircle2,
  Maximize2,
  X,
  Smartphone
} from 'lucide-react';
import { TOGETHERLY_GOOGLE_SHEET_COPY_URL } from '../config/productConfig';

export default function TabletHero() {
  const [zoomOpen, setZoomOpen] = useState(false);

  return (
    <section className="relative pt-8 sm:pt-14 pb-16 sm:pb-24 overflow-hidden bg-[#FAF6EF] border-b border-[#174F4A]/10">
      {/* Ambient gradient glow in the background */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#2C7A73]/10 via-[#F29B7F]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-10 w-[500px] h-[400px] bg-gradient-to-tr from-[#174F4A]/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid: Description Left & Tablet Image Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Description, Pricing & CTAs */}
          <div className="lg:col-span-6 order-2 lg:order-1 space-y-6 text-left">
            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#174F4A] tracking-tight leading-[1.12]">
                Togetherly — <br className="hidden sm:inline" />
                <span className="text-[#2C7A73]">Couples Money Planner</span>
              </h1>
              <p className="text-base sm:text-lg text-[#243B38] font-medium leading-relaxed">
                The complete 8-sheet financial planning system designed for modern couples in Google Sheets.
              </p>
            </div>

            {/* Deep Description */}
            <p className="text-sm sm:text-base text-[#6F7F7C] leading-relaxed max-w-xl">
              Track shared living costs, balance fair proportional splits without awkward math, and build your shared financial future with calm confidence. No bank account linking, no monthly subscriptions, and zero accounting headaches.
            </p>

            {/* Key Value Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs sm:text-sm font-medium text-[#243B38]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2C7A73] shrink-0" />
                <span>8 fully synchronized sheets</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2C7A73] shrink-0" />
                <span>Automated fair-split math</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2C7A73] shrink-0" />
                <span>100% private in Google Drive</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2C7A73] shrink-0" />
                <span>Guided monthly Money Dates</span>
              </div>
            </div>

            {/* Price & Action Block */}
            <div className="pt-3 space-y-4">
              {/* Pricing Callout */}
              <div className="flex items-center gap-3.5">
                <span className="text-4xl font-extrabold text-[#174F4A] tracking-tight leading-none">
                  $19
                </span>
                <div className="h-8 w-px bg-[#174F4A]/20" />
                <div className="text-xs sm:text-sm text-[#6F7F7C] leading-tight">
                  <span className="font-bold text-[#174F4A]">One-time payment</span>
                  <span className="mx-1.5">•</span>
                  <span className="text-[#2C7A73] font-medium">Lifetime personal license</span>
                  <div className="text-[11px] text-[#6F7F7C]/80 mt-0.5">No recurring monthly fees • Instant copy</div>
                </div>
              </div>

              {/* Action Button (Direct Checkout, No Demo) */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <a
                  href={TOGETHERLY_GOOGLE_SHEET_COPY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#174F4A] hover:bg-[#0F3834] text-[#FAF6EF] text-sm sm:text-base font-extrabold px-8 py-4 rounded-none transition-colors cursor-pointer shadow-sm tracking-tight"
                >
                  <span>Buy Couples Money Planner ($19)</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Trust Badges Bar */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-xs text-[#6F7F7C]">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#2C7A73]" />
                  <span>30-Day Money-Back Guarantee</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-[#2C7A73]" />
                  <span>100% Private Google Sheets</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-[#2C7A73]" />
                  <span>Instant 1-Click Copy</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Tablet Mockup Image Showcase */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-xl lg:max-w-none group">
              {/* Soft tablet shadow and border treatment */}
              <div className="relative rounded-none overflow-hidden cursor-pointer" onClick={() => setZoomOpen(true)}>
                <Image
                  src="/togetherly/tablet.png"
                  alt="Togetherly Couples Money Planner Google Sheets on Tablet"
                  width={800}
                  height={444}
                  priority
                  sizes="(max-width: 1024px) 100vw, 700px"
                  className="w-full h-auto object-contain select-none drop-shadow-2xl transition-transform duration-300 group-hover:scale-[1.015]"
                />

                {/* Inspect Overlay Trigger */}
                <div className="absolute inset-0 bg-[#174F4A]/0 group-hover:bg-[#174F4A]/10 transition-colors flex items-center justify-center pointer-events-none">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-[#174F4A] text-[#FAF6EF] text-xs font-semibold px-4 py-2 rounded-none shadow-lg flex items-center gap-1.5">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Click to Zoom Mockup</span>
                  </span>
                </div>
              </div>

              {/* Tablet Info Footer Badge */}
              <div className="mt-4 flex items-center justify-between text-xs text-[#6F7F7C] px-2">
                <div className="flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-[#2C7A73]" />
                  <span>Optimized for iPad, Tablet, Mac & PC Google Sheets</span>
                </div>
                <button
                  onClick={() => setZoomOpen(true)}
                  className="text-[#2C7A73] hover:text-[#174F4A] font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Maximize2 className="w-3 h-3" />
                  <span>Inspect Full Size</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Zoom Modal for Tablet Image */}
      {zoomOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setZoomOpen(false)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#FFFFFF] p-3 sm:p-5 rounded-none shadow-2xl border border-[#174F4A]/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#174F4A]/10">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-[#2C7A73]" />
                <span className="text-xs sm:text-sm font-bold text-[#174F4A]">
                  Togetherly Couples Money Planner • Tablet Interface
                </span>
              </div>
              <button
                onClick={() => setZoomOpen(false)}
                className="p-1.5 hover:bg-[#FAF6EF] text-[#6F7F7C] hover:text-[#174F4A] rounded-none transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-auto max-h-[80vh] flex items-center justify-center bg-[#FAF6EF] p-4">
              <Image
                src="/togetherly/tablet.png"
                alt="Togetherly Couples Money Planner on Tablet (Full View)"
                width={1600}
                height={888}
                sizes="90vw"
                className="w-full h-auto object-contain rounded-none"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
