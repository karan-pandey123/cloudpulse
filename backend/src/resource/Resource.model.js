const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  instanceId: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['healthy', 'unhealthy', 'unknown'],
    default: 'unknown',
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Resource', resourceSchema);