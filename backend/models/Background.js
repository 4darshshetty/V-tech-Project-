const mongoose = require('mongoose');

const bgSchema = new mongoose.Schema({
  url: String,
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Background', bgSchema);
