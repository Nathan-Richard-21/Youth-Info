const express = require('express');
const router = express.Router();
const { auth, isAdmin } = require('../utils/authMiddleware');
const User = require('../models/User');
const Opportunity = require('../models/Opportunity');

router.get('/users', auth, isAdmin, async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

router.get('/opportunities', auth, isAdmin, async (req, res) => {
  const opps = await Opportunity.find().populate('createdBy', 'name email');
  res.json(opps);
});

router.put('/opportunities/:id/status', auth, isAdmin, async (req, res) => {
  const { status } = req.body;
  if (!['approved','rejected','pending'].includes(status)) return res.status(400).json({ message: 'Invalid status' });
  const opp = await Opportunity.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json(opp);
});

module.exports = router;
