/**
 * Region facets — how many districts the live catalog covers.
 *
 * Source: `GET /api/activities/public-facets` (unauthenticated, PII-free:
 * region names + counts only). Used for the home page metric row so the
 * "N개 지역" claim is read from the same database the count comes from, on
 * the same day. On any failure we return null and the caller shows nothing
 * for that metric — we do not fall back to a remembered number.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://api.dailyfitai.app';

export type RegionFacets = {
  /** Number of distinct (city, district) pairs with at least one live activity. */
  districts: number;
  /** Distinct cities/provinces (서울특별시 · 경기도 …). */
  cities: string[];
};

export async function getRegionFacets(): Promise<RegionFacets | null> {
  try {
    const res = await fetch(`${API_BASE}/api/activities/public-facets`, {
      next: { revalidate: 86400 },
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      regions?: { city?: unknown; district?: unknown; count?: unknown }[];
    };
    const regions = (data.regions ?? []).filter(
      (r) => typeof r.district === 'string' && typeof r.count === 'number' && r.count > 0,
    );
    if (regions.length === 0) return null;
    const cities = [...new Set(regions.map((r) => String(r.city ?? '')).filter(Boolean))];
    return { districts: regions.length, cities };
  } catch {
    return null;
  }
}
