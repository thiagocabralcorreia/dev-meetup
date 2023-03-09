// Import required packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");
const path = require("path");
// Create an Express app instance
const app = express();

// Define the port the server will listen to
const PORT = process.env.PORT || 8000;

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse incoming request data as JSON
app.use(express.json());

// Set environment variables based on the environment (development or production)
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Connectto MongoDB using the URI stored in the MONGO_DB_CONNECTION environment variable
try {
  mongoose.connect(process.env.MONGO_DB_SECRET, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDb connected successfully!");
} catch (error) {
  console.log(error);
}

app.use("/files", express.static(path.resolve(__dirname, "..", "files")));
app.use(routes);

// Start the server and listen for incoming requests on the specified port
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
