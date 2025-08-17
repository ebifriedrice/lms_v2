const express = require('express');
const {
  markAsComplete,
  submitMcq,
} = require('../controllers/contentController');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router.route('/:id/complete').post(protect, authorize('student'), markAsComplete);
router.route('/:id/submit_mcq').post(protect, authorize('student'), submitMcq);

module.exports = router;
