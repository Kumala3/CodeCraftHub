const User = require('../models/User');
const generateToken = require('../config/jwt');

const registerUser = async (req, res) => {
  const { username, password } = req.body;

  const userExists = await User.findOne({ username });

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = new User({
    username,
    password,
  });

  await user.save();

  const token = generateToken(user);

  res.status(201).json({
    _id: user._id,
    username: user.username,
    token,
  });
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user);
    res.json({
      _id: user._id,
      username: user.username,
      token,
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
