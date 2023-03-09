const Event = require("../models/Event");

module.exports = {
  async getAllEvents(req, res) {
    try {
      const events = await Event.find({}); // Find all events

      if (events) {
        return res.json(events);
      }
    } catch (error) {
      return res.status(400).json({ message: "We do not have any event yet!" });
    }
  },

  async getEventsByCategory(req, res) {
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
};
