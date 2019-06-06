const routes = require("express").Router();
const auth = require("./app/middlewares/authMiddleware");

const ProductController = require("./app/controllers/ProductController");

routes.use(auth);
routes.post("/products", ProductController.store);

module.exports = routes;
