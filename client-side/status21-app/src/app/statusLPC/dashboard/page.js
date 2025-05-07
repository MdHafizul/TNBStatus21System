'use client'

import Navbar from "@/components/navbar"
import { useState } from "react";
import GenerateReportButton from "@/components/reportButton";
import SummaryCards from "@/components/statusLPC/summaryCards";
import SummaryTable from "@/components/statusLPC/summaryTable";
import FilterDropdown from "@/components/statusLPC/filterDropdown";
import SortedTable from "@/components/statusLPC/sortedTable";
import DetailedTable from "@/components/statusLPC/detailedTable";

export default function StatusLPCDashboard() {
    const [filter, setFilter] = useState('ALL');

    return (
        <>
            <Navbar />
            <main className="container mx-auto px-4 py-6">
                <h1 className="text-2xl font-bold mb-1 text-purple-800">StatusLPC - Dashboard</h1>
                <p className="text-gray-600 mb-6">View and analyze payment collection data for the StatusLPC system.</p>
                
                {/* Generate Report Button */}
                <div className="mb-6">
                    <GenerateReportButton filter={filter} setFilter={setFilter} type="statusLPC" />
                </div>

                {/* Summary Cards */}
                <SummaryCards />

                {/* Summary Table */}
                <SummaryTable />

                {/* Filter Dropdown */}
                <FilterDropdown filter={filter} setFilter={setFilter} />

                {/* Sorted Table */}
                <SortedTable filter={filter} />

                {/* Detailed Table */}
                <DetailedTable filter={filter} />
            </main>
        </>
    );
}