const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./config');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorMiddleware');

// Load environment variables from .env file
dotenv.config();

// Connect to the MongoDB database
connectDB();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// User-related routes
app.use('/api/users', userRoutes);

// Global error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
