// user.js
const User = {
  createUser: async (pool, user) => {
    try {
      const [results] = await pool.query(
        'INSERT INTO users (first_name, last_name, email, phone_number, birthdate) VALUES (?, ?, ?, ?, ?)',
        [user.first_name, user.last_name, user.email, user.phone_number, user.birthdate]
      );
      return results.insertId; // Return the ID of the newly created user
    } catch (error) {
      throw error;
    }
  },

  getAllUsers: async (pool) => {
    try {
      const [results] = await pool.query('SELECT * FROM users');
      return results; // Return all users
    } catch (error) {
      throw error;
    }
  },

  getUserById: async (pool, userId) => {
    try {
      const [results] = await pool.query('SELECT * FROM users WHERE user_id = ?', [userId]);
      return results[0]; // Return the user data
    } catch (error) {
      throw error;
    }
  },
  // Add other methods for updating, deleting, and querying users
};

module.exports = User;
