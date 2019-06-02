const request = require("supertest");
const app = require("../../src/app");
const truncate = require("../utils/truncate");

const { User } = require("../../src/app/models");

describe("Authentication", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should receive JWT Token when autheticate with valid credentials", async () => {
    const user = await User.create({
      name: "Eliabe",
      username: "eliabehc2",
      email: "eliabe.hc@gmail.com",
      password_hash: "123321"
    });

    const response = await request(app)
      .post("/api/authenticate")
      .send({
        email: "123321",
        password_hash: "123123213"
      });

    expect(response.status).toBe(200);
  });
});
