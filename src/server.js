require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
const redisClient = require("./config/redis");
const seedDatabase = require("./config/seed");

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    await redisClient.connect();
    await seedDatabase();

    app.listen(PORT, () => {
      console.log(JSON.stringify({
        level: "info",
        message: "Server started",
        port: PORT,
        timestamp: new Date().toISOString()
      }));
    });

  } catch (err) {
    console.error(JSON.stringify({
      level: "error",
      message: "Server startup failed",
      error: err.message,
      timestamp: new Date().toISOString()
    }));
    process.exit(1);
  }
};

startServer();