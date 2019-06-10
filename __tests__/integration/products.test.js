const request = require("supertest");

const app = require("../../src/app");
const factory = require("../factories");

const routePrefix = "/apiw/";
const tokenValid =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiZWxpYWJlIiwiaWF0IjoxNTYwMTQ4MjA4LCJleHAiOjE3NDk0OTM4MDgsImlzcyI6Imh0dHA6Ly9nb29nbGUuY29tLmJyL3hlc3EifQ.qOw8Qcam0Bh_zGG7bXpnqNTlf4xLU81z5HELVtga340";

describe("Products", () => {
  it("should invalided register a product without fill required data", async () => {
    const response = await request(app)
      .post(routePrefix + "products")
      .set("Authorization", tokenValid)
      .send({ newProduct: {}, newProductDetails: {} });

    expect(response.body).toContain("Error: campo(s)");
  });

  it("should valid register a product fill required data", async () => {
    const category = await factory.create("Category");

    const newProduct = {
      categoryId: category.id,
      name: "Produto exemplo",
      stateCondition: 1,
      quantity: 3
    };
    const newProductDetails = {
      description: "XESQ"
    };

    const response = await request(app)
      .post(routePrefix + "products")
      .set("Authorization", tokenValid)
      .send({ newProduct, newProductDetails });

    expect(response.body).toBe(200);
  });
});
