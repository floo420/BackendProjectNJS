const mysql = require('mysql2/promise');

// Create a connection to the MySQL server
const pool = mysql.createConnection({
  host: '127.0.0.1', 
  user: 'root',      
  password: 'root',  
  database: 'BackendProjectNodeJS', 
  port: '8889',
  connectionLimit: 10,
});

module.exports = pool;

// Close the MySQL connection when done
// connection.end();
