const redisClient = require("../config/redis");

const checkRateLimit = async (
  clientId,
  path,
  maxRequests,
  windowSeconds
) => {
  const key = `rate:${clientId}:${path}`;
  const now = Date.now();

  let bucket = await redisClient.get(key);

  if (!bucket) {
    bucket = {
      tokens: maxRequests,
      lastRefill: now
    };
  } else {
    bucket = JSON.parse(bucket);

    const elapsedSeconds = (now - bucket.lastRefill) / 1000;
    const refillTokens =
      elapsedSeconds * (maxRequests / windowSeconds);

    bucket.tokens = Math.min(
      maxRequests,
      bucket.tokens + refillTokens
    );

    bucket.lastRefill = now;
  }

  if (bucket.tokens >= 1) {
    bucket.tokens -= 1;

    await redisClient.set(
      key,
      JSON.stringify(bucket),
      { EX: windowSeconds }
    );

    return {
      allowed: true,
      remainingRequests: Math.floor(bucket.tokens),
      resetTime: new Date(now + windowSeconds * 1000)
    };
  }

  return {
    allowed: false,
    retryAfter: windowSeconds,
    resetTime: new Date(now + windowSeconds * 1000)
  };
};

module.exports = { checkRateLimit };