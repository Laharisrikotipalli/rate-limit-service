const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
require("dotenv").config();
const express = require("express");
const clientRoutes = require("./routes/client.routes");
const rateRoutes = require("./routes/ratelimit.routes");

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/v1", clientRoutes);
app.use("/api/v1", rateRoutes);
apis: ["./src/routes/**/*.js"],
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

module.exports = app;