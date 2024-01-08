const Event = require('../models/eventModel');

// Create a new event
exports.createEvent = (req, res) => {
  const newEvent = new Event(req.body);
  if (!newEvent.event_name || !newEvent.event_date) {
    return res.status(400).json({ error: 'Event name and date are required fields' });
  }

  newEvent.save((err, event) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(201).json(event);
    }
  });
};

// Update an existing event
exports.updateEvent = (req, res) => {
  Event.findByIdAndUpdate(req.params.eventId, req.body, { new: true }, (err, event) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(event);
    }
  });
};

// Delete an event
exports.deleteEvent = (req, res) => {
  Event.findByIdAndRemove(req.params.eventId, (err, event) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(204).send();
    }
  });
};

// Get a list of all events
exports.getAllEvents = (req, res) => {
  Event.find({}, (err, events) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(events);
    }
  });
};

exports.searchEventsByName = (req, res) => {
  const { eventName } = req.query;

  Event.find({ event_name: eventName }, (err, events) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(events);
    }
  });
};

// Implement other controller functions as needed
