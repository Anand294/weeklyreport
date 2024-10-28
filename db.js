import fs from 'fs';
import pkg from 'pg'; // Import the pg module as a whole
const { Pool } = pkg; // Destructure Pool from the imported module

// Create a new Pool instance
const pool = new Pool({
  user: "avnadmin",
  host: "",
  database: "defaultdb",
  password: "",
  port: 24531,
  ssl: {
    rejectUnauthorized: true, // Enable verification of server certificate
    //ca: fs.readFileSync('C:/Users/anand.kumar1/Downloads/ca.pem').toString(), // Path to the CA certificate file
  },
});

// Export the pool using ES6 syntax
export default pool;
