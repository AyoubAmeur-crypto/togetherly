'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { togetherlyBrand, TOGETHERLY_GOOGLE_SHEET_COPY_URL } from '../config/productConfig';
import { trackCheckoutClick } from '@/lib/analytics';
import EmailTopPopup from './EmailTopPopup';

export default function TogetherlyNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname() || '/';

  // Prevent background scrolling and horizontal dragging when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.documentElement.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }

  const isStory = pathname === '/';
  const isProducts = pathname === '/products' || pathname.startsWith('/products/');
  const isTools = pathname === '/tools' || pathname.startsWith('/tools/');
  const isBlog = pathname === '/blog' || pathname.startsWith('/blog');

  const handleCheckoutClick = (location: string) => {
    trackCheckoutClick({
      product: 'couples_money_planner',
      price: 19,
      currency: 'USD',
      cta_location: location,
    });
  };

  return (
    <>
      {/* Top Center Floating Popup triggered in middle of story and product */}
      <EmailTopPopup />

      <header className="fixed top-0 left-0 right-0 w-full z-[100] backdrop-blur-md bg-[#174F4A]/95 border-b border-[#2C7A73]/30 transition-all text-[#FAF6EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo / Brand identity */}
            <div className="flex items-center gap-8">
              <Link
                href="/"
                className="flex items-center gap-3 group text-left cursor-pointer"
                title="Togetherly — Money Made Simpler"
              >
                <img
                  src={togetherlyBrand.assets.logoLight}
                  alt="Togetherly"
                  className="h-9 sm:h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
                />
              </Link>

              {/* Main Nav Links (Desktop: Story, Products, Tools, Blog) */}
              <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
                <Link
                  href="/"
                  className={`transition-colors py-1 relative ${
                    isStory
                      ? 'text-[#FAF6EF] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#F29B7F]'
                      : 'text-[#FAF6EF]/80 hover:text-[#FAF6EF]'
                  }`}
                >
                  Story
                </Link>

                <Link
                  href="/products"
                  className={`transition-colors py-1 relative ${
                    isProducts
                      ? 'text-[#FAF6EF] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#F29B7F]'
                      : 'text-[#FAF6EF]/80 hover:text-[#FAF6EF]'
                  }`}
                >
                  Products
                </Link>

                <Link
                  href="/tools"
                  className={`transition-colors py-1 relative ${
                    isTools
                      ? 'text-[#FAF6EF] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#F29B7F]'
                      : 'text-[#FAF6EF]/80 hover:text-[#FAF6EF]'
                  }`}
                >
                  Tools
                </Link>

                <Link
                  href="/blog"
                  className={`transition-colors py-1 relative ${
                    isBlog
                      ? 'text-[#FAF6EF] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#F29B7F]'
                      : 'text-[#FAF6EF]/80 hover:text-[#FAF6EF]'
                  }`}
                >
                  Blog
                </Link>
              </nav>
            </div>

            {/* Desktop CTA (Direct Checkout, No Demo) */}
            <div className="hidden md:flex items-center gap-3.5">
              <a
                href={TOGETHERLY_GOOGLE_SHEET_COPY_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleCheckoutClick('nav')}
                className="group inline-flex items-center justify-center gap-1.5 bg-[#FAF6EF] hover:bg-white text-[#174F4A] text-xs font-bold px-5 py-2.5 rounded-none transition-colors cursor-pointer shadow-none"
              >
                <span>Get Planner ($19)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Mobile Burger Menu Button */}
            <div className="flex lg:hidden items-center">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open navigation menu"
                className="p-2.5 text-[#FAF6EF] hover:text-[#F29B7F] bg-[#2C7A73]/20 hover:bg-[#2C7A73]/40 rounded-none border border-[#FAF6EF]/20 transition-colors cursor-pointer flex items-center justify-center"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer so page content begins neatly below fixed navbar */}
      <div className="h-20 w-full" aria-hidden="true" />

      {/* Full-Page Mobile Navigation Drawer */}
      <div
        id="togetherly-mobile-drawer"
        className={`fixed inset-0 z-[9999] lg:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto visible'
            : 'opacity-0 pointer-events-none invisible'
        }`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100dvh',
        }}
      >
        <div
          className={`absolute inset-0 w-full h-full text-[#FAF6EF] flex flex-col justify-between transition-transform duration-300 ease-in-out shadow-2xl bg-[#174F4A] ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Top Header inside Drawer */}
          <div className="flex items-center justify-between h-20 px-5 sm:px-6 border-b border-[#2C7A73]/40 bg-[#174F4A] shrink-0">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
              <img
                src={togetherlyBrand.assets.logoLight}
                alt="Togetherly"
                className="h-9 w-auto object-contain"
              />
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close navigation menu"
              className="p-2.5 text-[#FAF6EF] hover:text-[#F29B7F] bg-[#2C7A73]/30 hover:bg-[#2C7A73]/50 rounded-none border border-[#FAF6EF]/20 transition-colors cursor-pointer flex items-center justify-center"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Scrollable Body Content */}
          <div className="flex-1 overflow-y-auto px-6 py-7 space-y-7 bg-[#174F4A]">
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#F29B7F]">
                Togetherly Digital Store
              </span>
              <h3 className="text-xl font-extrabold text-[#FAF6EF] leading-snug">
                Money made simpler, life more together.
              </h3>
              <p className="text-xs text-[#FAF6EF]/85 leading-relaxed pt-1">
                The 8-sheet Google Sheets system designed for couples to plan, split fairly, and save without resentment.
              </p>
            </div>

            {/* Primary Action Button (Direct Checkout, No Demo) */}
            <div className="space-y-3 pt-1">
              <a
                href={TOGETHERLY_GOOGLE_SHEET_COPY_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  handleCheckoutClick('mobile_drawer');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#FAF6EF] hover:bg-white text-[#174F4A] text-sm font-extrabold py-4 px-5 rounded-none transition-colors cursor-pointer shadow-md tracking-tight"
              >
                <span>Buy Couples Money Planner ($19)</span>
                <ArrowRight className="w-4 h-4 ml-0.5 text-[#174F4A]" />
              </a>
            </div>

            {/* Navigation Links */}
            <div className="pt-4 border-t border-[#2C7A73]/40 space-y-3.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#F29B7F] block">
                Navigation
              </span>
              <ul className="space-y-4 text-base font-semibold">
                <li>
                  <Link
                    href="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block py-1 transition-colors ${isStory ? 'text-[#F29B7F] font-bold' : 'text-[#FAF6EF] hover:text-[#F29B7F]'}`}
                  >
                    Story
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block py-1 transition-colors ${isProducts ? 'text-[#F29B7F] font-bold' : 'text-[#FAF6EF] hover:text-[#F29B7F]'}`}
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tools"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block py-1 transition-colors ${isTools ? 'text-[#F29B7F] font-bold' : 'text-[#FAF6EF] hover:text-[#F29B7F]'}`}
                  >
                    Tools
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block py-1 transition-colors ${isBlog ? 'text-[#F29B7F] font-bold' : 'text-[#FAF6EF] hover:text-[#F29B7F]'}`}
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Drawer Footer with Trust Note */}
          <div className="px-6 py-4 border-t border-[#2C7A73]/40 bg-[#0F3834] shrink-0 text-center">
            <div className="flex items-center justify-center gap-2 text-xs text-[#91B7A0]">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>100% Private Google Sheets • Instant 1-Click Copy</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
