const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Rate Limiting Microservice API",
      version: "1.0.0",
      description: "API documentation for rate limiting service",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.js"], // path to route files
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;