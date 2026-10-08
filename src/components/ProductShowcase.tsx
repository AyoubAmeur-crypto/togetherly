'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  CheckCircle2,
  Maximize2,
  X,
  LayoutDashboard,
  Calendar,
  Scale,
  Target,
  Sparkles
} from 'lucide-react';
import { couplesMoneyPlanner, TogetherlySheetTab } from '../config/productConfig';

export default function ProductShowcase() {
  const [activeTabId, setActiveTabId] = useState<string>(couplesMoneyPlanner.tabs[0].id);
  const [zoomModalImage, setZoomModalImage] = useState<{ src: string; title: string } | null>(null);

  const activeTab: TogetherlySheetTab =
    couplesMoneyPlanner.tabs.find((t) => t.id === activeTabId) || couplesMoneyPlanner.tabs[0];

  const getTabIcon = (id: string) => {
    switch (id) {
      case 'dashboard':
        return <LayoutDashboard className="w-4 h-4" />;
      case 'monthly-plan':
        return <Calendar className="w-4 h-4" />;
      case 'fair-split':
        return <Scale className="w-4 h-4" />;
      case 'goals':
        return <Target className="w-4 h-4" />;
      case 'money-date':
        return <Sparkles className="w-4 h-4" />;
      default:
        return <LayoutDashboard className="w-4 h-4" />;
    }
  };

  return (
    <section id="whats-inside" className="py-20 sm:py-28 bg-[#FAF6EF] border-b border-[#174F4A]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#174F4A] tracking-tight">
            Designed for real life, not accounting textbooks.
          </h2>
          <p className="text-base text-[#6F7F7C] leading-relaxed max-w-2xl mx-auto">
            Every sheet connects seamlessly into the next. Zero manual double-entry, zero broken formulas. Click through the tabs below to explore the actual system:
          </p>
        </div>

        {/* Tab Switcher Pills */}
        <div className="mt-12 flex flex-wrap justify-center gap-2 sm:gap-3">
          {couplesMoneyPlanner.tabs.map((tab) => {
            const isActive = tab.id === activeTab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-none text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#174F4A] text-[#FAF6EF] shadow-none'
                    : 'bg-[#FFFFFF] text-[#243B38] hover:bg-[#F29B7F]/15 border border-[#174F4A]/10'
                }`}
              >
                <span className={isActive ? 'text-[#F29B7F]' : 'text-[#2C7A73]'}>
                  {getTabIcon(tab.id)}
                </span>
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Tab Visual Display */}
        <div className="mt-10 bg-[#FFFFFF] rounded-none border border-[#174F4A]/15 shadow-none overflow-hidden">
          {/* Mock Google Sheets Top Ribbon */}
          <div className="bg-[#F7F0E4] px-4 py-3 border-b border-[#174F4A]/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-none bg-[#E57373]/70" />
              <div className="w-3 h-3 rounded-none bg-[#FFD54F]/70" />
              <div className="w-3 h-3 rounded-none bg-[#81C784]/70" />
              <span className="ml-2 text-xs font-mono text-[#6F7F7C] hidden sm:inline">
                Togetherly_CouplesMoneyPlanner_2026.gsheet • {activeTab.name}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px] font-semibold text-[#174F4A] bg-[#2C7A73]/15 px-2.5 py-0.5 rounded-none">
                {activeTab.badge}
              </span>
              <button
                onClick={() => setZoomModalImage({ src: activeTab.screenshot, title: activeTab.title })}
                className="text-xs text-[#2C7A73] hover:text-[#174F4A] font-medium flex items-center gap-1 cursor-pointer bg-white/70 px-2 py-1 rounded-none border border-[#174F4A]/10 transition-colors"
                title="Click to view full resolution"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Inspect Full Size</span>
              </button>
            </div>
          </div>

          {/* Screenshot Display */}
          <div className="relative bg-[#F8F9FA] p-2 sm:p-6 flex items-center justify-center group">
            <div
              onClick={() => setZoomModalImage({ src: activeTab.screenshot, title: activeTab.title })}
              className="relative w-full cursor-zoom-in rounded-none overflow-hidden border border-[#174F4A]/10 shadow-none"
            >
              <Image
                src={activeTab.screenshot}
                alt={`${activeTab.name} - Couples Money Planner`}
                width={1200}
                height={750}
                sizes="(max-width: 1024px) 100vw, 900px"
                loading="lazy"
                className="w-full h-auto object-cover rounded-none"
              />
              <div className="absolute inset-0 bg-[#174F4A]/0 group-hover:bg-[#174F4A]/5 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-[#174F4A] text-[#FAF6EF] text-xs font-medium px-3 py-1.5 rounded-none shadow-none flex items-center gap-1.5">
                  <Maximize2 className="w-3.5 h-3.5" />
                  Click to Expand Screenshot
                </span>
              </div>
            </div>
          </div>

          {/* Tab Information & Explanation */}
          <div className="p-6 sm:p-8 bg-[#FFFFFF] border-t border-[#174F4A]/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-3">
              <div className="text-xs font-bold text-[#F29B7F] tracking-wide uppercase">
                {activeTab.tabLabel}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#174F4A]">
                {activeTab.title}
              </h3>
              <p className="text-sm text-[#6F7F7C] leading-relaxed">
                {activeTab.summary}
              </p>
            </div>

            <div className="lg:col-span-6 space-y-2.5">
              <div className="text-xs font-bold text-[#2C7A73] uppercase tracking-wider mb-1">
                Highlights & Features
              </div>
              {activeTab.bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#243B38]">
                  <CheckCircle2 className="w-4 h-4 text-[#2C7A73] shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* System Capabilities Footer Stats */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-[#FFFFFF] p-5 rounded-none border border-[#174F4A]/10 text-center space-y-1">
            <div className="text-2xl font-extrabold text-[#174F4A]">8 Sheets</div>
            <div className="text-xs text-[#6F7F7C]">100% Fully Connected</div>
          </div>
          <div className="bg-[#FFFFFF] p-5 rounded-none border border-[#174F4A]/10 text-center space-y-1">
            <div className="text-2xl font-extrabold text-[#174F4A]">0 Passwords</div>
            <div className="text-xs text-[#6F7F7C]">Private in Google Drive</div>
          </div>
          <div className="bg-[#FFFFFF] p-5 rounded-none border border-[#174F4A]/10 text-center space-y-1">
            <div className="text-2xl font-extrabold text-[#174F4A]">zsh Subscriptions</div>
            <div className="text-xs text-[#6F7F7C]">One-Time  Forever</div>
          </div>
          <div className="bg-[#FFFFFF] p-5 rounded-none border border-[#174F4A]/10 text-center space-y-1">
            <div className="text-2xl font-extrabold text-[#174F4A]">1 Click</div>
            <div className="text-xs text-[#6F7F7C]">Instant Setup Wizard</div>
          </div>
        </div>
      </div>

      {/* Image Modal for Screenshot Inspect */}
      {zoomModalImage && (
        <div
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setZoomModalImage(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#FFFFFF] p-4 rounded-none shadow-2xl border border-[#174F4A]/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#174F4A]/10">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold text-[#174F4A]">
                  {zoomModalImage.title}
                </span>
              </div>
              <button
                onClick={() => setZoomModalImage(null)}
                className="p-1 hover:bg-[#FAF6EF] text-[#6F7F7C] hover:text-[#174F4A] rounded-none transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-auto max-h-[80vh] flex items-center justify-center bg-[#FAF6EF] p-2">
              <Image
                src={zoomModalImage.src}
                alt={zoomModalImage.title}
                width={1800}
                height={1100}
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
