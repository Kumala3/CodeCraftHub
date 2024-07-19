const express = require("express")
const {
  registerUser,
  loginUser,
  changeUsername,
} = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/change-username', protect, changeUsername);

module.exports = router;
