const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a lesson title'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  video: {
    type: String, // URL to the video
  },
  text: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  course: {
    type: mongoose.Schema.ObjectId,
    ref: 'Course',
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Lesson', LessonSchema);
