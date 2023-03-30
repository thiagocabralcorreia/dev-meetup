const Registration = require("../models/Registration");
const jwt = require("jsonwebtoken");

module.exports = {
  approval(req, res) {
    jwt.verify(req.token, "secret", async (err, authData) => {
      if (err) {
        res.sendStatus(401);
      } else {
        const { registration_id } = req.params;

        try {
          const registration = await Registration.findById(registration_id);

          if (registration) {
            registration.approved = true; // Set the "approved" property of the registration to true
            await registration.save(); // / Save the updated registration to the database

            return res.json(registration);
          }
        } catch (error) {
          return res.status(400).json(error);
        }
      }
    });
  },
};
