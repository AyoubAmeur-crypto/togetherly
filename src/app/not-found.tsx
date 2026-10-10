import Link from 'next/link';
import { Home, Calculator, BookOpen, FileSpreadsheet, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Subtle Badge */}
        

        {/* Main Heading & Message */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#174F4A] tracking-tight leading-tight">
            Looks like this page got lost.
          </h1>
          <p className="text-sm sm:text-base text-[#6F7F7C] max-w-lg mx-auto leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist, but we can help you get back on track.
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#174F4A] hover:bg-[#0F3834] text-[#FAF6EF] text-sm font-bold px-6 py-3.5 rounded-none transition-colors cursor-pointer shadow-sm"
          >
            <Home className="w-4 h-4 text-[#F29B7F]" />
            <span>Back to Home</span>
          </Link>

          <Link
            href="/tools"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FFFFFF] hover:bg-[#FAF6EF] text-[#174F4A] border border-[#174F4A]/20 text-sm font-bold px-6 py-3.5 rounded-none transition-colors cursor-pointer"
          >
            <Calculator className="w-4 h-4 text-[#2C7A73]" />
            <span>Explore Tools</span>
          </Link>

          <Link
            href="/blog"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FFFFFF] hover:bg-[#FAF6EF] text-[#174F4A] border border-[#174F4A]/20 text-sm font-bold px-6 py-3.5 rounded-none transition-colors cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-[#2C7A73]" />
            <span>Read the Blog</span>
          </Link>
        </div>

        {/* Featured Recommendation */}
        <div className="pt-6 border-t border-[#174F4A]/10 text-left max-w-lg mx-auto">
          <Link
            href="/products/couples-money-planner"
            className="group block bg-[#FFFFFF] p-5 border border-[#174F4A]/15 hover:border-[#174F4A]/40 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#2C7A73] uppercase tracking-wider">
                  <FileSpreadsheet className="w-3.5 h-3.5 text-[#F29B7F]" />
                  <span>Popular Resource</span>
                </div>
                <h2 className="text-base font-bold text-[#174F4A] group-hover:text-[#2C7A73] transition-colors">
                  Couples Money Planner (Google Sheets)
                </h2>
                <p className="text-xs text-[#6F7F7C] leading-relaxed">
                  Our 8-sheet system to organize shared budgets, automate fair proportional splits, and manage bills together.
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-[#174F4A] group-hover:translate-x-1 transition-transform shrink-0 mt-2" />
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
