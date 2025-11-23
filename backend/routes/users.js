const express = require('express');
const router = express.Router();
const { auth } = require('../utils/authMiddleware');
const User = require('../models/User');

router.get('/me', auth, async (req, res) => {
  res.json(req.user);
});

router.put('/me', auth, async (req, res) => {
  const updates = (({ name, bio, location, phone }) => ({ name, bio, location, phone }))(req.body);
  try {
    const user = await User.findByIdAndUpdate(req.user._id, { $set: updates }, { new: true }).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
