const express = require('express');
const router = express.Router();
const { uploadFile, uploadPDF } = require('../controllers/upload.controller');

// Route upload PDF và tạo đơn ứng tuyển
router.post('/apply', uploadFile, uploadPDF);

module.exports = router; 