const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  specs: String,
  image: String,
  price: Number
});

module.exports = mongoose.model('Product', productSchema);
