'use client';

import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';

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
      className={`w-full py-20 sm:py-28 ${bgClass} border-b border-[#174F4A]/10 transition-colors ${className}`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-7">
        {/* Simple 5-star rating without enclosing box */}
        <div className="flex items-center justify-center gap-1.5" aria-label="5 out of 5 stars">
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

        {/* Main Headline Quote */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#174F4A] tracking-tight leading-[1.2] max-w-3xl mx-auto">
          “I managed to organize my life and saved thousands of dollars.”
        </h2>

        {/* Testimonial Story */}
        <p className="text-base sm:text-lg text-[#4A5D5A] leading-relaxed max-w-2xl mx-auto font-normal">
          Before Togetherly, our finances felt like a constant guessing game spread across separate apps, forgotten subscriptions, and awkward conversations. Setting this up was the moment everything changed — I tracked everything I spent without feeling restricted, cut out hidden spending leaks, and saved thousands of dollars in the first year alone. Having one shared, private Google Sheets system gave us total peace of mind.
        </p>

        {/* Author Info */}
        <div className="flex items-center justify-center gap-3.5 pt-3">
          <Image
            src="/togetherly/ayoubameur.png"
            alt="Ayoub Ameur"
            className="w-13 h-13 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-[#174F4A]/15 shadow-xs"
            width={56}
            height={56}
            loading="lazy"
          />
          <div className="text-left">
            <div className="text-base font-extrabold text-[#174F4A] tracking-tight">
              Ayoub Ameur
            </div>
            <div className="text-xs text-[#6F7F7C] font-medium">
              Togetherly User • Shared &amp; Personal Budgeting
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
