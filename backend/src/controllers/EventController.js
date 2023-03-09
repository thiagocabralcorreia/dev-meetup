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
      // creating a new event using the Event model
      title,
      description,
      place,
      category,
      price: parseFloat(price), // converting to a number
      user: user_id,
      thumbnail: filename,
    });

    return res.json(event); // returning the newly created event in JSON format
  },

  async getEventById(req, res) {
    const { eventId } = req.params;
    try {
      const event = await Event.findById(eventId);

      if (event) {
        return res.json(event);
      }
    } catch (error) {
      return res.status(400).json({ message: "EventId does not exist!" });
    }
  },

  async getAllEvents(req, res) {
    try {
      const events = await Event.find({}); // finding all events

      if (events) {
        return res.json(events);
      }
    } catch (error) {
      return res.status(400).json({ message: "We do not have any event yet!" });
    }
  },

  async getAllEvents(req, res) {
    const { category } = req.params;
    const query = { category } || {};

    try {
      const events = await Event.find(query);

      if (events) {
        return res.json(events);
      }
    } catch (error) {
      return res.status(400).json({ message: "We do not have any events yet" });
    }
  },

  async deleteEvent(req, res) {
    const { eventId } = req.params;

    try {
      await Event.findByIdAndDelete(eventId);
      return res.status(204).send(); // To indicate that the request was successful but there is no response body
    } catch (error) {
      return res
        .status(400)
        .json({ message: "We do not have any event with the ID yet" });
    }
  },
};
