require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

module.exports = {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT || "postgres",
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  storage: "./__tests__/database.sqlite",
  // operatorsAliases: false,
  logging: false,
  define: {
    timestamps: true,
  }
};
