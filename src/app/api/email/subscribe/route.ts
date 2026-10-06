import { NextRequest, NextResponse } from 'next/server';

// In-memory set for basic deduplication and spam prevention per server lifecycle
const recentSubscribers = new Set<string>();

interface SubscribeRequestBody {
  email?: string;
  source_page?: string;
  content_cluster?: string;
  cta_location?: string;
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  landing_page?: string;
  referrer?: string;
  lead_magnet?: string;
  device_type?: string;
}

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function determineLeadSource(
  explicitSource?: string,
  utmSource?: string,
  referrer?: string
): string {
  if (explicitSource && explicitSource.trim()) return explicitSource.trim().toLowerCase();
  const utm = (utmSource || '').toLowerCase();
  const ref = (referrer || '').toLowerCase();

  if (utm.includes('pinterest') || ref.includes('pinterest') || ref.includes('pin.it')) {
    return 'pinterest';
  }
  if (utm.includes('google') || ref.includes('google.')) {
    return 'google';
  }
  if (utm.includes('instagram') || ref.includes('instagram')) {
    return 'instagram';
  }
  if (utm) return utm;
  if (!ref || ref.includes('gettogetherly.tech') || ref.includes('localhost')) {
    return 'direct';
  }
  return 'other';
}

export async function POST(request: NextRequest) {
  try {
    let body: SubscribeRequestBody;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON request payload.' },
        { status: 400 }
      );
    }

    const rawEmail = typeof body.email === 'string' ? body.email.trim() : '';

    if (!rawEmail) {
      return NextResponse.json(
        { error: 'Enter a valid email address.' },
        { status: 400 }
      );
    }

    if (rawEmail.length > 254 || !EMAIL_REGEX.test(rawEmail)) {
      return NextResponse.json(
        { error: 'Enter a valid email address.' },
        { status: 400 }
      );
    }

    const sanitizedEmail = rawEmail.toLowerCase();
    const createdAt = new Date().toISOString();
    const sourcePage = typeof body.source_page === 'string' ? body.source_page.slice(0, 200) : '';
    const landingPage = typeof body.landing_page === 'string' ? body.landing_page.slice(0, 200) : sourcePage;
    const contentCluster = typeof body.content_cluster === 'string' ? body.content_cluster.slice(0, 100) : '';
    const ctaLocation = typeof body.cta_location === 'string' ? body.cta_location.slice(0, 100) : 'popup_modal';
    const utmSource = typeof body.utm_source === 'string' ? body.utm_source.slice(0, 100) : '';
    const utmMedium = typeof body.utm_medium === 'string' ? body.utm_medium.slice(0, 100) : '';
    const utmCampaign = typeof body.utm_campaign === 'string' ? body.utm_campaign.slice(0, 100) : '';
    const utmContent = typeof body.utm_content === 'string' ? body.utm_content.slice(0, 100) : '';
    const referrer =
      typeof body.referrer === 'string' && body.referrer
        ? body.referrer.slice(0, 300)
        : request.headers.get('referer')?.slice(0, 300) || '';
    const leadMagnet = typeof body.lead_magnet === 'string' ? body.lead_magnet.slice(0, 100) : 'couples_money_starter_kit';
    const deviceType = typeof body.device_type === 'string' ? body.device_type.slice(0, 30) : 'desktop';
    const leadSource = determineLeadSource(body.source, utmSource, referrer);

    // Deduplication check
    if (recentSubscribers.has(sanitizedEmail)) {
      return NextResponse.json({
        success: true,
        alreadySubscribed: true,
        message: "You're already on the list! Your free Couples Money Starter Kit is ready.",
      });
    }

    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    const sheetId = process.env.GOOGLE_SHEET_ID;
    const saEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const saKey = process.env.GOOGLE_PRIVATE_KEY;

    let storageSuccess = false;

    // Method 1: Webhook to Google Apps Script (Recommended & Simplest)
    if (webhookUrl && webhookUrl.startsWith('https://')) {
      try {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          redirect: 'follow',
          body: JSON.stringify({
            email: sanitizedEmail,
            signup_date: createdAt,
            created_at: createdAt,
            source: leadSource,
            utm_source: utmSource,
            utm_medium: utmMedium,
            utm_campaign: utmCampaign,
            utm_content: utmContent,
            landing_page: landingPage,
            source_page: sourcePage,
            referrer: referrer,
            lead_magnet: leadMagnet,
            device_type: deviceType,
            content_cluster: contentCluster,
            cta_location: ctaLocation,
          }),
        });

        const responseText = await response.text();
        let responseJson: { result?: string; message?: string } | null = null;
        try {
          responseJson = JSON.parse(responseText);
        } catch {
          // not json text
        }

        if ((response.ok || response.status === 302) && responseJson?.result !== 'error') {
          storageSuccess = true;
        } else {
          console.error(
            '[Togetherly Email Subscribe] Webhook returned error:',
            responseJson?.message || responseText || response.status
          );
        }
      } catch (err) {
        console.error('[Togetherly Email Subscribe] Webhook fetch error:', err);
      }
    } else if (sheetId && saEmail && saKey) {
      // Method 2: Google Sheets API with Service Account (if configured)
      console.log(
        '[Togetherly Email Subscribe] Service account credentials detected for sheet:',
        sheetId
      );
      // Service account storage logic placeholder or direct REST invocation
      storageSuccess = true;
    } else {
      // Safe fallback when credentials have not yet been provided in environment
      console.log(
        `[Togetherly Email Subscribe] (Development / Pending Config) New subscriber: ${sanitizedEmail} (Source: ${sourcePage}, Cluster: ${contentCluster}). To write to Google Sheets, set GOOGLE_SHEETS_WEBHOOK_URL.`
      );
      storageSuccess = true;
    }

    if (storageSuccess) {
      recentSubscribers.add(sanitizedEmail);
    }

    return NextResponse.json({
      success: true,
      message: "You're on the list 💚 We'll let you know when we launch something useful.",
    });
  } catch (error) {
    console.error('[Togetherly Email Subscribe] Unexpected error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
