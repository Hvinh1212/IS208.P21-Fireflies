const s3 = require('../config/s3.config');
const multer = require('multer');
const Candidate = require('../models/candidateModel');
const Application = require('../models/applicationModel');

// Cấu hình multer để xử lý upload file
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // giới hạn 5MB
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Chỉ chấp nhận file PDF'), false);
        }
    }
});

// Middleware upload file
const uploadFile = upload.single('resume');

// Hàm xóa file cũ trên S3
const deleteOldFile = async (pdfUrl) => {
    if (!pdfUrl) return;

    try {
        const key = pdfUrl.split('/').pop();
        await s3.deleteObject({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key
        }).promise();
    } catch (error) {
        console.error('Error deleting old file:', error);
    }
};

// Controller upload file và tạo application
const uploadPDF = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Vui lòng chọn file PDF' });
        }

        const { role_id, name, email, apply_phone, job_id, cover_letter } = req.body;

        // Validate các trường bắt buộc
        if (!name || !email || !apply_phone || !job_id) {
            return res.status(400).json({
                message: 'Vui lòng điền đầy đủ thông tin bắt buộc (tên, email, số điện thoại, job_id)'
            });
        }

        const file = req.file;

        // Tạo tên file duy nhất
        const fileName = `application_${job_id}_${Date.now()}.pdf`;

        // Upload lên S3
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileName,
            Body: file.buffer,
            ContentType: 'application/pdf'
        };

        const result = await s3.upload(params).promise();
        console.log('S3 upload successful:', result.Location);

        try {
            // Tạo application mới
            const applicationData = {
                role_id,
                name,
                email,
                apply_phone,
                job_id,
                cover_letter: cover_letter || '',
                resume: result.Location
            };

            const newApplication = await Application.create(applicationData);
            console.log('Application created successfully:', newApplication);

            res.status(200).json({
                message: 'Ứng tuyển thành công',
                application: newApplication
            });
        } catch (dbError) {
            console.error('Database error:', dbError);
            // Nếu tạo application thất bại, xóa file vừa upload lên S3
            try {
                await s3.deleteObject({
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Key: fileName
                }).promise();
                console.log('Cleaned up S3 file after DB error');
            } catch (cleanupError) {
                console.error('Error cleaning up S3 file:', cleanupError);
            }
            throw dbError;
        }
    } catch (error) {
        console.error('Upload error:', error);

        if (error.name === 'MulterError') {
            return res.status(400).json({ message: 'Lỗi upload file: ' + error.message });
        }

        if (error.name === 'S3Error') {
            return res.status(500).json({ message: 'Lỗi khi upload lên S3' });
        }

        // Log chi tiết lỗi database
        if (error.code) {
            console.error('Database error code:', error.code);
            console.error('Database error message:', error.message);
            return res.status(500).json({
                message: 'Lỗi khi tạo đơn ứng tuyển',
                error: error.message
            });
        }

        res.status(500).json({
            message: 'Lỗi server khi xử lý đơn ứng tuyển',
            error: error.message
        });
    }
};

module.exports = {
    uploadFile,
    uploadPDF
}; 