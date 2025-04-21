const { findCategoryByName } = require('../../utils/categoryHelper');

//Generic function to categorize data based on the contract account name
// and add a category field to each row
exports.processAndSortByCategory = (data) => {
    return data.map(row => {
        const kategori = findCategoryByName(row['Contract Account Name']);
        return {
            'Customer Group': row['Customer Group'],
            'Sector': row['Sector'],
            'SMER Segment': row['SMER Segment'],
            'Business Area': row['Buss Area'],
            'Contract Account': row['Contract Acc'],
            'Contract Account Name': row['Contract Account Name'],
            'ADID': row['ADID'],
            'Acc Class': row['Acc Class'],
            'Acc Status': row['Acc Status'],
            'Status Pukal': row['Status Pukal'],
            'No of Months Outstanding': row['No of Months Outstandings'],
            'Cur.MthUnpaid': row['Cur.MthUnpaid'],
            'TTL O/S AMT': row['TTL O/S Amt'],
            'Total Unpaid': row['Total Unpaid'],
            'Move Out Date': row['Move Out Date'],
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
        if (!category) return;
        if (!summary[category]) {
            summary[category] = {
                countCategory: 0,
                jumlahTunggakan: 0,
            };
        }
        summary[category].countCategory += 1;
        summary[category].jumlahTunggakan += jumlahTunggakan;
    });
    return Object.entries(summary).map(([category, stats]) => ({
        Category: category,
        BilAkaun: stats.countCategory,
        JumlahTunggakan: Number(stats.jumlahTunggakan.toFixed(2)),
    }));
}

//Generic function to calculate sort for AgensiSummarisedTable

exports.agensiSummarisedTable = (data, filters) => {
    const { category = 'ALL', AccClass = 'ALL', AccStatus = 'ALL', ADID = 'ALL', StatusPukal = 'ALL' } = filters;

    // Filter the data based on the filters
    const filteredData = data.filter(row => {
        if (category !== 'ALL' && row['Category'] !== category) return false;
        if (AccClass !== 'ALL' && row['Acc Class'] !== AccClass) return false;
        if (AccStatus !== 'ALL' && row['Acc Status'] !== AccStatus) return false;
        if (ADID !== 'ALL' && row['ADID'] !== ADID) return false;
        if (StatusPukal !== 'ALL' && row['Status Pukal'] !== StatusPukal) return false;
        return true;
    });

    // Group by only 'Business Area'
    const groupedData = {};
    filteredData.forEach(row => {
        const groupKey = row['Business Area'];
        if (!groupedData[groupKey]) {
            groupedData[groupKey] = {
                'Buss Area': row['Business Area'],
                'Bil Akaun': 0,
                'Acc Status': new Set(),
                'Acc Class': new Set(),
                'Status Pukal': new Set(),
                'ADID': new Set(),
                'TTL O/S AMT': 0,
                'Total Unpaid': 0
            };
        }
        groupedData[groupKey]['Bil Akaun'] += 1;
        groupedData[groupKey]['Acc Status'].add(row['Acc Status']);
        groupedData[groupKey]['Acc Class'].add(row['Acc Class']);
        groupedData[groupKey]['Status Pukal'].add(row['Status Pukal']);
        groupedData[groupKey]['ADID'].add(row['ADID']);
        groupedData[groupKey]['TTL O/S AMT'] += Number(row['TTL O/S AMT']) || 0;
        groupedData[groupKey]['Total Unpaid'] += Number(row['Total Unpaid']) || 0;
    });

    // Convert sets to arrays or strings
    const result = Object.values(groupedData).map(group => {
        const formatField = (set) => {
            const arr = Array.from(set);
            return arr.length === 1 ? arr[0] : arr;
        };
        return {
            'Buss Area': group['Buss Area'],
            'Bil Akaun': group['Bil Akaun'],
            'Acc Status': formatField(group['Acc Status']),
            'Acc Class': formatField(group['Acc Class']),
            'Status Pukal': formatField(group['Status Pukal']),
            'ADID': formatField(group['ADID']),
            'TTL O/S AMT': Number(group['TTL O/S AMT'].toFixed(2)),
            'Total Unpaid': Number(group['Total Unpaid'].toFixed(2))
        };
    });

    return result;
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
            'Business Area': row['Business Area'],
            'Contract Account': row['Contract Account'],
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
