db = db.getSiblingDB("ratelimitdb");

db.clients.insertMany([
  {
    clientId: "clientA",
    hashedApiKey: "seeded_key_A",
    maxRequests: 5,
    windowSeconds: 10,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    clientId: "clientB",
    hashedApiKey: "seeded_key_B",
    maxRequests: 10,
    windowSeconds: 60,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    clientId: "clientC",
    hashedApiKey: "seeded_key_C",
    maxRequests: 100,
    windowSeconds: 60,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);