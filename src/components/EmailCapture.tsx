'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Mail, CheckCircle2, AlertCircle, Loader2, Sparkles, Send } from 'lucide-react';
import { trackEmailFormView, trackEmailSignup } from '@/lib/analytics';

export interface EmailCaptureProps {
  sourcePage?: string;
  contentCluster?: string;
  ctaLocation?: string;
  headline?: string;
  subheadline?: string;
  buttonText?: string;
  className?: string;
}

export default function EmailCapture({
  sourcePage = '',
  contentCluster = 'Expense Splitting',
  ctaLocation = 'article_bottom',
  headline = 'More free tools for couples are coming.',
  subheadline = "We're building simple tools to make money easier to manage together. Get notified when the next one launches.",
  buttonText = 'Notify me',
  className = '',
}: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const hasTrackedView = useRef(false);

  useEffect(() => {
    if (!hasTrackedView.current && typeof window !== 'undefined') {
      hasTrackedView.current = true;
      trackEmailFormView({
        source_page: sourcePage || window.location.pathname,
        content_cluster: contentCluster,
        cta_location: ctaLocation,
      });
    }
  }, [sourcePage, contentCluster, ctaLocation]);

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
      // Fire analytics without PII
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
    <div
      className={`bg-[#FFFFFF] border border-[#174F4A]/15 p-6 sm:p-8 space-y-4 shadow-none ${className}`}
    >
      <div className="space-y-1.5">
        
        <h3 className="text-xl sm:text-2xl font-extrabold text-[#174F4A] tracking-tight">
          {headline}
        </h3>
        <p className="text-xs sm:text-sm text-[#6F7F7C] leading-relaxed max-w-xl">
          {subheadline}
        </p>
      </div>

      {status === 'success' ? (
        <div className="p-5 sm:p-6 bg-[#FAF6EF] border-2 border-[#2C7A73]/30 flex items-start gap-4 text-[#174F4A]">
          <div className="w-10 h-10 rounded-full bg-[#2C7A73]/15 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6 text-[#2C7A73]" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h4 className="font-extrabold text-base text-[#174F4A]">You&apos;re subscribed!</h4>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#2C7A73]/15 text-[#174F4A] px-2 py-0.5">
                Confirmed
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#6F7F7C] leading-relaxed">
              We&apos;ve saved your email. We&apos;ll notify you whenever we launch a new free couples tool or guide. No spam, ever.
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3 pt-1">
          <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
            <div className="relative flex-1">
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
                placeholder="Your email address"
                aria-label="Email address"
                disabled={status === 'loading'}
                className="w-full pl-10 pr-4 py-3 bg-[#FAF6EF] border border-[#174F4A]/15 text-[#174F4A] placeholder-[#6F7F7C]/60 text-sm focus:outline-none focus:border-[#174F4A] focus:bg-white transition-colors rounded-none"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="inline-flex items-center justify-center gap-2 bg-[#174F4A] hover:bg-[#0F3834] text-[#FAF6EF] text-sm font-bold px-6 py-3 rounded-none transition-colors shrink-0 cursor-pointer disabled:opacity-60"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#F29B7F]" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>{buttonText}</span>
                  <Send className="w-3.5 h-3.5 text-[#F29B7F]" />
                </>
              )}
            </button>
          </div>

          {status === 'error' && (
            <div className="flex items-center gap-1.5 text-xs text-[#E57373] pt-0.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <p className="text-[11px] text-[#6F7F7C]/75">
            We only send occasional notes when new free calculators and guides launch. Unsubscribe at any time.
          </p>
        </form>
      )}
    </div>
  );
}
