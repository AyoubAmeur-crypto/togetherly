import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Manrope } from 'next/font/google';
import './globals.css';
import TogetherlyNav from '@/components/TogetherlyNav';
import TogetherlyFooter from '@/components/TogetherlyFooter';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-headline',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://gettogetherly.tech'),
  title: {
    default: 'Togetherly — Money Made Simpler, Life More Together',
    template: '%s | Togetherly',
  },
  description:
    'The complete 8-sheet Google Sheets financial planning system designed for couples. Track shared living costs, balance fair proportional splits, and achieve savings goals without tension.',
  icons: {
    icon: '/togetherly/togetherly-icon.png',
    apple: '/togetherly/togetherly-icon.png',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full scroll-smooth ${plusJakartaSans.variable} ${manrope.variable}`}>
      <body className={`${plusJakartaSans.className} min-h-full flex flex-col bg-[#FAF6EF] text-[#243B38] antialiased selection:bg-[#F29B7F]/30 selection:text-[#174F4A]`}>
        <TogetherlyNav />
        <div className="flex-1">{children}</div>
        <TogetherlyFooter />
      </body>
    </html>
  );
}
