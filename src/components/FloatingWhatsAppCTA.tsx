'use client';

import React from 'react';
import { trackWhatsAppClick } from '@/lib/analytics';
import { TOGETHERLY_WHATSAPP_NUMBER, formatWhatsAppUrl } from '@/config/productConfig';
import { WhatsAppIcon } from './WhatsAppHelpCTA';

export interface FloatingWhatsAppCTAProps {
  sourcePage?: string;
  topic?: string;
  message?: string;
}

export default function FloatingWhatsAppCTA({
  sourcePage = '/',
  topic = 'floating_help',
  message = "Hi Togetherly! I have a question about your couples tools and planner.",
}: FloatingWhatsAppCTAProps) {
  const waUrl = formatWhatsAppUrl(TOGETHERLY_WHATSAPP_NUMBER, message);

  const handleClick = () => {
    trackWhatsAppClick({
      page: sourcePage,
      content_cluster: 'Live Questions',
      cta_location: 'floating_button',
      topic,
    });
  };

  return (
    <aside aria-label="WhatsApp quick chat" className="fixed bottom-6 right-6 z-40 print:hidden">
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="group flex items-center gap-2.5 bg-[#174F4A] hover:bg-[#0F3834] text-[#FAF6EF] font-bold text-xs sm:text-sm px-4 py-3 sm:px-5 sm:py-3.5 rounded-full shadow-xl border border-[#2C7A73]/40 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="Ask Togetherly on WhatsApp (0770566628)"
      >
        <WhatsAppIcon className="w-4 h-4 fill-current text-[#F29B7F] shrink-0" />
        <span className="hidden sm:inline">Ask on WhatsApp</span>
        <span className="sm:hidden">WhatsApp</span>
      </a>
    </aside>
  );
}
