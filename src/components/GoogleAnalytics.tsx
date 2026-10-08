import Script from 'next/script';

/**
 * Site-wide Google Analytics 4 integration
 * Gracefully inactive if NEXT_PUBLIC_GA_MEASUREMENT_ID is not provided.
 * Uses afterInteractive strategy to prevent render-blocking.
 */
export default function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  if (!gaId || !gaId.trim()) {
    return null;
  }

  const cleanGaId = gaId.trim();

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${cleanGaId}`}
      />
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${cleanGaId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
