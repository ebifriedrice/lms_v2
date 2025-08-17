const Course = require('../models/Course');
const User = require('../models/User');

// @desc    Get all courses
// @route   GET /api/v1/courses
// @access  Public
exports.getCourses = async (req, res, next) => {
  try {
    const courses = await Course.find();
    res.status(200).json({ success: true, count: courses.length, data: courses });
  } catch (err) {
    res.status(400).json({ success: false, msg: err.message });
  }
};

// @desc    Enroll student in a course
// @route   POST /api/v1/courses/:id/enroll
// @access  Private/Admin
exports.enrollStudent = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return next(new Error(`Course not found with id of ${req.params.id}`));
        }

        const student = await User.findById(req.body.studentId);
        if (!student) {
            return next(new Error(`Student not found with id of ${req.body.studentId}`));
        }

        // Add student to course's enrolledStudents
        course.enrolledStudents.push(student._id);
        await course.save();

        // Add course to student's enrolledCourses
        student.enrolledCourses.push(course._id);
        await student.save();

        res.status(200).json({ success: true, data: course });
    } catch (err) {
        res.status(400).json({ success: false, msg: err.message });
    }
};

// @desc    Unenroll student from a course
// @route   POST /api/v1/courses/:id/unenroll
// @access  Private/Admin
exports.unenrollStudent = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return next(new Error(`Course not found with id of ${req.params.id}`));
        }

        const student = await User.findById(req.body.studentId);
        if (!student) {
            return next(new Error(`Student not found with id of ${req.body.studentId}`));
        }

        // Remove student from course's enrolledStudents
        course.enrolledStudents = course.enrolledStudents.filter(
            (studentId) => studentId.toString() !== student._id.toString()
        );
        await course.save();

        // Remove course from student's enrolledCourses
        student.enrolledCourses = student.enrolledCourses.filter(
            (courseId) => courseId.toString() !== course._id.toString()
        );
        await student.save();

        res.status(200).json({ success: true, data: course });
    } catch (err) {
        res.status(400).json({ success: false, msg: err.message });
    }
};

// @desc    Get single course
// @route   GET /api/v1/courses/:id
// @access  Public
exports.getCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return next(new Error(`Course not found with id of ${req.params.id}`));
    }
    res.status(200).json({ success: true, data: course });
  } catch (err) {
    res.status(400).json({ success: false, msg: err.message });
  }
};

// @desc    Create new course
// @route   POST /api/v1/courses
// @access  Private/Admin
exports.createCourse = async (req, res, next) => {
  try {
    req.body.user = req.user.id;
    const course = await Course.create(req.body);
    res.status(201).json({ success: true, data: course });
  } catch (err) {
    res.status(400).json({ success: false, msg: err.message });
  }
};

// @desc    Update course
// @route   PUT /api/v1/courses/:id
// @access  Private/Admin
exports.updateCourse = async (req, res, next) => {
  try {
    let course = await Course.findById(req.params.id);
    if (!course) {
      return next(new Error(`Course not found with id of ${req.params.id}`));
    }
    // Make sure user is course owner
    if (course.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new Error(`User ${req.user.id} is not authorized to update this course`));
    }
    course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ success: true, data: course });
  } catch (err) {
    res.status(400).json({ success: false, msg: err.message });
  }
};

// @desc    Delete course
// @route   DELETE /api/v1/courses/:id
// @access  Private/Admin
exports.deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return next(new Error(`Course not found with id of ${req.params.id}`));
    }
    // Make sure user is course owner
    if (course.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new Error(`User ${req.user.id} is not authorized to delete this course`));
    }
    await course.remove();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false, msg: err.message });
  }
};
