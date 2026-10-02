/**
 * Togetherly Product Configuration & Commercial Architecture
 *
 * Central source of truth for Togetherly products, pricing, URLs, and metadata.
 * Note on security: The paid Google Sheets `/copy` link MUST NEVER be exposed
 * in this client bundle. Digital fulfillment will be handled securely by
 * Lemon Squeezy via post-purchase email delivery and thank-you redirect.
 */

export interface TogetherlySheetTab {
  id: string;
  name: string;
  tabLabel: string;
  title: string;
  badge: string;
  summary: string;
  bullets: string[];
  screenshot: string;
  ratio: string;
}

export interface TogetherlyProduct {
  id: string;
  name: string;
  slug: string;
  badge: string;
  version: string;
  headline: string;
  subheadline: string;
  format: string;
  softwareRequirement: string;
  pricing: {
    amount: number;
    currency: string;
    formatted: string;
    originalAmount?: number;
    billingType: 'one-time';
    periodNotice: string;
  };
  /** Safe, public view-only Google Sheets demo URL (empty string if not yet configured) */
  demoUrl: string;
  /**
   * Lemon Squeezy checkout URL for live purchases.
   * Can be configured via environment variable `VITE_LEMON_SQUEEZY_CHECKOUT_URL`.
   */
  lemonSqueezyCheckoutUrl: string;
  supportEmail: string;
  guaranteeText: string;
  deliveryTime: string;
  deliverables: string[];
  tabs: TogetherlySheetTab[];
  faqs: Array<{ question: string; answer: string }>;
}

export const TOGETHERLY_CHECKOUT_URL =
  'https://3383300123351.gumroad.com/l/nsrabd?wanted=true';

export const TOGETHERLY_GOOGLE_SHEET_COPY_URL = TOGETHERLY_CHECKOUT_URL;

