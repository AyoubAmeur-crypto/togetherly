'use client';

import { useEffect, useRef } from 'react';
import {
  trackArticleView,
  trackCalculatorCtaClick,
  trackArticleCtaClick,
  trackProductCtaClick,
} from '@/lib/analytics';

interface ArticleTrackerProps {
  slug: string;
  title: string;
  category?: string;
}

/**
 * Tracks article views and delegates click tracking for in-content editorial links.
 */
export default function ArticleTracker({ slug, title, category }: ArticleTrackerProps) {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (!hasTracked.current) {
      hasTracked.current = true;
      trackArticleView({
        slug,
        title,
        category,
      });
    }

    // Delegated click handler for editorial text links inside rendered HTML
    const handleArticleLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (!href) return;

      // Handle in-prose calculator links
      if (href.includes('/tools/couples-expense-split-calculator')) {
        trackCalculatorCtaClick({
          source_page: `/blog/${slug}`,
          destination: href,
        });
        trackArticleCtaClick({
          article_slug: slug,
          cta_name: 'in_content_calculator_link',
          destination: href,
        });
      } else if (href.includes('/products/couples-money-planner')) {
        trackProductCtaClick({
          product_slug: 'couples-money-planner',
          cta_name: 'in_content_product_link',
          destination: href,
        });
        trackArticleCtaClick({
          article_slug: slug,
          cta_name: 'in_content_product_link',
          destination: href,
        });
      }
    };

    document.addEventListener('click', handleArticleLinkClick);
    return () => {
      document.removeEventListener('click', handleArticleLinkClick);
    };
  }, [slug, title, category]);

  return null;
}
