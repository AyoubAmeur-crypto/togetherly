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

export interface CalculatorCompleteProperties {
  split_method?: string;
  split_ratio?: string;
  source_page?: string;
}

export interface CalculatorToProductClickProperties {
  source_page: string;
  cta_location: string;
}

export interface TemplateDownloadProperties {
  template_name: string;
  source_page: string;
  format?: string;
}

export interface ProductCtaClickProperties {
  product: string;
  source_page: string;
  cta_location: string;
  cta_text?: string;
}

export interface OutboundProductClickProperties {
  product: string;
  destination_url: string;
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

export interface PopupViewProperties {
  page_url: string;
  utm_source?: string;
  utm_campaign?: string;
  utm_content?: string;
  device?: string;
  trigger?: string;
  variant?: string;
}

export interface PopupCloseProperties {
  page_url: string;
  utm_source?: string;
  device?: string;
  time_spent_seconds?: number;
}

export interface PopupEmailStartedProperties {
  page_url: string;
  device?: string;
}

export interface PopupSubmitProperties {
  page_url: string;
  utm_source?: string;
  utm_campaign?: string;
  device?: string;
  variant?: string;
}

export interface PopupConversionProperties {
  page_url: string;
  utm_source?: string;
  utm_campaign?: string;
  utm_content?: string;
  device?: string;
  lead_magnet: string;
  variant?: string;
}

export interface StarterKitOpenedProperties {
  page_url: string;
  device?: string;
  lead_magnet: string;
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
 * Track when a user completes a calculation (after settling on inputs)
 */
export function trackCalculatorComplete(properties: CalculatorCompleteProperties = {}): void {
  trackEvent('calculator_complete', properties as unknown as Record<string, unknown>);
}

/**
 * Track when a user downloads or opens a template asset
 */
export function trackTemplateDownload(properties: TemplateDownloadProperties): void {
  trackEvent('template_download', properties as unknown as Record<string, unknown>);
}

/**
 * Track when a user clicks a product CTA (internal funnel navigation)
 */
export function trackProductCtaClick(properties: ProductCtaClickProperties): void {
  trackEvent('product_cta_click', properties as unknown as Record<string, unknown>);
}

/**
 * Track when a user clicks an outbound commercial purchase/checkout link
 */
export function trackOutboundProductClick(properties: OutboundProductClickProperties): void {
  trackEvent('outbound_product_click', properties as unknown as Record<string, unknown>);
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

/**
 * Track when the email capture popup enters view
 */
export function trackPopupView(properties: PopupViewProperties): void {
  trackEvent('popup_view', properties as unknown as Record<string, unknown>);
}

/**
 * Track when the email capture popup is closed/dismissed
 */
export function trackPopupClose(properties: PopupCloseProperties): void {
  trackEvent('popup_close', properties as unknown as Record<string, unknown>);
}

/**
 * Track when the visitor starts typing in the popup email field
 */
export function trackPopupEmailStarted(properties: PopupEmailStartedProperties): void {
  trackEvent('popup_email_started', properties as unknown as Record<string, unknown>);
}

/**
 * Track when the popup form is submitted
 */
export function trackPopupSubmit(properties: PopupSubmitProperties): void {
  trackEvent('popup_submit', properties as unknown as Record<string, unknown>);
}

/**
 * Track when the popup form successfully converts
 */
export function trackPopupConversion(properties: PopupConversionProperties): void {
  trackEvent('popup_conversion', properties as unknown as Record<string, unknown>);
}

/**
 * Track when the user opens the starter kit from the success state
 */
export function trackStarterKitOpened(properties: StarterKitOpenedProperties): void {
  trackEvent('starter_kit_opened', properties as unknown as Record<string, unknown>);
}


