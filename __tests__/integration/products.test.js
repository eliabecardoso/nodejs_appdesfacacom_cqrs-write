const app = require("../../src/app");
const request = require("supertest");

const routePrefix = "/apiw/";

describe("production", () => {

  it("should invalided register a product without fill required data", async () => {
    const tokenValid =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJlbGlhYmUiLCJpYXQiOjE1NTk4MDk4NzEsImV4cCI6MTU1OTgxMzQ3MSwiaXNzIjoiaHR0cDovL2dvb2dsZS5jb20uYnIveGVzcSJ9.QVUJ9xSRkGGZbiAtRhziGv4tZgDWdK_ufBucNH48NN0";

    const response = await request(app)
      .post(routePrefix + "products")
      .set("authorization", tokenValid)
      .send();

    expect(response.status).toContain("Error: Campos");
    
  });
});
