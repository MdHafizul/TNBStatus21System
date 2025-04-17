const fs = require('fs');
const fileProcessor = require('../services/fileProcessor');
const govProcessor = require('../services/GSorter/govProcessor');

const ErrorResponse = require('../utils/errorResponse');
const cache = require('../utils/cache');

// @DESC : Upload the file and convert it to JSON
// @route POST /api/v2/govSorter/upload
// @access Public
// @Request: file(xlsx)
exports.uploadFile = async (req, res, next) => {
    try {
        if (!req.file) {
            return next(new ErrorResponse('No file uploaded', 400));
        }

        // Convert the uploaded file to JSON
        const result = await fileProcessor.uploadFile(req.file.path);

        // Remove the uploaded file after processing
        await fs.promises.unlink(req.file.path);

        //store the result
        cache.set('govSorterData', result);

        res.status(200).json({
            success: true,
            message: 'File uploaded and processed successfully',
            data: result
        });
    } catch (error) {
        return next(new ErrorResponse('Server Error: ' + error.message, 500));
    }
}

// @DESC : Process and sort the data
// @route GET /api/v2/govSorter/summary
// @access Public

exports.processAndSort = async (req, res, next) => {
    try {
        const uploadedData = cache.get('govSorterData');

        if (!uploadedData) {
            return next(new ErrorResponse('No data found. Please upload a file first.', 404));
        }

        // Check cache first
        const cacheKey = `results`;
        const cachedResult = cache.get(cacheKey);

        if (cachedResult) {
            return res.json(cachedResult);
        }

        const data = uploadedData.Sheet1

        const processedData = govProcessor.processAndSortByCategory(data);

        //cache the result
        cache.set(cacheKey, processedData, 1200);

        res.status(200).json({
            success: true,
            message: 'Data processed and sorted successfully',
            data: processedData
        });
    } catch (error) {
        return next(new ErrorResponse('Server Error: ' + error.message, 500));
    }
}

// @DESC : Get Summary Data
// @route GET /api/v2/govSorter/summary
// @access Public

exports.getSummary = async (req, res, next) => {
    try {
        const uploadedData = cache.get(processedData);

        if (!uploadedData) {
            return next(new ErrorResponse('No data found. Please upload a file first.', 404));
        }

        // Check cache first
        const cacheKey = `results`;
        const cachedResult = cache.get(cacheKey);

        if (cachedResult) {
            return res.json(cachedResult);
        }

        const data = uploadedData.Sheet1
        const summaryData = govProcessor.summaryTable(data);

        //cache the result
        cache.set('govSorterSummary', summaryData, 1200);

        res.status(200).json({
            success: true,
            message: 'Summary data retrieved successfully',
            data: summaryData
        });
    } catch (error) {
        return next(new ErrorResponse('Server Error: ' + error.message, 500));
    }
}

// @DESC : Get Agensi Summarised Data
// @route GET /api/v2/govSorter/agensi-summary
// @access Public
exports.getAgensiSummary = async (req, res, next) => {
    try {
        const uploadedData = cache.get(processedData);

        if (!uploadedData) {
            return next(new ErrorResponse('No data found. Please upload a file first.', 404));
        }

        const filters = req.body;

        // Check cache first
        const cacheKey = `results`;
        const cachedResult = cache.get(cacheKey);

        if (cachedResult) {
            return res.json(cachedResult);
        }

        const data = uploadedData.Sheet1
        const agensiSummaryData = govProcessor.agensiSummarisedTable(data, filters);

        //cache the result
        cache.set('govSorterAgensiSummary', agensiSummaryData, 1200);

        // Send the response
        res.status(200).json({
            success: true,
            message: 'Agensi summary data retrieved successfully',
            data: agensiSummaryData
        });
    } catch (error) {
        return next(new ErrorResponse('Server Error: ' + error.message, 500));
    }
}

// @DESC : Get Detailed data
// @route GET /api/v2/govSorter/detail-data
// @access Public

exports.getDetailData = async (req, res, next) => {
    try {
        const uploadedData = cache.get(processedData);

        if (!uploadedData) {
            return next(new ErrorResponse('No data found. Please upload a file first.', 404));
        }

        const filters = req.body;

        // Check cache first
        const cacheKey = `results`;
        const cachedResult = cache.get(cacheKey);

        if (cachedResult) {
            return res.json(cachedResult);
        }

        const data = uploadedData.Sheet1
        const detailedData = govProcessor.detailedTable(data, filters);

        //cache the result
        cache.set('govSorterDetailData', detailedData, 1200);

        // Send the response
        res.status(200).json({
            success: true,
            message: 'Detailed data retrieved successfully',
            data: detailedData
        })

    } catch (error) {
        return next(new ErrorResponse('Server Error: ' + error.message, 500));
    }
}
