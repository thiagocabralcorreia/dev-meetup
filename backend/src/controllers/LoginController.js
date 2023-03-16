const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports = {
  async store(req, res) {
    try {
      const { email, password } = req.body;

      // Check if either email or password is missing
      if (!email || !password) {
        // Industry best practice
        return res.status(200).json({ message: "Required field missing!" });
      }

      // Find a user in the database with the given email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(200).json({
          message: "User not found!",
        });
      }

      // Check if a user was found and if the password matches the hashed password in the database
      if (user && (await bcrypt.compare(password, user.password))) {
        // compare(data: string | Buffer, encrypted: string): Promise<boolean>

        // Create a userResponse object with the user's information
        const userResponse = {
          _id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        };
        return res.json(userResponse);
      } else {
        return res
          .status(200)
          .json({ message: "Email and password do not match." });
      }
    } catch (error) {
      throw Error(`Error while Authenticating a User ${error}`);
    }
  },
};
