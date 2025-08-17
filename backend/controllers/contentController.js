const Content = require('../models/Content');
const Lesson = require('../models/Lesson');

// @desc    Create content for a lesson
// @route   POST /api/v1/lessons/:lessonId/content
// @access  Private/Admin
exports.createContent = async (req, res, next) => {
  try {
    req.body.lesson = req.params.lessonId;
    req.body.user = req.user.id;

    const lesson = await Lesson.findById(req.params.lessonId);
    if (!lesson) {
      return next(new Error(`No lesson with the id of ${req.params.lessonId}`));
    }

    // Make sure user is lesson owner
    if (lesson.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new Error(`User ${req.user.id} is not authorized to add content to lesson ${lesson._id}`));
    }

    // Handle file upload
    if (req.file) {
      req.body.videoUrl = req.file.path;
    }

    const content = await Content.create(req.body);

    res.status(201).json({
      success: true,
      data: content,
    });
  } catch (err) {
    res.status(400).json({ success: false, msg: err.message });
  }
};

// @desc    Get all content for a lesson
// @route   GET /api/v1/lessons/:lessonId/content
// @access  Private/Enrolled Student
exports.getLessonContent = async (req, res, next) => {
    try {
        const content = await Content.find({ lesson: req.params.lessonId });
        res.status(200).json({ success: true, count: content.length, data: content });
    } catch (err) {
        res.status(400).json({ success: false, msg: err.message });
    }
};

// @desc    Submit an MCQ answer
// @route   POST /api/v1/content/:id/submit_mcq
// @access  Private/Student
exports.submitMcq = async (req, res, next) => {
    try {
        const content = await Content.findById(req.params.id);
        if (!content || content.type !== 'mcq') {
            return next(new Error(`No MCQ found with the id of ${req.params.id}`));
        }

        const { answer } = req.body;
        const isCorrect = answer === content.mcq.correctOption;

        // Create MCQ result
        await McqResult.create({
            user: req.user.id,
            content: req.params.id,
            answer,
            isCorrect,
        });

        // Mark content as complete
        if (!content.completedBy.includes(req.user.id)) {
            content.completedBy.push(req.user.id);
            await content.save();
        }

        res.status(200).json({ success: true, data: { isCorrect } });
    } catch (err) {
        res.status(400).json({ success: false, msg: err.message });
    }
};

// @desc    Mark content as complete
// @route   POST /api/v1/content/:id/complete
// @access  Private/Student
exports.markAsComplete = async (req, res, next) => {
    try {
        const content = await Content.findById(req.params.id);
        if (!content) {
            return next(new Error(`No content found with the id of ${req.params.id}`));
        }

        // Add user to completedBy array if not already there
        if (!content.completedBy.includes(req.user.id)) {
            content.completedBy.push(req.user.id);
            await content.save();
        }

        res.status(200).json({ success: true, data: content });
    } catch (err) {
        res.status(400).json({ success: false, msg: err.message });
    }
};
