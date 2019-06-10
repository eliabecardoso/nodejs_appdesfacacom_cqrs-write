const app = require("../../src/app");
const request = require("supertest");
const routePrefix = "/apiw/";

// JWT => header.payload.signature

describe("Authentication", () => {
  it("shouldn't leave iser tp entry in authenticated routes when token is null", async () => {
    const response = await request(app)
      .post(routePrefix + "products")
      .send();

    expect(response.body.message).toBe("Usuário sem token");
  });

  it("shouldn't leave iser tp entry in authenticated routes when token is only 'Bearer'", async () => {
    const response = await request(app)
      .post(routePrefix + "products")
      .set("Authorization", "Bearer")
      .send();

    expect(response.body.message).toBe("jwt must be provided");
  });

  it("should received message 'invalid token' for incorrect Token Header", async () => {
    const tokenInvalid =
      "Bearer zyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJlbGlhYmUiLCJpYXQiOjE1NTk4MDY0NjMsImV4cCI6MTY1NDQ3OTI2MywiaXNzIjoiaHR0cDovL2dvb2dsZS5jb20uYnIveGVzcSJ9.ffiG1bdYfuYfQqYQMY9RqIk9S7QbTTPE5tCS5m7MWKA";

    const response = await request(app)
      .post(routePrefix + "products")
      .set("Authorization", tokenInvalid)
      .send();

    expect(response.body.message).toBe("invalid token");
  });

  it("should received message 'Unexpected token 'X' in JSON at position 'Z'' for incorrect Token Header", async () => {
    const tokenJsonUnexpected =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.zyJpZCI6MSwidXNlcm5hbWUiOiJlbGlhYmUiLCJpYXQiOjE1NTk4MDY0NjMsImV4cCI6MTY1NDQ3OTI2MywiaXNzIjoiaHR0cDovL2dvb2dsZS5jb20uYnIveGVzcSJ9.ffiG1bdYfuYfQqYQMY9RqIk9S7QbTTPE5tCS5m7MWKA";

    const response = await request(app)
      .post(routePrefix + "products")
      .set("Authorization", tokenJsonUnexpected)
      .send();

    expect(response.body.message).toContain("Unexpected token");
  });

  it("should received message 'invalid signature' if sign was different secret key of token", async () => {
    const tokenSignInvalid =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJlbGlhYmUiLCJpYXQiOjE1NTk4MDY0NjMsImV4cCI6MTY1NDQ3OTI2MywiaXNzIjoiaHR0cDovL2dvb2dsZS5jb20uYnIveGVzcSJ9.zfiG1bdYfuYfQqYQMY9RqIk9S7QbTTPE5tCS5m7MWKA";

    const response = await request(app)
      .post(routePrefix + "products")
      .set("Authorization", tokenSignInvalid)
      .send();

    expect(response.body.message).toBe("invalid signature");
  });

  it("should leave user to entry in authenticated routes when token is valid", async () => {
    const tokenValid =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiZWxpYWJlIiwiaWF0IjoxNTYwMTQ4MjA4LCJleHAiOjE3NDk0OTM4MDgsImlzcyI6Imh0dHA6Ly9nb29nbGUuY29tLmJyL3hlc3EifQ.qOw8Qcam0Bh_zGG7bXpnqNTlf4xLU81z5HELVtga340";

    const response = await request(app)
      .get(routePrefix + "products")
      .set("Authorization", tokenValid)
      .send();

    expect(response.status).toBe(200);
  });
});
