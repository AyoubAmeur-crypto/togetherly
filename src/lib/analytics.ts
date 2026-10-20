/**
 * Analytics abstraction for Togetherly
 * 
 * Clean, safe Google Tag Manager / dataLayer event dispatcher.
 * Architecture: Website -> GTM (GTM-KQLLHR2M) -> GA4 (G-XBK3SQZEQ1).
 * 
 * Safety & Privacy Principles:
 * - Strictly SSR-safe (never accesses window during server rendering).
 * - TypeScript-safe with strict schemas for every business event.
 * - Fails silently and gracefully if dataLayer or GTM is not present.
 * - Strictly prohibits PII (names, email addresses, phone numbers, IP addresses).
 * - Strictly prohibits sensitive financial data (salaries, incomes, bill amounts, account balances).
 */

// ============================================================================
// Core Business Event Interfaces
// ============================================================================

/**
 * Event: calculator_used
 * Fired when the user interacts with or calculates results in the bill-splitting calculator.
 * NEVER include incomes, expenses, or exact financial figures.
 */
export interface CalculatorUsedParameters {
  calculator_type: string;
  page_path: string;
  split_method?: 'proportional' | 'fiftyFifty' | string;
}

/**
 * Event: calculator_cta_click
 * Fired when a user clicks a CTA leading to the calculator.
 */
export interface CalculatorCtaClickParameters {
  source_page: string;
  destination: string;
}

/**
 * Event: article_cta_click
 * Fired for important article CTAs (companion tools, product recommendations, etc.).
 */
export interface ArticleCtaClickParameters {
  article_slug: string;
  cta_name: string;
  destination: string;
}

/**
 * Event: product_view
 * Fired when a commercial product page is viewed (deduplicated against React re-renders).
 */
export interface ProductViewParameters {
  product_slug: string;
  product_name: string;
}

/**
 * Event: product_cta_click
 * Fired when a user clicks a product CTA (e.g. "Buy Couples Money Planner ($19)", "Get Instant Copy").
 * Note: A CTA click is strictly an intent indicator, NOT a purchase.
 */
export interface ProductCtaClickParameters {
  product_slug: string;
  cta_name: string;
  destination: string;
}

/**
 * Event: lead_signup
 * Fired ONLY AFTER a successful email subscription or waitlist signup.
 * NEVER send the email address or personal contact info.
 */
export interface LeadSignupParameters {
  source_page: string;
  form_location: string;
}

/**
 * Event: template_download
 * Typed interface reserved for when a real downloadable asset/copy link is triggered.
 */
export interface TemplateDownloadParameters {
  template_slug: string;
  template_name: string;
  source_page: string;
  format?: string;
}

/**
 * Event: purchase
 * Typed interface reserved for when a confirmed checkout success webhook or thank-you signal exists.
 */
export interface PurchaseParameters {
  transaction_id: string;
  product_slug: string;
  value: number;
  currency: string;
}

/**
 * Event: whatsapp_click
 * Contextual help button click. Excludes message content.
 */
export interface WhatsAppClickParameters {
  source_page: string;
  cta_location: string;
  topic?: string;
}

// Window dataLayer typing
declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

// ============================================================================
// Core dataLayer Dispatcher
// ============================================================================

/**
 * Generic SSR-safe, TypeScript-safe dataLayer push utility.
 * Pushes standard event objects into window.dataLayer for GTM to trigger GA4 tags.
 */
export function trackEvent(
  eventName: string,
  parameters: Record<string, unknown> = {}
): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      ...parameters,
    });

    // Native custom event dispatch for browser console debugging or local testing
    window.dispatchEvent(
      new CustomEvent('togetherly_analytics', {
        detail: { event: eventName, parameters },
      })
    );
  } catch {
    // Fail silently in restricted sandbox or private browsing environments
  }
}

// ============================================================================
// Concrete Business Event Functions
// ============================================================================

/**
 * A) calculator_used
 * Fire when the bill-splitting calculator successfully calculates a result.
 */
export function trackCalculatorUsed(params: CalculatorUsedParameters): void {
  trackEvent('calculator_used', {
    calculator_type: params.calculator_type,
    page_path: params.page_path,
    ...(params.split_method ? { split_method: params.split_method } : {}),
  });
}

/**
 * B) calculator_cta_click
 * Fire when someone clicks a CTA that sends them to the calculator.
 */
export function trackCalculatorCtaClick(params: CalculatorCtaClickParameters): void {
  trackEvent('calculator_cta_click', {
    source_page: params.source_page,
    destination: params.destination,
  });
}

/**
 * C) article_cta_click
 * Fire for important article CTAs.
 */
export function trackArticleCtaClick(params: ArticleCtaClickParameters): void {
  trackEvent('article_cta_click', {
    article_slug: params.article_slug,
    cta_name: params.cta_name,
    destination: params.destination,
  });
}

/**
 * D) product_view
 * Fire when an actual product page is viewed. Deduplicated with React refs.
 */
export function trackProductView(params: ProductViewParameters): void {
  trackEvent('product_view', {
    product_slug: params.product_slug,
    product_name: params.product_name,
  });
}

/**
 * E) product_cta_click
 * Fire when a visitor clicks a product CTA.
 */
export function trackProductCtaClick(params: ProductCtaClickParameters): void {
  trackEvent('product_cta_click', {
    product_slug: params.product_slug,
    cta_name: params.cta_name,
    destination: params.destination,
  });
}

