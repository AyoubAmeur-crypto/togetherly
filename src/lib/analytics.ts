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
