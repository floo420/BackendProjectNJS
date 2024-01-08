const mysql = require('mysql2');

// Create a connection pool to handle multiple connections
const pool = mysql.createPool({
  host: '127.0.0.1',         // Your MySQL server's host
  user: 'root',   // Your MySQL username
  password: 'root', // Your MySQL password
  database: 'BackendProjectNodeJS', // Your MySQL database name
  waitForConnections: true,
  connectionLimit: 10,       // Adjust as needed
  queueLimit: 0
});

module.exports = pool.promise(); // Export the connection pool
