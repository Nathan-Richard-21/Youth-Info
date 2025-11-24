const express = require('express');
const router = express.Router();
const { auth } = require('../utils/authMiddleware');
const Application = require('../models/Application');
const Opportunity = require('../models/Opportunity');

// Get user's applications
router.get('/my', auth, async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user.id })
      .populate('opportunity', 'title category organization status deadline')
      .sort({ createdAt: -1 });
    
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single application
router.get('/:id', auth, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('opportunity', 'title category organization')
      .populate('user', 'name email');
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    // Check if user owns this application
    if (application.user._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    res.json(application);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Submit application
router.post('/', auth, async (req, res) => {
  try {
    const { opportunityId, coverLetter, resume, documents, answers } = req.body;
    
    if (!opportunityId) {
      return res.status(400).json({ message: 'Opportunity ID is required' });
    }
    
    // Check if opportunity exists and is approved
    const opportunity = await Opportunity.findById(opportunityId);
    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }
    
    if (opportunity.status !== 'approved') {
      return res.status(400).json({ message: 'This opportunity is not accepting applications' });
    }
    
    // Check if user already applied
    const existingApplication = await Application.findOne({
      user: req.user.id,
      opportunity: opportunityId
    });
    
    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied to this opportunity' });
    }
    
    const application = new Application({
      user: req.user.id,
      opportunity: opportunityId,
      coverLetter,
      resume,
      documents,
      answers
    });
    
    await application.save();
    
    // Increment application count on opportunity
    opportunity.applications += 1;
    await opportunity.save();
    
    res.status(201).json({ 
      message: 'Application submitted successfully', 
      application 
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update application (before review)
router.put('/:id', auth, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    // Check if user owns this application
    if (application.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    // Can only update if still pending
    if (application.status !== 'pending') {
      return res.status(400).json({ message: 'Cannot update application after it has been reviewed' });
    }
    
    const { coverLetter, resume, documents, answers } = req.body;
    
    if (coverLetter) application.coverLetter = coverLetter;
    if (resume) application.resume = resume;
    if (documents) application.documents = documents;
    if (answers) application.answers = answers;
    
    await application.save();
    
    res.json({ message: 'Application updated', application });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Withdraw application
router.delete('/:id', auth, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    // Check if user owns this application
    if (application.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    application.status = 'withdrawn';
    await application.save();
    
    res.json({ message: 'Application withdrawn successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
