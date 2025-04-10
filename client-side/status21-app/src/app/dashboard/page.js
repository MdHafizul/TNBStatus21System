'use client';

import Navbar from '../../components/navbar';
import SummaryCards from '@/components/summaryCard';
import FilterDropdown from '../../components/filterDropdown';
import TableView from '@/components/tableView';
import ChartView from '@/components/chartView';
import { useState } from 'react';
import { generateExcelReport } from '@/utils/excelUtils';

export default function Dashboard() {
    const [filter, setFilter] = useState('Keseluruhan');

    const handleFilterChange = (selectedOption) => {
        setFilter(selectedOption);
    };

    return (
        <>
            <Navbar />
            <main className="container mx-auto px-4 py-6">
                <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
                <p className="text-gray-600 mb-6">View and analyze disconnected accounts data.</p>
                {/* Always render the Generate Report button */}
                <button
                    onClick={() => generateExcelReport(filter, setFilter)}
                    className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                >
                    Generate Report
                </button>
                <SummaryCards filter={filter} />
                <FilterDropdown onFilterChange={handleFilterChange} />
                <TableView filter={filter} />
                <div className="chart-container">
                    <ChartView filter={filter} />
                </div>
            </main>
        </>
    );
}