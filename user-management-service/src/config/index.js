const connectDB = require('./db');
const generateToken = require('./jwt');

// Exporting the database connection and token generation functions
module.exports = {
  connectDB,
  generateToken,
};
