'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Sparkles, X, Mail, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { trackEmailSignup } from '@/lib/analytics';

interface EmailTopBannerProps {
  onVisibilityChange?: (visible: boolean) => void;
}

export default function EmailTopBanner({ onVisibilityChange }: EmailTopBannerProps) {
  const pathname = usePathname() || '/';

  // Only show on Brand Story (/) or Product Showcase (/products, /products/*)
  const isStory = pathname === '/';
  const isProduct = pathname === '/products' || pathname.startsWith('/products/');
  const isTargetPage = isStory || isProduct;

  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Determine key for dismissal per page context
  const dismissKey = isStory
    ? 'togetherly_banner_dismissed_story'
    : 'togetherly_banner_dismissed_product';

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if globally already subscribed
    const alreadySubscribed = localStorage.getItem('togetherly_subscribed') === 'true';
    if (alreadySubscribed) {
      setIsVisible(false);
      onVisibilityChange?.(false);
      return;
    }

    if (!isTargetPage) {
      setIsVisible(false);
      onVisibilityChange?.(false);
      return;
    }

    // Check if dismissed on current page context (Story vs Product)
    const isDismissedOnThisPage = sessionStorage.getItem(dismissKey) === 'true';
    if (isDismissedOnThisPage) {
      setIsVisible(false);
      onVisibilityChange?.(false);
    } else {
      setIsVisible(true);
      onVisibilityChange?.(true);
    }
  }, [pathname, isTargetPage, dismissKey, onVisibilityChange]);

  const handleDismiss = () => {
    setIsVisible(false);
    onVisibilityChange?.(false);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(dismissKey, 'true');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedEmail) {
      setErrorMessage('Please enter your email.');
      setStatus('error');
      return;
    }

    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage('Please enter a valid email.');
      setStatus('error');
      return;
    }

    setStatus('loading');

    try {
      const sourcePage = typeof window !== 'undefined' ? window.location.pathname : pathname;
      const contentCluster = isStory ? 'Brand Story' : 'Product Showcase';
      const ctaLocation = isStory ? 'story_top_banner' : 'product_top_banner';

      const response = await fetch('/api/email/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: trimmedEmail,
          source_page: sourcePage,
          content_cluster: contentCluster,
          cta_location: ctaLocation,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus('error');
        setErrorMessage(data.error || 'Unable to subscribe. Please try again.');
        return;
      }

      setStatus('success');

      // Save subscription in localStorage to hide all subscription prompts permanently
      if (typeof window !== 'undefined') {
        localStorage.setItem('togetherly_subscribed', 'true');
        sessionStorage.setItem('togetherly_banner_dismissed_story', 'true');
        sessionStorage.setItem('togetherly_banner_dismissed_product', 'true');
      }

      trackEmailSignup({
        source_page: sourcePage,
        content_cluster: contentCluster,
        cta_location: ctaLocation,
      });

      // Automatically hide banner after a brief confirmation delay
      setTimeout(() => {
        setIsVisible(false);
        onVisibilityChange?.(false);
      }, 4000);
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please try again.');
    }
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Free tools and planner announcement banner"
      className="w-full bg-gradient-to-r from-[#0D3531] via-[#103D38] to-[#0D3531] border-b border-[#2C7A73]/40 text-[#FAF6EF] relative z-[101] shadow-sm transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-2.5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2.5 sm:gap-3">
          {/* Left: Humanized Value Prop */}
          <div className="flex items-center gap-2 text-center md:text-left shrink-0">
            <span className="inline-flex items-center gap-1 bg-[#F29B7F]/20 text-[#F29B7F] px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-[#F29B7F]" />
              <span>Free Tools</span>
            </span>

            <p className="text-xs sm:text-[13px] text-[#FAF6EF] font-medium leading-tight">
              More free tools for couples are coming — get the next free tool:
            </p>
          </div>

          {/* Right: Inline Email Subscription Form or Success State */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-end">
            {status === 'success' ? (
              <div className="flex items-center gap-2 text-xs font-semibold text-[#81C784] bg-[#2C7A73]/25 px-3 py-1.5 border border-[#81C784]/30">
                <CheckCircle2 className="w-4 h-4 text-[#81C784] shrink-0" />
                <span>You&apos;re on the list! We&apos;ll notify you when the next free tool launches.</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-1.5 w-full sm:w-auto justify-center"
              >
                <div className="relative flex-1 sm:w-60">
                  <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-[#91B7A0]">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === 'error') setStatus('idle');
                    }}
                    placeholder="Enter your email"
                    aria-label="Email address for free tools"
                    disabled={status === 'loading'}
                    className="w-full pl-8 pr-2.5 py-1 text-xs bg-[#174F4A]/90 border border-[#2C7A73]/60 text-[#FAF6EF] placeholder-[#FAF6EF]/50 focus:outline-none focus:border-[#F29B7F] focus:bg-[#174F4A] transition-colors rounded-none disabled:opacity-60"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="inline-flex items-center justify-center gap-1 bg-[#FAF6EF] hover:bg-white text-[#174F4A] text-xs font-bold px-3 py-1 rounded-none transition-colors shrink-0 cursor-pointer shadow-none disabled:opacity-60"
                >
                  {status === 'loading' ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#174F4A]" />
                  ) : (
                    <>
                      <span>Get Next Tool</span>
                      <ArrowRight className="w-3 h-3 text-[#174F4A]" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Close / Dismiss Button */}
            <button
              onClick={handleDismiss}
              aria-label="Dismiss banner"
              className="p-1 text-[#FAF6EF]/60 hover:text-[#FAF6EF] hover:bg-[#2C7A73]/30 transition-colors cursor-pointer shrink-0"
              title="Close announcement"
            >
              <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>

        {/* Error message indicator if invalid input */}
        {status === 'error' && (
          <div className="text-[11px] text-[#F29B7F] text-center md:text-right pt-1 font-medium">
            {errorMessage}
          </div>
        )}
      </div>
    </aside>
  );
}
