// Importing the Mongoose library
const mongoose = require("mongoose");

// Defining a UserSchema object with properties for firstName, lastName, password, and email
// using the mongoose.Schema() method:
const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  password: String,
  email: String,
});

// Exporting the UserSchema object as a Mongoose model named "User" using the mongoose.model() method:
module.exports = mongoose.model("User", UserSchema);
