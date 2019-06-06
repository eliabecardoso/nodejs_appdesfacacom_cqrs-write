const { Product } = require("../models");

class ProductController {
  async store(req, res) {
    return res.status(200).send();
  }

  async index(req, res) {
    return res.status(200).send();
  }
}

module.exports = new ProductController();
