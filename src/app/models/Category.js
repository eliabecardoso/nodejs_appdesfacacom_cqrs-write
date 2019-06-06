module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    enable: DataTypes.BOOLEAN,
    categoryMainId: DataTypes.INTEGER
  });

  return Category;
};
