'use client'

import Navbar from "@/components/navbar"
import { useState } from "react";
import GenerateReportButton from "@/components/reportButton";

export default function StatusLPCDashboard() {
    const [filter, setFilter] = useState('ALL');

    const handleFilterChange = (selectedOption) => {
        setFilter(selectedOption);
    };

    // Mock data for the dashboard
    const summaryData = {
        bilAkaun: 3648,
        totalUnpaid: 144094746.97,
        totalPayment: 125705302.99,
        balanceToCollect: 18389443.98
    };

    // Separate regular data from summary total
    const summaryRegularData = [
        { kategori: 'CURRENT', bilAkaun: 3000, totalUnpaid: 64566656.10, bilAkaunBuatBayaran: 2458, totalPayment: 58259763.24, balanceToCollect: 6306892.86 },
        { kategori: 'DEBT', bilAkaun: 598, totalUnpaid: 18187799.42, bilAkaunBuatBayaran: 358, totalPayment: 6646989.05, balanceToCollect: 11540810.37 },
        { kategori: 'PRIME', bilAkaun: 50, totalUnpaid: 61340291.45, bilAkaunBuatBayaran: 49, totalPayment: 60798550.70, balanceToCollect: 541740.75 }
    ];
    
    // Store total separately
    const summaryTotal = { 
        kategori: 'JUMLAH', 
        bilAkaun: 3648, 
        totalUnpaid: 144094746.97, 
        bilAkaunBuatBayaran: 2865, 
        totalPayment: 125705302.99, 
        balanceToCollect: 18389443.98 
    };

    // Separate business area data from total row
    const sortedRegularData = [
        { businessArea: '6210', bilAkaun: 1573, totalUnpaid: 41065363.38, bilAkaunBuatBayaran: 1234, totalPayment: 37555277.85, balanceToCollect: 3510085.53, percentCollection: 91 },
        { businessArea: '6211', bilAkaun: 173, totalUnpaid: 5535539.74, bilAkaunBuatBayaran: 147, totalPayment: 4892835.30, balanceToCollect: 642704.44, percentCollection: 88 },
        { businessArea: '6212', bilAkaun: 82, totalUnpaid: 4497000.43, bilAkaunBuatBayaran: 69, totalPayment: 4199203.93, balanceToCollect: 297796.50, percentCollection: 93 },
        { businessArea: '6213', bilAkaun: 74, totalUnpaid: 1164823.85, bilAkaunBuatBayaran: 60, totalPayment: 1038364.51, balanceToCollect: 126459.34, percentCollection: 89 },
        { businessArea: '6218', bilAkaun: 40, totalUnpaid: 1934944.28, bilAkaunBuatBayaran: 34, totalPayment: 1884135.90, balanceToCollect: 50808.39, percentCollection: 97 },
        { businessArea: '6219', bilAkaun: 456, totalUnpaid: 21104958.04, bilAkaunBuatBayaran: 367, totalPayment: 18898590.98, balanceToCollect: 2206367.11, percentCollection: 90 },
        { businessArea: '6220', bilAkaun: 316, totalUnpaid: 16434041.09, bilAkaunBuatBayaran: 213, totalPayment: 12323765.28, balanceToCollect: 4110276.21, percentCollection: 75 },
        { businessArea: '6221', bilAkaun: 140, totalUnpaid: 8489523.90, bilAkaunBuatBayaran: 90, totalPayment: 7582211.56, balanceToCollect: 907312.34, percentCollection: 89 },
        { businessArea: '6222', bilAkaun: 48, totalUnpaid: 1558260.56, bilAkaunBuatBayaran: 32, totalPayment: 1483200.15, balanceToCollect: 75060.41, percentCollection: 95 },
        { businessArea: '6223', bilAkaun: 25, totalUnpaid: 1002692.68, bilAkaunBuatBayaran: 22, totalPayment: 990157.52, balanceToCollect: 12535.32, percentCollection: 99 },
        { businessArea: '6224', bilAkaun: 138, totalUnpaid: 6574806.12, bilAkaunBuatBayaran: 108, totalPayment: 4559611.06, balanceToCollect: 2015195.06, percentCollection: 69 },
        { businessArea: '6225', bilAkaun: 75, totalUnpaid: 999497.12, bilAkaunBuatBayaran: 58, totalPayment: 672211.99, balanceToCollect: 327285.13, percentCollection: 67 },
        { businessArea: '6227', bilAkaun: 335, totalUnpaid: 22072477.44, bilAkaunBuatBayaran: 251, totalPayment: 20205787.62, balanceToCollect: 1866689.82, percentCollection: 92 },
        { businessArea: '6250', bilAkaun: 121, totalUnpaid: 7869670.41, bilAkaunBuatBayaran: 96, totalPayment: 6369045.36, balanceToCollect: 1500625.05, percentCollection: 81 },
        { businessArea: '6252', bilAkaun: 88, totalUnpaid: 3791147.48, bilAkaunBuatBayaran: 71, totalPayment: 3050904.95, balanceToCollect: 740242.53, percentCollection: 90 }
    ].sort((a, b) => b.percentCollection - a.percentCollection);
    
    // Store business area total separately
    const sortedTotal = {
        businessArea: 'JUMLAH', 
        bilAkaun: 3648, 
        totalUnpaid: 144094746.97, 
        bilAkaunBuatBayaran: 2865, 
        totalPayment: 125705302.99, 
        balanceToCollect: 18389443.98, 
        percentCollection: 87 
    };

    // Function to determine color based on percentage
    const getPercentageColor = (percentage) => {
        if (percentage === 100) return "text-green-600";
        if (percentage > 90) return "text-yellow-600";
        return "text-red-600";
    };

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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-lg border border-purple-200 p-6 shadow-sm">
                        <h2 className="text-sm font-medium text-purple-600 mb-2">Bil Akaun</h2>
                        <p className="text-3xl font-bold">{summaryData.bilAkaun.toLocaleString()}</p>
                    </div>
                    <div className="bg-white rounded-lg border border-purple-200 p-6 shadow-sm">
                        <h2 className="text-sm font-medium text-purple-600 mb-2">Total Unpaid</h2>
                        <p className="text-3xl font-bold">RM {summaryData.totalUnpaid.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                    <div className="bg-white rounded-lg border border-purple-200 p-6 shadow-sm">
                        <h2 className="text-sm font-medium text-purple-600 mb-2">Total Payment</h2>
                        <p className="text-3xl font-bold">RM {summaryData.totalPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                    <div className="bg-white rounded-lg border border-purple-200 p-6 shadow-sm">
                        <h2 className="text-sm font-medium text-purple-600 mb-2">Balance to Collect</h2>
                        <p className="text-3xl font-bold">RM {summaryData.balanceToCollect.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                </div>

                {/* Summary Table */}
                <h2 className="text-xl font-semibold mb-2 text-purple-700">Summary Table</h2>
                <div className="bg-white border border-purple-200 rounded-lg mb-6 overflow-x-auto shadow">
                    <table className="min-w-full divide-y divide-purple-100">
                        <thead className="bg-purple-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-purple-700 uppercase tracking-wider">Kategori</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-purple-700 uppercase tracking-wider">Bil Akaun</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-purple-700 uppercase tracking-wider">Total Unpaid (RM)</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-purple-700 uppercase tracking-wider">Bil Akaun Buat Bayaran</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-purple-700 uppercase tracking-wider">Total Payment (RM)</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-purple-700 uppercase tracking-wider">Balance to Collect (RM)</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-purple-100">
                            {/* Regular data rows */}
                            {summaryRegularData.map((row, idx) => (
                                <tr key={idx}>
                                    <td className="px-6 py-4 whitespace-nowrap">{row.kategori}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{row.bilAkaun.toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {row.totalUnpaid.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">{row.bilAkaunBuatBayaran.toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {row.totalPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {row.balanceToCollect.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </td>
                                </tr>
                            ))}
                            
                            {/* Total row always at the bottom */}
                            <tr className="bg-purple-100 font-bold">
                                <td className="px-6 py-4 whitespace-nowrap">{summaryTotal.kategori}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{summaryTotal.bilAkaun.toLocaleString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {summaryTotal.totalUnpaid.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{summaryTotal.bilAkaunBuatBayaran.toLocaleString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {summaryTotal.totalPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {summaryTotal.balanceToCollect.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Sorted Table with Filter */}
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-semibold text-purple-700">Sorted Table</h2>
                    <div className="w-64">
                        <select 
                            value={filter}
                            onChange={(e) => handleFilterChange(e.target.value)}
                            className="w-full px-3 py-2 border border-purple-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="ALL">All</option>
                            <option value="PRIME">Prime</option>
                            <option value="CURRENT">Current</option>
                            <option value="DEBT">Debt</option>
                        </select>
                    </div>
                </div>
                <div className="bg-white border border-purple-200 rounded-lg mb-6 overflow-x-auto shadow">
                    <table className="min-w-full divide-y divide-purple-100">
                        <thead className="bg-purple-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-purple-700 uppercase tracking-wider">Business Area</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-purple-700 uppercase tracking-wider">Bil Akaun</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-purple-700 uppercase tracking-wider">Total Unpaid (RM)</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-purple-700 uppercase tracking-wider">Bil Akaun Buat Bayaran</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-purple-700 uppercase tracking-wider">Total Payment (RM)</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-purple-700 uppercase tracking-wider">Balance to Collect (RM)</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-purple-700 uppercase tracking-wider">% Collection</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-purple-100">
                            {/* Regular sorted data rows */}
                            {sortedRegularData.map((row, idx) => (
                                <tr key={idx}>
                                    <td className="px-6 py-4 whitespace-nowrap">{row.businessArea}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{row.bilAkaun.toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {row.totalUnpaid.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">{row.bilAkaunBuatBayaran.toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {row.totalPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {row.balanceToCollect.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </td>
                                    <td className={`px-6 py-4 whitespace-nowrap font-bold ${getPercentageColor(row.percentCollection)}`}>
                                        {row.percentCollection}%
                                    </td>
                                </tr>
                            ))}
                            
                            {/* Total row always at the bottom */}
                            <tr className="bg-purple-100 font-bold">
                                <td className="px-6 py-4 whitespace-nowrap">{sortedTotal.businessArea}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{sortedTotal.bilAkaun.toLocaleString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {sortedTotal.totalUnpaid.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{sortedTotal.bilAkaunBuatBayaran.toLocaleString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {sortedTotal.totalPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {sortedTotal.balanceToCollect.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </td>
                                <td className={`px-6 py-4 whitespace-nowrap font-bold ${getPercentageColor(sortedTotal.percentCollection)}`}>
                                    {sortedTotal.percentCollection}%
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Detailed Table */}
                <h2 className="text-xl font-semibold mb-2 text-purple-700">Detailed Table</h2>
                <div className="bg-white border border-purple-200 rounded-lg mb-6 overflow-x-auto shadow">
                    <table className="min-w-full divide-y divide-purple-100">
                        <thead className="bg-purple-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-purple-700 uppercase tracking-wider">Customer Group</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-purple-700 uppercase tracking-wider">Sector</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-purple-700 uppercase tracking-wider">SMER Segment</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-purple-700 uppercase tracking-wider">Buss Area</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-purple-700 uppercase tracking-wider">Team</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-purple-700 uppercase tracking-wider">BP No</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-purple-700 uppercase tracking-wider">Contract Acc</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-purple-700 uppercase tracking-wider">Contract Account Name</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-purple-700 uppercase tracking-wider">ADID</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-purple-700 uppercase tracking-wider">Acc Class</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-purple-700 uppercase tracking-wider">Acc Status</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-purple-700 uppercase tracking-wider">Cur.Mth Unpaid</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-purple-700 uppercase tracking-wider">TTL O/S Amt</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-purple-700 uppercase tracking-wider">Total Unpaid @ 12.04.2025</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-purple-700 uppercase tracking-wider">1-Apr</th>
                                {/* Add more date columns here */}
                                <th className="px-4 py-3 text-left text-xs font-semibold text-purple-700 uppercase tracking-wider">30-Apr</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-purple-700 uppercase tracking-wider">Total Payment</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-purple-700 uppercase tracking-wider">Balance to Collect</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-purple-100">
                            <tr>
                                <td colSpan="18" className="px-4 py-4 text-center text-gray-500">
                                    Detailed data will be loaded based on filter selection
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    );
}