
const dateUtils = require('../../utils/dateUtils');

// Generic function to calculate the number of days and categorize data
exports.calculateDaysAndCategory = (data, dateColumn, type, selectedDate) => {
    // Ensure selectedDate is passed; fallback to current date if not provided
    selectedDate = selectedDate ? new Date(selectedDate) : dateUtils.getDate();

    return data.map(row => {
        const dateStr = row[dateColumn];
        const businessArea = row['Business Area'];
        const CA = row[`Contract Account`]
        const namaKawasan = row['Business Area Name']; // Extract Business Area Name
        let category = null;

        if (!businessArea) {
            return null; // Skip rows without a business area
        }

        if (type === 'disconnected' || type === 'revisit') {
            if (!dateStr) {
                return null; // Skip rows without a date
            }

            const [day, month, year] = dateStr.split('.').map(Number);
            const parsedDate = new Date(year, month - 1, day);

            if (isNaN(parsedDate)) {
                return null; // Skip rows with invalid dates
            }

            const timeDifference = selectedDate - parsedDate;
            const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

            // Categorize based on days difference
            if (daysDifference <= 30) {
                category = '0-1Months';
            } else if (daysDifference <= 90) {
                category = '<3Months';
            } else if (daysDifference <= 180) {
                category = '<6Months';
            } else if (daysDifference <= 365) {
                category = '<12Months';
            } else if (daysDifference <= 730) {
                category = '<2Years';
            } else {
                category = '>2Years';
            }

            return {
                CA,
                daysSince: daysDifference,
                category,
                BusinessArea: String(businessArea),
                'Business Area Name': namaKawasan, // Include Business Area Name
            };
        } else if (type === 'belumrevisit') {
            // For belumrevisit, this will be calculated in the controller
            return {
                category: 'Belum Revisit',
                BusinessArea: String(businessArea),
                'Business Area Name': namaKawasan, // Include Business Area Name
            };
        }

        return null; // Default case
    }).filter(row => row !== null); // Filter out null rows
};

// Function to sort data by Business Area
exports.sortByBusinessArea = (data) => {
    const categories = ['0-1Months', '<3Months', '<6Months', '<12Months', '<2Years', '>2Years'];
    const BACount = {};

    // Initialize the structure for each business area
    data.forEach(row => {
        const businessArea = String(row['BusinessArea']);
        const category = row['category'];
        const namaKawasan = row['Business Area Name'];

        // Skip rows without a business area or category
        if (!businessArea || !category) return;
        
        // Initialize the business area entry if it doesn't exist
        if (!BACount[businessArea]) {
            BACount[businessArea] = { total: 0 };
            categories.forEach(cat => (BACount[businessArea][cat] = 0));
        }

        // Increment the total and the specific category count
        BACount[businessArea].total++;
        BACount[businessArea][category]++;
        BACount[businessArea]['Business Area Name'] = namaKawasan;

    });

    return BACount;
};

