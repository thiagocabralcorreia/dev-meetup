// Importing required packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserController = require("./controllers/UserController");

// Creating an Express app instance
const app = express();

// Defining the port the server will listen to
const PORT = process.env.PORT || 8000;

// Enabling Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parsing incoming request data as JSON
app.use(express.json());

// Setting environment variables based on the environment (development or production)
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Setting up a route for the root URL
app.get("/", (req, res) => {
  res.send("Hello from Node.js app");
});

// Setting up a GET route for /register that responds with a welcome message
app.get("/register", (req, res) => {
  res.send("Welcome to Register ");
});

// Setting up a POST route for /register that calls the store method in the UserController
app.post("/register", UserController.store);

// Connecting to MongoDB using the URI stored in the MONGO_DB_CONNECTION environment variable
try {
  mongoose.connect(process.env.MONGO_DB_SECRET, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDb connected successfully!");
} catch (error) {
  console.log(error);
}

// Starting the server and listening for incoming requests on the specified port
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
