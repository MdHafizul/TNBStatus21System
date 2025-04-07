'use client';

import Navbar from '../../components/navbar';
import SummaryCards from '@/components/summaryCard';
import FilterDropdown from '../../components/filterDropdown';
import TableView from '@/components/tableView';
import ChartView from '@/components/chartView';
import { useState } from 'react';

export default function Dashboard() {
    const [filter, setFilter] = useState('Keseluruhan'); // Default filter

    const handleFilterChange = (selectedOption) => {
        setFilter(selectedOption);
    };

    return (
        <>
            <Navbar />
            <main className="container mx-auto px-4 py-6">
                <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
                <p className="text-gray-600 mb-6">View and analyze disconnected accounts data.</p>

                <SummaryCards filter={filter}/>
                <FilterDropdown onFilterChange={handleFilterChange} />
                <TableView filter={filter} /> 
                <ChartView filter={filter} />
            </main>
        </>
    );
}