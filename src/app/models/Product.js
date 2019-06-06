module.exports = (Sequelize, DataTypes) => {
  const Product = Sequelize.define("Product", {
    categoryId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    state_condition: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  });

  return Product;
};
