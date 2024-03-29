const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

module.exports = {
  async createUser(req, res) {
    try {
      const { email, firstName, lastName, password } = req.body;
      const existentUser = await User.findOne({ email });

      if (!existentUser) {
        const hashPassword = await bcrypt.hash(password, 10);
        const userResponse = await User.create({
          email,
          firstName,
          lastName,
          password: hashPassword,
        });

        return jwt.sign({ user: userResponse }, "secret", (err, token) => {
          return res.json({
            user: token,
            user_id: userResponse._id,
          });
        });
      } else {
        return res.status(400).json({
          message: "email already exist!  do you want to login instead? ",
        });
      }
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

  async deleteUser(req, res) {
    const { userId } = req.params;

    try {
      await User.findByIdAndDelete(userId);
      return res.status(204).send(); // 204 indicate that the request was successful but there is no response body
    } catch (error) {
      return res
        .status(400)
        .json({ message: "We do not have any user with the ID yet" });
    }
  },
};
