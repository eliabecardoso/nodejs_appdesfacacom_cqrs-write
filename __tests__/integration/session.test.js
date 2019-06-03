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
      .post("/api/sessions")
      .send({
        email: "email@user.com",
        password: user.password
      });

    expect(response.body.message).toBe("Usuário não encontrado");
  });

  it("should valid user password", async () => {
    const user = await factory.create("User");

    const response = await request(app)
      .post("/api/sessions")
      .send({
        email: user.email,
        password: "11111"
      });

    expect(response.body.message).toBe("Senha inválida");
  });

  it("should receive JWT Token", async () => {
    const user = await factory.create("User");

    const response = await request(app)
      .post("/api/sessions")
      .send({
        email: user.email,
        password: user.password
      });

    expect(response.body).toHaveProperty("token");
  });

  it("should authenticate with valid credentials", async () => {
    const user = await factory.create("User");

    const response = await request(app)
      .post("/api/sessions")
      .send({
        email: user.email,
        password: user.password
      });

    expect(response.status).toBe(200);
  });

  // it("should valid user are authenticate through token", async () => {

  // });

  it("should logout user and your credentials", async () => {
    const user = await factory.create("User");

    const responseAuth = await request(app)
      .post("/api/sessions")
      .send({
        email: user.email,
        password: user.password
      });

    const token = "Bearer " + responseAuth.body.token;

    const responseLogout = await request(app)
      .post("/api/sessions/logout")
      .send()
      .set("authorization", token);

    expect(responseLogout.status).toBe(200);
  });
});
