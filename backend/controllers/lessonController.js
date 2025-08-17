const Lesson = require('../models/Lesson');
const Course = require('../models/Course');

// @desc    Get all lessons for a course
// @route   GET /api/v1/courses/:courseId/lessons
// @access  Public
exports.getLessons = async (req, res, next) => {
  try {
    if (req.params.courseId) {
      const lessons = await Lesson.find({ course: req.params.courseId });
      return res.status(200).json({
        success: true,
        count: lessons.length,
        data: lessons,
      });
    } else {
      const lessons = await Lesson.find();
      return res.status(200).json({
        success: true,
        count: lessons.length,
        data: lessons,
      });
    }
  } catch (err) {
    res.status(400).json({ success: false, msg: err.message });
  }
};

// @desc    Get single lesson
// @route   GET /api/v1/lessons/:id
// @access  Public
exports.getLesson = async (req, res, next) => {
  try {
    const lesson = await Lesson.findById(req.params.id).populate({
      path: 'course',
      select: 'name description',
    });

    if (!lesson) {
      return next(new Error(`No lesson found with the id of ${req.params.id}`));
    }

    res.status(200).json({
      success: true,
      data: lesson,
    });
  } catch (err) {
    res.status(400).json({ success: false, msg: err.message });
  }
};

// @desc    Add lesson
// @route   POST /api/v1/courses/:courseId/lessons
// @access  Private/Admin
exports.addLesson = async (req, res, next) => {
  try {
    req.body.course = req.params.courseId;
    req.body.user = req.user.id;

    const course = await Course.findById(req.params.courseId);

    if (!course) {
      return next(new Error(`No course with the id of ${req.params.courseId}`));
    }

    // Make sure user is course owner
    if (course.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new Error(`User ${req.user.id} is not authorized to add a lesson to course ${course._id}`));
    }

    const lesson = await Lesson.create(req.body);

    res.status(200).json({
      success: true,
      data: lesson,
    });
  } catch (err) {
    res.status(400).json({ success: false, msg: err.message });
  }
};

// @desc    Update lesson
// @route   PUT /api/v1/lessons/:id
// @access  Private/Admin
exports.updateLesson = async (req, res, next) => {
  try {
    let lesson = await Lesson.findById(req.params.id);

    if (!lesson) {
      return next(new Error(`No lesson with the id of ${req.params.id}`));
    }

    // Make sure user is lesson owner
    if (lesson.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new Error(`User ${req.user.id} is not authorized to update lesson ${lesson._id}`));
    }

    lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: lesson,
    });
  } catch (err) {
    res.status(400).json({ success: false, msg: err.message });
  }
};

// @desc    Delete lesson
// @route   DELETE /api/v1/lessons/:id
// @access  Private/Admin
exports.deleteLesson = async (req, res, next) => {
  try {
    const lesson = await Lesson.findById(req.params.id);

    if (!lesson) {
      return next(new Error(`No lesson with the id of ${req.params.id}`));
    }

    // Make sure user is lesson owner
    if (lesson.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new Error(`User ${req.user.id} is not authorized to delete lesson ${lesson._id}`));
    }

    await lesson.remove();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    res.status(400).json({ success: false, msg: err.message });
  }
};
