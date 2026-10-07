import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Calendar, Clock, User, ChevronRight, FileSpreadsheet } from 'lucide-react';
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/content/blog';
import ArticleTracker from '@/components/ArticleTracker';
import WhatsAppHelpCTA from '@/components/WhatsAppHelpCTA';
import EmailCapture from '@/components/EmailCapture';
import TrackedProductLink from '@/components/TrackedProductLink';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article Not Found',
    };
  }

  const postUrl = `https://gettogetherly.tech/blog/${post.slug}`;
  const ogImage = post.ogImage || '/togetherly/togetherly.png';

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | Togetherly Blog`,
      description: post.description,
      url: postUrl,
      siteName: 'Togetherly',
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.modifiedAt || post.publishedAt,
      authors: [post.author.name],
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  };
}

/**
 * Wraps all <table> elements in a responsive horizontal scroll container.
 * If the table width exceeds the screen width, it allows smooth horizontal scrolling
 * without causing the whole page to stretch or wobble horizontally.
 */
function makeTablesScrollable(html: string): string {
  if (!html) return '';

  return html.replace(
    /(<table[\s\S]*?<\/table>)/gi,
    `<div class="blog-table-container my-6 w-full max-w-full">
      <div class="sm:hidden flex items-center justify-between text-[11px] text-[#6F7F7C] font-medium mb-1.5 px-0.5 select-none" aria-hidden="true">
        <span class="inline-flex items-center gap-1.5">
          <svg class="w-3.5 h-3.5 text-[#2C7A73]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          <span>Scroll horizontally to view table</span>
        </span>
      </div>
      <div class="blog-table-scroll-wrapper overflow-x-auto w-full max-w-full border border-[#174F4A]/15 bg-[#FFFFFF] shadow-2xs rounded-none">
        $1
      </div>
    </div>`
  );
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post);

  // Structured Data (BlogPosting / Article)
  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.modifiedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      ...(post.author.role ? { jobTitle: post.author.role } : {}),
    },
    publisher: {
      '@type': 'Organization',
      name: 'Togetherly',
      url: 'https://gettogetherly.tech',
      logo: {
        '@type': 'ImageObject',
        url: 'https://gettogetherly.tech/togetherly/togetherly-logo-primary.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://gettogetherly.tech/blog/${post.slug}`,
    },
    image: post.ogImage || 'https://gettogetherly.tech/togetherly/togetherly.png',
  };

  const breadcrumbsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://gettogetherly.tech/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://gettogetherly.tech/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://gettogetherly.tech/blog/${post.slug}`,
      },
    ],
  };

  const cta = post.productCta || {
    headline: 'Manage your monthly couples budget without resentment.',
    description:
      'Togetherly — Couples Money Planner gives you an 8-sheet Google Sheets system with automated proportional splits, monthly check-in routines, and complete data privacy.',
    buttonText: 'Explore Couples Money Planner ($19)',
    buttonUrl: '/products/couples-money-planner',
  };

  const toolCta = post.toolCta;
  const formattedContent = makeTablesScrollable(post.content);

  return (
    <article className="min-h-screen bg-[#FAF6EF] text-[#243B38] py-12 sm:py-20 overflow-x-hidden">
      {/* Analytics Pageview Tracker */}
      <ArticleTracker slug={post.slug} title={post.title} category={post.category} />

      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Navigation Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#6F7F7C]">
          <Link href="/" className="hover:text-[#174F4A] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#6F7F7C]/60" />
          <Link href="/blog" className="hover:text-[#174F4A] transition-colors">
            Blog
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#6F7F7C]/60" />
          <span className="text-[#174F4A] font-semibold truncate max-w-[200px] sm:max-w-xs">
            {post.category}
          </span>
        </nav>

        {/* Article Header */}
        <header className="space-y-6 border-b border-[#174F4A]/10 pb-10">
          <div className="inline-block px-3 py-1 bg-[#2C7A73]/10 text-xs font-bold text-[#174F4A] uppercase tracking-wider">
            {post.category}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#174F4A] tracking-tight leading-[1.15]">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-[#6F7F7C] leading-relaxed">
            {post.description}
          </p>

          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 pt-2 text-xs text-[#6F7F7C]">
            <div className="flex items-center gap-1.5 font-medium text-[#174F4A]">
              <User className="w-3.5 h-3.5 text-[#2C7A73]" />
              <span>{post.author.name}</span>
              {post.author.role && <span className="text-[#6F7F7C]">({post.author.role})</span>}
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#2C7A73]" />
              <time dateTime={post.publishedAt}>{post.publishedAt}</time>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#2C7A73]" />
              <span>{post.readingTime}</span>
            </div>
          </div>
        </header>

        {/* Article Body Content */}
        <div
          className="prose prose-stone max-w-none text-[#243B38] leading-relaxed space-y-6 text-base sm:text-lg
            [&>h2]:text-2xl sm:[&>h2]:text-3xl [&>h2]:font-extrabold [&>h2]:text-[#174F4A] [&>h2]:tracking-tight [&>h2]:pt-6
            [&>h3]:text-xl sm:[&>h3]:text-2xl [&>h3]:font-bold [&>h3]:text-[#174F4A] [&>h3]:pt-4
            [&>p]:leading-relaxed [&>p]:text-[#243B38]
            [&>ul]:space-y-2 [&>ul]:list-disc [&>ul]:pl-5
            [&>ol]:space-y-2 [&>ol]:list-decimal [&>ol]:pl-5
            [&_table]:w-full [&_table]:min-w-[560px] [&_table]:border-collapse [&_table]:text-xs sm:[&_table]:text-sm
            [&_th]:bg-[#174F4A]/5 [&_th]:p-3 sm:[&_th]:p-3.5 [&_th]:text-left [&_th]:font-bold [&_th]:text-[#174F4A] [&_th]:border-b [&_th]:border-[#174F4A]/15 [&_th]:whitespace-nowrap
            [&_td]:p-3 sm:[&_td]:p-3.5 [&_td]:border-b [&_td]:border-[#174F4A]/10 [&_td]:align-top [&_td]:text-[#243B38]
            [&_tr:last-child_td]:border-b-0
            [&_tbody_tr:hover]:bg-[#FAF6EF]/50
            [&>blockquote]:border-l-4 [&>blockquote]:border-[#2C7A73] [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-[#174F4A]"
          dangerouslySetInnerHTML={{ __html: formattedContent }}
        />

        {/* 1. Contextual Companion Tool Box (when relevant) */}
        {toolCta && toolCta.show !== false && (
          <div className="p-6 sm:p-7 bg-[#FFFFFF] border border-[#174F4A]/15 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2C7A73]">
              Free Companion Tool
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-[#174F4A]">
              {toolCta.title || 'Test your household numbers with our calculator'}
            </h3>
            <p className="text-xs sm:text-sm text-[#6F7F7C] leading-relaxed">
              {toolCta.description ||
                'Curious what proportional splitting looks like with your actual salaries? Use our free, no-login Couples Expense Split Calculator.'}
            </p>
            <div className="pt-1">
              <Link
                href={toolCta.url || '/tools/couples-expense-split-calculator'}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#174F4A] hover:text-[#2C7A73] transition-colors"
              >
                <span>{toolCta.buttonText || 'Open Expense Split Calculator'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* 2. Contextual WhatsApp Help CTA */}
        {post.whatsAppCta && (
          <WhatsAppHelpCTA
            topic={post.whatsAppCta.topic}
            message={post.whatsAppCta.message}
            headline={post.whatsAppCta.headline}
            subtext={post.whatsAppCta.subtext}
            buttonText={post.whatsAppCta.buttonText}
            sourcePage={`/blog/${post.slug}`}
            contentCluster={post.category}
            ctaLocation="article_middle"
          />
        )}

        {/* 3. Contextual Flagship Product CTA Box */}
        <div className="bg-[#174F4A] text-[#FAF6EF] p-8 sm:p-12 space-y-5 rounded-none relative overflow-hidden">
          <div
            className="absolute inset-0 w-full h-full pointer-events-none select-none mix-blend-overlay opacity-30"
            style={{
              backgroundImage: 'url(/togetherly/indian-wedding-pattern.png)',
              backgroundRepeat: 'repeat',
              backgroundSize: '300px 225px',
            }}
          />
          <div className="relative z-10 space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#FAF6EF]/15 text-[11px] font-bold text-[#FAF6EF] uppercase tracking-wider">
              <FileSpreadsheet className="w-3.5 h-3.5 text-[#F29B7F]" />
              <span>Flagship System</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              {cta.headline}
            </h2>
            <p className="text-xs sm:text-sm text-[#FAF6EF]/85 leading-relaxed">
              {cta.description}
            </p>
            <div className="pt-2">
              <TrackedProductLink
                href={cta.buttonUrl || '/products/couples-money-planner'}
                sourceType="article"
                sourcePage={`/blog/${post.slug}`}
                ctaLocation="article_bottom"
                className="inline-flex items-center justify-center gap-2 bg-[#FAF6EF] hover:bg-white text-[#174F4A] text-sm sm:text-base font-extrabold px-8 py-3.5 rounded-none transition-colors shadow-sm tracking-tight"
              >
                <span>{cta.buttonText}</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </TrackedProductLink>
            </div>
          </div>
        </div>

        {/* 4. Reusable Email Capture Box */}
        <EmailCapture
          sourcePage={`/blog/${post.slug}`}
          contentCluster={post.category}
          ctaLocation="article_bottom"
        />

        {/* Related Articles (if available - 3 columns on large screens) */}
        {relatedPosts.length > 0 && (
          <section className="pt-8 border-t border-[#174F4A]/10 space-y-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#174F4A]">Related Guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="p-6 bg-[#FFFFFF] border border-[#174F4A]/10 hover:border-[#174F4A]/30 transition-all block space-y-2.5 shadow-none"
                >
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider text-[#2C7A73] truncate block max-w-full"
                    title={related.category}
                  >
                    {related.category}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-[#174F4A] leading-snug">
                    {related.title}
                  </h3>
                  <span className="text-[11px] text-[#6F7F7C] block">{related.readingTime}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back to Blog */}
        <div className="pt-4 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#6F7F7C] hover:text-[#174F4A] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Guides</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
