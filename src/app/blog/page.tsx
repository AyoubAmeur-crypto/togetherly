import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen, Clock, Calendar, Calculator, CheckCircle2 } from 'lucide-react';
import { getAllPosts, upcomingBlogTopics } from '@/content/blog';
import EmailCapture from '@/components/EmailCapture';


import { absoluteUrl } from '@/config/site';
import { getBreadcrumbListSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Blog — Guides & Frameworks for Couples Finances',
  description:
    'Practical guides, relationship finance frameworks, and budgeting advice for modern couples planning their shared living, fair splits, and milestones.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog — Guides & Essays on Couples Finances | Togetherly',
    description:
      'Practical guides, relationship finance frameworks, and budgeting advice for modern couples planning their shared living, fair splits, and milestones.',
    url: absoluteUrl('/blog'),
    siteName: 'Togetherly',
    type: 'website',
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  const breadcrumbsJsonLd = getBreadcrumbListSchema([
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
  ]);

  return (
    <div className="min-h-screen bg-[#FAF6EF] text-[#243B38] py-16 sm:py-24">
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2C7A73]/10 text-xs font-bold text-[#174F4A] uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-[#2C7A73]" />
            <span>Togetherly Editorial</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#174F4A] tracking-tight leading-tight">
            Togetherly Blog
          </h1>

          <p className="text-base sm:text-lg text-[#6F7F7C] leading-relaxed">
            Thoughtful essays, practical frameworks, and healthy communication routines for couples building a calm financial future together.
          </p>
        </div>

        {/* Free Tool Callout Banner */}
        <div className="bg-[#FFFFFF] border border-[#174F4A]/15 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2C7A73] uppercase tracking-wider">
              <Calculator className="w-4 h-4 text-[#F29B7F]" />
              <span>Interactive Standalone Tool</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#174F4A]">
              Couples Expense Split Calculator
            </h2>
            <p className="text-xs sm:text-sm text-[#6F7F7C] leading-relaxed">
              Calculate fair contributions based on each partner’s income. Compare a rigid 50/50 split against proportional income-weighted splitting with zero sign-up.
            </p>
          </div>

          <Link
            href="/tools/couples-expense-split-calculator"
            className="inline-flex items-center gap-2 bg-[#174F4A] hover:bg-[#0F3834] text-[#FAF6EF] text-sm font-bold px-6 py-3.5 rounded-none transition-colors shrink-0 cursor-pointer"
          >
            <span>Open Free Calculator</span>
            <ArrowRight className="w-4 h-4 text-[#F29B7F]" />
          </Link>
        </div>

        {/* Published Articles Grid (3 per row on desktop) */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-[#FFFFFF] p-7 sm:p-8 border border-[#174F4A]/10 flex flex-col justify-between space-y-6 hover:border-[#174F4A]/30 transition-all shadow-none"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2.5 text-xs text-[#6F7F7C] min-w-0">
                    <span
                      className="font-bold text-[#2C7A73] uppercase tracking-wider text-[11px] bg-[#2C7A73]/10 px-2.5 py-1 truncate max-w-[130px] sm:max-w-[160px] lg:max-w-[140px] xl:max-w-[170px] inline-block shrink"
                      title={post.category}
                    >
                      {post.category}
                    </span>
                    <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 whitespace-nowrap">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#2C7A73]" />
                        <span>{post.publishedAt}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#2C7A73]" />
                        <span>{post.readingTime}</span>
                      </span>
                    </div>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#174F4A] leading-snug">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-[#2C7A73] transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-sm text-[#6F7F7C] leading-relaxed line-clamp-3">{post.description}</p>
                </div>

                <div className="pt-3 border-t border-[#174F4A]/10 flex items-center justify-between">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#174F4A] hover:text-[#2C7A73] transition-colors"
                  >
                    <span>Read Full Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            <div className="border-b border-[#174F4A]/10 pb-4">
              <h2 className="text-2xl font-extrabold text-[#174F4A]">
                Upcoming Editorial Guides & Essays
              </h2>
              <p className="text-xs sm:text-sm text-[#6F7F7C] mt-1">
                Our initial content series is currently in research and production. Below are the core foundational topics we are publishing next:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingBlogTopics.map((topic, idx) => (
                <div
                  key={idx}
                  className="bg-[#FFFFFF] p-7 border border-[#174F4A]/10 flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2 text-xs min-w-0">
                      <span
                        className="font-bold text-[#2C7A73] uppercase tracking-wider text-[10px] bg-[#2C7A73]/10 px-2 py-0.5 truncate max-w-[140px] inline-block shrink"
                        title={topic.category}
                      >
                        {topic.category}
                      </span>
                      <span className="text-[11px] font-semibold text-[#174F4A] bg-[#FAF6EF] border border-[#174F4A]/15 px-2 py-0.5 flex items-center gap-1 shrink-0 whitespace-nowrap">
                        <Clock className="w-3 h-3 text-[#2C7A73]" />
                        <span>Publishing Soon</span>
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#174F4A] leading-snug">
                      {topic.title}
                    </h3>

                    <p className="text-xs text-[#6F7F7C] leading-relaxed">
                      {topic.summary}
                    </p>
                  </div>

                  <div className="text-[11px] font-medium text-[#6F7F7C] pt-2 border-t border-[#174F4A]/10 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2C7A73]" />
                    <span>In active editorial research</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Email Notification Capture */}
        <EmailCapture
          sourcePage="/blog"
          contentCluster="Expense Splitting"
          ctaLocation="blog_index_bottom"
        />

        {/* Commercial CTA Card */}
        <div className="bg-[#174F4A] text-[#FAF6EF] p-8 sm:p-14 text-center space-y-6 rounded-none relative overflow-hidden">
          <div
            className="absolute inset-0 w-full h-full pointer-events-none select-none mix-blend-overlay opacity-40"
            style={{
              backgroundImage: 'url(/togetherly/indian-wedding-pattern.png)',
              backgroundRepeat: 'repeat',
              backgroundSize: '300px 225px',
            }}
          />
          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Ready to simplify your shared money?
            </h2>
            <p className="text-sm sm:text-base text-[#FAF6EF]/85 leading-relaxed">
              Skip the painful spreadsheets and awkward Venmo splits. Get the complete 8-sheet Couples Money Planner today.
            </p>
            <div className="pt-2">
              <Link
                href="/products/couples-money-planner"
                className="inline-flex items-center justify-center gap-2 bg-[#FAF6EF] hover:bg-white text-[#174F4A] text-base sm:text-lg font-extrabold px-10 py-4 rounded-none transition-colors cursor-pointer shadow-md tracking-tight"
              >
                <span>Explore Couples Money Planner ($19)</span>
                <ArrowRight className="w-5 h-5 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
