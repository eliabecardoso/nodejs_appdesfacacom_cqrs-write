module.exports = (Sequelize, DataTypes) => {
  const ProductDetail = Sequelize.define(
    "ProductDetail",
    {
      productId: DataTypes.INTEGER,
      description: DataTypes.STRING
    },
    {
      hooks: {
        beforeValidate: function(productDetail) {
          const err = validateRequiredFields(productDetail);

          console.log(productDetail);

          if (err)
            return Promise.reject(new Error(`campo(s) ${err} inválido(s).`));
        }
      }
    }
  );



  return ProductDetail;
};

const validateRequiredFields = function(productDetail) {
  let err = [];

  if (!productDetail.description) err.push("Descrição");

  return err.length >= 1 && err.reduce((prev, curr) => prev + ", " + curr);
};
