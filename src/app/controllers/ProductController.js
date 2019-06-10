const { sequelize, Product, ProductDetail } = require("../models");
const ProductService = require("../services/ProductService");

class ProductController {
  async store(req, res) {
    const { newProduct } = req.body;

    if (!newProduct) return res.status(400).json("Error: Produto obrigatório.");

    let error = ProductService.validateSave(newProduct);
    if (error)
      return res.status(400).json(`Error: campo(s) ${error} inválido(s)`);

    let tran = await sequelize.transaction();

    const product = await Product.create(
      { userId: req.userId, ...newProduct },
      { tran }
    );

    const productDetail = await ProductDetail.create(
      { productId: product.id, ...newProduct.productDetails },
      { tran }
    );

    await tran.rollback();

    return res.status(200).send();
  }

  async detail(req, res) {
    return res.status(200).send();
  }
}

module.exports = new ProductController();
