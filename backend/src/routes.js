const express = require("express");
const multer = require("multer");

const LoginController = require("./controllers/LoginController");
const UserController = require("./controllers/UserController");
const EventController = require("./controllers/EventController");
const DashboardController = require("./controllers/DashboardController");
const RegistrationController = require("./controllers/RegistrationController");
const ApprovalController = require("./controllers/ApprovalController");
const RejectionController = require("./controllers/RejectionController");

const uploadConfig = require("./config/upload");

const routes = express.Router();
const upload = multer(uploadConfig);

// Set up a GET route for /register that responds with a welcome message
routes.get("/status", (req, res) => {
  res.send({ status: 200 });
});

// Login
routes.post("/login", LoginController.store);

// Registration
routes.post("/registration/:eventId", RegistrationController.create);
routes.get(
  "/registration/:registration_id",
  RegistrationController.getRegistration
);
routes.post(
  "/registration/:registration_id/approvals",
  ApprovalController.approval
);
routes.post(
  "/registration/:registration_id/rejections",
  RejectionController.rejection
);

// Dashboard
routes.get("/dashboard/:category", DashboardController.getAllEvents);
routes.get("/dashboard", DashboardController.getAllEvents);
routes.get("/event/:eventId", DashboardController.getEventById);

// Events
routes.post("/event", upload.single("thumbnail"), EventController.createEvent);
routes.delete("/event/:eventId", EventController.deleteEvent);

// User
routes.post("/user/register", UserController.createUser);
routes.get("/user/:userId", UserController.getUserById);
routes.get("/user", UserController.getAllUsers);

module.exports = routes;