export const couplesMoneyPlanner: TogetherlyProduct = {
  id: 'couples-money-planner',
  name: 'Togetherly — Couples Money Planner',
  slug: 'couples-money-planner',
  badge: 'Flagship Digital System',
  version: '2026 Edition (v2.0)',
  headline: 'Money made simpler, life more together.',
  subheadline:
    'A calm, beautifully crafted Google Sheets financial planning system for modern couples. Track shared living costs, balance fair contributions without awkward math, and build your shared future with complete peace of mind.',
  format: 'Digital Google Sheets Spreadsheet',
  softwareRequirement: '100% Free Google Account (Google Sheets)',
  pricing: {
    amount: 19,
    currency: 'USD',
    formatted: '$19',
    billingType: 'one-time',
    periodNotice: 'One-time purchase • Yours forever • No recurring fees',
  },
  // Gumroad digital purchase link
  demoUrl: TOGETHERLY_CHECKOUT_URL,
  lemonSqueezyCheckoutUrl: TOGETHERLY_CHECKOUT_URL,
  supportEmail: 'support@gettogetherly.tech',
  guaranteeText: '30-day money-back guarantee if this system does not simplify your shared finances.',
  deliveryTime: 'Instant digital delivery to your inbox upon order completion.',
  deliverables: [
    'Complete 8-tab synchronized Couples Money Planner (Google Sheets)',
    '1-click Setup Wizard with automated currency & partner name sync',
    'Fair-split mathematical cost engine (50/50 or proportional to income)',
    'Realistic seed demo data to explore immediately',
    'Blank template cleaner button for instant real-life use',
    'Comprehensive step-by-step visual onboarding guide',
    'Free lifetime template updates & friendly customer support',
  ],
  tabs: [
    {
      id: 'dashboard',
      name: 'Home Dashboard',
      tabLabel: '01. Home Dashboard',
      title: 'Your Complete Household Financial Pulse at a Glance',
      badge: 'Executive Overview',
      summary:
        'A single, unified dashboard that summarizes total household income, actual spend, monthly savings, and your fair-split settlement balance in real time.',
      bullets: [
        'Total income, expense, and savings rate KPI metric cards',
        'Dynamic monthly budget progress vs actual cash outflow gauges',
        'Real-time fair-split balance card showing who reimburses whom',
        'Clean, high-contrast visual design optimized for calm review',
      ],
      screenshot: '/togetherly/dashboard.png?v=2',
      ratio: '2312 / 1444',
    },
    {
      id: 'monthly-plan',
      name: 'Monthly Plan',
      tabLabel: '02. Monthly Plan',
      title: 'Planned vs Actual Spending Across 9 Core Categories',
      badge: 'Cash Flow Engine',
      summary:
        'No more guessing where your money went. Allocate targets by category at the start of the month and compare against real transactions as they happen.',
      bullets: [
        '9 pre-built household categories (Housing, Groceries, Dining, Utilities, Travel, etc.)',
        'Automatic variance tracking: instantly see if you are under or over budget',
        'Clear breakdown of individual contributions per partner',
        'Zero complicated formulas required — all totals update dynamically',
      ],
      screenshot: '/togetherly/monthly-plan.png?v=2',
      ratio: '1378 / 956',
    },
    {
      id: 'fair-split',
      name: 'Fair Split Engine',
      tabLabel: '03. Fair Split Engine',
      title: 'Equitable Cost Sharing Without the Awkward Conversations',
      badge: 'Harmony & Fairness',
      summary:
        'Split expenses 50/50 or proportional to each partner’s income. The automated settlement engine figures out exact reimbursement amounts effortlessly.',
      bullets: [
        'Choose between 50/50 equitable split or proportional income-weighted split',
        'Accounts for individual out-of-pocket expenses automatically',
        'Instant settlement summary banner shows exactly who owes what at month-end',
        'Eliminates resentment, micro-tracking, and tedious manual calculations',
      ],
      screenshot: '/togetherly/fair-split.png?v=2',
      ratio: '1508 / 784',
    },
    {
      id: 'goals',
      name: 'Goals Tracker',
      tabLabel: '04. Shared Goals',
      title: 'Build Toward What Matters: Vacations, Down Payments, Emergencies',
      badge: 'Shared Future',
      summary:
        'Turn shared dreams into tangible reality. Track multiple savings milestones with target amounts, contribution balances, and visual progress indicators.',
      bullets: [
        'Target date calculators and remaining balance milestones',
        'Visual in-cell progress sparklines that celebrate every dollar saved',
        'Covers emergency funds, home deposits, vacations, and wedding funds',
        'Aligns both partners on big life priorities and upcoming investments',
      ],
      screenshot: '/togetherly/goals.png?v=2',
      ratio: '1420 / 680',
    },
    {
      id: 'money-date',
      name: 'Money Date Routine',
      tabLabel: '05. Monthly Money Date',
      title: 'A Healthy, Joyful 20-Minute Monthly Check-In Routine',
      badge: 'Relationship Health',
      summary:
        'Transform financial stress into connection. A guided monthly reflection template with thoughtful prompts, win celebrations, and next-month commitments.',
      bullets: [
        'Structured reflection questions: what worked, what surprised us, where did we thrive?',
        'Celebration box: acknowledge personal and shared financial wins together',
        'Next-month action items: concrete commitments with assigned ownership',
        'Fosters honest, low-stress, emotionally healthy teamwork around finances',
      ],
      screenshot: '/togetherly/money-date.png?v=2',
      ratio: '1270 / 1150',
    },
  ],
  faqs: [
    {
      question: 'Is this an app?',
      answer:
        'No. The Couples Money Planner is a native Google Sheets spreadsheet system. There is no software to install, no app store download, and no bank account connection required. It opens directly in Google Sheets on any computer, iPad, tablet, or smartphone.',
    },
    {
      question: 'Do I need Microsoft Excel?',
      answer:
        'No. This planner is built specifically for Google Sheets, which is completely free with any standard Google account. Google Sheets enables seamless, live real-time synchronization between you and your partner.',
    },
    {
      question: 'Is this a subscription?',
      answer:
        'No. It is a single one-time payment of $19. There are no recurring monthly charges, no annual renewal fees, and no hidden subscriptions. You own your private copy for life.',
    },
    {
      question: 'Can we use different incomes?',
      answer:
        'Yes. Togetherly is engineered specifically for couples with different incomes. You can choose the automated Income-Based Split mode, which calculates each partner’s contribution percentage based on what they earn (for example, 60/40 or 55/45) so splitting is mathematically fair without tension.',
    },
    {
      question: 'Do we have to split everything 50/50?',
      answer:
        'Not at all. You can choose between a standard 50/50 split, an income-weighted proportional split, or enter custom split percentages. You can also track personal expenses alongside shared expenses.',
    },
    {
      question: 'Where is our financial data stored?',
      answer:
        'Your financial information is stored 100% inside your own private Google Drive account. Togetherly never sees, accesses, collects, or stores your incomes, bills, transactions, or bank credentials.',
    },
    {
      question: 'Can I customize the planner?',
      answer:
        'Yes. You can customize your partner names, currency symbol ($ USD, € EUR, £ GBP, $ CAD, $ AUD, etc.), budget categories, recurring bill schedules, and savings goals in the dedicated Setup sheet in seconds.',
    },
    {
      question: 'How do I receive it?',
      answer:
        'Immediately upon completing your $19 purchase via our secure checkout, you receive instant access with a 1-click link to copy the template directly into your Google Drive, plus clear step-by-step setup guidance.',
    },
    {
      question: 'Can both partners use the same planner?',
      answer:
        'Yes. Simply click the "Share" button in Google Sheets and enter your partner\'s email. Both of you can view, edit, enter expenses, and review your numbers together in real time from any device.',
    },
  ],
};

