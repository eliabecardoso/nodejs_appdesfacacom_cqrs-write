const { Product } = require("../models");

class ProductController {
  async store(req, res) {
    const { newProduct, newProductDetails } = req.body;

    if (!newProduct || !newProductDetails)
      return res.status(400).json("Error: Produto obrigatório.");

    let errorMsg;
    const product = await Product.create({ userId: req.userId, ...newProduct })
      .then(product => product)
      .catch(err => {
        errorMsg = err && err.toString();
      });

    if (errorMsg) return res.status(400).json(errorMsg);

    const ok = await product.setProductDetails({});
    console.log(ok);

    return res.status(200).send();
  }

  async detail(req, res) {
    return res.status(200).send();
  }
}

module.exports = new ProductController();
