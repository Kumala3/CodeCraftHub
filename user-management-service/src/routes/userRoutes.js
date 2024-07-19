const express = require('express');
const { body } = require('express-validator');
const {
  registerUser,
  loginUser,
  changeUsername,
} = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');
const validateRequest = require('../middlewares/validationMiddleware');

const router = express.Router();

// Route to register a new user with validation
router.post(
  '/register',
  [
    body('username').not().isEmpty().withMessage('Username is required'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long'),
  ],
  validateRequest,
  registerUser
);

// Route to login a user
router.post('/login', loginUser);

// Route to change username, protected by JWT authentication
router.put('/change-username', protect, changeUsername);

module.exports = router;
