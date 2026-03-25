import {
  createFixedWindowRateLimiter,
  type FixedWindowRateLimiter,
} from "./fixed-window-rate-limit.js";

export type ModelRateLimitConfig = {
  rpm?: number;
  tpm?: number;
};

export type ModelThrottleResult = {
  allowed: boolean;
  retryAfterMs: number;
};

const rpmLimiters = new Map<string, FixedWindowRateLimiter>();
const tpmLimiters = new Map<string, FixedWindowRateLimiter>();

function limiterKey(provider: string, modelId: string): string {
  return `${provider}/${modelId}`;
}

/**
 * Proactive per-model rate limit check.
 * Creates/caches fixed-window rate limiters keyed by provider+model.
 * Returns whether the request is allowed; if not, includes the delay to wait.
 */
export function consumeModelRateLimit(
  provider: string,
  modelId: string,
  config: ModelRateLimitConfig | undefined,
  tokenEstimate?: number,
): ModelThrottleResult {
  if (!config) {
    return { allowed: true, retryAfterMs: 0 };
  }

  const key = limiterKey(provider, modelId);

  // RPM check (1 unit per request)
  if (config.rpm) {
    if (!rpmLimiters.has(key)) {
      rpmLimiters.set(
        key,
        createFixedWindowRateLimiter({
          maxRequests: config.rpm,
          windowMs: 60_000,
        }),
      );
    }
    const result = rpmLimiters.get(key)!.consume();
    if (!result.allowed) {
      return { allowed: false, retryAfterMs: result.retryAfterMs };
    }
  }

  // TPM check (N tokens per request)
  if (config.tpm && tokenEstimate && tokenEstimate > 0) {
    if (!tpmLimiters.has(key)) {
      tpmLimiters.set(
        key,
        createFixedWindowRateLimiter({
          maxRequests: config.tpm,
          windowMs: 60_000,
        }),
      );
    }
    const result = tpmLimiters.get(key)!.consume(tokenEstimate);
    if (!result.allowed) {
      return { allowed: false, retryAfterMs: result.retryAfterMs };
    }
  }

  return { allowed: true, retryAfterMs: 0 };
}

/** Reset all cached limiters (useful for testing). */
export function resetModelRateLimiters(): void {
  for (const limiter of rpmLimiters.values()) {
    limiter.reset();
  }
  for (const limiter of tpmLimiters.values()) {
    limiter.reset();
  }
  rpmLimiters.clear();
  tpmLimiters.clear();
}
