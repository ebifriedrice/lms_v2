const express = require('express');
const {
  getLessons,
  getLesson,
  addLesson,
  updateLesson,
  deleteLesson,
} = require('../controllers/lessonController');

const router = express.Router({ mergeParams: true });

// Re-route into other resource routers
const contentRouter = require('./content');

const { protect, authorize } = require('../middleware/auth');

router.use('/:lessonId/content', contentRouter);

router
  .route('/')
  .get(getLessons)
  .post(protect, authorize('admin'), addLesson);

router
  .route('/:id')
  .get(getLesson)
  .put(protect, authorize('admin'), updateLesson)
  .delete(protect, authorize('admin'), deleteLesson);

module.exports = router;
