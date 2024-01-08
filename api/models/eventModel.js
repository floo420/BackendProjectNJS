const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  event_name: {
    type: String,
    required: true,
  },
  event_date: {
    type: Date,
    required: true,
  },
  event_location: String,
  event_description: String,
});

module.exports = mongoose.model('Event', eventSchema);
