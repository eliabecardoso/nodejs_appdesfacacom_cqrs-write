class ProductService {
  validateSave(product) {
    let err = [];

    if (!product.categoryId) err = ["Usuário"];
    if (!product.categoryId) err = ["Categoria", ...err];
    if (!product.name) err = ["Nome", ...err];
    if (!product.stateCondition) err = ["Condição", ...err];
    if (!product.quantity) err = ["Quantidade", ...err];
    if (!product.productDetails || !product.productDetails.description)
      err = ["Descrição", ...err];

    return err.length >= 1 && err.reduce((prev, curr) => prev + ", " + curr);
  }
}

module.exports = new ProductService();
