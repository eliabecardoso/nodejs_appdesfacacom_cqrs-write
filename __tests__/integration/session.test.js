const request = require("supertest");

const app = require("../../src/app");
const truncate = require("../utils/truncate");
const factory = require("../factories");

describe("Authentication", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should verify if user are not registered", async () => {
    const user = await factory.create("User");

    const response = await request(app)
      .post("/api/authenticate")
      .send({
        email: "email@user.com",
        password: user.password
      });

    expect(response.body.message).toBe("Usuário não encontrado");
  });

  it("should valid user password", async () => {
    const user = await factory.create("User");

    const response = await request(app)
      .post("/api/authenticate")
      .send({
        email: user.email,
        password: "11111"
      });

    expect(response.body.message).toBe("Senha inválida");
  });

  it("should receive JWT Token", async () => {
    const user = await factory.create("User");

    const response = await request(app)
      .post("/api/authenticate")
      .send({
        email: user.email,
        password: user.password
      });

    expect(response.body).toHaveProperty("token");
  });

  it("should authenticate with valid credentials", async () => {
    const user = await factory.create("User");

    const response = await request(app)
      .post("/api/authenticate")
      .send({
        email: user.email,
        password: user.password
      });

    expect(response.status).toBe(200);
  });
});
