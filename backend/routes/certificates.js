const express = require('express');
const { validateCertificate } = require('../controllers/certificateController');

const router = express.Router();

router.get('/validate/:token', validateCertificate);

module.exports = router;
