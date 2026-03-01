require("dotenv").config();
const express = require("express");
const clientRoutes = require("./routes/client.routes");
const rateRoutes = require("./routes/ratelimit.routes");

const app = express();

app.use(express.json());

app.use("/api/v1", clientRoutes);
app.use("/api/v1", rateRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

module.exports = app;