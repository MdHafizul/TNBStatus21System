const express = require('express');
const multer = require('multer');
const uploadController = require('../controllers/uploadController');

const router = express.Router();

// Configure multer for file storage
const upload = multer({
    dest: 'uploads/', // Temporary storage directory
    limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB limit
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
            file.mimetype === 'application/vnd.ms-excel'
        ) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only Excel files are allowed.'));
        }
    }
});

// Define routes
router.post(
    '/upload',
    upload.single('file'), // Handle single file upload
    (req, res, next) => {
        // Middleware to parse additional fields like `uploadDate`
        const { uploadDate } = req.body;

        if (!uploadDate) {
            return res.status(400).json({ error: { message: 'No date provided.' } });
        }

        const parsedDate = new Date(uploadDate);
        if (isNaN(parsedDate)) {
            return res.status(400).json({ error: { message: 'Invalid date format.' } });
        }

        // Attach parsed date to the request object for the controller
        req.uploadDate = parsedDate;
        next();
    },
    uploadController.uploadFile // Pass control to the uploadFile controller
);

router.get('/days-category', uploadController.daysAndCategory);
router.get('/process-file', uploadController.processFile);

module.exports = router;