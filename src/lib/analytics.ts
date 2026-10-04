/**
 * Analytics abstraction for Togetherly
 * Provides lightweight tracking for core commercial events without large third-party dependencies.
 * Fails safely if no analytics provider is active.
 */

export interface ProductViewProperties {
  product: string;
  price: number;
  currency: string;
}

export interface CheckoutClickProperties {
  product: string;
  price: number;
  currency: string;
  cta_location: 'hero' | 'middle' | 'final' | 'article' | 'tool' | 'nav' | 'footer' | string;
}

export interface ArticleViewProperties {
  slug: string;
  title: string;
  category?: string;
}

export interface ArticleToProductClickProperties {
  source_page: string;
  cta_location: string;
}

export interface CalculatorUseProperties {
  split_method?: string;
  action?: string;
}

export interface CalculatorToProductClickProperties {
  source_page: string;
  cta_location: string;
}

export interface EmailFormViewProperties {
  source_page: string;
  content_cluster?: string;
  cta_location?: string;
}

export interface EmailSignupProperties {
  // CRITICAL: Strictly exclude email addresses and PII from analytics payloads
  source_page: string;
  content_cluster?: string;
  cta_location?: string;
}

export interface WhatsAppClickProperties {
  // CRITICAL: Strictly exclude message text and sensitive financial numbers from analytics payloads
  page: string;
  content_cluster?: string;
  cta_location?: string;
  topic?: string;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Dispatch a generic custom analytics event
 */
export function trackEvent(eventName: string, properties: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return;

  const eventPayload = {
    event: eventName,
    timestamp: new Date().toISOString(),
    ...properties,
  };

  // Google Tag Manager / GA4 dataLayer support
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(eventPayload);
  }

  // Google gtag support
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, properties);
  }

  // Native DOM custom event for debugging or headless analytics listeners
  try {
    window.dispatchEvent(
      new CustomEvent('togetherly_analytics', {
        detail: { eventName, properties: eventPayload },
      })
    );
  } catch {
    // Ignore in non-browser or restricted environments
  }
}

/**
 * Track when a user views a product page
 */
export function trackProductView(properties: ProductViewProperties): void {
  trackEvent('product_view', properties as unknown as Record<string, unknown>);
}

/**
 * Track when a user clicks any checkout CTA
 */
export function trackCheckoutClick(properties: CheckoutClickProperties): void {
  trackEvent('checkout_click', properties as unknown as Record<string, unknown>);
}

/**
 * Track when a user views an educational blog article
 */
export function trackArticleView(properties: ArticleViewProperties): void {
  trackEvent('article_view', properties as unknown as Record<string, unknown>);
}

/**
 * Track when a user clicks from a blog article to the commercial product page
 */
export function trackArticleToProductClick(properties: ArticleToProductClickProperties): void {
  trackEvent('article_to_product_click', properties as unknown as Record<string, unknown>);
}

/**
 * Track when a user interacts with the expense split calculator
 */
export function trackCalculatorUse(properties: CalculatorUseProperties = {}): void {
  trackEvent('calculator_use', properties as unknown as Record<string, unknown>);
}

/**
 * Track when a user clicks from the free calculator to the commercial product page
 */
export function trackCalculatorToProductClick(properties: CalculatorToProductClickProperties): void {
  trackEvent('calculator_to_product_click', properties as unknown as Record<string, unknown>);
}

/**
 * Track when the email subscription form enters view
 */
export function trackEmailFormView(properties: EmailFormViewProperties): void {
  trackEvent('email_form_view', properties as unknown as Record<string, unknown>);
}

/**
 * Track successful email subscription (WITHOUT sending user's email address)
 */
export function trackEmailSignup(properties: EmailSignupProperties): void {
  trackEvent('email_signup', properties as unknown as Record<string, unknown>);
}

/**
 * Track when a user clicks a contextual WhatsApp help CTA (WITHOUT sending message content)
 */
export function trackWhatsAppClick(properties: WhatsAppClickProperties): void {
  trackEvent('whatsapp_click', properties as unknown as Record<string, unknown>);
}

