const mongoose = require('mongoose');

const alertHistorySchema = new mongoose.Schema({
  alertName: { type: String, required: true },
  status: { type: String, enum: ['firing', 'resolved'], required: true },
  instance: { type: String },
  value: { type: String },
  summary: { type: String },
  triggeredAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('AlertHistory', alertHistorySchema);