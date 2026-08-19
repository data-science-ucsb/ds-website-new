declare global {
  // eslint-disable-next-line no-var
  var __dsRateLimitStore: Map<string, number[]> | undefined;
}

const store = globalThis.__dsRateLimitStore ?? new Map<string, number[]>();

if (!globalThis.__dsRateLimitStore) {
  globalThis.__dsRateLimitStore = store;
}

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterMs: number;
}

export function checkRateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number }
): RateLimitResult {
  const now = Date.now();
  const timestamps = (store.get(key) || []).filter((timestamp) => now - timestamp < windowMs);

  if (timestamps.length >= limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterMs: windowMs - (now - timestamps[0]),
    };
  }

  timestamps.push(now);
  store.set(key, timestamps);

  return {
    allowed: true,
    remaining: Math.max(limit - timestamps.length, 0),
    retryAfterMs: 0,
  };
}
