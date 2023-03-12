const Event = require("../models/Event");
const User = require("../models/User");

module.exports = {
  async createEvent(req, res) {
    const { title, description, price, place, category } = req.body;
    const { user_id } = req.headers;
    const { filename } = req.file;

    const user = await User.findById(user_id);

    if (!user) {
      return res.status(400).json({ message: "User does not exist!" });
    }

    const event = await Event.create({
      // Create a new event using the Event model
      title,
      description,
      place,
      category,
      price: parseFloat(price), // Convert to a number
      user: user_id,
      thumbnail: filename,
    });

    return res.json(event); // Return the newly created event in JSON format
  },

  async deleteEvent(req, res) {
    const { eventId } = req.params;

    try {
      await Event.findByIdAndDelete(eventId);
      return res.status(204).send(); // 204 indicate that the request was successful but there is no response body
    } catch (error) {
      return res
        .status(400)
        .json({ message: "We do not have any event with the ID yet" });
    }
  },
};
