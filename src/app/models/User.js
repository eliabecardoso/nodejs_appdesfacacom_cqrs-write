const bcrypt = require("bcrypt");
const { promisify } = require("util");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password_hash: DataTypes.STRING,
      password: DataTypes.VIRTUAL
    },
    {
      hooks: {
        beforeSave: async user => {
          if (user.password)
            user.password_hash = await bcrypt.hash(
              user.password,
              Number(process.env.CRYPT_ROUNDS)
            );
        }
      }
    }
  );

  User.prototype.checkPassword = async function(password) {
    return bcrypt.compare(password, this.password_hash);
  };

  return User;
};
