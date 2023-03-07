const express = require("express");

const UserController = require("./controllers/UserController");

const routes = express.Router();

routes.get("/status", (req, res) => {
  res.send({ status: 200 });
});

// Setting up a GET route for /register that responds with a welcome message
routes.get("/register", (req, res) => {
  res.send("Welcome to Register ");
});

//User
routes.post("/user/register", UserController.createUser);
routes.get("/user/:userId", UserController.getUserById);

module.exports = routes;
