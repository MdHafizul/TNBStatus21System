const express = require('express');
const multer = require('multer');
const govSorterController = require('../controllers/govSorterController');

const govSorterRouter = express.Router();

// Configure multer for file storage
const upload = multer ({
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
govSorterRouter.post(
    '/upload',
    upload.single('file'), // Handle single file upload
    govSorterController.uploadFile
);

govSorterRouter.get('/proccesedAndSortedData', govSorterController.processAndSort);
govSorterRouter.get('/summary', govSorterController.getSummary);
govSorterRouter.get('/agensiSummary', govSorterController.getAgensiSummary);
govSorterRouter.get('/detailedData', govSorterController.getDetailData);

module.exports = govSorterRouter;