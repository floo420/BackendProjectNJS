const mysql = require('mysql2');

// Create a connection to the MySQL server
const connection = mysql.createConnection({
  host: '127.0.0.1', 
  user: 'root',      
  password: 'root',  
  database: 'BackendProjectNodeJS', 
  port: '8889'      
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Perform MySQL queries here

// Close the MySQL connection when done
// connection.end();
