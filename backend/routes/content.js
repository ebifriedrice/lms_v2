const express = require('express');
const {
  createContent,
  getLessonContent,
} = require('../controllers/contentController');
const { upload } = require('../config/cloudinary');

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .post(protect, authorize('admin'), upload.single('file'), createContent)
  .get(protect, getLessonContent); // TODO: Add middleware to check for enrollment

module.exports = router;
