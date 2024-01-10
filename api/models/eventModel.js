
const Event = {
  createEvent: async (connection, event) => {
    try {
      const [results] = await connection.execute(
        'INSERT INTO events (event_name, event_date, event_location, event_description) VALUES (?, ?, ?, ?)',
        [event.event_name, event.event_date, event.event_location, event.event_description]
      );
      return results.insertId; // Return the ID of the newly created event
    } catch (error) {
      throw error;
    }
  },
  getEventById: async (connection, eventId) => {
    try {
      const [results] = await connection.execute('SELECT * FROM events WHERE event_id = ?', [eventId]);
      return results[0]; // Return the event data
    } catch (error) {
      throw error;
    }
  },
  // Add other methods for updating, deleting, and querying events
};

module.exports = Event;
