'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle, Loader2, Send, ShieldCheck, Check } from 'lucide-react';
import { trackEmailSignup } from '@/lib/analytics';

interface EmailSubscribeSectionProps {
  sourcePage?: string;
  contentCluster?: string;
  ctaLocation?: string;
  className?: string;
}

export default function EmailSubscribeSection({
  sourcePage = '',
  contentCluster = 'Brand Story',
  ctaLocation = 'mac_subscribe_section',
  className = '',
}: EmailSubscribeSectionProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedEmail) {
      setStatus('error');
      setErrorMessage('Please enter your email address.');
      return;
    }

    if (!emailRegex.test(trimmedEmail)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');

    try {
      const effectiveSource =
        sourcePage || (typeof window !== 'undefined' ? window.location.pathname : '');
      const searchParams =
        typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
      const utm_source = searchParams?.get('utm_source') || '';
      const utm_medium = searchParams?.get('utm_medium') || '';
      const utm_campaign = searchParams?.get('utm_campaign') || '';

      const response = await fetch('/api/email/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: trimmedEmail,
          source_page: effectiveSource,
          content_cluster: contentCluster,
          cta_location: ctaLocation,
          utm_source,
          utm_medium,
          utm_campaign,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus('error');
        setErrorMessage(data.error || 'Unable to sign up right now. Please try again.');
        return;
      }

      setStatus('success');

      trackEmailSignup({
        source_page: effectiveSource,
        content_cluster: contentCluster,
        cta_location: ctaLocation,
      });
    } catch {
      setStatus('error');
      setErrorMessage('Connection error. Please check your network and try again.');
    }
  };

  return (
    <section
      id="free-tools-planner"
      aria-label="Subscribe for free couples tools and starter planner"
      className={`w-full pt-14 sm:pt-20 pb-0 bg-[#174F4A] border-t border-b border-[#2C7A73]/30 text-[#FAF6EF] overflow-hidden ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-18 items-end">
          {/* Left Column (Desktop): Clean iPhone picture on the Left with fixed static lamp effect */}
          <div className="lg:col-span-6 xl:col-span-7 order-2 lg:order-1 relative flex items-end justify-center self-center">
            {/* Fixed static light green lamp effect (overhead spotlight radiance) */}
            <div
              aria-hidden="true"
              className="absolute -top-14 sm:-top-24 left-1/2 -translate-x-1/2 w-[340px] sm:w-[500px] lg:w-[680px] h-[340px] sm:h-[480px] lg:h-[620px] rounded-full pointer-events-none select-none blur-3xl opacity-75"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 25%, rgba(183, 211, 194, 0.09) 0%, rgba(145, 183, 160, 0.26) 40%, rgba(44, 122, 115, 0.12) 62%, transparent 76%)',
              }}
            />

            <img
              src="/togetherly/IPHONE.png"
              alt="Togetherly Couples Money Planner on iPhone"
              className="w-full sm:max-w-2xl lg:max-w-none lg:w-[690px] xl:w-[690px] h-auto object-contain object-bottom select-none drop-shadow-2xl relative z-10"
              loading="lazy"
            />
          </div>

          {/* Right Column (Desktop): Content on Right with essential details and vertical form */}
          <div className="lg:col-span-5 xl:col-span-5 order-2 lg:order-1 space-y-6 text-left pb-10 sm:pb-16 lg:pb-20 relative z-20">
            {/* Logo on Top */}
            <div className="flex items-center">
              <img
                src="/togetherly/togetherly-logo-light.png"
                alt="Togetherly"
                className="h-8 sm:h-9 w-auto object-contain"
              />
            </div>

            {/* Headline & Body Copy */}
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-white tracking-tight leading-[1.18]">
                Get our free couples tools <span className="text-[#91B7A0]">&amp; starter product planner.</span>
              </h2>
              <p className="text-sm sm:text-base text-[#FAF6EF]/85 leading-relaxed max-w-xl">
                Managing money as a couple shouldn&apos;t come with tension or awkward math. Subscribe to our newsletter to receive our free starter Google Sheets budgeting template, calculator tools, and exclusive subscriber discounts—delivered straight to your inbox.
              </p>
            </div>

            {/* Branded Subscribe Form or Success Message */}
            <div className="pt-1">
              {status === 'success' ? (
                <div className="p-5 sm:p-6 bg-[#0F3834]/80 border border-[#2C7A73]/60 flex items-start gap-4 text-[#FAF6EF]">
                  <div className="w-10 h-10 rounded-full bg-[#2C7A73]/30 border border-[#91B7A0]/40 flex items-center justify-center shrink-0">
                    <Check className="w-5 h-5 text-[#FAF6EF]" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-base text-white">You&apos;re subscribed!</h4>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-[#2C7A73]/40 text-[#FAF6EF] px-2 py-0.5 border border-[#FAF6EF]/20">
                        Delivered
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#FAF6EF]/80 leading-relaxed">
                      We&apos;ve sent your free couples financial planner copy and toolkit to your inbox. You&apos;ll also receive our newsletter, new tools, and exclusive discounts.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 max-w-md w-full">
                  {/* Input & Subscribe Button in Flex Column with Exact Same Width */}
                  <div className="flex flex-col items-stretch gap-2.5 w-full">
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#91B7A0]">
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
                        aria-label="Email address for free tools"
                        disabled={status === 'loading'}
                        className="w-full pl-10 pr-4 py-3.5 bg-[#0F3834]/80 border border-[#2C7A73]/60 text-white placeholder-[#FAF6EF]/50 text-sm focus:outline-none focus:border-[#FAF6EF] focus:bg-[#0F3834] transition-colors rounded-none disabled:opacity-60"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#2C7A73] hover:bg-[#348C84] text-white text-sm font-extrabold py-3.5 px-6 rounded-none transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-md tracking-tight border border-[#91B7A0]/30 disabled:opacity-60"
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-[#F29B7F]" />
                          <span>Subscribing...</span>
                        </>
                      ) : (
                        <>
                          <span>Subscribe to Get Newsletter, Discounts &amp; Free Tools</span>
                          <Send className="w-3.5 h-3.5 text-[#F29B7F]" />
                        </>
                      )}
                    </button>
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-1.5 text-xs text-[#FF8A80] pt-0.5 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-[11px] text-[#FAF6EF]/75 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#91B7A0] shrink-0" />
                    <span>Private &amp; secure. No spam. One-click unsubscribe anytime.</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
