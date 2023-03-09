const express = require("express");
const multer = require("multer");

const LoginController = require("./controllers/LoginController");
const UserController = require("./controllers/UserController");
const EventController = require("./controllers/EventController");
const DashboardController = require("./controllers/DashboardController");
const uploadConfig = require("./config/upload");

const routes = express.Router();
const upload = multer(uploadConfig);

// Set up a GET route for /register that responds with a welcome message
routes.get("/status", (req, res) => {
  res.send({ status: 200 });
});

// Login
routes.post("/login", LoginController.store);

//Dashboard
routes.get("/dashboard", DashboardController.getAllEvents);
routes.get("/dashboard/:category", DashboardController.getEventsByCategory);

//Events
routes.get("/event/:eventId", EventController.getEventById);
routes.post("/event", upload.single("thumbnail"), EventController.createEvent);
routes.delete("/event/:eventId", EventController.deleteEvent);

//User
routes.post("/user/register", UserController.createUser);
routes.get("/user/:userId", UserController.getUserById);

module.exports = routes;
