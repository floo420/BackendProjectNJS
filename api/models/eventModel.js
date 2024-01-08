// models/eventModel.js
const mongoose = require('mongoose');

// Define the Event schema
const eventSchema = new mongoose.Schema({
  eventName: String,
  eventDate: Date,
  location: String,
  // Add more fields as needed
});

// Create an Event model from the schema
const Event = mongoose.model('Event', eventSchema);

// Export the Event model
module.exports = Event;
