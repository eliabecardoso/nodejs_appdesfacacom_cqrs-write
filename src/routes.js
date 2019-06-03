const routes = require("express").Router();
const auth = require("./app/middlewares/authMiddleware");

const SessionController = require("./app/controllers/SessionController");

routes.post("/sessions", SessionController.authenticate);

routes.use(auth);
routes.post("/sessions/logout", SessionController.logout);

module.exports = routes;
