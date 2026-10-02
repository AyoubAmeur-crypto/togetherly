/**
 * Togetherly Blog Content Architecture & Data Store
 *
 * Lightweight, type-safe content system for publishing educational finance guides for couples.
 * Designed to cleanly scale without CMS dependencies.
 */

export interface BlogAuthor {
  name: string;
  role?: string;
  avatar?: string;
}

export interface ProductCtaConfig {
  headline?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string; // ISO date format: YYYY-MM-DD
  modifiedAt?: string; // ISO date format: YYYY-MM-DD
  category: string;
  author: BlogAuthor;
  readingTime: string;
  keywords?: string[];
  ogImage?: string;
  content: string; // Structured article body (Markdown / HTML)
  relatedSlugs?: string[];
  productCta?: ProductCtaConfig;
}

/**
 * Validated upcoming editorial topics currently in research/writing.
 * Displayed as coming-soon topic previews on /blog until full articles are published.
 */
export interface UpcomingTopic {
  title: string;
  summary: string;
  category: string;
  estimatedReadTime: string;
}

export const upcomingBlogTopics: UpcomingTopic[] = [
  {
    title: 'How to Budget as a Couple: The Complete Step-by-Step Guide',
    summary:
      'A practical, low-stress guide to merging financial lives, organizing accounts, setting realistic category targets, and budgeting together as a unified team.',
    category: 'Couples Budgeting',
    estimatedReadTime: '7 min read',
  },
  {
    title: 'How Should Couples Split Expenses? 50/50 vs. Proportional Compared',
    summary:
      'Rigid 50/50 splitting often creates quiet resentment when partners earn different salaries. Discover how proportional, income-weighted cost sharing creates lasting relationship harmony.',
    category: 'Expense Splitting',
    estimatedReadTime: '6 min read',
  },
  {
    title: 'The 3-Pot Financial Philosophy: Why Yours, Mine & Ours Protects Modern Relationships',
    summary:
      'Financial intimacy does not require sacrificing personal autonomy. How three simple buckets eliminate financial guilt and keep communication joyful.',
    category: 'Relationship Dynamics',
    estimatedReadTime: '5 min read',
  },
  {
    title: 'The 20-Minute Monthly Money Date: Wine, Coffee, and Zero Arguments',
    summary:
      'Transform monthly budgeting from an anxiety-inducing administrative chore into a recurring, intentional connection ritual you both look forward to.',
    category: 'Money Dates',
    estimatedReadTime: '5 min read',
  },
];

/**
 * Published articles repository.
 * Initialized empty per P1 requirements (zero fake articles). Articles will be added here in P2.
 */
export const blogPosts: BlogPost[] = [];

/**
 * Retrieve all published blog posts, sorted latest first
 */
export function getAllPosts(): BlogPost[] {
  return [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

/**
 * Retrieve a single blog post by unique slug
 */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

/**
 * Retrieve related articles for a given post
 */
export function getRelatedPosts(currentPost: BlogPost, limit = 2): BlogPost[] {
  if (currentPost.relatedSlugs && currentPost.relatedSlugs.length > 0) {
    const explicitlyRelated = currentPost.relatedSlugs
      .map((slug) => getPostBySlug(slug))
      .filter((post): post is BlogPost => Boolean(post));
    if (explicitlyRelated.length > 0) {
      return explicitlyRelated.slice(0, limit);
    }
  }

  // Fallback to same-category posts
  return blogPosts
    .filter((post) => post.slug !== currentPost.slug && post.category === currentPost.category)
    .slice(0, limit);
}
