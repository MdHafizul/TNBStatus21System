"use client";

import { generateStatus21Report } from "@/utils/status21/excelUtils";
import { generateGovSorterReport } from "@/utils/GovSorter/excelUtils";

export default function GenerateReportButton({ filter, setFilter, type }) {
    const handleClick = () => {
        if (type === "govsorter") {
            generateGovSorterReport(filter, setFilter);
        } else {
            generateStatus21Report(filter, setFilter);
        }
    };

    return (
        <button onClick={handleClick} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
            Generate Report
        </button>
    );
}