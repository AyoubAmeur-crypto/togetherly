'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { X, Mail, ArrowRight, CheckCircle2, Loader2, ShieldCheck, Check, Send } from 'lucide-react';
import { trackEmailSignup } from '@/lib/analytics';

export default function EmailTopPopup() {
  const pathname = usePathname() || '/';

  // Show on main pages: Story (/), Products, Tools, Blog
  const isStory = pathname === '/';
  const isProduct = pathname === '/products' || pathname.startsWith('/products/');
  const isTargetPage =
    isStory ||
    isProduct ||
    pathname.startsWith('/tools') ||
    pathname.startsWith('/blog');

  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Single global key per visit across all routes (Story, Products, Tools, etc.)
  const DISMISS_KEY = 'togetherly_email_popup_dismissed_session';

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!isTargetPage) {
      setIsOpen(false);
      return;
    }

    // Only open once per visit across the entire site
    if (sessionStorage.getItem(DISMISS_KEY) === 'true') {
      setIsOpen(false);
      return;
    }

    let triggered = false;

    const triggerModal = () => {
      if (triggered) return;
      triggered = true;
      // Mark as seen for this visit so navigating to other routes won't re-trigger it
      sessionStorage.setItem(DISMISS_KEY, 'true');
      setIsOpen(true);
      window.removeEventListener('scroll', handleScroll);
    };

    // 1. Scroll trigger: opens once user scrolls (>120px)
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      if (scrollTop > 120) {
        triggerModal();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // 2. Timed trigger: opens after 1.2 seconds if user stays on page
    const timer = setTimeout(() => {
      triggerModal();
    }, 1200);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [pathname, isTargetPage]);

  // Handle closing on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(DISMISS_KEY, 'true');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedEmail) {
      setErrorMessage('Please enter your email address.');
      setStatus('error');
      return;
    }

    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage('Please enter a valid email address.');
      setStatus('error');
      return;
    }

    setStatus('loading');

    try {
      const sourcePage = typeof window !== 'undefined' ? window.location.pathname : pathname;
      const contentCluster = isStory ? 'Brand Story' : 'Product Showcase';
      const ctaLocation = isStory ? 'story_middle_modal' : 'product_middle_modal';

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

      if (typeof window !== 'undefined') {
        sessionStorage.setItem(DISMISS_KEY, 'true');
      }

      trackEmailSignup({
        source_page: sourcePage,
        content_cluster: contentCluster,
        cta_location: ctaLocation,
      });

      // Auto close after brief confirmation
      setTimeout(() => {
        setIsOpen(false);
      }, 3500);
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/20 transition-opacity duration-300 animate-in fade-in overflow-y-auto overflow-x-hidden"
    >
      {/* ONE Single Unified Modal Card */}
      <div
        className="relative w-full max-w-2xl lg:max-w-3xl bg-white  shadow-[0_20px_50px_rgba(23,79,74,0.15)] my-auto overflow-visible animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top-Right Corner Close Button (as in reference mockup) */}
        <button
          onClick={handleClose}
          aria-label="Close modal"
          className="absolute -top-3.5 -right-3.5 z-50 w-8 h-8 sm:w-9 sm:h-9 bg-white text-[#174F4A] hover:bg-[#FAF6EF] hover:text-[#0F3834] border border-[#174F4A]/30 shadow-md rounded-full flex items-center justify-center cursor-pointer transition-transform "
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 items-center">
          {/* Left Column: Short & Essential Content and CTA */}
          <div className="md:col-span-7 p-6 sm:p-8 lg:p-9 space-y-4 text-left relative z-10">
            {/* Logo + Badge */}
            <div className="flex items-center gap-2.5">
              <img
                src="/togetherly/togetherly-logo-primary.png"
                alt="Togetherly"
                className="h-6 sm:h-7 w-auto object-contain"
              />
              
            </div>

            {/* Essential Headline & Short Copy */}
            <div className="space-y-1.5">
              <h2
                id="modal-headline"
                className="text-2xl sm:text-3xl font-extrabold text-[#174F4A] tracking-tight leading-[1.18]"
              >
                Get Free Couples Tools &amp; Starter Planner
              </h2>
              <p className="text-xs sm:text-sm text-[#6F7F7C] leading-relaxed">
                Subscribe to get our free starter Google Sheets couples budgeting planner, fair-split calculator, and exclusive product promotions.
              </p>
            </div>

            {/* Form or Success State */}
            {status === 'success' ? (
              <div className="p-4 bg-[#FAF6EF] border border-[#174F4A]/20 flex items-start gap-3 text-[#174F4A]">
                <div className="w-8 h-8 rounded-full bg-[#174F4A]/10 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-[#174F4A]" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-extrabold text-sm text-[#174F4A]">You&apos;re subscribed!</h4>
                  <p className="text-xs text-[#6F7F7C] leading-relaxed">
                    Check your inbox for your free couples planner copy and toolkit.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 pt-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6F7F7C]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === 'error') setStatus('idle');
                    }}
                    placeholder="Enter your email address"
                    aria-label="Email address"
                    disabled={status === 'loading'}
                    className="w-full pl-10 pr-3.5 py-3 bg-[#FAF6EF] border border-[#174F4A]/25 text-[#174F4A] placeholder-[#6F7F7C]/60 text-xs sm:text-sm focus:outline-none focus:border-[#174F4A] focus:bg-white transition-colors rounded-none disabled:opacity-60"
                  />
                </div>

                {status === 'error' && (
                  <div className="text-xs text-[#E57373] font-medium">
                    {errorMessage}
                  </div>
                )}

                {/* Actions Row: NO THANKS + Primary Subscribe Button (matching reference mockup) */}
                <div className="flex items-center gap-3 pt-1">
                 

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-[#174F4A] hover:bg-[#0F3834] text-[#FAF6EF] text-xs sm:text-sm font-extrabold py-3 px-5 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-sm tracking-tight disabled:opacity-60 rounded-none"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#F29B7F]" />
                        <span>Subscribing...</span>
                      </>
                    ) : (
                      <>
                        <span>Subscribe &amp; Get Free Tools</span>
                        <Send className="w-3.5 h-3.5 text-[#F29B7F]" />
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-[#6F7F7C]/80 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#174F4A] shrink-0" />
                  <span>Instant Google Sheets access. No spam. Unsubscribe anytime.</span>
                </div>
              </form>
            )}

            {/* Mobile-only Mac preview */}
            <div className="block md:hidden pt-2 -mb-2">
              <div className="relative w-full max-w-[260px] mx-auto flex items-center justify-center pointer-events-none">
                <img
                  src="/togetherly/mac.png"
                  alt="Togetherly Couples Money Planner on MacBook"
                  className="w-full h-auto object-contain select-none drop-shadow-xl"
                  loading="eager"
                />
              </div>
            </div>
          </div>

          {/* Right Column (Desktop): Floating Mac breaking outside the top, right, and bottom of the card */}
          <div className="hidden md:flex md:col-span-5 relative h-full min-h-[340px] items-center justify-center">
            <div className="absolute -right-46 lg:-right-64 -top-8 -bottom-8 w-[380px] lg:w-[590px] flex items-center justify-center pointer-events-none select-none">
              <img
                src="/togetherly/mac.png"
                alt="Togetherly Couples Money Planner on MacBook"
                className="w-full h-auto object-contain select-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)]  pointer-events-auto"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
