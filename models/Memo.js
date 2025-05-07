const mongoose = require('mongoose');

const memoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  content: String,
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Memo', memoSchema);
