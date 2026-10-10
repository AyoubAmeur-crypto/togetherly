'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { X, Mail, Check, Loader2, Sparkles, Lock } from 'lucide-react';
import {
  trackPopupView,
  trackPopupClose,
  trackPopupEmailStarted,
  trackPopupSubmit,
  trackPopupConversion,
  trackStarterKitOpened,
} from '@/lib/analytics';

// Storage Keys
const SESSION_SEEN_KEY = 'togetherly_popup_seen';
const DISMISSED_AT_KEY = 'togetherly_popup_dismissed_at';
const SUBSCRIBED_KEY = 'togetherly_email_subscribed';
const LEGACY_SUBSCRIBED_KEY = 'togetherly_subscribed';
const ATTRIBUTION_KEY = 'togetherly_attribution_data';
const DISMISS_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000; // 7 days cooldown

// Excluded Paths (No popup interruption on sensitive or legal pages)
const EXCLUDED_PATHS = [
  '/privacy',
  '/terms',
  '/refund-policy',
  '/unsubscribe',
  '/coming-soon',
  '/checkout',
  '/buy',
];

interface AttributionData {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  referrer: string;
  landing_page: string;
  source: string;
}

/**
 * Extracts and preserves first-touch Pinterest / SEO / Campaign attribution in sessionStorage.
 */
function getInitialAttribution(): AttributionData {
  if (typeof window === 'undefined') {
    return {
      utm_source: '',
      utm_medium: '',
      utm_campaign: '',
      utm_content: '',
      referrer: '',
      landing_page: '',
      source: 'direct',
    };
  }

  try {
    const saved = sessionStorage.getItem(ATTRIBUTION_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // sessionStorage unavailable
  }

  const urlParams = new URLSearchParams(window.location.search);
  const utm_source = urlParams.get('utm_source') || '';
  const utm_medium = urlParams.get('utm_medium') || '';
  const utm_campaign = urlParams.get('utm_campaign') || '';
  const utm_content = urlParams.get('utm_content') || '';
  const referrer = document.referrer || '';
  const landing_page = window.location.pathname;

  let source = 'direct';
  const utmLower = utm_source.toLowerCase();
  const refLower = referrer.toLowerCase();

  if (utmLower.includes('pinterest') || refLower.includes('pinterest') || refLower.includes('pin.it')) {
    source = 'pinterest';
  } else if (utmLower.includes('google') || refLower.includes('google.')) {
    source = 'google';
  } else if (utmLower.includes('instagram') || refLower.includes('instagram')) {
    source = 'instagram';
  } else if (utm_source) {
    source = utm_source.toLowerCase();
  } else if (referrer && !referrer.includes(window.location.hostname)) {
    source = 'other';
  }

  const attribution: AttributionData = {
    utm_source,
    utm_medium,
    utm_campaign,
    utm_content,
    referrer,
    landing_page,
    source,
  };

  try {
    sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attribution));
  } catch {
    // sessionStorage unavailable
  }

  return attribution;
}

function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop';
  const width = window.innerWidth;
  if (width < 640) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

/**
 * Reads A/B testing variant: Variant A (default) vs Variant B.
 * Allows instant testing via URL query: `?popup_variant=B`.
 */
function getABVariant(): 'A' | 'B' {
  if (typeof window === 'undefined') return 'A';
  try {
    const param = new URLSearchParams(window.location.search).get('popup_variant');
    if (param?.toUpperCase() === 'B') return 'B';
  } catch {}
  return 'A';
}

