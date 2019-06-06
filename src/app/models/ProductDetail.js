module.exports = (Sequelize, DataTypes) => {
  const ProductDetail = Sequelize.define("ProductDetail", {
    productId: DataTypes.INTEGER,
    description: DataTypes.STRING
  });

  return ProductDetail;
};
