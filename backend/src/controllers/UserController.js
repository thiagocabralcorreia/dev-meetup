const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports = {
  async createUser(req, res) {
    try {
      const { email, firstName, lastName, password } = req.body;
      const existentUser = await User.findOne({ email });

      if (!existentUser) {
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
          email,
          firstName,
          lastName,
          password: hashPassword,
        });
        return res.json(user);
      }
      return res.status(400).json({
        message: "Email already exists.",
      });
    } catch (err) {
      throw Error(`Error while Registering new user :  ${err}`);
    }
  },

  async getUserById(req, res) {
    // Extract the user ID from the request parameters
    const { userId } = req.params;

    try {
      const user = await User.findById(userId);
      return res.json(user);
    } catch (error) {
      return res.status(400).json({
        message: "User ID does not exist.",
      });
    }
  },

  async getAllUsers(req, res) {
    try {
      const users = await User.find().select("-password");
      return res.json(users);
    } catch (error) {
      return res.status(400).json({ message: "We do not have any user yet" });
    }
  },
};
