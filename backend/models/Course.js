const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a course title'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  instructor: {
    type: String,
    required: [true, 'Please add an instructor name'],
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
  },
  discountedPrice: {
    type: Number,
  },
  saleTimer: {
    type: Date,
  },
  deliveryMode: {
    type: String,
    required: true,
    enum: ['Online', 'Offline', 'Hybrid'],
  },
  outcomes: {
    type: [String],
    required: true,
  },
  prerequisites: {
    type: [String],
    required: true,
  },
  sampleVideo: {
    type: String, // URL to the video
  },
  pdfs: [
    {
      name: String,
      url: String, // URL to the PDF
    },
  ],
  lessons: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Lesson',
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  enrolledStudents: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Course', CourseSchema);
