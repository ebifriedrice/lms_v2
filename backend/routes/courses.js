const express = require('express');
const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollStudent,
  unenrollStudent,
} = require('../controllers/courseController');
const {
  generateCertificate,
} = require('../controllers/certificateController');

const router = express.Router();

// Re-route into other resource routers
const lessonRouter = require('./lessons');

const { protect, authorize } = require('../middleware/auth');

router.use('/:courseId/lessons', lessonRouter);

router
  .route('/')
  .get(getCourses)
  .post(protect, authorize('admin'), createCourse);

router
  .route('/:id')
  .get(getCourse)
  .put(protect, authorize('admin'), updateCourse)
  .delete(protect, authorize('admin'), deleteCourse);

router.route('/:id/enroll').post(protect, authorize('admin'), enrollStudent);
router.route('/:id/unenroll').post(protect, authorize('admin'), unenrollStudent);
router
  .route('/:courseId/generate_certificate')
  .post(protect, authorize('admin'), generateCertificate);

module.exports = router;
