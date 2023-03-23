const Event = require("../models/Event");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

module.exports = {
  createEvent(req, res) {
    jwt.verify(req.token, "secret", async (err, authData) => {
      if (err) {
        res.statusCode(401);
      } else {
        const { title, description, price, place, date, category } = req.body;
        const { filename } = req.file;

        const user = await User.findById(authData.user._id);

        if (!user) {
          return res.status(400).json({ message: "User does not exist!" });
        }

        try {
          const event = await Event.create({
            // Create a new event using the Event model
            title,
            description,
            place,
            date,
            category,
            price: parseFloat(price), // Convert to a number
            user: authData.user._id,
            thumbnail: filename,
          });

          return res.json(event);
        } catch (error) {
          return res.status(400).json({ message: error });
        }
      }
    });
  },

  async deleteEvent(req, res) {
    jwt.verify(req.token, "secret", async (err) => {
      if (err) {
        res.statusCode(401);
      } else {
        const { eventId } = req.params;
        try {
          await Event.findByIdAndDelete(eventId);
          return res.status(204).send();
        } catch (error) {
          return res
            .status(400)
            .json({ message: "We do have any event with the ID" });
        }
      }
    });
  },
};
