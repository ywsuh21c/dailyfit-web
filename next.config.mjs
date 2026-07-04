/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Sanity CDN domain added once Sanity project is provisioned:
    // remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
  },
  async redirects() {
    return [
      // Old static landing (dailyfit-website) URL patterns → v2 equivalents.
      { source: '/privacy.html', destination: '/privacy', permanent: true },
      { source: '/index.html', destination: '/', permanent: true },
      // 광고 트래킹 링크 예쁜 도메인 — dailyfitai.app/go/{code} → 백엔드 /l/{code}
      // (ad_click 계측 후 스토어/홈 302). 쿼리스트링(utm_*)은 Next가 기본 보존.
      // permanent:false(307) — 목적지 정책 바뀔 수 있는 마케팅 링크는 캐시 고정 금지.
      {
        source: '/go/:code',
        destination:
          'https://dailyfit-api-1672529533.asia-northeast3.run.app/l/:code',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
