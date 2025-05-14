'use client'

import ExcelJS from 'exceljs';
import { toPng } from 'html-to-image';

export async function generateStatusLPCReport() {
    try {
        // Show loading indicator
        const loadingIndicator = document.createElement('div');
        loadingIndicator.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        loadingIndicator.innerHTML = `
            <div class="bg-white p-6 rounded-lg shadow-lg text-center">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                <p class="text-lg font-semibold">Generating Excel Report...</p>
                <p class="text-sm text-gray-500" id="progress-text">Fetching data...</p>
            </div>
        `;
        document.body.appendChild(loadingIndicator);

        const updateProgress = (text) => {
            document.getElementById('progress-text').textContent = text;
        };

        // Create a new workbook using ExcelJS
        const workbook = new ExcelJS.Workbook();
        workbook.creator = 'StatusLPC System';
        workbook.lastModifiedBy = 'StatusLPC System';
        workbook.created = new Date();
        workbook.modified = new Date();

        // Set professional theme colors
        const themeColors = {
            primary: '753BBD',    // Purple
            secondary: 'E9DFFF',  // Light purple
            accent: 'F5F0FF',     // Very light purple
            text: '333333',       // Dark gray
            border: 'C4B0E6',     // Medium purple
            chartColors: [
                '9C27B0',  // Purple
                '673AB7',  // Deep Purple
                '3F51B5',  // Indigo
                '2196F3',  // Blue
                'BA68C8',  // Light Purple
                'E1BEE7'   // Very Light Purple
            ]
        };

        // Format for date display
        const dateFormat = new Intl.DateTimeFormat('ms-MY', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });

        const currentDateTime = dateFormat.format(new Date());

        // Define common styles
        const headerStyle = {
            font: { bold: true, color: { argb: 'FFFFFFFF' } },
            fill: {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: `FF${themeColors.primary}` }
            },
            alignment: { horizontal: 'center', vertical: 'middle' },
            border: {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            }
        };

        const titleStyle = {
            font: { bold: true, size: 16, color: { argb: 'FF000000' } },
            alignment: { horizontal: 'center' }
        };

        const subtitleStyle = {
            font: { bold: true, size: 12, color: { argb: 'FF555555' } },
            alignment: { horizontal: 'center' }
        };

        const totalRowStyle = {
            font: { bold: true },
            fill: {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: `FF${themeColors.secondary}` }
            },
            alignment: { horizontal: 'center', vertical: 'middle' },
            border: {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'double' },
                right: { style: 'thin' }
            }
        };

        const alternateRowStyle = {
            fill: {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: `FF${themeColors.accent}` }
            },
            alignment: { horizontal: 'center', vertical: 'middle' }
        };

        const defaultCellStyle = {
            alignment: { horizontal: 'center', vertical: 'middle' }
        };

        // Chart capture function
        const captureChartImage = async (selector) => {
            updateProgress(`Capturing chart...`);

            try {
                // Find the chart element
                const chartElement = document.querySelector(selector);
                if (!chartElement) {
                    console.error(`Chart element not found: ${selector}`);
                    return null;
                }

                // Use toPng instead of html2canvas
                const dataUrl = await toPng(chartElement, {
                    quality: 0.95,
                    pixelRatio: 2,
                    backgroundColor: null,
                    // Set a timeout to prevent infinite waiting
                    timeout: 30000 // 30 seconds
                });

                // dataUrl is already what we need
                return dataUrl;
            } catch (error) {
                console.error('Error capturing chart:', error);
                return null;
            }
        };

        // Capture summary cards
        const captureSummaryCards = async () => {
            updateProgress('Capturing summary cards...');

            try {
                const cardsElement = document.querySelector('.grid.grid-cols-1.gap-4');
                if (!cardsElement) {
                    console.error('Summary cards element not found');
                    return null;
                }

                // Use toPng instead of html2canvas
                const dataUrl = await toPng(cardsElement, {
                    quality: 0.95,
                    pixelRatio: 2,
                    backgroundColor: null,
                    // Set a timeout to prevent infinite waiting
                    timeout: 30000 // 30 seconds
                });

                return dataUrl;
            } catch (error) {
                console.error('Error capturing summary cards:', error);
                return null;
            }
        };

        // Capture entire dashboard as one image
        const captureDashboardImage = async () => {
            updateProgress('Capturing dashboard overview...');

            try {
                // Try to find a container that has all elements
                const dashboardElement = document.querySelector('.dashboard-container'); 
                if (!dashboardElement) {
                    console.warn('Dashboard container not found, falling back to individual captures');
                    return null;
                }

                const dataUrl = await toPng(dashboardElement, {
                    quality: 0.95,
                    pixelRatio: 2,
                    backgroundColor: '#ffffff',
                    timeout: 30000 // 30 seconds
                });

                return dataUrl;
            } catch (error) {
                console.error('Error capturing dashboard:', error);
                return null;
            }
        };

        // Create main worksheet
        const createMainWorksheet = async () => {
            updateProgress('Creating main worksheet...');

            const worksheet = workbook.addWorksheet('Summary Report');

            // Add title
            worksheet.mergeCells('A1:G1');
            const titleRow = worksheet.getRow(1);
            titleRow.getCell(1).value = 'StatusLPC Summary Report';
            titleRow.getCell(1).style = titleStyle;
            titleRow.height = 30;

            // Add subtitle with date
            worksheet.mergeCells('A2:G2');
            const subtitleRow = worksheet.getRow(2);
            subtitleRow.getCell(1).value = `Generated on ${currentDateTime}`;
            subtitleRow.getCell(1).style = subtitleStyle;
            subtitleRow.height = 20;

            // Try to capture the entire dashboard as one image first
            const dashboardImage = await captureDashboardImage();
            
            if (dashboardImage) {
                // If we got the dashboard image, use it
                updateProgress('Adding dashboard overview to worksheet...');
                
                // Add empty row for spacing
                worksheet.getRow(3).height = 10;
                let currentRow = 4;
                
                // Add dashboard title
                worksheet.mergeCells(`A${currentRow}:G${currentRow}`);
                worksheet.getRow(currentRow).getCell(1).value = 'Dashboard Overview';
                worksheet.getRow(currentRow).getCell(1).style = {
                    font: { bold: true, size: 14 },
                    alignment: { horizontal: 'center' }
                };
                currentRow++;
                
                // Add dashboard image
                const dashboardImageId = workbook.addImage({
                    base64: dashboardImage,
                    extension: 'png',
                });
                
                worksheet.addImage(dashboardImageId, {
                    tl: { col: 0.5, row: currentRow },
                    br: { col: 7.5, row: currentRow + 25 },
                });
                
                return worksheet;
            }
            
            // Fall back to individual captures if the dashboard capture failed
            const pieChartImage = await captureChartImage('.lg\\:col-span-4 canvas');
            const barChartImage = await captureChartImage('.lg\\:col-span-5 canvas');
            const summaryCardsImage = await captureSummaryCards();

            let currentRow = 4;

            if (summaryCardsImage) {
                updateProgress('Adding summary cards to worksheet...');

                // Add title for summary cards
                worksheet.mergeCells(`A${currentRow}:G${currentRow}`);
                worksheet.getRow(currentRow).getCell(1).value = 'Summary Cards';
                worksheet.getRow(currentRow).getCell(1).style = {
                    font: { bold: true, size: 14 },
                    alignment: { horizontal: 'center' }
                };
                currentRow++;

                // Add summary cards image
                const summaryCardsId = workbook.addImage({
                    base64: summaryCardsImage,
                    extension: 'png',
                });

                worksheet.addImage(summaryCardsId, {
                    tl: { col: 1, row: currentRow },
                    br: { col: 7, row: currentRow + 10 },
                });

                currentRow += 12; // Space for image + buffer
            }

            if (pieChartImage) {
                updateProgress('Adding pie chart to worksheet...');

                // Add chart title
                worksheet.mergeCells(`A${currentRow}:C${currentRow}`);
                worksheet.getRow(currentRow).getCell(1).value = 'Payment Distribution';
                worksheet.getRow(currentRow).getCell(1).style = {
                    font: { bold: true, size: 14 },
                    alignment: { horizontal: 'center' }
                };

                // Add chart image
                const pieChartId = workbook.addImage({
                    base64: pieChartImage,
                    extension: 'png',
                });

                worksheet.addImage(pieChartId, {
                    tl: { col: 1, row: currentRow + 1 },
                    br: { col: 3.5, row: currentRow + 16 },
                });
            }

            if (barChartImage) {
                updateProgress('Adding bar chart to worksheet...');

                // Add chart title
                worksheet.mergeCells(`D${currentRow}:G${currentRow}`);
                worksheet.getRow(currentRow).getCell(4).value = 'Payment vs Unpaid';
                worksheet.getRow(currentRow).getCell(4).style = {
                    font: { bold: true, size: 14 },
                    alignment: { horizontal: 'center' }
                };

                // Add chart image
                const barChartId = workbook.addImage({
                    base64: barChartImage,
                    extension: 'png',
                });

                worksheet.addImage(barChartId, {
                    tl: { col: 3.5, row: currentRow + 1 },
                    br: { col: 7, row: currentRow + 16 },
                });
            }

            return worksheet;
        };

        // Create sorted table worksheet from API data
        const createSortedTableWorksheet = async (filter = 'ALL') => {
            updateProgress(`Fetching data for ${filter} sorted table...`);
            
            try {
                // Add timeout for API request
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
                
                // Get data from API
                const response = await fetch("http://localhost:3000/api/v2/statusLPC/sortedTable", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ filter: filter }),
                    signal: controller.signal
                });
                clearTimeout(timeoutId);
                
                // Check if response is OK
                if (!response.ok) {
                    throw new Error(`API responded with status: ${response.status}`);
                }
                
                // Check content type to make sure it's JSON
                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    throw new Error('API returned non-JSON response. Check if server is running correctly.');
                }
                
                const data = await response.json();
                
                if (!data || !data.data || data.data.length === 0) {
                    console.error(`No data available for ${filter} sorted table`);
                    return null;
                }
                
                updateProgress(`Creating ${filter} sorted table worksheet...`);
                const worksheet = workbook.addWorksheet(`${filter} Table`);

                // Set column widths
                worksheet.columns = [
                    { header: 'Business Area', key: 'businessArea', width: 20 },
                    { header: 'Total Accounts', key: 'bilAkaun', width: 15 },
                    { header: 'Total Unpaid (RM)', key: 'totalUnpaid', width: 20 },
                    { header: 'Payment Accounts', key: 'bilAkaunBuatBayaran', width: 20 },
                    { header: 'Total Payment (RM)', key: 'totalPayment', width: 20 },
                    { header: 'Balance to Collect (RM)', key: 'balanceToCollect', width: 25 },
                    { header: 'Collection (%)', key: 'percentCollection', width: 15 }
                ];

                // Add title
                worksheet.mergeCells('A1:G1');
                const titleRow = worksheet.getRow(1);
                titleRow.getCell(1).value = `StatusLPC ${filter} Report by Business Area`;
                titleRow.getCell(1).style = titleStyle;
                titleRow.height = 30;

                // Add subtitle with date
                worksheet.mergeCells('A2:G2');
                const subtitleRow = worksheet.getRow(2);
                subtitleRow.getCell(1).value = `Generated on ${currentDateTime}`;
                subtitleRow.getCell(1).style = subtitleStyle;
                subtitleRow.height = 20;

                // Add empty row for spacing
                worksheet.getRow(3).height = 10;

                // Style headers
                const headerRow = worksheet.getRow(4);
                headerRow.eachCell({ includeEmpty: true }, (cell) => {
                    cell.style = headerStyle;
                });
                headerRow.height = 25;

                // Add data
                data.data.filter(row => row.businessArea !== 'JUMLAH').forEach((row, index) => {
                    const dataRow = worksheet.addRow({
                        businessArea: row.businessArea,
                        bilAkaun: row.bilAkaun,
                        totalUnpaid: row.totalUnpaid,
                        bilAkaunBuatBayaran: row.bilAkaunBuatBayaran,
                        totalPayment: row.totalPayment,
                        balanceToCollect: row.balanceToCollect,
                        percentCollection: row.percentCollection / 100 // Convert to decimal for Excel formatting
                    });

                    // Apply styles and formatting
                    dataRow.eachCell({ includeEmpty: true }, (cell) => {
                        cell.style = defaultCellStyle;

                        // Format numbers
                        if (cell.column > 1) {
                            if (cell.column === 3 || cell.column === 5 || cell.column === 6) {
                                // Currency format
                                cell.numFmt = '#,##0.00';
                            } else if (cell.column === 7) {
                                // Percentage format
                                cell.numFmt = '0.00%';

                                // Conditional formatting for percentage column
                                const percentage = row.percentCollection;
                                if (percentage >= 90) {
                                    cell.fill = {
                                        type: 'pattern',
                                        pattern: 'solid',
                                        fgColor: { argb: 'FF4CAF50' } // Green
                                    };
                                } else if (percentage >= 70) {
                                    cell.fill = {
                                        type: 'pattern',
                                        pattern: 'solid',
                                        fgColor: { argb: 'FF8BC34A' } // Light green
                                    };
                                } else if (percentage >= 50) {
                                    cell.fill = {
                                        type: 'pattern',
                                        pattern: 'solid',
                                        fgColor: { argb: 'FFFFEB3B' } // Yellow
                                    };
                                } else if (percentage >= 30) {
                                    cell.fill = {
                                        type: 'pattern',
                                        pattern: 'solid',
                                        fgColor: { argb: 'FFFF9800' } // Orange
                                    };
                                } else {
                                    cell.fill = {
                                        type: 'pattern',
                                        pattern: 'solid',
                                        fgColor: { argb: 'FFF44336' } // Red
                                    };
                                }
                            }
                        }
                    });

                    // Apply alternate row styling (except for percentage column)
                    if (index % 2 === 1) {
                        for (let colIndex = 1; colIndex <= 6; colIndex++) {
                            const cell = dataRow.getCell(colIndex);
                            cell.style = { ...cell.style, ...alternateRowStyle };
                        }
                    }
                });

                // Add total row
                const totalRow = data.data.find(row => row.businessArea === 'JUMLAH');
                if (totalRow) {
                    const totalExcelRow = worksheet.addRow({
                        businessArea: 'JUMLAH',
                        bilAkaun: totalRow.bilAkaun,
                        totalUnpaid: totalRow.totalUnpaid,
                        bilAkaunBuatBayaran: totalRow.bilAkaunBuatBayaran,
                        totalPayment: totalRow.totalPayment,
                        balanceToCollect: totalRow.balanceToCollect,
                        percentCollection: totalRow.percentCollection / 100 // Convert to decimal for Excel formatting
                    });

                    totalExcelRow.eachCell({ includeEmpty: true }, (cell) => {
                        cell.style = totalRowStyle;

                        // Format numbers
                        if (cell.column > 1) {
                            if (cell.column === 3 || cell.column === 5 || cell.column === 6) {
                                cell.numFmt = '#,##0.00';
                            } else if (cell.column === 7) {
                                cell.numFmt = '0.00%';
                            }
                        }
                    });
                }

                // Add autofilter
                worksheet.autoFilter = {
                    from: { row: 4, column: 1 },
                    to: { row: data.data.length + 3, column: 7 }
                };

                return worksheet;
            } catch (error) {
                console.error(`Error fetching or processing ${filter} API data:`, error);
                
                // Create error worksheet instead
                const errorWorksheet = workbook.addWorksheet(`${filter} Error`);
                
                errorWorksheet.mergeCells('A1:G1');
                const titleRow = errorWorksheet.getRow(1);
                titleRow.getCell(1).value = 'Error Loading Data';
                titleRow.getCell(1).style = {
                    font: { bold: true, size: 16, color: { argb: 'FFFF0000' } },
                    alignment: { horizontal: 'center' }
                };
                titleRow.height = 30;
                
                errorWorksheet.mergeCells('A3:G3');
                errorWorksheet.getRow(3).getCell(1).value = `Error: ${error.message}`;
                errorWorksheet.getRow(3).getCell(1).style = {
                    font: { size: 12 },
                    alignment: { horizontal: 'center' }
                };
                
                errorWorksheet.mergeCells('A5:G5');
                errorWorksheet.getRow(5).getCell(1).value = 'Please check if the API server is running at http://localhost:3000';
                errorWorksheet.getRow(5).getCell(1).style = {
                    alignment: { horizontal: 'center' }
                };
                
                errorWorksheet.mergeCells('A7:G7');
                errorWorksheet.getRow(7).getCell(1).value = 'Troubleshooting steps:';
                errorWorksheet.getRow(7).getCell(1).style = {
                    font: { bold: true },
                    alignment: { horizontal: 'left' }
                };
                
                const steps = [
                    '1. Verify your API server is running',
                    '2. Check the endpoint URL is correct: /api/v2/statusLPC/sortedTable',
                    '3. Make sure your server is returning valid JSON data',
                    '4. Check for any network connectivity issues'
                ];
                
                steps.forEach((step, index) => {
                    errorWorksheet.mergeCells(`A${9 + index}:G${9 + index}`);
                    errorWorksheet.getRow(9 + index).getCell(1).value = step;
                    errorWorksheet.getRow(9 + index).getCell(1).style = {
                        alignment: { horizontal: 'left' }
                    };
                });
                
                // Adjust column widths
                errorWorksheet.columns.forEach(column => {
                    column.width = 15;
                });
                
                return errorWorksheet;
            }
        };

        // Create workbook with worksheets
        try {
            // First sheet with charts and summary (ALL data)
            await createMainWorksheet();
            
            // Create filtered table worksheets
            await createSortedTableWorksheet('ALL');
            await createSortedTableWorksheet('DEBT');
            await createSortedTableWorksheet('CURRENT');
            await createSortedTableWorksheet('PRIME');

            // Set first sheet as active when opening
            workbook.views = [{ activeTab: 0 }];

            updateProgress('Finalizing report...');

            // Export the workbook
            const buffer = await workbook.xlsx.writeBuffer();
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'StatusLPC_Report.xlsx';
            link.click();

            // Remove loading indicator
            document.body.removeChild(loadingIndicator);

            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50';
            successMessage.innerHTML = `
                <div class="flex items-center">
                    <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <p>Report generated successfully!</p>
                </div>
            `;
            document.body.appendChild(successMessage);

            // Remove success message after 3 seconds
            setTimeout(() => {
                document.body.removeChild(successMessage);
            }, 3000);
        } catch (worksheetError) {
            console.error('Error creating worksheets:', worksheetError);
            throw worksheetError;
        }
    } catch (error) {
        console.error('Error generating Excel report:', error);

        // Remove loading indicator if it exists
        const loadingIndicator = document.querySelector('.fixed.inset-0.bg-black.bg-opacity-50');
        if (loadingIndicator) {
            document.body.removeChild(loadingIndicator);
        }

        // Show error message
        const errorMessage = document.createElement('div');
        errorMessage.className = 'fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50';
        errorMessage.innerHTML = `
            <div class="flex items-center">
                <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                <p>Error generating report: ${error.message}</p>
            </div>
        `;
        document.body.appendChild(errorMessage);

        // Remove error message after 5 seconds
        setTimeout(() => {
            document.body.removeChild(errorMessage);
        }, 5000);
    }
}