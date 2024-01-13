const pool = require('../../dbConfig'); 

const Event = {
  createEvent: async (pool, event) => {
    try {
      const [results] = await pool.query(
        'INSERT INTO events (event_name, event_date, event_location, event_description) VALUES (?, ?, ?, ?)',
        [event.event_name, event.event_date, event.event_location, event.event_description]
      );
      return results.insertId; // Return the ID of the newly created event
    } catch (error) {
      throw error;
    }
  },
  getEventById: async (pool, eventId) => {
    try {
      const [results] = await pool.query('SELECT * FROM events WHERE event_id = ?', [eventId]);
      return results[0]; // Return the event data
    } catch (error) {
      throw error;
    }
  },

  getAllEvents: async (pool) => {
    try {
      const [results] = await pool.query('SELECT * FROM events');
      return results; // Return all events
    } catch (error) {
      throw error;
    }
  },

  updateEvent: async (pool, eventId, eventData) => {
    try {
      const {
        event_name,
        event_date,
        event_location,
        event_description,
      } = eventData;

      const query = `
        UPDATE events
        SET
          event_name = ?,
          event_date = ?,
          event_location = ?,
          event_description = ?
        WHERE event_id = ?
      `;

      await pool.query(query, [
        event_name,
        event_date,
        event_location,
        event_description,
        eventId,
      ]);

      return eventId; // Return the ID of the updated event
    } catch (error) {
      throw error;
    }
  },

  deleteEvent: async (pool, eventId) => {
    try {
      const [results] = await pool.query('DELETE FROM events WHERE event_id = ?', [eventId]);
      return results.affectedRows > 0; // Return true if a row was affected (event deleted)

    } catch (error) {
      throw error;
    }
  },

  findByPk: async (eventId) => {
    try {
      const [results] = await pool.query('SELECT * FROM events WHERE event_id = ?', [eventId]);
      return results[0]; // Return the event data or null if not found
    } catch (error) {
      throw error;
    }
  },

};

module.exports = Event;
