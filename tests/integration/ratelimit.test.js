const request = require("supertest");
const app = require("../../src/app");

describe("Basic API Integration", () => {

  test("health endpoint works", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
  });

  test("invalid client registration returns 400", async () => {
    const res = await request(app)
      .post("/api/v1/clients")
      .send({}); // missing required fields

    expect(res.statusCode).toBe(400);
  });

});