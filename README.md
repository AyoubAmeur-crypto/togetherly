# Togetherly

<p align="center">
  <img src="public/togetherly/togetherly-logo-primary.png" alt="Togetherly Logo" width="280" />
</p>

<p align="center">
  <strong>Money Made Simpler, Life More Together</strong><br />
  A modern financial planning web platform and Google Sheets spreadsheet system designed for couples.
</p>

<p align="center">
  <a href="https://3383300123351.gumroad.com/l/nsrabd?wanted=true"><strong>Get Couples Money Planner ($19 Instant Checkout)</strong></a> |
  <a href="https://gettogetherly.tech"><strong>Live Website</strong></a> |
  <a href="https://gettogetherly.tech/tools/couples-expense-split-calculator"><strong>Free Expense Split Calculator</strong></a>
</p>

---

## Overview

Togetherly provides shared financial systems designed specifically for couples managing money together. Instead of rigid subscription apps that require linking private bank credentials, Togetherly delivers an 8-sheet Google Sheets budgeting system that lives 100% privately in each couple's personal Google Drive.

### Direct Checkout Link

* Secure Gumroad Payment Gateway: [https://3383300123351.gumroad.com/l/nsrabd?wanted=true](https://3383300123351.gumroad.com/l/nsrabd?wanted=true)
* Price: $19 USD one-time purchase
* Access: Instant Google Sheets template copy with lifetime updates
* Guarantee: 30-day money-back guarantee

---

## Flagship Product: Couples Money Planner

The Couples Money Planner is an 8-sheet financial system engineered for Google Sheets:

* Financial Dashboard: Monthly cash flow, total savings rate, and real-time fair-split balance.
* Monthly Budget Planner: Planned vs. actual spending across 9 essential household categories.
* Expense Tracker: Individual entry logging with automatic categorization and ownership tags.
* Proportional Fair Split Engine: Automated 50/50, income-weighted, or custom split calculations.
* Recurring Bills Schedule: Calendar due dates, autopay tracking, and payment ownership.
* Shared Savings Milestones: Visual funding progress bars for homes, travel, weddings, and emergency funds.
* Monthly Money Date Guide: Structured agenda for a calm, 20-minute monthly financial review.
* Annual Cash Flow Summary: Long-term trends and year-end financial summaries.

---

## Platform Architecture

This repository hosts the official Togetherly web application built on Next.js with Turbopack and React:

* Production Domain: https://gettogetherly.tech
* Framework: Next.js 16 (App Router)
* Styling: Vanilla Tailwind CSS with custom design tokens
* Components: React Server Components with isolated client interaction islands
* Typography: Plus Jakarta Sans (headlines) and Manrope (body)
* Motion: GSAP and Lottie-web animations

### Route Structure

* `/` - Brand homepage, philosophy, 3-pot system, interactive demo
* `/products/couples-money-planner` - Canonical conversion-focused product page
* `/tools/couples-expense-split-calculator` - Free standalone interactive calculator
* `/tools` - Directory of free financial utilities
* `/blog` - Editorial hub and educational frameworks
* `/blog/[slug]` - Dynamic article architecture with JSON-LD Article structured data
* `/privacy` - Data privacy policy (100% private in Google Drive, zero bank access)
* `/terms` - Commercial terms of service and licensing
* `/refund-policy` - 30-day satisfaction guarantee terms

---

## Free Interactive Tool

* URL: https://gettogetherly.tech/tools/couples-expense-split-calculator
* Solves the problem of determining fair contributions toward shared living expenses.
* Compares equal 50/50 splitting with income-weighted proportional contributions.
* Free with zero required sign-up or bank account linking.

---

## Getting Started

### Prerequisites

* Node.js 18.18 or higher
* npm, yarn, or pnpm

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/AyoubAmeur-crypto/togetherly.git
cd togetherly
npm install
```

### Environment Configuration

Copy the example environment configuration:

```bash
cp .env.example .env
```

Environment variables:

```env
# Official Canonical Production Domain
NEXT_PUBLIC_SITE_URL=https://gettogetherly.tech

# Google Search Console Verification Token (optional)
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
```

### Development Server

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

Run the production build:

```bash
npm run build
npm run start
```

---

## Deployment on Vercel

1. Import this repository into Vercel.
2. Select Next.js as the framework preset.
3. Configure the environment variables in the Vercel Project Settings:
   * `NEXT_PUBLIC_SITE_URL`: `https://gettogetherly.tech`
   * `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`: (your token if available)
4. Deploy the `dev` branch for preview, and promote/merge to `main` for production.

---

## License & Support

* Togetherly digital products are sold under a single-household personal license.
* Support contact: ayoub@gettogetherly.tech
* Checkout: https://3383300123351.gumroad.com/l/nsrabd?wanted=true