export const togetherlyBrand = {
  name: 'Togetherly',
  tagline: 'Money made simpler, life more together.',
  description:
    'Simple, intentional financial planning systems designed for modern couples. Building shared security, clear communication, and stress-free financial partnership.',
  creator: {
    name: 'Ayoub Ameur',
    portfolioUrl: '/',
    role: 'Creator & Software Engineer',
  },
  theme: {
    cream: '#F7F0E4',
    creamLight: '#FAF6EF',
    creamDark: '#EFE7D8',
    forest: '#174F4A',
    forestDark: '#0F3834',
    teal: '#2C7A73',
    tealLight: '#3D9991',
    peach: '#F29B7F',
    peachLight: '#F6C2B0',
    peachBg: '#FDF1EC',
    sage: '#91B7A0',
    sageLight: '#B7D3C2',
    text: '#243B38',
    muted: '#6F7F7C',
    white: '#FFFFFF',
  },
  assets: {
    logoPrimary: '/togetherly/togetherly-logo-primary.png',
    logoLight: '/togetherly/togetherly-logo-light.png',
    icon: '/togetherly/togetherly-icon.png',
    ogBanner: '/togetherly/togetherly.png',
  },
  upcomingProducts: [
    {
      title: 'Shared Expense & Bill Splitter',
      description: 'Quick-entry calculator for splitting recurring monthly bills and roommates / partners utilities without ledger bloat.',
      tag: 'In Research',
    },
    {
      title: 'House Deposit Milestone Planner',
      description: 'Multi-year amortization and escrow savings roadmap for couples preparing to buy their first home.',
      tag: 'Coming Q2',
    },
    {
      title: 'Wedding Budget & Vendor Tracker',
      description: 'Comprehensive wedding cost estimator, deposit calendar, and contract milestone system.',
      tag: 'Planned',
    },
    {
      title: 'Annual Couples Money Review',
      description: 'Year-end financial retrospective workbook to celebrate net worth milestones and set annual intentions.',
      tag: 'Planned',
    },
  ],
};
