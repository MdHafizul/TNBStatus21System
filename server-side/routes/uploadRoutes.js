const express = require('express');
const multer = require('multer');
const uploadController = require('../controllers/uploadController');

const router = express.Router();

// Configure multer for file storage
const upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB
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
router.post('/upload', upload.single('file'), uploadController.uploadFile);
router.get('/days-category', uploadController.daysAndCategory);
router.get('/process-file', uploadController.processFile);

//new route to monitor cache status
router.get('/cache-status', (req, res) => {
    const stats = cache.getStats();
    res.json({
        hits: stats.hits,
        misses: stats.misses,
        keys: cache.keys(),
        cacheSize: cache.keys().length
    });
});

module.exports = router;