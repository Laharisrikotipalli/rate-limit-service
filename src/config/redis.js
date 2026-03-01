const { createClient } = require("redis");

const redisClient = createClient({
  url: process.env.REDIS_URL
});

redisClient.on("connect", () => {
  console.log(JSON.stringify({
    level: "info",
    message: "Redis connected",
    timestamp: new Date().toISOString()
  }));
});

redisClient.on("error", (err) => {
  console.error(JSON.stringify({
    level: "error",
    message: "Redis connection error",
    error: err.message,
    timestamp: new Date().toISOString()
  }));
});

module.exports = redisClient;