import Script from 'next/script';

/**
 * Plausible — privacy-first, no-cookie, PIPA-friendly analytics.
 *
 * Env-gated SWAP SEAM: renders NOTHING until NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set
 * (in the Vercel dashboard, after the Plausible account lands). So local dev and
 * the un-provisioned state ship zero tracking and zero network calls. To swap
 * analytics vendor later, replace ONLY this component.
 */
export function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;
  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}
