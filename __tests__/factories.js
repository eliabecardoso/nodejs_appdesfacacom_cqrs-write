const { factory } = require("factory-girl");
const { Category, Product, ProductDetail } = require("../src/app/models");
const faker = require("faker");

factory.define("Category", Category, {
  name: faker.commerce.department(),
  description: faker.commerce.productAdjective(),
  enable: 1,
  categoryMainId: null
});

factory.define("Product", Product, {
  categoryId: 1,
  name: faker.commerce.productName(),
  state_condition: Math.floor(Math.random() * 2) + 1,
  quantity: Math.floor(Math.random() * 10) + 1
});

factory.define("ProductDetail", ProductDetail, {
  productId: 1,
  description:
    faker.commerce.product() +
    " " +
    faker.commerce.productMaterial() +
    " " +
    faker.commerce.productAdjective()
});

module.exports = factory;
