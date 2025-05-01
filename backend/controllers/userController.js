const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Signup Controller
const signupUser = async (req, res) => {
  const { username, email, password, rePassword } = req.body;

  if (password !== rePassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    const userExists = await User.findOne({ $or: [{ username }, { email }] });
    if (userExists) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    const user = await User.create({ username, email, password });
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login Controller
const loginUser = async (req, res) => {
  const { identifier, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid username/email or password' });
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { signupUser, loginUser };