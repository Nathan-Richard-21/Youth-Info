const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { auth } = require('../utils/authMiddleware');
const User = require('../models/User');
const Application = require('../models/Application');
const Opportunity = require('../models/Opportunity');

// Get current user profile
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-password')
      .populate('savedOpportunities', 'title category deadline');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Update last login
    user.lastLogin = new Date();
    await user.save();
    
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update user profile
router.put('/me', auth, async (req, res) => {
  try {
    const allowedUpdates = [
      'name', 'bio', 'location', 'phone', 'educationLevel', 
      'employmentStatus', 'skills', 'interests'
    ];
    
    const updates = {};
    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');
    
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update user preferences
router.put('/me/preferences', auth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { preferences: req.body } },
      { new: true }
    ).select('-password');
    
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Change password
router.put('/me/password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Both current and new password are required' });
    }
    
    const user = await User.findById(req.user.id);
    
    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }
    
    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();
    
    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user's saved opportunities
router.get('/me/saved', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate({
        path: 'savedOpportunities',
        match: { status: 'approved' },
        select: 'title category organization deadline location amount'
      });
    
    res.json(user.savedOpportunities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user's applications
router.get('/me/applications', auth, async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user.id })
      .populate('opportunity', 'title category organization status')
      .sort({ createdAt: -1 });
    
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user's posted opportunities
router.get('/me/opportunities', auth, async (req, res) => {
  try {
    const opportunities = await Opportunity.find({ createdBy: req.user.id })
      .sort({ createdAt: -1 });
    
    res.json(opportunities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete user account
router.delete('/me', auth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.json({ message: 'Account deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
