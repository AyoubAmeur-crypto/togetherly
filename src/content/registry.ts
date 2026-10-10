/**
 * Togetherly Central SEO Content Registry
 *
 * Single source of truth for all search intents, target keywords, Semrush metrics,
 * clustering, cannibalization prevention, conversion funnels, and publication statuses.
 *
 * Rules:
 * 1. ONE DISTINCT SEARCH INTENT → ONE OWNER URL.
 * 2. Preserve missing Semrush metrics as null. Never invent metrics.
 * 3. Drafts must remain completely outside the public SEO surface.
 */

export type ContentStatus =
  | 'research'
  | 'validated'
  | 'planned'
  | 'draft'
  | 'review'
  | 'published'
  | 'update'
  | 'consolidate';

export type ContentCluster =
  | 'Expense Splitting'
  | 'Couples Finance Management'
  | 'Joint vs Separate Finances'
  | 'Combining Finances'
  | 'Couples Budgeting'
  | 'Money Dates & Communication'
  | 'Financial Goals'
  | 'Moving In Together'
  | 'Marriage & Newlyweds'
  | 'Savings'
  | 'Debt Management'
  | 'Budget Templates / Spreadsheets'
  | 'Finance Tools / Calculators'
  | 'Apps & Tools';

export type ContentPriority = 'P1' | 'P2' | 'P3' | 'Future';

export type PageType = 'pillar' | 'supporting' | 'tool' | 'commercial';

export interface SemrushMetrics {
  volume: number | null; // Monthly US search volume from Semrush
  kd: number | null;     // Keyword Difficulty percentage (0-100)
  cpc: number | null;    // Cost Per Click in USD
}

export interface ContentRegistryItem {
  slug: string;
  pageType: PageType;
  cluster: ContentCluster;
  primaryKeyword: string;
  secondaryKeywords: string[];
  searchIntent: string;
  metrics: SemrushMetrics;
  priority: ContentPriority;
  status: ContentStatus;
  ownerUrl: string;
  parentPage?: string;
  relatedPages: string[];
  toolCTA: string | null;
  productCTA: string | null;
  emailCluster?: string;
  cannibalizationNote?: string;
}

