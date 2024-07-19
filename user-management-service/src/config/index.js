const connectDB = require('./db');
const generateToken = require('./jwt');

module.exports = {
  connectDB,
  generateToken,
};
