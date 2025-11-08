const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: String, default: 'Unknown' },
  tags: [String]
}, { timestamps: true });

module.exports = mongoose.model('Quote', quoteSchema);
