'use client';

import React from 'react';
import Link from 'next/link';
import { trackArticleToProductClick, trackCalculatorToProductClick } from '@/lib/analytics';

interface TrackedProductLinkProps {
  href: string;
  sourceType: 'article' | 'calculator' | 'template';
  sourcePage: string;
  ctaLocation: string;
  className?: string;
  children: React.ReactNode;
}

export default function TrackedProductLink({
  href,
  sourceType,
  sourcePage,
  ctaLocation,
  className,
  children,
}: TrackedProductLinkProps) {
  const handleClick = () => {
    if (sourceType === 'article') {
      trackArticleToProductClick({
        source_page: sourcePage,
        cta_location: ctaLocation,
      });
    } else {
      trackCalculatorToProductClick({
        source_page: sourcePage,
        cta_location: ctaLocation,
      });
    }
  };

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
