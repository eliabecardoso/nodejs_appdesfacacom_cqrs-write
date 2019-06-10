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
      hooks: {}
    }
  );

  Product.associate = function(models) {
    Product.hasOne(models.ProductDetail, { as: "productDetails" });
  };

  return Product;
};
