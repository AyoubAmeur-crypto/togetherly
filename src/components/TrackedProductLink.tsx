'use client';

import React from 'react';
import Link from 'next/link';
import { trackProductCtaClick, trackArticleCtaClick } from '@/lib/analytics';

interface TrackedProductLinkProps {
  href: string;
  sourceType: 'article' | 'calculator' | 'template' | 'general';
  sourcePage: string;
  ctaLocation: string;
  productSlug?: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * Reusable link component that tracks internal commercial funnel navigation.
 * Emits product_cta_click (and article_cta_click if coming from a blog guide).
 */
export default function TrackedProductLink({
  href,
  sourceType,
  sourcePage,
  ctaLocation,
  productSlug = 'couples-money-planner',
  className,
  children,
}: TrackedProductLinkProps) {
  const handleClick = () => {
    // 1. Fire product_cta_click
    trackProductCtaClick({
      product_slug: productSlug,
      cta_name: ctaLocation,
      destination: href,
    });

    // 2. Fire article_cta_click if inside an article
    if (sourceType === 'article') {
      const articleSlug = sourcePage.replace(/^\/blog\//, '').split('#')[0];
      trackArticleCtaClick({
        article_slug: articleSlug,
        cta_name: ctaLocation,
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
