const bcrypt = require("bcrypt");
const Client = require("../models/client.model");

exports.registerClient = async (req, res) => {
  try {
    const { clientId, apiKey, maxRequests, windowSeconds } = req.body;

    if (!clientId || !apiKey) {
      return res.status(400).json({
        message: "clientId and apiKey are required"
      });
    }

    const exists = await Client.findOne({ clientId });

    if (exists) {
      return res.status(409).json({
        message: "Client already exists"
      });
    }

    const hashedApiKey = await bcrypt.hash(apiKey, 10);

    const client = await Client.create({
      clientId,
      hashedApiKey,
      maxRequests:
        maxRequests ||
        process.env.DEFAULT_RATE_LIMIT_MAX_REQUESTS,
      windowSeconds:
        windowSeconds ||
        process.env.DEFAULT_RATE_LIMIT_WINDOW_SECONDS
    });

    res.status(201).json({
      clientId: client.clientId,
      maxRequests: client.maxRequests,
      windowSeconds: client.windowSeconds
    });

  } catch (err) {
    res.status(500).json({
      message: "Internal server error"
    });
  }
};