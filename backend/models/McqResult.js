const mongoose = require('mongoose');

const McqResultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: mongoose.Schema.ObjectId,
    ref: 'Content',
    required: true,
  },
  answer: {
    type: Number,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('McqResult', McqResultSchema);
