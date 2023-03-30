const express = require("express"); // express is a Node.js web application framework
const mongoose = require("mongoose"); // a MongoDB object modeling tool designed to work in an asynchronous environment
const cors = require("cors"); // a middleware that allows cross-origin resource sharing
const routes = require("./routes");
const path = require("path");
const http = require("http"); // Node.js built-in HTTP module
const PORT = process.env.PORT || 8000;
const app = express();
const server = http.Server(app);

const io = require("socket.io")(server, {
  // Set up Socket.io to work with the HTTP server instance
  cors: {
    origin: "*",
    methods: ["GET", "POST", "DELETE"],
  },
});

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

try {
  mongoose.connect(process.env.MONGO_DB_SECRET, {
    useNewUrlParser: true, // Set options for the MongoDB connection
    useUnifiedTopology: true,
  });
  console.log("MongoDb connected successfully!");
} catch (error) {
  console.log(error.message);
}

const connectUsers = {}; // an object to hold the socket IDs of connected users

// Listen for socket connection events
io.on("connection", (socket) => {
  const { user } = socket.handshake.query; // Extract the user data from the socket request

  connectUsers[user] = socket.id; // Store the user data in the connectUsers object
});

// Middleware to add the io and connectUsers objects to the request object
// app.use()
app.use((req, res, next) => {
  req.io = io;
  req.connectUsers = connectUsers;
  return next(); // Call the next middleware function in the pipeline
});

app.use(cors()); // Middleware to enable cross-origin resource sharing
app.use(express.json()); // Middleware to parse incoming request bodies
app.use("/files", express.static(path.resolve(__dirname, "..", "files"))); // Middleware to serve static files
app.use(routes); // Middleware to handle requests for the routes

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
