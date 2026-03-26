export type FixedWindowRateLimiterResult = {
  allowed: boolean;
  retryAfterMs: number;
  remaining: number;
};

export type FixedWindowRateLimiter = {
  consume: (amount?: number) => FixedWindowRateLimiterResult;
  reset: () => void;
};

export function createFixedWindowRateLimiter(params: {
  maxRequests: number;
  windowMs: number;
  now?: () => number;
}): FixedWindowRateLimiter {
  const maxRequests = Math.max(1, Math.floor(params.maxRequests));
  const windowMs = Math.max(1, Math.floor(params.windowMs));
  const now = params.now ?? Date.now;

  let count = 0;
  let windowStartMs = 0;

  return {
    consume(amount = 1) {
      const nowMs = now();
      if (nowMs - windowStartMs >= windowMs) {
        windowStartMs = nowMs;
        count = 0;
      }
      const units = Math.max(1, Math.floor(amount));
      if (count + units > maxRequests) {
        return {
          allowed: false,
          retryAfterMs: Math.max(0, windowStartMs + windowMs - nowMs),
          remaining: Math.max(0, maxRequests - count),
        };
      }
      count += units;
      return {
        allowed: true,
        retryAfterMs: 0,
        remaining: Math.max(0, maxRequests - count),
      };
    },
    reset() {
      count = 0;
      windowStartMs = 0;
    },
  };
}
