'use client';

import React from 'react';
import Link from 'next/link';
import { trackCalculatorCtaClick, trackArticleCtaClick } from '@/lib/analytics';

interface TrackedCalculatorLinkProps {
  href?: string;
  sourcePage: string;
  ctaName?: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * Reusable link component that tracks clicks to the bill-splitting calculator.
 * Emits calculator_cta_click (and article_cta_click if coming from a blog guide).
 */
export default function TrackedCalculatorLink({
  href = '/tools/couples-expense-split-calculator',
  sourcePage,
  ctaName = 'calculator_link',
  className,
  children,
}: TrackedCalculatorLinkProps) {
  const handleClick = () => {
    trackCalculatorCtaClick({
      source_page: sourcePage,
      destination: href,
    });

    if (sourcePage.startsWith('/blog/')) {
      const articleSlug = sourcePage.replace(/^\/blog\//, '').split('#')[0];
      trackArticleCtaClick({
        article_slug: articleSlug,
        cta_name: ctaName,
        destination: href,
      });
    }
  };

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
