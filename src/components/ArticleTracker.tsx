'use client';

import { useEffect, useRef } from 'react';
import { trackArticleView } from '@/lib/analytics';

interface ArticleTrackerProps {
  slug: string;
  title: string;
  category?: string;
}

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
  }, [slug, title, category]);

  return null;
}
