const routes = require("express").Router();
const auth = require("./app/middlewares/authMiddleware");

const ProductController = require("./app/controllers/ProductController");

routes.use(auth);
routes.post("/products", ProductController.store);
routes.get("/products", ProductController.detail);

module.exports = routes;