export const contentRegistry: ContentRegistryItem[] = [
  // --- CORE COMMERCIAL & TOOL PAGES (Existing Owners) ---
  {
    slug: 'couples-money-planner',
    pageType: 'commercial',
    cluster: 'Budget Templates / Spreadsheets',
    primaryKeyword: 'couples budget planner',
    secondaryKeywords: [
      'couples budget template',
      'couple budget template',
      'couples budget spreadsheet',
      'budget spreadsheet for couples',
      'couples budget template google sheets',
      'google sheets budget template for couples',
      'couples monthly budget template',
      'married couple budget template',
      'couples finance spreadsheet',
      'finance spreadsheet for couples',
    ],
    searchIntent:
      'Commercial investigation / purchase intent for couples Google Sheets budgeting system and templates.',
    metrics: {
      volume: null,
      kd: null,
      cpc: null,
    },
    priority: 'P1',
    status: 'published',
    ownerUrl: '/products/couples-money-planner',
    relatedPages: [
      '/tools/couples-expense-split-calculator',
      '/blog/how-to-manage-finances-as-a-couple',
      '/blog/how-to-budget-as-a-couple',
    ],
    toolCTA: '/tools/couples-expense-split-calculator',
    productCTA: '/products/couples-money-planner',
    cannibalizationNote:
      'Owns commercial product purchase intent ($19 Couples Money Planner). Fed by the top-of-funnel free template landing page (/templates/couples-budget-template).',
  },
  {
    slug: 'couples-budget-template',
    pageType: 'supporting',
    cluster: 'Budget Templates / Spreadsheets',
    primaryKeyword: 'couples budget template',
    secondaryKeywords: [
      'couples budget spreadsheet',
      'couple budget template',
      'budget spreadsheet for couples',
      'google sheets budget template for couples',
      'budget for couples template',
      'couples monthly budget template',
      'couples budget template google sheets',
      'couple budget template google sheets',
      'couples financial planning worksheet',
      'budget template for couples',
      'free couple budget template',
      'married couple budget template',
      'couple budget planner',
      'budget planner for couples',
      '2 person budget template',
      'dual income budget spreadsheet',
      'best budget spreadsheet for couples',
      'best budget template for couples',
      'best budget planner for couples',
    ],
    searchIntent:
      'High-intent search for a free or ready-to-use couples budget template / spreadsheet for Google Sheets, serving as primary lead magnet and funnel bridge to Couples Money Planner.',
    metrics: {
      volume: 390,
      kd: 27,
      cpc: 2.78,
    },
    priority: 'P1',
    status: 'published',
    ownerUrl: '/templates/couples-budget-template',
    relatedPages: [
      '/products/couples-money-planner',
      '/tools/couples-expense-split-calculator',
      '/blog/how-to-budget-as-a-couple',
      '/blog/split-bills-based-on-income',
    ],
    toolCTA: '/tools/couples-expense-split-calculator',
    productCTA: '/products/couples-money-planner',
    cannibalizationNote:
      'Owns free template, starter spreadsheet, and Google Sheets download queries. Funnels directly into email capture and the paid 8-sheet Couples Money Planner.',
  },
  {
    slug: 'couples-expense-split-calculator',
    pageType: 'tool',
    cluster: 'Finance Tools / Calculators',
    primaryKeyword: 'split bills based on income calculator',
    secondaryKeywords: [
      'splitting bills based on income calculator',
      'how to split bills with spouse calculator',
      'bill split calculator based on income',
      'calculator to split expenses with a partner',
      'household bill split calculator',
      'bill breakdown calculator',
      'bill budget calculator',
      'bill calculator based on income',
      'bill percentage of income calculator',
      'bill split by income calculator',
      'bills vs income calculator',
      'how to split bills evenly with different incomes calculator',
      'couples expense split calculator',
    ],
    searchIntent:
      'Interactive utility intent to calculate proportional vs 50/50 splits dynamically.',
    metrics: {
      volume: 90,
      kd: 9,
      cpc: 2.08,
    },
    priority: 'P1',
    status: 'published',
    ownerUrl: '/tools/couples-expense-split-calculator',
    relatedPages: [
      '/blog/split-bills-based-on-income',
      '/blog/how-should-couples-split-expenses',
      '/blog/50-50-vs-proportional-expense-splitting',
      '/products/couples-money-planner',
    ],
    toolCTA: null,
    productCTA: '/products/couples-money-planner',
    cannibalizationNote:
      'Owns all calculator/tool queries. Blog articles discuss concepts and link into this tool; they must not attempt to duplicate tool functionality.',
  },

  // --- CLUSTER A: EXPENSE SPLITTING ---
  {
    slug: 'how-should-couples-split-expenses',
    pageType: 'pillar',
    cluster: 'Expense Splitting',
    primaryKeyword: 'how should couples split expenses',
    secondaryKeywords: [
      'how to split bills as a couple',
      'how couples split finances',
      'splitting bills with partner',
      'splitting expenses with spouse',
      'fair way to split household expenses',
      'how couples divide expenses',
      'splitting shared expenses',
      'ways couples can split bills',
    ],
    searchIntent:
      'Broad informational exploration of expense-splitting frameworks (50/50, proportional by income, hybrid, personal vs shared pots).',
    metrics: {
      volume: null,
      kd: null,
      cpc: null,
    },
    priority: 'P1',
    status: 'published',
    ownerUrl: '/blog/how-should-couples-split-expenses',
    relatedPages: [
      '/blog/split-bills-based-on-income',
      '/blog/50-50-vs-proportional-expense-splitting',
      '/tools/couples-expense-split-calculator',
      '/products/couples-money-planner',
    ],
    toolCTA: '/tools/couples-expense-split-calculator',
    productCTA: '/products/couples-money-planner',
  },
  {
    slug: 'split-bills-based-on-income',
    pageType: 'supporting',
    cluster: 'Expense Splitting',
    primaryKeyword: 'how to split bills based on income',
    secondaryKeywords: [
      'how to divide bills based on income',
      'splitting bills based on income',
      'how to split expenses based on income',
      'how to split bills as a couple',
      'how to split bills with spouse',
      'proportional bill splitting',
      'different income couples',
      'how to split bills',
      'split expenses according to income',
      'percentage-based expense splitting',
    ],
    searchIntent:
      'Tactical mathematical guide on calculating proportional contributions when partner incomes differ, with concrete formulas and worked examples.',
    metrics: {
      volume: 260,
      kd: 12,
      cpc: 2.99,
    },
    priority: 'P1',
    status: 'published',
    ownerUrl: '/blog/split-bills-based-on-income',
    parentPage: '/blog/how-should-couples-split-expenses',
    relatedPages: [
      '/blog/how-should-couples-split-expenses',
      '/blog/50-50-vs-proportional-expense-splitting',
      '/tools/couples-expense-split-calculator',
      '/products/couples-money-planner',
    ],
    toolCTA: '/tools/couples-expense-split-calculator',
    productCTA: '/products/couples-money-planner',
  },
  {
    slug: '50-50-vs-proportional-expense-splitting',
    pageType: 'supporting',
    cluster: 'Expense Splitting',
    primaryKeyword: '50 50 vs proportional expense splitting',
    secondaryKeywords: [
      '50/50 vs proportional split',
      'equal vs proportional splitting',
      'splitting bills 50 50 when one makes more',
      'fairness of 50 50 split',
    ],
    searchIntent:
      'Direct comparison evaluation of 50/50 equal splits vs proportional splits, their psychological impacts, and when each is appropriate.',
    metrics: {
      volume: null,
      kd: null,
      cpc: null,
    },
    priority: 'P2',
    status: 'published',
    ownerUrl: '/blog/50-50-vs-proportional-expense-splitting',
    parentPage: '/blog/how-should-couples-split-expenses',
    relatedPages: [
      '/blog/how-should-couples-split-expenses',
      '/blog/split-bills-based-on-income',
      '/tools/couples-expense-split-calculator',
      '/products/couples-money-planner',
    ],
    toolCTA: '/tools/couples-expense-split-calculator',
    productCTA: '/products/couples-money-planner',
    cannibalizationNote:
      'Comparison intent distinct from /blog/split-bills-based-on-income (calculation intent). If Search Console shows SERP consolidation, evaluate keyword ownership.',
  },
  {
    slug: 'how-to-split-finances-with-partner',
    pageType: 'supporting',
    cluster: 'Expense Splitting',
    primaryKeyword: 'how to split finances with partner',
    secondaryKeywords: [
      'how to split expenses with a partner',
      'calculator to split expenses with a partner',
      'splitting finances with partner',
      'how to split bills with partner',
      'shared vs separate finances',
      'different income couples',
      'couples finances',
    ],
    searchIntent:
      'Tactical guidance on dividing money, accounts, and obligations with an unmarried partner or cohabitating couple.',
    metrics: {
      volume: 50,
      kd: 20,
      cpc: null,
    },
    priority: 'P1',
    status: 'published',
    ownerUrl: '/blog/how-to-split-finances-with-partner',
    parentPage: '/blog/how-should-couples-split-expenses',
    relatedPages: [
      '/blog/split-bills-based-on-income',
      '/blog/how-should-couples-split-expenses',
      '/blog/how-to-manage-finances-as-a-couple',
      '/tools/couples-expense-split-calculator',
      '/products/couples-money-planner',
    ],
    toolCTA: '/tools/couples-expense-split-calculator',
    productCTA: '/products/couples-money-planner',
  },

  // --- CLUSTER B: COUPLES FINANCE MANAGEMENT ---
  {
    slug: 'how-to-manage-finances-as-a-couple',
    pageType: 'pillar',
    cluster: 'Couples Finance Management',
    primaryKeyword: 'how to manage finances as a couple',
    secondaryKeywords: [
      'handling finances as a couple',
      'managing finances as a couple',
      'how couples manage finances',
      'how couples handle finances',
      'best way to manage finances as a couple',
      'how to organize finances as a couple',
      'how to set up finances as a couple',
      'managing money as a couple',
      'married couple finances',
      'couple finance management',
    ],
    searchIntent:
      'High-level comprehensive architecture and philosophy for managing joint money (budgeting, splitting, joint vs separate accounts, goals, money dates).',
    metrics: {
      volume: 30,
      kd: 28,
      cpc: 3.71,
    },
    priority: 'P1',
    status: 'published',
    ownerUrl: '/blog/how-to-manage-finances-as-a-couple',
    relatedPages: [
      '/blog/how-to-budget-as-a-couple',
      '/blog/how-should-couples-split-expenses',
      '/blog/split-bills-based-on-income',
      '/tools/couples-expense-split-calculator',
      '/products/couples-money-planner',
    ],
    toolCTA: '/tools/couples-expense-split-calculator',
    productCTA: '/products/couples-money-planner',
  },

  // --- CLUSTER C: JOINT VS SEPARATE FINANCES ---
  {
    slug: 'joint-vs-separate-finances-for-couples',
    pageType: 'pillar',
    cluster: 'Joint vs Separate Finances',
    primaryKeyword: 'joint vs separate finances for couples',
    secondaryKeywords: [
      'couples separate finances',
      'couples with separate finances',
      'should couples combine finances',
      'should couples have separate finances',
      'should couples keep finances separate',
      'should couples share finances',
      'married couples separate finances',
      'combined vs separate finances',
    ],
    searchIntent:
      'Objective evaluation of the 3 major account architectures: fully joint, fully separate, and 3-pot hybrid (Yours, Mine, Ours).',
    metrics: {
      volume: null,
      kd: null,
      cpc: null,
    },
    priority: 'P2',
    status: 'planned',
    ownerUrl: '/blog/joint-vs-separate-finances-for-couples',
    relatedPages: [
      '/blog/how-to-manage-finances-as-a-couple',
      '/products/couples-money-planner',
    ],
    toolCTA: null,
    productCTA: '/products/couples-money-planner',
  },
  {
    slug: 'how-to-combine-finances-as-a-couple',
    pageType: 'supporting',
    cluster: 'Combining Finances',
    primaryKeyword: 'how to combine finances as a couple',
    secondaryKeywords: [
      'combining finances as a couple',
      'steps to merge finances',
      'how to merge bank accounts with partner',
    ],
    searchIntent:
      'Tactical step-by-step checklist on the physical logistics of merging accounts once the decision is already made.',
    metrics: {
      volume: 40,
      kd: 27,
      cpc: 2.70,
    },
    priority: 'Future',
    status: 'research',
    ownerUrl: '/blog/how-to-combine-finances-as-a-couple',
    parentPage: '/blog/joint-vs-separate-finances-for-couples',
    relatedPages: [
      '/blog/joint-vs-separate-finances-for-couples',
      '/blog/how-to-manage-finances-as-a-couple',
    ],
    toolCTA: null,
    productCTA: '/products/couples-money-planner',
    cannibalizationNote:
      'DO NOT PUBLISH YET. High cannibalization risk with /blog/joint-vs-separate-finances-for-couples. Only publish if SERP confirms tactical logistics rank separately from architecture evaluation.',
  },

  // --- CLUSTER D: COUPLES BUDGETING ---
  {
    slug: 'how-to-budget-as-a-couple',
    pageType: 'pillar',
    cluster: 'Couples Budgeting',
    primaryKeyword: 'budgeting for couples',
    secondaryKeywords: [
      'couples budget',
      'budgeting couple',
      'couple budget',
      'budget for couples',
      'budget for married couple',
      'best budget system for couples',
      'best budgeting tool for couples',
      'budget calculator for couples',
      'budget tracker for couples',
      'expense tracker for couples',
      'expense tracking for couples',
      'how to budget as a couple',
      'couples expense tracker',
    ],
    searchIntent:
      'Educational guide on establishing a routine, choosing budget rules, managing unequal incomes, and aligning monthly spending.',
    metrics: {
      volume: 320,
      kd: 40,
      cpc: 2.56,
    },
    priority: 'P1',
    status: 'published',
    ownerUrl: '/blog/how-to-budget-as-a-couple',
    relatedPages: [
      '/blog/how-to-manage-finances-as-a-couple',
      '/blog/how-should-couples-split-expenses',
      '/blog/split-bills-based-on-income',
      '/blog/how-to-budget-as-a-couple-with-different-incomes',
      '/tools/couples-expense-split-calculator',
      '/templates/couples-budget-template',
      '/products/couples-money-planner',
    ],
    toolCTA: '/tools/couples-expense-split-calculator',
    productCTA: '/products/couples-money-planner',
  },
  {
    slug: 'how-to-budget-as-a-couple-with-different-incomes',
    pageType: 'supporting',
    cluster: 'Couples Budgeting',
    primaryKeyword: 'couples budgeting with different incomes',
    secondaryKeywords: [
      'couples budgeting app for different incomes',
      'how to split bills evenly with different incomes calculator',
      'different income couples budget',
      'budgeting for couples with unequal salaries',
      'proportional budgeting for couples',
      'couples expense tracker',
    ],
    searchIntent:
      'Targeted guidance on budgeting when partners have unequal salaries, focusing on proportional contributions, equal fun money, and preventing resentment.',
    metrics: {
      volume: 40,
      kd: 26,
      cpc: null,
    },
    priority: 'P1',
    status: 'published',
    ownerUrl: '/blog/how-to-budget-as-a-couple-with-different-incomes',
    parentPage: '/blog/how-to-budget-as-a-couple',
    relatedPages: [
      '/blog/how-to-budget-as-a-couple',
      '/blog/split-bills-based-on-income',
      '/blog/50-50-vs-proportional-expense-splitting',
      '/tools/couples-expense-split-calculator',
      '/templates/couples-budget-template',
      '/products/couples-money-planner',
    ],
    toolCTA: '/tools/couples-expense-split-calculator',
    productCTA: '/products/couples-money-planner',
  },
  {
    slug: 'monthly-budget-for-couples',
    pageType: 'supporting',
    cluster: 'Couples Budgeting',
    primaryKeyword: 'monthly budget for couples',
    secondaryKeywords: [
      'couples monthly budget',
      'monthly budgeting routine for couples',
    ],
    searchIntent:
      'Setting up a monthly operating rhythm and cadence for household cash flow.',
    metrics: {
      volume: null,
      kd: null,
      cpc: null,
    },
    priority: 'P2',
    status: 'planned',
    ownerUrl: '/blog/monthly-budget-for-couples',
    parentPage: '/blog/how-to-budget-as-a-couple',
    relatedPages: [
      '/blog/how-to-budget-as-a-couple',
      '/blog/budget-categories-for-couples',
      '/products/couples-money-planner',
    ],
    toolCTA: null,
    productCTA: '/products/couples-money-planner',
    cannibalizationNote:
      'Cannibalization risk with both /blog/how-to-budget-as-a-couple and /products/couples-money-planner. Must focus strictly on timing/cadence, not generic budgeting or template queries.',
  },
  {
    slug: 'budget-categories-for-couples',
    pageType: 'supporting',
    cluster: 'Couples Budgeting',
    primaryKeyword: 'budget categories for couples',
    secondaryKeywords: [
      'couples budget categories',
      'household budget categories',
      'shared expense categories',
    ],
    searchIntent:
      'Recommended breakdown of shared vs individual spending categories (fixed, variable, fun money, sinking funds).',
    metrics: {
      volume: null,
      kd: null,
      cpc: null,
    },
    priority: 'P3',
    status: 'planned',
    ownerUrl: '/blog/budget-categories-for-couples',
    parentPage: '/blog/how-to-budget-as-a-couple',
    relatedPages: [
      '/blog/how-to-budget-as-a-couple',
      '/products/couples-money-planner',
    ],
    toolCTA: null,
    productCTA: '/products/couples-money-planner',
  },

  // --- CLUSTER E: MONEY DATES & COMMUNICATION ---
  {
    slug: 'monthly-money-date',
    pageType: 'pillar',
    cluster: 'Money Dates & Communication',
    primaryKeyword: 'monthly money date',
    secondaryKeywords: [
      'money date for couples',
      'financial check-in for couples',
      'monthly financial meeting',
      'couples money meeting',
      'how couples can talk about money',
    ],
    searchIntent:
      'Step-by-step agenda and ground rules for positive, argument-free monthly financial check-ins.',
    metrics: {
      volume: null,
      kd: null,
      cpc: null,
    },
    priority: 'P3',
    status: 'planned',
    ownerUrl: '/blog/monthly-money-date',
    relatedPages: [
      '/blog/how-to-manage-finances-as-a-couple',
      '/products/couples-money-planner',
    ],
    toolCTA: null,
    productCTA: '/products/couples-money-planner',
  },

  // --- CLUSTER F: FINANCIAL GOALS ---
  {
    slug: 'financial-goals-for-couples',
    pageType: 'pillar',
    cluster: 'Financial Goals',
    primaryKeyword: 'financial goals for couples',
    secondaryKeywords: [
      'couples financial goals',
      'money goals for couples',
      'shared financial goals',
      'financial planning goals for couples',
      'saving toward goals together',
    ],
    searchIntent:
      'Framework for setting, prioritizing, and tracking short- and long-term milestones as a team.',
    metrics: {
      volume: null,
      kd: null,
      cpc: null,
    },
    priority: 'P3',
    status: 'planned',
    ownerUrl: '/blog/financial-goals-for-couples',
    relatedPages: [
      '/blog/how-to-manage-finances-as-a-couple',
      '/products/couples-money-planner',
    ],
    toolCTA: null,
    productCTA: '/products/couples-money-planner',
  },

  // --- FUTURE CLUSTERS (Unvalidated / Research Phase) ---
  {
    slug: 'finances-before-moving-in-together',
    pageType: 'pillar',
    cluster: 'Moving In Together',
    primaryKeyword: 'finances before moving in together',
    secondaryKeywords: [
      'moving in together finances',
      'budget when moving in together',
      'splitting bills after moving in together',
      'expenses when moving in together',
      'money conversations before moving in',
      'moving-in financial checklist',
    ],
    searchIntent:
      'Pre-cohabitation financial checklist, deposit splitting, and lease agreements.',
    metrics: {
      volume: null,
      kd: null,
      cpc: null,
    },
    priority: 'Future',
    status: 'research',
    ownerUrl: '/blog/finances-before-moving-in-together',
    relatedPages: [
      '/blog/how-should-couples-split-expenses',
      '/tools/couples-expense-split-calculator',
    ],
    toolCTA: '/tools/couples-expense-split-calculator',
    productCTA: '/products/couples-money-planner',
    cannibalizationNote:
      'Do not create multiple moving-in pages. One comprehensive page must satisfy the entire cluster.',
  },
  {
    slug: 'how-do-married-couples-split-finances',
    pageType: 'pillar',
    cluster: 'Marriage & Newlyweds',
    primaryKeyword: 'how do married couples split finances',
    secondaryKeywords: [
      'how to split bills with spouse',
      'how to split bills with spouse calculator',
      'budget for married couple',
      'married couple budget template',
      'married couples finances',
      'joint vs separate finances marriage',
      'how to split finances when married',
    ],
    searchIntent:
      'Core guide for spouses on dividing household expenses, evaluating joint vs separate accounts, managing unequal spousal incomes, and building marital wealth.',
    metrics: {
      volume: 90,
      kd: 28,
      cpc: 0.61,
    },
    priority: 'P1',
    status: 'published',
    ownerUrl: '/blog/how-do-married-couples-split-finances',
    relatedPages: [
      '/blog/split-bills-based-on-income',
      '/blog/how-to-manage-finances-as-a-couple',
      '/blog/how-to-budget-as-a-couple',
      '/tools/couples-expense-split-calculator',
      '/templates/couples-budget-template',
      '/products/couples-money-planner',
    ],
    toolCTA: '/tools/couples-expense-split-calculator',
    productCTA: '/products/couples-money-planner',
  },
  {
    slug: 'newlywed-finances',
    pageType: 'pillar',
    cluster: 'Marriage & Newlyweds',
    primaryKeyword: 'newlywed finances',
    secondaryKeywords: [
      'finances after marriage',
      'combining finances after marriage',
      'financial checklist for newlyweds',
      'money conversations before marriage',
    ],
    searchIntent:
      'Financial checklist and adjustments specific to newly married couples.',
    metrics: {
      volume: null,
      kd: null,
      cpc: null,
    },
    priority: 'Future',
    status: 'research',
    ownerUrl: '/blog/newlywed-finances',
    relatedPages: [
      '/blog/how-to-manage-finances-as-a-couple',
      '/products/couples-money-planner',
    ],
    toolCTA: null,
    productCTA: '/products/couples-money-planner',
    cannibalizationNote:
      'Do not spin off pages merely by substituting "couple" with "married couple". Only publish if search intent is legally or structurally distinct.',
  },
  {
    slug: 'saving-money-as-a-couple',
    pageType: 'pillar',
    cluster: 'Savings',
    primaryKeyword: 'saving money as a couple',
    secondaryKeywords: [
      'shared savings goals',
      'how couples save together',
      'saving for a house together',
      'emergency fund for couples',
    ],
    searchIntent:
      'Strategies for building joint emergency funds and milestone savings.',
    metrics: {
      volume: null,
      kd: null,
      cpc: null,
    },
    priority: 'Future',
    status: 'research',
    ownerUrl: '/blog/saving-money-as-a-couple',
    relatedPages: [
      '/blog/financial-goals-for-couples',
      '/products/couples-money-planner',
    ],
    toolCTA: null,
    productCTA: '/products/couples-money-planner',
  },
  {
    slug: 'best-budget-apps-for-couples',
    pageType: 'supporting',
    cluster: 'Apps & Tools',
    primaryKeyword: 'budgeting apps for couples',
    secondaryKeywords: [
      'best budget app for couples',
      'budget app for couples',
      'best couples budget app',
      'finance apps for couples',
      'best personal finance apps for couples',
    ],
    searchIntent:
      'Objective market comparison of dedicated budgeting apps for couples (e.g. Honeydue, Monarch, Copilot, YNAB).',
    metrics: {
      volume: null,
      kd: null,
      cpc: null,
    },
    priority: 'Future',
    status: 'research',
    ownerUrl: '/blog/best-budget-apps-for-couples',
    relatedPages: ['/products/couples-money-planner'],
    toolCTA: null,
    productCTA: '/products/couples-money-planner',
    cannibalizationNote:
      'Togetherly is a spreadsheet system, NOT an app. This comparison must be genuine, balanced, and never misleadingly position Togetherly as an app.',
  },
];

/**
 * Registry Lookup Helpers
 */
export function getRegistryItemBySlug(slug: string): ContentRegistryItem | undefined {
  return contentRegistry.find((item) => item.slug === slug);
}

export function getRegistryItemsByCluster(cluster: ContentCluster): ContentRegistryItem[] {
  return contentRegistry.filter((item) => item.cluster === cluster);
}

export function getRegistryItemsByStatus(status: ContentStatus): ContentRegistryItem[] {
  return contentRegistry.filter((item) => item.status === status);
}

export function getRegistryItemsByPriority(priority: ContentPriority): ContentRegistryItem[] {
  return contentRegistry.filter((item) => item.priority === priority);
}
