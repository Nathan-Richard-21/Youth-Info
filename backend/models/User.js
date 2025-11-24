const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user','admin'], default: 'user' },
  
  // Profile information
  bio: { type: String },
  location: { type: String },
  phone: { type: String },
  educationLevel: { 
    type: String, 
    enum: ['high-school','matric','undergraduate','postgraduate','tvet','other']
  },
  employmentStatus: { 
    type: String, 
    enum: ['unemployed','employed','student','self-employed']
  },
  skills: [{ type: String }],
  interests: [{ type: String }],
  
  // Preferences
  preferences: {
    emailNotifications: { type: Boolean, default: true },
    smsNotifications: { type: Boolean, default: false },
    jobAlerts: { type: Boolean, default: true },
    bursaryAlerts: { type: Boolean, default: true },
    preferredCategories: [{ type: String }]
  },
  
  // Saved items and applications
  savedOpportunities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Opportunity' }],
  
  // Account status
  isActive: { type: Boolean, default: true },
  isSuspended: { type: Boolean, default: false },
  suspensionReason: { type: String },
  lastLogin: { type: Date }
}, {
  timestamps: true
});

// Index for faster queries
UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });

module.exports = mongoose.model('User', UserSchema);
