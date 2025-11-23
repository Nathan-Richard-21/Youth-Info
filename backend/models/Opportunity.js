const mongoose = require('mongoose');

const OppSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, enum: ['bursary','career','medical','business','other'], default: 'other' },
  status: { type: String, enum: ['pending','approved','rejected'], default: 'pending' },
  expiry: { type: Date },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Opportunity', OppSchema);
