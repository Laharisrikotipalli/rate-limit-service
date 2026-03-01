const Client = require("../models/client.model");

const seedDatabase = async () => {
  const count = await Client.countDocuments();

  if (count === 0) {
    console.log("Seeding default clients...");

    await Client.insertMany([
      {
        clientId: "clientA",
        hashedApiKey: "seeded_key_A",
        maxRequests: 5,
        windowSeconds: 10
      },
      {
        clientId: "clientB",
        hashedApiKey: "seeded_key_B",
        maxRequests: 10,
        windowSeconds: 60
      },
      {
        clientId: "clientC",
        hashedApiKey: "seeded_key_C",
        maxRequests: 100,
        windowSeconds: 60
      }
    ]);

    console.log("Seeding completed.");
  } else {
    console.log("Clients already exist. Skipping seed.");
  }
};

module.exports = seedDatabase;