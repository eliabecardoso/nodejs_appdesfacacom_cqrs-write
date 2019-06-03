const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

  User.prototype.generateToken = function() {
    return jwt.sign({ id: this.id, user: this.username }, process.env.APP_SECRET, {
      expiresIn: '5m',
      issuer: "http://google.com.br"
    });
  };

  return User;
};
