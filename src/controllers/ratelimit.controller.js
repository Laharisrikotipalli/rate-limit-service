const Client = require("../models/client.model");
const { checkRateLimit } = require("../services/tokenBucket.service");

exports.checkLimit = async (req, res) => {
  try {
    const { clientId, path } = req.body;

    if (!clientId || !path) {
      return res.status(400).json({
        message: "Invalid request body"
      });
    }

    const client = await Client.findOne({ clientId });

    if (!client) {
      return res.status(404).json({
        message: "Client not found"
      });
    }

    const result = await checkRateLimit(
      clientId,
      path,
      client.maxRequests,
      client.windowSeconds
    );

    if (result.allowed) {
      return res.status(200).json(result);
    }

    res.set("Retry-After", result.retryAfter);
    return res.status(429).json(result);

  } catch (err) {
    res.status(500).json({
      message: "Internal server error"
    });
  }
};