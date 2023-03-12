const Registration = require("../models/Registration");

module.exports = {
  async approval(req, res) {
    const { registration_id } = req.params;
    try {
      const registration = await Registration.findById(registration_id);

      registration.approved = true; // Set the "approved" property of the registration to true

      await registration.save(); // / Save the updated registration to the database

      return res.json(registration);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
};
