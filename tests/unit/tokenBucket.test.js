jest.mock("../../src/config/redis", () => {
  return {
    get: jest.fn(),
    set: jest.fn()
  };
});

const redisClient = require("../../src/config/redis");
const { checkRateLimit } = require("../../src/services/tokenBucket.service");

describe("Token Bucket Rate Limiter", () => {

  const clientId = "unitTestClient";
  const path = "/unit";
  const maxRequests = 2;
  const windowSeconds = 5;

  beforeEach(() => {
    redisClient.get.mockReset();
    redisClient.set.mockReset();
  });

  test("allows requests within limit", async () => {

    redisClient.get.mockResolvedValue(null);

    const res = await checkRateLimit(clientId, path, maxRequests, windowSeconds);

    expect(res.allowed).toBe(true);
  });

  test("blocks requests exceeding limit", async () => {

    const fullBucket = JSON.stringify({
      tokens: 0,
      lastRefill: Date.now()
    });

    redisClient.get.mockResolvedValue(fullBucket);

    const res = await checkRateLimit(clientId, path, maxRequests, windowSeconds);

    expect(res.allowed).toBe(false);
  });

});