/**
 * F) lead_signup
 * Fire ONLY AFTER a successful signup. Never send the email address.
 */
export function trackLeadSignup(params: LeadSignupParameters): void {
  trackEvent('lead_signup', {
    source_page: params.source_page,
    form_location: params.form_location,
  });
}

/**
 * G) template_download
 * Intentionally deferred until a real downloadable asset/direct link exists.
 */
export function trackTemplateDownload(params: TemplateDownloadParameters): void {
  trackEvent('template_download', {
    template_slug: params.template_slug,
    template_name: params.template_name,
    source_page: params.source_page,
    ...(params.format ? { format: params.format } : {}),
  });
}

/**
 * H) purchase
 * Intentionally deferred until a real post-checkout success callback exists.
 */
export function trackPurchase(params: PurchaseParameters): void {
  trackEvent('purchase', {
    transaction_id: params.transaction_id,
    product_slug: params.product_slug,
    value: params.value,
    currency: params.currency,
  });
}

/**
 * Contextual WhatsApp click tracking
 */
export function trackWhatsAppClick(params: {
  page?: string;
  source_page?: string;
  cta_location?: string;
  topic?: string;
  content_cluster?: string;
}): void {
  trackEvent('whatsapp_click', {
    source_page: params.source_page || params.page || '',
    cta_location: params.cta_location || 'unknown',
    ...(params.topic ? { topic: params.topic } : {}),
  });
}

// ============================================================================
// Backward-Compatibility Helpers & Aliases (Mapped to Safe Architectures)
// ============================================================================

/**
 * @deprecated Use trackLeadSignup instead.
 */
export function trackEmailSignup(params: {
  source_page: string;
  cta_location?: string;
  content_cluster?: string;
}): void {
  trackLeadSignup({
    source_page: params.source_page,
    form_location: params.cta_location || 'email_form',
  });
}

/**
 * @deprecated Use trackLeadSignup instead.
 */
export function trackEmailFormView(params: {
  source_page: string;
  cta_location?: string;
  content_cluster?: string;
}): void {
  trackEvent('email_form_view', {
    source_page: params.source_page,
    form_location: params.cta_location || 'email_form',
  });
}

/**
 * @deprecated Use trackProductCtaClick instead.
 */
export function trackCheckoutClick(params: {
  product: string;
  price?: number;
  currency?: string;
  cta_location: string;
}): void {
  trackProductCtaClick({
    product_slug: 'couples-money-planner',
    cta_name: params.cta_location,
    destination: 'checkout_redirect',
  });
}

/**
 * @deprecated Use trackCalculatorUsed instead.
 */
export function trackCalculatorUse(params: {
  split_method?: string;
  action?: string;
}): void {
  trackCalculatorUsed({
    calculator_type: 'couples_expense_split',
    page_path: typeof window !== 'undefined' ? window.location.pathname : '/tools/couples-expense-split-calculator',
    split_method: params.split_method,
  });
}

/**
 * @deprecated Use trackCalculatorUsed instead.
 */
export function trackCalculatorComplete(params: {
  split_method?: string;
  split_ratio?: string;
  source_page?: string;
}): void {
  trackCalculatorUsed({
    calculator_type: 'couples_expense_split',
    page_path: params.source_page || (typeof window !== 'undefined' ? window.location.pathname : ''),
    split_method: params.split_method,
  });
}

/**
 * Article view tracker helper
 */
export function trackArticleView(params: {
  slug: string;
  title: string;
  category?: string;
}): void {
  trackEvent('article_view', {
    article_slug: params.slug,
    article_title: params.title,
    ...(params.category ? { category: params.category } : {}),
  });
}

/**
 * Article to product link tracker
 */
export function trackArticleToProductClick(params: {
  source_page: string;
  cta_location: string;
}): void {
  trackArticleCtaClick({
    article_slug: params.source_page.replace('/blog/', ''),
    cta_name: params.cta_location,
    destination: '/products/couples-money-planner',
  });
  trackProductCtaClick({
    product_slug: 'couples-money-planner',
    cta_name: params.cta_location,
    destination: '/products/couples-money-planner',
  });
}

/**
 * Calculator to product link tracker
 */
export function trackCalculatorToProductClick(params: {
  source_page: string;
  cta_location: string;
}): void {
  trackProductCtaClick({
    product_slug: 'couples-money-planner',
    cta_name: params.cta_location,
    destination: '/products/couples-money-planner',
  });
}

/**
 * Popup analytics
 */
export function trackPopupView(params: Record<string, unknown>): void {
  trackEvent('popup_view', params);
}

export function trackPopupClose(params: Record<string, unknown>): void {
  trackEvent('popup_close', params);
}

export function trackPopupEmailStarted(params: Record<string, unknown>): void {
  trackEvent('popup_email_started', params);
}

export function trackPopupSubmit(params: Record<string, unknown>): void {
  trackEvent('popup_submit', params);
}

export function trackPopupConversion(params: Record<string, unknown>): void {
  trackEvent('popup_conversion', params);
  // Also fire lead_signup
  trackLeadSignup({
    source_page: typeof window !== 'undefined' ? window.location.pathname : '',
    form_location: 'lead_magnet_popup',
  });
}

export function trackStarterKitOpened(params: Record<string, unknown>): void {
  trackEvent('starter_kit_opened', params);
}
