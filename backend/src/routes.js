const express = require("express");
const multer = require("multer");
const verifyToken = require("./config/verifyToken");

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
routes.post(
  "/registration/:eventId",
  verifyToken,
  RegistrationController.createRegistration
);
routes.get(
  "/registration/:registration_id",
  RegistrationController.getRegistration
);
routes.get(
  "/registration",
  verifyToken,
  RegistrationController.getMyRegistrations
);
routes.post(
  "/registration/:registration_id/approvals",
  verifyToken,
  ApprovalController.approval
);
routes.post(
  "/registration/:registration_id/rejections",
  verifyToken,
  RejectionController.rejection
);

// Dashboard
routes.get(
  "/dashboard/:category",
  verifyToken,
  DashboardController.getAllEvents
);
routes.get("/dashboard", verifyToken, DashboardController.getAllEvents);
routes.get("/event/:eventId", verifyToken, DashboardController.getEventById);
routes.get("/user/events", verifyToken, DashboardController.getEventsByUserId);

// Events
routes.post(
  "/event",
  verifyToken,
  upload.single("thumbnail"),
  EventController.createEvent
);
routes.put("/event/:eventId", verifyToken, EventController.editEvent);
routes.delete("/event/:eventId", verifyToken, EventController.deleteEvent);

// User
routes.post("/user/register", UserController.createUser);
routes.get("/user/:userId", UserController.getUserById);
routes.get("/user", UserController.getAllUsers);
routes.delete("/user/:userId", UserController.deleteUser);

module.exports = routes;
