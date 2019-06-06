const app = require("../../src/app");
const request = require("supertest");

describe("authentication", () => {
  it("shouldn't leave user to entry in authenticated routes when token is invalid", async () => {
    const response = await request(app)
        .post("");
  });
});
