const Registration = require("../models/Registration");
const jwt = require("jsonwebtoken");

module.exports = {
  createRegistration(req, res) {
    jwt.verify(req.token, "secret", async (err, authData) => {
      console.log(authData);
      if (err) {
        res.sendStatus(401);
      } else {
        const { eventId } = req.params;
        const user_id = authData.user._id;

        console.log(user_id, eventId);

        const registration = await Registration.create({
          user: user_id,
          event: eventId,
        });

        console.log({ registration });

        // The populate method is a mongoose method that retrieves the associated document(s)
        // from the specified collection(s) and replaces the corresponding ObjectIds
        // in the Registration document with the actual document(s).
        await registration.populate([
          "event",
          { path: "user", select: "-password" }, // avoid password
        ]);
        // .execPopulate();

        const ownerSocket = req.connectUsers[registration.event.user];

        if (ownerSocket) {
          req.io.to(ownerSocket).emit("registration_request", registration); // Return token
        }

        return res.json(registration);
      }
    });
  },

  async getRegistration(req, res) {
    const { registration_id } = req.params;
    try {
      const registration = await Registration.findById(registration_id);

      await registration.populate([
        "event",
        { path: "user", select: "-password" }, // avoid password
      ]);
      // .execPopulate();

      return res.json(registration);
    } catch (error) {
      return res.status(400).json({ message: "Registration not found" });
    }
  },
};
