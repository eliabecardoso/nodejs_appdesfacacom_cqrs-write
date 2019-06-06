const { Product } = require("../models");

class ProductController {
  async store(req, res) {
    console.log(req.header);
    return res.status(200).send();
  }
}
