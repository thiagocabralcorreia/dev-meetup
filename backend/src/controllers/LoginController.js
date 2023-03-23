const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

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

        // return res.json(userResponse);

        return jwt.sign(
          // Payload of the token contains a `user` object, which is taken from `userResponse`
          { user: userResponse },
          // The secret key used to sign the token
          "secret",
          // A callback function with an `err` and a `token` parameter
          (err, token) => {
            // If there is no error, return an object containing the signed token and the `_id` of the user
            return res.json({
              user: token,
              user_id: userResponse._id,
            });
          }
        );
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
