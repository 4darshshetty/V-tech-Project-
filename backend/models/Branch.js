const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
  city: String,
  state: String,
  country: String,
  address: String,
  phone: String,
  mapUrl: String
});

module.exports = mongoose.model('Branch', branchSchema);
