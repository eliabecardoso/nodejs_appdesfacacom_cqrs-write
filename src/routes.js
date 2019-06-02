const routes = require("express").Router();

 const SessionController = require("./app/controllers/SessionController");

routes.post("/authenticate", SessionController.authenticate);

// routes.use(auth());

module.exports = routes;
