const express = require('express');
const router = express.Router();
const { auth } = require('../utils/authMiddleware');
const Opportunity = require('../models/Opportunity');

router.post('/', auth, async (req, res) => {
  try {
    const { title, description, category, expiry } = req.body;
    const opp = await Opportunity.create({ title, description, category, expiry, createdBy: req.user._id });
    res.json(opp);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  const { category, search } = req.query;
  const filter = { status: 'approved' };
  if (category) filter.category = category;
  if (search) filter.$or = [
    { title: new RegExp(search, 'i') },
    { description: new RegExp(search, 'i') }
  ];
  const opps = await Opportunity.find(filter).sort({ createdAt: -1 });
  res.json(opps);
});

module.exports = router;
