const express = require('express');
const router = express.Router();
const { auth, isAdmin } = require('../utils/authMiddleware');
const User = require('../models/User');
const Opportunity = require('../models/Opportunity');
const Application = require('../models/Application');
const Report = require('../models/Report');

// ============ DASHBOARD STATS ============
router.get('/stats', auth, isAdmin, async (req, res) => {
  try {
    const [totalUsers, totalOpportunities, pendingApprovals, activeReports] = await Promise.all([
      User.countDocuments(),
      Opportunity.countDocuments(),
      Opportunity.countDocuments({ status: 'pending' }),
      Report.countDocuments({ status: { $in: ['pending', 'under-review'] } })
    ]);
    
    res.json({
      totalUsers,
      totalOpportunities,
      pendingApprovals,
      activeReports
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ============ USER MANAGEMENT ============
router.get('/users', auth, isAdmin, async (req, res) => {
  try {
    const { search, role, page = 1, limit = 50 } = req.query;
    const query = {};
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (role && role !== 'all') {
      query.role = role;
    }
    
    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const count = await User.countDocuments(query);
    
    res.json({
      users,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/users/:id', auth, isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    // Get user's applications and saved items
    const [applications, savedCount] = await Promise.all([
      Application.find({ user: req.params.id }).populate('opportunity', 'title category'),
      user.savedOpportunities.length
    ]);
    
    res.json({ user, applications, savedCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch('/users/:id/suspend', auth, isAdmin, async (req, res) => {
  try {
    const { reason } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { 
        isSuspended: true, 
        suspensionReason: reason,
        isActive: false 
      },
      { new: true }
    ).select('-password');
    
    res.json({ message: 'User suspended', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch('/users/:id/activate', auth, isAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { 
        isSuspended: false, 
        suspensionReason: null,
        isActive: true 
      },
      { new: true }
    ).select('-password');
    
    res.json({ message: 'User activated', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update user role (ADMIN ONLY)
router.patch('/users/:id/role', auth, isAdmin, async (req, res) => {
  try {
    const { role } = req.body;
    
    // Validate role
    const validRoles = ['user', 'stakeholder', 'admin'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ 
        message: 'Invalid role. Must be: user, stakeholder, or admin' 
      });
    }
    
    // Don't allow changing your own role
    if (req.params.id === req.user.id) {
      return res.status(403).json({ 
        message: 'Cannot change your own role' 
      });
    }
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    console.log(`✅ User role updated: ${user.email} → ${role} (by ${req.user.email})`);
    
    res.json({ 
      message: `User role updated to ${role}`, 
      user 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update stakeholder verification status (ADMIN ONLY)
router.patch('/users/:id/verification', auth, isAdmin, async (req, res) => {
  try {
    const { verificationStatus } = req.body;
    
    // Validate verification status
    const validStatuses = ['pending', 'verified', 'rejected'];
    if (!validStatuses.includes(verificationStatus)) {
      return res.status(400).json({ 
        message: 'Invalid verification status. Must be: pending, verified, or rejected' 
      });
    }
    
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Only allow verification for stakeholders
    if (user.role !== 'stakeholder') {
      return res.status(400).json({ 
        message: 'Verification status can only be set for stakeholder accounts' 
      });
    }
    
    user.verificationStatus = verificationStatus;
    await user.save();
    
    console.log(`✅ Stakeholder verification updated: ${user.email} → ${verificationStatus} (by ${req.user.email})`);
    
    res.json({ 
      message: `Stakeholder ${verificationStatus === 'verified' ? 'approved' : verificationStatus === 'rejected' ? 'rejected' : 'status updated'}`, 
      user 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/users/:id', auth, isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    // Don't allow deleting other admins
    if (user.role === 'admin' && req.user.id !== req.params.id) {
      return res.status(403).json({ message: 'Cannot delete admin users' });
    }
    
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ============ OPPORTUNITY MANAGEMENT ============
router.get('/opportunities', auth, isAdmin, async (req, res) => {
  try {
    const { search, status, category, page = 1, limit = 50 } = req.query;
    const query = {};
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { organization: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (status && status !== 'all') {
      query.status = status;
    }
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    const opportunities = await Opportunity.find(query)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const count = await Opportunity.countDocuments(query);
    
    res.json({
      opportunities,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/opportunities/:id', auth, isAdmin, async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email');
    
    if (!opportunity) return res.status(404).json({ message: 'Opportunity not found' });
    
    res.json(opportunity);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/opportunities', auth, isAdmin, async (req, res) => {
  try {
    const opportunityData = {
      ...req.body,
      createdBy: req.user.id,
      status: 'approved' // Admin posts are auto-approved
    };
    
    const opportunity = new Opportunity(opportunityData);
    await opportunity.save();
    
    res.status(201).json({ message: 'Opportunity created', opportunity });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/opportunities/:id', auth, isAdmin, async (req, res) => {
  try {
    const opportunity = await Opportunity.findByIdAndUpdate(
      req.params.id,
      { 
        ...req.body, 
        updatedBy: req.user.id 
      },
      { new: true, runValidators: true }
    );
    
    if (!opportunity) return res.status(404).json({ message: 'Opportunity not found' });
    
    res.json({ message: 'Opportunity updated', opportunity });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch('/opportunities/:id', auth, isAdmin, async (req, res) => {
  try {
    const { status, rejectionReason, featured, urgent } = req.body;
    const update = { updatedBy: req.user.id };
    
    if (status) update.status = status;
    if (rejectionReason) update.rejectionReason = rejectionReason;
    if (typeof featured === 'boolean') update.featured = featured;
    if (typeof urgent === 'boolean') update.urgent = urgent;
    
    const opportunity = await Opportunity.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true }
    );
    
    if (!opportunity) return res.status(404).json({ message: 'Opportunity not found' });
    
    res.json({ message: 'Opportunity updated', opportunity });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Approve opportunity
router.post('/opportunities/:id/approve', auth, isAdmin, async (req, res) => {
  try {
    const opportunity = await Opportunity.findByIdAndUpdate(
      req.params.id,
      { 
        status: 'approved',
        updatedBy: req.user.id 
      },
      { new: true }
    );
    
    if (!opportunity) return res.status(404).json({ message: 'Opportunity not found' });
    
    res.json({ message: 'Opportunity approved', opportunity });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Reject opportunity
router.post('/opportunities/:id/reject', auth, isAdmin, async (req, res) => {
  try {
    const { rejectionReason } = req.body;
    const opportunity = await Opportunity.findByIdAndUpdate(
      req.params.id,
      { 
        status: 'rejected',
        rejectionReason: rejectionReason || 'No reason provided',
        updatedBy: req.user.id 
      },
      { new: true }
    );
    
    if (!opportunity) return res.status(404).json({ message: 'Opportunity not found' });
    
    res.json({ message: 'Opportunity rejected', opportunity });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/opportunities/:id', auth, isAdmin, async (req, res) => {
  try {
    const opportunity = await Opportunity.findByIdAndDelete(req.params.id);
    if (!opportunity) return res.status(404).json({ message: 'Opportunity not found' });
    
    res.json({ message: 'Opportunity deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ============ REPORT MANAGEMENT ============
router.get('/reports', auth, isAdmin, async (req, res) => {
  try {
    const { status, page = 1, limit = 50 } = req.query;
    const query = {};
    
    if (status && status !== 'all') {
      query.status = status;
    }
    
    const reports = await Report.find(query)
      .populate('reportedBy', 'name email')
      .populate('resolvedBy', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const count = await Report.countDocuments(query);
    
    res.json({
      reports,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch('/reports/:id/resolve', auth, isAdmin, async (req, res) => {
  try {
    const { resolution, actionTaken } = req.body;
    
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      {
        status: 'resolved',
        resolvedBy: req.user.id,
        resolvedAt: new Date(),
        resolution,
        actionTaken
      },
      { new: true }
    );
    
    if (!report) return res.status(404).json({ message: 'Report not found' });
    
    res.json({ message: 'Report resolved', report });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch('/reports/:id/dismiss', auth, isAdmin, async (req, res) => {
  try {
    const { resolution } = req.body;
    
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      {
        status: 'dismissed',
        resolvedBy: req.user.id,
        resolvedAt: new Date(),
        resolution
      },
      { new: true }
    );
    
    if (!report) return res.status(404).json({ message: 'Report not found' });
    
    res.json({ message: 'Report dismissed', report });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ============ APPLICATIONS MANAGEMENT ============
router.get('/applications', auth, isAdmin, async (req, res) => {
  try {
    const { status, page = 1, limit = 50 } = req.query;
    const query = {};
    
    if (status && status !== 'all') {
      query.status = status;
    }
    
    const applications = await Application.find(query)
      .populate('user', 'name email')
      .populate('opportunity', 'title category')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const count = await Application.countDocuments(query);
    
    res.json({
      applications,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
