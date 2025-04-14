"use client";

import { generateExcelReport } from "@/utils/excelUtils";

export default function GenerateReportButton({ filter, setFilter }) {
    return (
        <button onClick={() => generateExcelReport(filter, setFilter)} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
            Generate Report
        </button>
    )
}