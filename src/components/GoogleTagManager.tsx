import Script from 'next/script';

/**
 * Site-wide Google Tag Manager (GTM) Integration for Next.js App Router.
 * GTM Container ID: GTM-KQLLHR2M
 * 
 * Uses NEXT_PUBLIC_GTM_ID environment variable with fallback to GTM-KQLLHR2M.
 * Strategy: afterInteractive (non-blocking, fast hydration, SSR-safe).
 * 
 * Includes:
 * 1. Pre-initialization of window.dataLayer to queue early events.
 * 2. Official Google Tag Manager script injection.
 * 3. Noscript iframe fallback for clients without JavaScript.
 */
export default function GoogleTagManager() {
  const gtmId = (process.env.NEXT_PUBLIC_GTM_ID || 'GTM-KQLLHR2M').trim();

  if (!gtmId) {
    return null;
  }

  return (
    <>
      {/* Pre-initialize dataLayer and load GTM container */}
      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `,
        }}
      />
      {/* Fallback for disabled JavaScript */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  );
}
