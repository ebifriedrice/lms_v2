const Certificate = require('../models/Certificate');
const Course = require('../models/Course');
const User = require('../models/User');
const Lesson = require('../models/Lesson');
const PDFDocument = require('pdfkit');
const { v4: uuidv4 } = require('uuid');
const { cloudinary } = require('../config/cloudinary');

// @desc    Generate a certificate for a student
// @route   POST /api/v1/courses/:courseId/generate_certificate
// @access  Private/Admin
exports.generateCertificate = async (req, res, next) => {
  try {
    const { studentId } = req.body;
    const { courseId } = req.params;

    const course = await Course.findById(courseId);
    const student = await User.findById(studentId);

    if (!course || !student) {
      return next(new Error('Course or Student not found'));
    }

    // TODO: Verify course completion
    // For now, we'll assume the course is complete.

    const uniqueToken = uuidv4();

    // Create a new PDF document
    const doc = new PDFDocument();

    // For now, let's just create a simple PDF and get the upload working.
    // I will improve the design later.
    doc.text(`Certificate of Completion`);
    doc.text(`This is to certify that`);
    doc.text(`${student.name}`);
    doc.text(`has successfully completed the course`);
    doc.text(`${course.title}`);
    doc.end();

    // Upload the PDF to Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'lms-certificates', resource_type: 'raw' },
      async (error, result) => {
        if (error) {
          return next(new Error('Error uploading certificate to Cloudinary'));
        }

        // Create certificate record in the database
        const certificate = await Certificate.create({
          user: studentId,
          course: courseId,
          uniqueToken,
          pdfUrl: result.secure_url,
        });

        res.status(201).json({ success: true, data: certificate });
      }
    );

    doc.pipe(uploadStream);

  } catch (err) {
    res.status(400).json({ success: false, msg: err.message });
  }
};

// @desc    Validate a certificate
// @route   GET /api/v1/certificates/validate/:token
// @access  Public
exports.validateCertificate = async (req, res, next) => {
    try {
        const certificate = await Certificate.findOne({ uniqueToken: req.params.token })
            .populate('user', 'name')
            .populate('course', 'title');

        if (!certificate) {
            return next(new Error('Invalid certificate token'));
        }

        res.status(200).json({ success: true, data: certificate });
    } catch (err) {
        res.status(400).json({ success: false, msg: err.message });
    }
};