export default function EmailTopPopup() {
  const pathname = usePathname() || '/';

  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [variant, setVariant] = useState<'A' | 'B'>('A');

  const modalCardRef = useRef<HTMLDivElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const previousFocusedElementRef = useRef<HTMLElement | null>(null);
  const modalOpenedAtRef = useRef<number>(0);
  const pageLoadTimeRef = useRef<number>(0);
  const hasStartedTypingRef = useRef(false);
  const isTriggeredRef = useRef(false);

  // Check if current page is excluded
  const isExcludedPath =
    EXCLUDED_PATHS.some((path) => pathname === path || pathname.startsWith(path + '/')) ||
    pathname.includes('checkout') ||
    pathname.includes('unsubscribe');

  // Check if testing mode or local development
  const isLocalDev =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.search.includes('popup=true') ||
      window.location.search.includes('test=true'));

  // Trigger modal function with safety checks
  const triggerModal = useCallback(
    (triggerReason: 'timer_25s' | 'scroll_50' | 'exit_intent' | 'manual_open') => {
      if (typeof window === 'undefined' || isTriggeredRef.current) return;
      if (isExcludedPath) return;

      const urlForcesPopup =
        window.location.search.includes('popup=true') ||
        window.location.search.includes('test=true') ||
        triggerReason === 'manual_open';

      if (!urlForcesPopup) {
        // 1. Check if already subscribed (permanent block)
        const isSubscribed = localStorage.getItem(SUBSCRIBED_KEY) === 'true';
        if (isSubscribed) return;

        // 2. Check if already seen in current browsing session (unless on localhost)
        if (!isLocalDev && sessionStorage.getItem(SESSION_SEEN_KEY) === 'true') return;

        // 3. Check if dismissed within the last 7 days (unless on localhost)
        if (!isLocalDev) {
          const dismissedAt = localStorage.getItem(DISMISSED_AT_KEY);
          if (dismissedAt) {
            const timeSinceDismiss = Date.now() - parseInt(dismissedAt, 10);
            if (timeSinceDismiss < DISMISS_COOLDOWN_MS) {
              return;
            }
          }
        }

        // 4. Do not interrupt if user is actively filling out another form
        const activeEl = document.activeElement;
        if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) {
          return;
        }

        // 5. Do not interrupt an existing open modal dialog
        const existingModal = document.querySelector('[role="dialog"]:not([data-popup="togetherly-lead-modal"])');
        if (existingModal) return;
      }

      // All checks passed: open modal
      isTriggeredRef.current = true;
      sessionStorage.setItem(SESSION_SEEN_KEY, 'true');

      // Save previous focused element for a11y restore
      previousFocusedElementRef.current = document.activeElement as HTMLElement | null;
      modalOpenedAtRef.current = Date.now();

      const currentVariant = getABVariant();
      setVariant(currentVariant);
      setIsOpen(true);

      const attribution = getInitialAttribution();
      trackPopupView({
        page_url: window.location.href,
        utm_source: attribution.utm_source,
        utm_campaign: attribution.utm_campaign,
        utm_content: attribution.utm_content,
        device: getDeviceType(),
        trigger: triggerReason,
        variant: currentVariant,
      });
    },
    [isExcludedPath, isLocalDev]
  );

  // Trigger listeners: timer, 50% scroll depth, desktop exit-intent
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!pageLoadTimeRef.current) {
      pageLoadTimeRef.current = Date.now();
    }

    if (isExcludedPath) {
      const closeTimer = setTimeout(() => {
        setIsOpen((prev) => (prev ? false : prev));
      }, 0);
      return () => clearTimeout(closeTimer);
    }

    const urlForcesPopup =
      window.location.search.includes('popup=true') ||
      window.location.search.includes('test=true');

    if (urlForcesPopup) {
      // Immediate open for testing
      const testTimer = setTimeout(() => {
        triggerModal('manual_open');
      }, 400);
      return () => clearTimeout(testTimer);
    }

    // Expose global test opener in console: window.openTogetherlyPopup()
    (window as unknown as { openTogetherlyPopup?: () => void }).openTogetherlyPopup = () => {
      triggerModal('manual_open');
    };

    // Check early exit conditions before attaching listeners (only in production)
    if (!isLocalDev) {
      const isSubscribed = localStorage.getItem(SUBSCRIBED_KEY) === 'true';
      if (isSubscribed) return;

      if (sessionStorage.getItem(SESSION_SEEN_KEY) === 'true') return;

      const dismissedAt = localStorage.getItem(DISMISSED_AT_KEY);
      if (dismissedAt && Date.now() - parseInt(dismissedAt, 10) < DISMISS_COOLDOWN_MS) {
        return;
      }
    }

    // Trigger 1: Timer on page (3 seconds on localhost for easy testing, 25 seconds in production)
    const timerDelay = isLocalDev ? 2800 : 25000;
    const timer = setTimeout(() => {
      triggerModal('timer_25s');
    }, timerDelay);

    // Trigger 2: 50% scroll depth of article/page
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0 && scrollTop / scrollHeight >= 0.5) {
        triggerModal('scroll_50');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Trigger 3: Desktop-only exit-intent (cursor leaves viewport top)
    const handleMouseLeave = (e: MouseEvent) => {
      if (window.innerWidth >= 768 && e.clientY <= 12) {
        // Require at least 3 seconds on page before exit intent to avoid accidental triggers
        if (Date.now() - pageLoadTimeRef.current >= 3000) {
          triggerModal('exit_intent');
        }
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [pathname, isExcludedPath, isLocalDev, triggerModal]);

  const handleClose = useCallback(() => {
    setIsOpen(false);

    // Store dismissal time in localStorage (7 days cooldown)
    if (typeof window !== 'undefined') {
      localStorage.setItem(DISMISSED_AT_KEY, Date.now().toString());
    }

    const timeSpent = modalOpenedAtRef.current
      ? Math.max(1, Math.round((Date.now() - modalOpenedAtRef.current) / 1000))
      : 0;

    const attribution = getInitialAttribution();
    trackPopupClose({
      page_url: typeof window !== 'undefined' ? window.location.href : '',
      utm_source: attribution.utm_source,
      device: getDeviceType(),
      time_spent_seconds: timeSpent,
    });

    // Return focus to previous element for accessibility
    setTimeout(() => {
      previousFocusedElementRef.current?.focus?.();
    }, 50);
  }, []);

  // Accessibility: Focus trap & Escape key listener
  useEffect(() => {
    if (!isOpen) return;

    // Focus input after modal renders
    const focusTimer = setTimeout(() => {
      emailInputRef.current?.focus();
    }, 60);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
        return;
      }

      // Trap focus inside modal
      if (e.key === 'Tab' && modalCardRef.current) {
        const focusable = modalCardRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleClose]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (status === 'error') setStatus('idle');

    if (!hasStartedTypingRef.current && e.target.value.trim().length > 0) {
      hasStartedTypingRef.current = true;
      trackPopupEmailStarted({
        page_url: typeof window !== 'undefined' ? window.location.href : '',
        device: getDeviceType(),
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return; // Prevent rapid duplicate submissions

    setErrorMessage('');
    const trimmedEmail = email.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      setErrorMessage('Enter a valid email address.');
      setStatus('error');
      emailInputRef.current?.focus();
      return;
    }

    setStatus('loading');
    const attribution = getInitialAttribution();
    const device = getDeviceType();

    trackPopupSubmit({
      page_url: typeof window !== 'undefined' ? window.location.href : '',
      utm_source: attribution.utm_source,
      utm_campaign: attribution.utm_campaign,
      device,
      variant,
    });

    try {
      const response = await fetch('/api/email/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: trimmedEmail,
          source: attribution.source,
          utm_source: attribution.utm_source,
          utm_medium: attribution.utm_medium,
          utm_campaign: attribution.utm_campaign,
          utm_content: attribution.utm_content,
          landing_page: attribution.landing_page,
          source_page: typeof window !== 'undefined' ? window.location.pathname : pathname,
          referrer: attribution.referrer,
          lead_magnet: 'couples_money_starter_kit',
          device_type: device,
          cta_location: 'popup_modal',
        }),
      });

      await response.json();

      if (!response.ok) {
        setStatus('error');
        setErrorMessage('Something went wrong. Please try again.');
        return;
      }

      setStatus('success');

      // Permanently mark as subscribed
      if (typeof window !== 'undefined') {
        localStorage.setItem(SUBSCRIBED_KEY, 'true');
        localStorage.setItem(LEGACY_SUBSCRIBED_KEY, 'true');
      }

      trackPopupConversion({
        page_url: typeof window !== 'undefined' ? window.location.href : '',
        utm_source: attribution.utm_source,
        utm_campaign: attribution.utm_campaign,
        utm_content: attribution.utm_content,
        device,
        lead_magnet: 'couples_money_starter_kit',
        variant,
      });
    } catch {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  const handleOpenStarterKit = () => {
    trackStarterKitOpened({
      page_url: typeof window !== 'undefined' ? window.location.href : '',
      device: getDeviceType(),
      lead_magnet: 'couples_money_starter_kit',
    });
    // Open companion calculator / starter kit directly for instant gratification
    window.open('/tools/couples-expense-split-calculator', '_blank', 'noopener,noreferrer');
  };

  if (!isOpen) return null;

  // A/B CTA copy
  const ctaButtonText =
    variant === 'B' ? 'Get the Free Couples Planner →' : 'Get My Free Starter Kit →';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
      data-popup="togetherly-lead-modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3.5 sm:p-6 bg-black/45 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in overflow-y-auto overflow-x-hidden"
    >
      {/* Unified Modal Card */}
      <div
        ref={modalCardRef}
        className="relative w-full max-w-lg md:max-w-2xl lg:max-w-3xl bg-white shadow-[0_25px_60px_rgba(23,79,74,0.18)] my-auto overflow-hidden sm:overflow-visible animate-in zoom-in-95 duration-200 border border-[#174F4A]/10 max-h-[92vh] sm:max-h-none overflow-y-auto sm:overflow-y-visible"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Accessible Close Button */}
        <button
          onClick={handleClose}
          aria-label="Close dialog"
          className="absolute top-3 right-3 sm:-top-3.5 sm:-right-3.5 z-50 w-8 h-8 sm:w-9 sm:h-9 bg-white text-[#174F4A] hover:bg-[#FAF6EF] hover:text-[#0F3834] border border-[#174F4A]/25 sm:border-[#174F4A]/30 shadow-md rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#174F4A] focus-visible:outline-none"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 items-center">
          {/* Content & Form Column */}
          <div className="md:col-span-7 p-5 sm:p-7 lg:p-9 space-y-4 text-left relative z-10">
            {/* Logo + Small Badge */}
            <div className="flex items-center gap-2.5 pr-8 sm:pr-0">
              <Image
                src="/togetherly/togetherly-logo-primary.png"
                alt="Togetherly"
                className="h-6 sm:h-7 w-auto object-contain"
                width={120}
                height={36}
              />
              <span className="inline-flex items-center bg-[#174F4A]/10 text-[#174F4A] px-2.5 py-0.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
                FREE COUPLES STARTER KIT
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-1.5 pr-6 sm:pr-0">
              <h2
                id="modal-headline"
                className="text-xl sm:text-2xl lg:text-[28px] font-extrabold text-[#174F4A] tracking-tight leading-[1.2]"
              >
                Get Your Free Couples Money Starter Kit
              </h2>
              {/* Supporting Text */}
              <p className="text-xs sm:text-sm text-[#4A5D5A] leading-relaxed">
                Get our Google Sheets couples budgeting planner, fair-split calculator, and future free money tools — built to make managing money together easier.
              </p>
            </div>

            {/* 3 Compact Benefit Points */}
            <ul className="space-y-1.5 pt-0.5 text-xs sm:text-[13px] font-semibold text-[#174F4A]" role="list">
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-[#2C7A73]/15 text-[#2C7A73] flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 text-[#2C7A73] stroke-[3]" />
                </span>
                <span>Couples Budget Planner</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-[#2C7A73]/15 text-[#2C7A73] flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 text-[#2C7A73] stroke-[3]" />
                </span>
                <span>Fair-Split Calculator</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-[#2C7A73]/15 text-[#2C7A73] flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 text-[#2C7A73] stroke-[3]" />
                </span>
                <span>New Free Money Tools as They Launch</span>
              </li>
            </ul>

            {/* Form State or Instant Success State */}
            {status === 'success' ? (
              <div className="p-4 sm:p-5 bg-[#FAF6EF] border border-[#174F4A]/20 space-y-3 animate-in fade-in duration-200">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#174F4A]/10 text-[#174F4A] flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4 text-[#2C7A73]" />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="font-extrabold text-base text-[#174F4A]">
                      You&apos;re in!
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4A5D5A] leading-relaxed">
                      Your free Couples Money Starter Kit is ready.
                    </p>
                  </div>
                </div>

                <div className="pt-1">
                  <button
                    type="button"
                    onClick={handleOpenStarterKit}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#174F4A] hover:bg-[#0F3834] text-[#FAF6EF] text-xs sm:text-sm font-extrabold py-3 px-5 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-sm tracking-tight rounded-none focus-visible:ring-2 focus-visible:ring-[#174F4A]"
                  >
                    <span>Open My Free Starter Kit →</span>
                  </button>
                </div>

                <p className="text-[11px] text-[#6F7F7C] text-center pt-0.5">
                  We also sent a direct copy link to your email. You can safely close this window anytime.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2.5 pt-1" noValidate>
                {/* Email Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6F7F7C]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    ref={emailInputRef}
                    type="email"
                    inputMode="email"
                    autoCapitalize="none"
                    autoCorrect="off"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email address"
                    aria-label="Email address"
                    disabled={status === 'loading'}
                    className="w-full pl-10 pr-3.5 py-3 bg-[#FAF6EF] border border-[#174F4A]/25 text-[#174F4A] placeholder-[#6F7F7C]/65 text-xs sm:text-sm focus:outline-none focus:border-[#174F4A] focus:bg-white transition-colors rounded-none disabled:opacity-60 focus-visible:ring-2 focus-visible:ring-[#174F4A]"
                  />
                </div>

                {/* Error Message */}
                {status === 'error' && (
                  <div role="alert" className="text-xs text-[#C62828] font-semibold pt-0.5">
                    {errorMessage}
                  </div>
                )}

                {/* Large Primary CTA Button */}
                <div className="pt-0.5">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#174F4A] hover:bg-[#0F3834] text-[#FAF6EF] text-xs sm:text-sm font-extrabold py-3.5 px-6 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-md tracking-tight disabled:opacity-60 rounded-none focus-visible:ring-2 focus-visible:ring-[#174F4A]"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#F29B7F]" />
                        <span>Getting your kit...</span>
                      </>
                    ) : (
                      <>
                        <span>{ctaButtonText}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Microcopy underneath CTA */}
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-[11px] text-[#4A5D5A] pt-0.5">
                  <Lock className="w-3.5 h-3.5 text-[#174F4A] shrink-0" aria-hidden="true" />
                  <span>Instant access. No spam. Unsubscribe anytime.</span>
                </div>
              </form>
            )}

            {/* Mobile-only dashboard preview (compact, avoids scrolling blowouts) */}
            <div className="block md:hidden pt-2 -mb-1">
              <div className="relative w-full max-w-[210px] mx-auto flex items-center justify-center pointer-events-none">
                <Image
                  src="/togetherly/mac.png"
                  alt="Togetherly Couples Money Planner on MacBook"
                  className="w-full h-auto object-contain select-none drop-shadow-md"
                  loading="lazy"
                  width={216}
                  height={120}
                />
              </div>
            </div>
          </div>

          {/* Right Column (Desktop Only): Floating MacBook dashboard mockup */}
          <div className="hidden md:flex md:col-span-5 relative h-full min-h-[360px] items-center justify-center">
            <div className="absolute -right-28 lg:-right-60 -top-8 -bottom-8 w-[380px] lg:w-[580px] flex items-center justify-center pointer-events-none select-none">
              <Image
                src="/togetherly/mac.png"
                alt="Togetherly Couples Money Planner on MacBook"
                className="w-full h-auto object-contain select-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.32)] pointer-events-auto"
                loading="lazy"
                width={576}
                height={320}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
