const cache = require('./cache'); // Import the shared cache instance

exports.getDate = () => {
    const uploadedData = cache.get('uploadedData');
    if (!uploadedData) {
        console.warn('[WARN] No uploadedData found in cache. Returning default date.');
        return new Date(); // Fallback to the current date
    }
    
    const selectedDate = uploadedData.selectedDate;
    if (!selectedDate) {
        console.warn('[WARN] No selectedDate found in uploadedData. Returning default date.');
        return new Date(); // Fallback to the current date
    }

    const parsedDate = new Date(selectedDate);
    if (isNaN(parsedDate)) {
        throw new Error('Invalid date format.');
    }

    return parsedDate;
};