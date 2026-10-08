'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { trackWhatsAppClick } from '@/lib/analytics';
import { TOGETHERLY_WHATSAPP_NUMBER, formatWhatsAppUrl } from '@/config/productConfig';

export interface WhatsAppHelpCTAProps {
  topic: string;
  message: string;
  sourcePage: string;
  contentCluster?: string;
  ctaLocation?: string;
  headline?: string;
  subtext?: string;
  buttonText?: string;
  className?: string;
  rounded?: boolean;
  variant?: 'card' | 'section';
  illustrationSrc?: string;
}

/**
 * Official WhatsApp Brand SVG Icon
 */
export function WhatsAppIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function WhatsAppHelpCTA({
  topic,
  message,
  sourcePage,
  contentCluster = 'Expense Splitting',
  ctaLocation = 'article_middle',
  headline = 'Have questions or need help with anything?',
  subtext = "Message Togetherly directly on WhatsApp (0770566628). We're here to answer questions, guide your setup, and help you build stress-free financial harmony.",
  buttonText = 'Contact Support for Anything',
  className = '',
  rounded = true,
  variant = 'card',
  illustrationSrc = '/togetherly/illustration.png',
}: WhatsAppHelpCTAProps) {
  const waUrl = formatWhatsAppUrl(TOGETHERLY_WHATSAPP_NUMBER, message);

  const handleClick = () => {
    trackWhatsAppClick({
      page: sourcePage,
      content_cluster: contentCluster,
      cta_location: ctaLocation,
      topic,
    });
  };

  // Full-width normal section with Content on Left and Illustration on Right (no over-rounded div)
  if (variant === 'section') {
    return (
      <section
        id="whatsapp-support"
        aria-label="Togetherly WhatsApp Support"
        className={`w-full py-16 sm:py-20 bg-[#FAF6EF] border-t border-b border-[#174F4A]/10 text-[#243B38] overflow-hidden ${className}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Content on Left */}
            <div className="lg:col-span-7 xl:col-span-7 space-y-6 text-left order-1">
              
              <div className="space-y-3">
                <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#174F4A] tracking-tight leading-[1.18]">
                  {headline}
                </h2>
                <p className="text-sm sm:text-base text-[#6F7F7C] leading-relaxed max-w-xl">
                  {subtext}
                </p>
              </div>

              {/* Support trust indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs text-[#243B38]">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2C7A73]" />
                  <span className="font-semibold text-[#174F4A]">Real Human Support</span>
                  <span className="text-[#6F7F7C]">· No bot scripts</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2C7A73]" />
                  <span className="font-semibold text-[#174F4A]">Personal Assistance</span>
                  <span className="text-[#6F7F7C]">· Questions &amp; setup</span>
                </div>
              </div>

              {/* WhatsApp CTA with WhatsApp icon button */}
              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleClick}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#174F4A] hover:bg-[#0F3834] text-[#FAF6EF] text-sm sm:text-base font-extrabold py-3.5 px-7 rounded-none transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-md tracking-tight"
                  aria-label={`${buttonText} - opens WhatsApp`}
                >
                  <WhatsAppIcon className="w-5 h-5 text-[#25D366] shrink-0" />
                  <span>{buttonText}</span>
                  <ArrowRight className="w-4 h-4 ml-1 text-[#FAF6EF]" />
                </a>

                
              </div>
            </div>

            {/* Right Column: Customer Support Illustration on Right */}
            <div className="lg:col-span-5 xl:col-span-5 order-2 flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-[380px] sm:max-w-[440px] lg:max-w-[480px]">
                <Image
                  src={illustrationSrc}
                  alt="Togetherly WhatsApp Customer Support"
                  width={480}
                  height={319}
                  sizes="(max-width: 1024px) 100vw, 480px"
                  loading="lazy"
                  className="w-full h-auto object-contain select-none"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div
      className={`bg-[#FFFFFF] border border-[#174F4A]/15 p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-sm ${
        rounded ? 'rounded-2xl' : 'rounded-none'
      } ${className}`}
    >
      <div className="space-y-1.5 max-w-xl">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2C7A73] uppercase tracking-wider">
          <WhatsAppIcon className="w-3.5 h-3.5 text-[#2C7A73]" />
          <span>Togetherly Quick Help</span>
        </div>
        <h4 className="text-base sm:text-lg font-bold text-[#174F4A] leading-snug">
          {headline}
        </h4>
        <p className="text-xs sm:text-sm text-[#6F7F7C] leading-relaxed">
          {subtext}
        </p>
      </div>

      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={`inline-flex items-center gap-2.5 bg-[#174F4A] hover:bg-[#0F3834] text-[#FAF6EF] text-xs sm:text-sm font-bold px-5 py-3 transition-colors shrink-0 shadow-sm cursor-pointer ${
          rounded ? 'rounded-full' : 'rounded-none'
        }`}
        aria-label={`${buttonText} - opens WhatsApp`}
      >
        <WhatsAppIcon className="w-4 h-4 fill-current text-[#F29B7F] shrink-0" />
        <span>{buttonText}</span>
        <ArrowRight className="w-3.5 h-3.5 ml-0.5 text-[#FAF6EF]" />
      </a>
    </div>
  );
}
