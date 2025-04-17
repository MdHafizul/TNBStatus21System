const { findCategoryByName } = require('../../utils/categoryHelper');

//Generic function to categorize data based on the contract account name
// and add a category field to each row
exports.processAndSortByCategory = (data) => {
    return data.map(row => {
        const kategori = findCategoryByName(row['Contract Account Name']);
        return {
            // 'Customer Group': row['Customer Group'],
            // 'Sector': row['Sector'],
            // 'SMER Segment': row['SMER Segment'],
            // 'Business Area': row['Buss Area'],
            // 'Business Area Name': row['Business Area Name'],
            // 'Contract Account': row['Contract Acc'],
            'Contract Account Name': row['Contract Account Name'],
            // 'ADID': row['ADID'],
            // 'Acc Class': row['Acc Class'],
            // 'Acc Status': row['Acc Status'],
            // 'Status Pukal': row['Status Pukal'],
            // 'No of Months Outstanding': row['No of Months Outstanding'],
            // 'Cur.MthUnpaid': row['Cur.MthUnpaid'],
            // 'TTL O/S AMT': row['TTL O/S AMT'],
            // 'Total Unpaid': row['Total Unpaid'],
            // 'Move Out Date': row['Move Out Date'],
            'Category': kategori,
        };
    })
}

// Generic function to calculate, sort data for summary table
exports.summaryTable = (data) => {
    const summary = {};

    data.forEach(row => {
        const category = row['Category'];
        const jumlahTunggakan = parseFloat(row['TTL O/S AMT']) || 0;

        if (!category) return; // Skip rows without a category

        if (!summary[category]) {
            summary[category] = {
                countCategory: 0,
                jumlahTunggakan: 0,
            };
        }

        summary[category].countCategory += 1;
        summary[category].jumlahTunggakan += jumlahTunggakan;

    });
    // Convert to array if you want a list format
    return Object.entries(summary).map(([category, stats]) => ({
        Category: category,
        Count: stats.countCategory,
        jumlahTunggakan: stats.jumlahTunggakan
    }));
}

//Generic function to calculate sort for AgensiSummarisedTable

exports.agensiSummarisedTable = (data, filters) => {

    //default filter
    const { category = 'ALL', AccClass = 'ALL', AccStatus = 'ALL', ADID = 'ALL', StatusPukal = 'ALL' } = filters;

    //filter the data based on the filters
    const filteredData = data.filter(row => {
        if (category !== 'ALL' && row['Category'] !== category) return false;
        if (AccClass !== 'ALL' && row['Acc Class'] !== AccClass) return false;
        if (AccStatus !== 'ALL' && row['Acc Status'] !== AccStatus) return false;
        if (ADID !== 'ALL' && row['ADID'] !== ADID) return false;
        if (StatusPukal !== 'ALL' && row['Status Pukal'] !== StatusPukal) return false;
        return true;
    })

    //groupBy the data based on the filters
    const groupBy = ['Business Area']
    if (category == 'ALL') groupBy.push('Category')
    if (AccClass == 'ALL') groupBy.push('Acc Class')
    if (AccStatus == 'ALL') groupBy.push('Acc Status')
    if (ADID == 'ALL') groupBy.push('ADID')
    if (StatusPukal == 'ALL') groupBy.push('Status Pukal')

    //grouped the data
    const groupedData = {}
    filteredData.forEach(row => {
        const groupKey = groupBy.map(field => row[field]).join('|');


        if (!groupedData[groupKey]) {
            groupedData[groupKey] = {
                'Buss Area': row['Business Area'],
                'Bil Akaun': 0,
                'Acc Status': row['Acc Status'],
                'Status Pukal': row['Status Pukal'],
                'ADID': row['ADID'],
                'TTL O/S AMT': 0,
                'Total Unpaid': 0
            };
        };
        // Add this row's values to the group
        groupedData[groupKey]['Bil Akaun'] += 1;
        groupedData[groupKey]['TTL O/S AMT'] += Number(row['TTL O/S AMT']) || 0;
        groupedData[groupKey]['Total Unpaid'] += Number(row['Total Unpaid']) || 0;
    });
    // Convert the grouped object to an array for easier use
    const result = Object.values(groupedData);
    return Object.values(groupedData);
}

//Generic function to display detailed table

exports.detailedTable = (data, filters) => {

    //default filter    
    const { category = 'ALL', AccStatus = 'ALL', AccClass = 'ALL', ADID = 'ALL', StatusPukal = 'ALL' } = filters;

    //filter data based on its filter
    //only send true data

    const filteredData = data.filter(row => {
        if (category !== 'ALL' && row['Category'] !== category) return false;
        if (AccStatus !== 'ALL' && row['Acc Status'] !== AccStatus) return false;
        if (AccClass !== 'ALL' && row['Acc Class'] !== AccClass) return false;
        if (ADID !== 'ALL' && row['ADID'] !== ADID) return false;
        if (StatusPukal !== 'ALL' && row['Status Pukal'] !== StatusPukal) return false;
       return true ;
    })
    return filteredData.map(row => {
        return {
            'Customer Group': row['Customer Group'],
            'Sector': row['Sector'],
            'SMER Segment': row['SMER Segment'],
            'Business Area': row['Bussiness Area'],
            'Contract Account': row['Contract Acc'],
            'Contract Account Name': row['Contract Account Name'],
            'ADID': row['ADID'],
            'Acc Class': row['Acc Class'],
            'Acc Status': row['Acc Status'],
            'Status Pukal': row['Status Pukal'],
            'No of Months Outstanding': row['No of Months Outstanding'],
            'Current Month Unpaid': row['Cur.MthUnpaid'],
            'TTL O/S AMT': row['TTL O/S AMT'],
            'Total Unpaid': row['Total Unpaid'],
            'Move Out Date': row['Move Out Date'],
        }
    })
}
