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
  status: 'published' | 'draft';
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
 * Article repository.
 * Initialized with validated P1 article: split-bills-based-on-income.
 */
export const blogPosts: BlogPost[] = [
  {
    slug: 'split-bills-based-on-income',
    title: 'How to Split Bills Based on Income as a Couple (With Formulas & Calculator)',
    description:
      'A step-by-step guide on how to split bills based on income as a couple. Includes exact percentage formulas, worked numerical examples, bank setups, and a free calculator.',
    publishedAt: '2026-10-04',
    modifiedAt: '2026-10-04',
    status: 'published',
    category: 'Expense Splitting',
    author: {
      name: 'Togetherly Editorial',
      role: 'Couples Finance Frameworks',
    },
    readingTime: '6 min read',
    keywords: [
      'how to split bills based on income',
      'splitting bills based on income',
      'proportional bill splitting',
      'split expenses according to income',
      'unequal income couples',
      'percentage-based expense splitting',
      'calculate contributions based on salary',
    ],
    ogImage: '/togetherly/togetherly.png',
    relatedSlugs: [],
    productCta: {
      headline: 'Automate your proportional splits every single month.',
      description:
        'Togetherly — Couples Money Planner includes built-in proportional calculation, expense tracking, and calm monthly review routines in one complete 8-sheet Google Sheets system.',
      buttonText: 'Get Couples Money Planner ($24)',
      buttonUrl: '/products/couples-money-planner',
    },
    content: `
<p>If you and your partner earn different salaries, splitting your monthly living expenses straight down the middle (50/50) can quietly introduce financial strain and silent resentment. When one person takes home $5,000 each month and the other earns $3,000, paying equal halves of a $2,400 rent bill leaves the higher earner with abundant savings and the lower earner with nearly empty accounts.</p>

<p><strong>Proportional bill splitting</strong> solves this disparity. By calculating your shared contributions according to what you each earn, both partners contribute a fair, balanced percentage of their earnings to shared bills while maintaining equal dignity in the relationship.</p>

<div class="my-8 p-6 bg-[#FFFFFF] border-2 border-[#174F4A]/20 rounded-none space-y-3">
  <p class="text-xs font-bold uppercase tracking-wider text-[#2C7A73] mb-1">The Golden Proportional Rule</p>
  <p class="text-lg font-bold text-[#174F4A]">Each partner pays the exact same percentage of their personal take-home pay toward shared household expenses.</p>
  <p class="text-sm text-[#6F7F7C]">Formula: <em>Partner Contribution = (Partner Net Income ÷ Combined Net Income) × Total Shared Bills</em></p>
</div>

<h2>The Step-by-Step Formula: How to Split Bills Based on Income</h2>
<p>Calculating your equitable contribution takes three simple math steps:</p>
<ol>
  <li><strong>Calculate your combined household net income:</strong> Add together both partners' monthly take-home pay (after income taxes, healthcare premiums, and retirement contributions).</li>
  <li><strong>Find each partner's income percentage:</strong> Divide each person's individual net pay by the combined total.</li>
  <li><strong>Multiply each percentage by your total shared expenses:</strong> Multiply each partner's percentage by the total sum of your joint household bills.</li>
</ol>

<h2>Worked Numerical Example: The 62.5% / 37.5% Split</h2>
<p>To see how this works in real life, consider a couple—Alex and Jordan—living together in an apartment:</p>
<ul>
  <li><strong>Alex’s take-home pay:</strong> $5,000 / month</li>
  <li><strong>Jordan’s take-home pay:</strong> $3,000 / month</li>
  <li><strong>Combined net income:</strong> $8,000 / month</li>
  <li><strong>Total shared living expenses:</strong> $3,200 / month (rent, electricity, internet, groceries, renters insurance)</li>
</ul>

<p>Here is how their contributions break down mathematically:</p>
<ol>
  <li><strong>Alex’s share:</strong> $5,000 ÷ $8,000 = <strong>62.5%</strong></li>
  <li><strong>Jordan’s share:</strong> $3,000 ÷ $8,000 = <strong>37.5%</strong></li>
  <li><strong>Alex’s monthly dollar contribution:</strong> $3,200 × 62.5% = <strong>$2,000</strong></li>
  <li><strong>Jordan’s monthly dollar contribution:</strong> $3,200 × 37.5% = <strong>$1,200</strong></li>
</ol>

<p>Notice what happens to their remaining personal money after covering the shared bills:</p>
<ul>
  <li><strong>Alex keeps:</strong> $5,000 − $2,000 = <strong>$3,000</strong> (60% of personal take-home pay preserved for individual savings and hobbies)</li>
  <li><strong>Jordan keeps:</strong> $3,000 − $1,200 = <strong>$1,800</strong> (60% of personal take-home pay preserved for individual savings and hobbies)</li>
</ul>
<blockquote>Because both partners paid 40% of their respective paychecks toward the home, neither partner feels financially squeezed or taken advantage of. Both sacrifice the exact same relative effort to keep the household running.</blockquote>

<h2>Example 2: A Wider Salary Disparity (75% / 25%)</h2>
<p>When salary differences are more pronounced—for instance, if one partner is in graduate school, freelancing, or working in non-profits while the other works in corporate tech—proportional splitting is even more vital:</p>
<ul>
  <li><strong>Partner A (Senior Engineer):</strong> $7,500 / month net (75%)</li>
  <li><strong>Partner B (Resident Teacher):</strong> $2,500 / month net (25%)</li>
  <li><strong>Total Combined Income:</strong> $10,000 / month</li>
  <li><strong>Shared Monthly Bills:</strong> $4,000</li>
</ul>
<p>Under a rigid 50/50 split, each person would owe $2,000. For Partner B, that would consume <strong>80% of their entire monthly paycheck</strong>, leaving just $500 for groceries, transportation, and personal healthcare. Under a proportional split:</p>
<ul>
  <li><strong>Partner A contributes:</strong> $4,000 × 75% = <strong>$3,000</strong></li>
  <li><strong>Partner B contributes:</strong> $4,000 × 25% = <strong>$1,000</strong></li>
</ul>
<p>Partner B now pays a manageable 40% of their income, allowing them to save and live without chronic money anxiety.</p>

<h2>Comparing Split Methods: 50/50 vs. Proportional vs. Equal Discretionary</h2>
<p>Couples generally choose between three methods for dividing living costs:</p>
<table>
  <thead>
    <tr>
      <th>Method</th>
      <th>How It Works</th>
      <th>Best For</th>
      <th>Potential Pitfall</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Equal (50/50)</strong></td>
      <td>Every joint bill is halved equally regardless of pay.</td>
      <td>Couples with virtually identical incomes (&lt;10% difference).</td>
      <td>Lower earner is strained; higher earner dictates standard of living.</td>
    </tr>
    <tr>
      <td><strong>Proportional by Income (Recommended)</strong></td>
      <td>Each person contributes in direct ratio to their net salary.</td>
      <td>Couples with unequal incomes who want fairness and autonomy.</td>
      <td>Requires transparency and periodic recalculation when incomes shift.</td>
    </tr>
    <tr>
      <td><strong>Equal Remaining Cash</strong></td>
      <td>All income is pooled; bills are paid; remaining cash is split 50/50.</td>
      <td>Married couples with fully unified finances and shared life goals.</td>
      <td>May feel restrictive to someone who values individual financial agency.</td>
    </tr>
  </tbody>
</table>

<h2>How to Set Up the Banking: The "Yours, Mine, and Ours" 3-Pot System</h2>
<p>The cleanest way to execute an income-weighted split without doing daily arithmetic is using three bank accounts:</p>
<ol>
  <li><strong>Account 1 (Partner A Personal Checking):</strong> Partner A’s salary direct-deposits here. Used for individual clothes, personal gifts, solo hobbies, and pre-marital debts.</li>
  <li><strong>Account 2 (Partner B Personal Checking):</strong> Partner B’s salary direct-deposits here. Used for individual personal expenses with total autonomy and zero guilt.</li>
  <li><strong>Account 3 (Joint Household Checking):</strong> Neither partner's primary paycheck lands here. Instead, on payday, each partner sets up an <strong>automated scheduled transfer</strong> for their calculated proportional share ($2,000 from Partner A, $1,200 from Jordan). All joint expenses (rent, utilities, groceries, home insurance) autopay directly out of this account.</li>
</ol>
<p>This 3-pot system completely eliminates the awkward "Can you Venmo me for the electric bill?" texts and ensures the household account is always fully funded.</p>

<h2>What Should Count as a "Shared Expense"?</h2>
<p>To avoid disagreements, clearly categorize what belongs inside the joint split versus what stays personal:</p>
<h3>Shared Household Expenses:</h3>
<ul>
  <li>Rent or mortgage payments</li>
  <li>Homeowner or renters insurance, property taxes</li>
  <li>Utilities: electricity, gas, water, trash, home internet</li>
  <li>Shared household groceries and essential cleaning supplies</li>
  <li>Shared pets (food, veterinary checkups, joint medication)</li>
  <li>Streaming services or subscriptions both partners use</li>
</ul>
<h3>Personal Expenses (Kept Outside the Split):</h3>
<ul>
  <li>Personal student loans and pre-existing credit cards</li>
  <li>Individual cell phone bills (unless on an equal family plan)</li>
  <li>Individual clothing and personal grooming</li>
  <li>Solo hobbies, gifts for friends, individual dining out with coworkers</li>
  <li>Personal car payments (unless the couple shares a single vehicle)</li>
</ul>

<h2>Common Mistakes to Avoid With Income-Based Splitting</h2>
<ul>
  <li><strong>Calculating with gross salary instead of net pay:</strong> Gross salary doesn’t reflect what actually arrives in your bank account. If one partner has 401(k) deductions, union dues, or high health insurance premiums deducted at source, gross figures will skew the math. Always use net take-home pay.</li>
  <li><strong>Confusing financial contribution with voting rights:</strong> Contributing 65% of the rent does not mean you get 65% of the vote on where you live or how you furnish the apartment. Emotional and decision-making equality must remain 50/50.</li>
  <li><strong>Forgetting to recalculate after raises:</strong> Set a recurring reminder to revisit your numbers every 6 to 12 months, or immediately whenever either partner receives a promotion, salary increase, or change in employment.</li>
  <li><strong>Ignoring irregular or freelance income:</strong> If one partner freelances or earns variable commissions, base their contribution on a conservative 3-to-6-month rolling average, keeping a small cushion in the joint account.</li>
</ul>

<h2>Frequently Asked Questions</h2>
<h3>Should we split bills based on gross or net income?</h3>
<p>Net take-home pay is almost always the fairer choice. You cannot pay utility bills with money that was withheld for state taxes or mandatory pension contributions. Using net pay accounts for real take-home liquidity.</p>

<h3>What if one partner gets a substantial raise or promotion?</h3>
<p>Celebrate the win together, then revisit your numbers during your next monthly financial check-in. Update the calculation with the new take-home salary so the proportional split remains fair and accurate.</p>

<h3>How should we handle student loan debt when splitting bills?</h3>
<p>Most couples treat student loans as individual expenses paid out of personal accounts. However, if one partner’s mandatory student loan payment is so large that it severely undermines their ability to contribute to the household, you can agree to calculate proportional splits using "income after minimum student debt payments" as a custom adjustment.</p>

<h3>Does proportional splitting work if we are not married?</h3>
<p>Yes. Proportional splitting is particularly effective for unmarried couples living together because it allows you to share home costs equitably while keeping personal savings, investments, and assets separate.</p>

<div class="mt-10 p-5 bg-[#FAF6EF] border border-[#174F4A]/10 text-xs text-[#6F7F7C] leading-relaxed">
  <p><strong>Disclaimer:</strong> This article is for general educational and organizational purposes only and does not constitute personalized financial, tax, or legal advice. Every relationship and financial circumstance is unique; adjust your agreements in ways that support mutual trust and security.</p>
</div>
`,
  },
];

/**
 * Retrieve all PUBLISHED blog posts, sorted latest first.
 * Ensures drafts remain completely outside the public SEO surface (/blog, sitemap, related items).
 */
export function getAllPosts(): BlogPost[] {
  return blogPosts
    .filter((post) => post.status === 'published')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

/**
 * Retrieve a single PUBLISHED blog post by unique slug.
 * Returns undefined for drafts, ensuring 404 is thrown by public routes.
 */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug && post.status === 'published');
}

/**
 * Retrieve related PUBLISHED articles for a given post.
 */
export function getRelatedPosts(currentPost: BlogPost, limit = 2): BlogPost[] {
  const published = blogPosts.filter((post) => post.status === 'published' && post.slug !== currentPost.slug);

  if (currentPost.relatedSlugs && currentPost.relatedSlugs.length > 0) {
    const explicitlyRelated = currentPost.relatedSlugs
      .map((slug) => published.find((p) => p.slug === slug))
      .filter((post): post is BlogPost => Boolean(post));
    if (explicitlyRelated.length > 0) {
      return explicitlyRelated.slice(0, limit);
    }
  }

  // Fallback to same-category published posts
  return published
    .filter((post) => post.category === currentPost.category)
    .slice(0, limit);
}
