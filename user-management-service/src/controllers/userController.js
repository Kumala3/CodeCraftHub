const User = require('../models/User');
const generateToken = require('../config/jwt');

// Controller to register a new user
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

// Controller to login a user
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

// Controller to change the username of a user
const changeUsername = async (req, res) => {
  const { newUsername } = req.body;
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const usernameExists = await User.findOne({ username: newUsername });

  if (usernameExists) {
    return res.status(400).json({ message: 'Username already taken' });
  }

  user.username = newUsername;
  await user.save();

  res.json({
    _id: user._id,
    username: user.username,
    message: 'Username updated successfully',
  });
};

module.exports = {
  registerUser,
  loginUser,
  changeUsername,
};
