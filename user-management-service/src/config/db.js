const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Function to connect to MongoDB using Mongoose
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;
