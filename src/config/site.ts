/**
 * Centralized Site Configuration for Togetherly
 * Single source of truth for canonical domain, metadata, and absolute URL generation.
 */

export const PRODUCTION_URL = 'https://www.gettogetherly.tech';

/**
 * Canonical Site Origin
 * Always defaults strictly to https://www.gettogetherly.tech with www.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL.trim() !== ''
    ? process.env.NEXT_PUBLIC_SITE_URL.trim().replace(/\/+$/, '')
    : PRODUCTION_URL
);

export const SITE_NAME = 'Togetherly';

export const SITE_DEFAULTS = {
  title: 'Togetherly — Money Made Simpler, Life More Together',
  titleTemplate: '%s | Togetherly',
  description:
    'The complete 8-sheet Google Sheets financial planning system designed for couples. Track shared living costs, balance fair proportional splits, and achieve savings goals without tension.',
  ogImage: '/togetherly/togetherly.png',
  logoPrimary: '/togetherly/togetherly-logo-primary.png',
  supportEmail: 'support@gettogetherly.tech',
} as const;

/**
 * Returns a fully qualified absolute canonical URL
 * @example absoluteUrl('/tools/couples-expense-split-calculator') => 'https://www.gettogetherly.tech/tools/couples-expense-split-calculator'
 * @example absoluteUrl('/') => 'https://www.gettogetherly.tech/'
 */
export function absoluteUrl(path: string = '/'): string {
  if (path === '' || path === '/') {
    return `${SITE_URL}/`;
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
}
