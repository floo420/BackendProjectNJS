// controllers/eventController.js
const Event = require('../models/eventModel');
const sequelize = require('./dbConfig');
// Create a new event
exports.createEvent = async (req, res) => {
  try {
    const newEvent = await Event.create(req.body);
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update an existing event
exports.updateEvent = async (req, res) => {
  const { eventId } = req.params;
  try {
    const event = await Event.findByPk(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    await event.update(req.body);
    res.status(200).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an event
exports.deleteEvent = async (req, res) => {
  const { eventId } = req.params;
  try {
    const event = await Event.findByPk(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    await event.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get a list of all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    res.status(200).json(events);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.searchEventsByName = async (req, res) => {
  const { eventName } = req.query;
  try {
    const events = await Event.findAll({
      where: {
        event_name: eventName,
      },
    });
    res.status(200).json(events);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Implement other controller functions as needed
