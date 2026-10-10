/**
 * Centralized Schema.org (JSON-LD) structured data generators
 * All URLs are strictly rooted at the canonical production domain.
 * Strictly factual data with zero fabricated reviews, ratings, or testimonials.
 */

import { absoluteUrl, SITE_NAME, SITE_URL } from '@/config/site';
import { TOGETHERLY_CHECKOUT_URL } from '@/config/productConfig';
import type { BlogPost } from '@/content/blog';

/**
 * Organization Schema (Root homepage entity)
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl('/togetherly/togetherly-logo-primary.png'),
    description:
      'Togetherly creates calm, beautifully structured Google Sheets financial planning systems and calculators designed for couples.',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'support@gettogetherly.tech',
      contactType: 'Customer Support',
    },
  };
}

/**
 * WebSite Schema (Homepage entity with optional internal search / navigation)
 */
export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description:
      'Digital financial planning systems, templates, and calculators for modern couples.',
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

/**
 * Semantic BreadcrumbList Schema
 */
export function getBreadcrumbListSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/**
 * Calculator WebApplication Schema (Truthful free web application)
 * Strictly factual: Free web utility with zero fabricated ratings or reviews.
 */
export function getCalculatorWebApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Split Bills Based on Income Calculator',
    url: absoluteUrl('/tools/couples-expense-split-calculator'),
    description:
      'Free interactive calculator to split shared bills based on income. Compare proportional and 50/50 expense splits for couples with different incomes.',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    creator: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

/**
 * Product Schema for Couples Money Planner
 * 100% factual: Actual digital product pricing ($19 USD), Google Sheets format.
 * Zero fabricated ratings or reviews.
 */
export function getCouplesMoneyPlannerProductSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Togetherly — Couples Money Planner',
    url: absoluteUrl('/products/couples-money-planner'),
    image: [
      absoluteUrl('/togetherly/tablet.png'),
      absoluteUrl('/togetherly/dashboard.png'),
    ],
    description:
      'The complete 8-sheet Google Sheets financial planning system for couples. Plan monthly budgets, track expenses, automate fair splits, and build savings goals together.',
    brand: {
      '@type': 'Brand',
      name: SITE_NAME,
    },
    offers: {
      '@type': 'Offer',
      price: '19.00',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: TOGETHERLY_CHECKOUT_URL,
      seller: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
      },
    },
  };
}

/**
 * BlogPosting / Article Schema for Editorial Content
 */
export function getBlogPostSchema(post: BlogPost) {
  const postUrl = absoluteUrl(`/blog/${post.slug}`);
  const postImage = post.ogImage
    ? (post.ogImage.startsWith('http') ? post.ogImage : absoluteUrl(post.ogImage))
    : absoluteUrl('/togetherly/togetherly.png');

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.h1 || post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.modifiedAt || post.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    author: {
      '@type': 'Person',
      name: post.author.name,
      ...(post.author.role ? { jobTitle: post.author.role } : {}),
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/togetherly/togetherly-logo-primary.png'),
      },
    },
    image: postImage,
  };
}
