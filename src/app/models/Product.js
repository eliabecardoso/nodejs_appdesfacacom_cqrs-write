module.exports = (Sequelize, DataTypes) => {
  const Product = Sequelize.define(
    "Product",
    {
      userId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      stateCondition: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER
    },
    {
      hooks: {
        beforeValidate(product, options) {
          const err = validateRequiredFields(product);
          // console.log(product);
          if (err)
            return Promise.reject(new Error(`campo(s) ${err} inválido(s).`));
        }
      }
    }
  );

  Product.associate = function(models) {
    Product.hasOne(models.ProductDetail, { as: "productDetails" });
  };

  return Product;
};

const validateRequiredFields = function(product) {
  let err = [];

  if (!product.userId) err.push("Usuário");
  if (!product.categoryId) err.push("Categoria");
  if (!product.name) err.push("Nome");
  if (!product.stateCondition) err.push("Condição");
  if (!product.quantity) err.push("Quantidade");
  // if (!product.detail || !product.detail.description) err.push("Descrição");

  return err.length >= 1 && err.reduce((prev, curr) => prev + ", " + curr);
};
