const express = require('express');
const {
  register,
  login,
  getEnrolledCourses,
} = require('../controllers/authController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/register', protect, authorize('admin'), register);
router.post('/login', login);
router.get(
  '/enrolledcourses',
  protect,
  authorize('student'),
  getEnrolledCourses
);

module.exports = router;
