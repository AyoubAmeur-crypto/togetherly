'use client';

import React, { useState } from 'react';
import { X, ShieldCheck, ShoppingBag, ExternalLink, ArrowRight } from 'lucide-react';
import { couplesMoneyPlanner, TOGETHERLY_GOOGLE_SHEET_COPY_URL } from '../config/productConfig';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-[#174F4A]/80 backdrop-blur-sm p-4 sm:p-6 flex items-center justify-center animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-[#FAF6EF] w-full max-w-lg rounded-none shadow-2xl border border-[#174F4A]/15 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#174F4A] text-[#FAF6EF] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#F29B7F]" />
            <h3 className="font-bold text-base">Get Couples Money Planner</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-none bg-white/10 hover:bg-white/20 text-[#FAF6EF] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-3">
            <span className="text-4xl font-extrabold text-[#174F4A]">
              {couplesMoneyPlanner.pricing.formatted}
            </span>
            <p className="text-xs text-[#6F7F7C]">
              {couplesMoneyPlanner.pricing.periodNotice}
            </p>
          </div>

          <div className="bg-white p-4 rounded-none border border-[#174F4A]/10 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-[#2C7A73]">
              Instant Deliverables
            </div>
            <ul className="space-y-1.5 text-xs text-[#243B38]">
              <li>• Complete 8-sheet synchronized Google Sheets system</li>
              <li>• 1-click Setup Wizard with custom currency & names</li>
              <li>• Automated Fair Split engine (50/50 or proportional)</li>
              <li>• Guided 20-minute monthly Money Date routine</li>
              <li>• 30-day money-back guarantee</li>
            </ul>
          </div>

          <div className="space-y-3">
            <a
              href={TOGETHERLY_GOOGLE_SHEET_COPY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full bg-[#174F4A] text-[#FAF6EF] py-3.5 px-6 rounded-none font-bold hover:bg-[#0F3834] transition-colors"
            >
              <span>Instant 1-Click Google Sheets Copy</span>
              <ArrowRight className="w-4 h-4 text-[#F29B7F]" />
            </a>

            <button
              onClick={onClose}
              className="w-full text-center text-xs text-[#6F7F7C] hover:text-[#174F4A] py-2 font-medium cursor-pointer"
            >
              Back to Store
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
