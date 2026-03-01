const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    clientId: { type: String, unique: true, required: true },
    hashedApiKey: { type: String, required: true },
    maxRequests: { type: Number, required: true },
    windowSeconds: { type: Number, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Client", clientSchema);