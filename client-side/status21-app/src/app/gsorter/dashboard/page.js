'use client';

import Navbar from '@/components/navbar';
import { useState } from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
} from 'chart.js';

// Register chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

// Mock summary data
const summaryData = [
    { namaAgensi: 'Agensi A', bilAkaun: 12, jumlahTunggakan: 15000 },
    { namaAgensi: 'Agensi B', bilAkaun: 8, jumlahTunggakan: 9000 },
    { namaAgensi: 'Agensi C', bilAkaun: 5, jumlahTunggakan: 4000 },
    { namaAgensi: 'Agensi D', bilAkaun: 10, jumlahTunggakan: 12000 },
    { namaAgensi: 'Agensi E', bilAkaun: 7, jumlahTunggakan: 7000 },
    { namaAgensi: 'Agensi F', bilAkaun: 3, jumlahTunggakan: 2500 },
    { namaAgensi: 'Agensi G', bilAkaun: 6, jumlahTunggakan: 6000 },
    { namaAgensi: 'Agensi H', bilAkaun: 9, jumlahTunggakan: 11000 },
    { namaAgensi: 'Agensi I', bilAkaun: 4, jumlahTunggakan: 3500 },
    { namaAgensi: 'Agensi J', bilAkaun: 11, jumlahTunggakan: 14000 },
];

// Mock detailed data
const detailedData = [
    {
        CustomerGroup: 'Group 1',
        Sector: 'Sector X',
        'SMER SEGMENT': 'Segment 1',
        'Business Area': 'Area 1',
        'Customer Account': '123456',
        'Customer Account Name': 'Company Alpha',
        ADID: 'CM',
        'Acc CLass': 'LPCG',
        'Acc Status': 'Active',
        'Status Pukal': 'PUKAL',
        'No of Month Outstanding': 3,
        'Cur MTh Unpaid': 1000,
        'TTL o/S AMT': 3000,
        'Total Unpaid': 2500,
        'MoveOut Date': '2024-01-15',
        NamaAgensi: 'Agensi A',
        BilAkaun: 2,
        JumlahTunggakan: 3000,
    },
    {
        CustomerGroup: 'Group 2',
        Sector: 'Sector Y',
        'SMER SEGMENT': 'Segment 2',
        'Business Area': 'Area 2',
        'Customer Account': '654321',
        'Customer Account Name': 'Company Beta',
        ADID: 'AG',
        'Acc CLass': 'OPCG',
        'Acc Status': 'Inactive',
        'Status Pukal': 'TIDAK PUKAL',
        'No of Month Outstanding': 2,
        'Cur MTh Unpaid': 500,
        'TTL o/S AMT': 2000,
        'Total Unpaid': 1800,
        'MoveOut Date': '2024-02-10',
        NamaAgensi: 'Agensi B',
        BilAkaun: 1,
        JumlahTunggakan: 2000,
    },
    {
        CustomerGroup: 'Group 3',
        Sector: 'Sector Z',
        'SMER SEGMENT': 'Segment 3',
        'Business Area': 'Area 3',
        'Customer Account': '789012',
        'Customer Account Name': 'Company Gamma',
        ADID: 'DM',
        'Acc CLass': 'LPCG',
        'Acc Status': 'Active',
        'Status Pukal': 'PUKAL',
        'No of Month Outstanding': 4,
        'Cur MTh Unpaid': 1200,
        'TTL o/S AMT': 4800,
        'Total Unpaid': 4000,
        'MoveOut Date': '2024-03-05',
        NamaAgensi: 'Agensi C',
        BilAkaun: 3,
        JumlahTunggakan: 4800,
    },
    {
        CustomerGroup: 'Group 4',
        Sector: 'Sector X',
        'SMER SEGMENT': 'Segment 1',
        'Business Area': 'Area 1',
        'Customer Account': '345678',
        'Customer Account Name': 'Company Delta',
        ADID: 'SL',
        'Acc CLass': 'OPCG',
        'Acc Status': 'Inactive',
        'Status Pukal': 'PUKAL',
        'No of Month Outstanding': 1,
        'Cur MTh Unpaid': 800,
        'TTL o/S AMT': 800,
        'Total Unpaid': 800,
        'MoveOut Date': '2024-04-12',
        NamaAgensi: 'Agensi D',
        BilAkaun: 1,
        JumlahTunggakan: 800,
    },
    {
        CustomerGroup: 'Group 5',
        Sector: 'Sector Y',
        'SMER SEGMENT': 'Segment 2',
        'Business Area': 'Area 2',
        'Customer Account': '901234',
        'Customer Account Name': 'Company Epsilon',
        ADID: 'IN',
        'Acc CLass': 'LPCG',
        'Acc Status': 'Active',
        'Status Pukal': 'TIDAK PUKAL',
        'No of Month Outstanding': 5,
        'Cur MTh Unpaid': 1500,
        'TTL o/S AMT': 7500,
        'Total Unpaid': 7000,
        'MoveOut Date': '2024-05-20',
        NamaAgensi: 'Agensi E',
        BilAkaun: 2,
        JumlahTunggakan: 7500,
    },
    {
        CustomerGroup: 'Group 6',
        Sector: 'Sector Z',
        'SMER SEGMENT': 'Segment 3',
        'Business Area': 'Area 3',
        'Customer Account': '567890',
        'Customer Account Name': 'Company Zeta',
        ADID: 'CM',
        'Acc CLass': 'OPCG',
        'Acc Status': 'Inactive',
        'Status Pukal': 'PUKAL',
        'No of Month Outstanding': 6,
        'Cur MTh Unpaid': 2000,
        'TTL o/S AMT': 12000,
        'Total Unpaid': 11000,
        'MoveOut Date': '2024-06-18',
        NamaAgensi: 'Agensi F',
        BilAkaun: 1,
        JumlahTunggakan: 12000,
    },
    {
        CustomerGroup: 'Group 7',
        Sector: 'Sector X',
        'SMER SEGMENT': 'Segment 1',
        'Business Area': 'Area 4',
        'Customer Account': '234567',
        'Customer Account Name': 'Company Eta',
        ADID: 'AG',
        'Acc CLass': 'LPCG',
        'Acc Status': 'Active',
        'Status Pukal': 'PUKAL',
        'No of Month Outstanding': 2,
        'Cur MTh Unpaid': 900,
        'TTL o/S AMT': 1800,
        'Total Unpaid': 1700,
        'MoveOut Date': '2024-07-10',
        NamaAgensi: 'Agensi G',
        BilAkaun: 2,
        JumlahTunggakan: 1800,
    },
    {
        CustomerGroup: 'Group 8',
        Sector: 'Sector Y',
        'SMER SEGMENT': 'Segment 2',
        'Business Area': 'Area 5',
        'Customer Account': '345679',
        'Customer Account Name': 'Company Theta',
        ADID: 'DM',
        'Acc CLass': 'OPCG',
        'Acc Status': 'Inactive',
        'Status Pukal': 'TIDAK PUKAL',
        'No of Month Outstanding': 3,
        'Cur MTh Unpaid': 1100,
        'TTL o/S AMT': 3300,
        'Total Unpaid': 3200,
        'MoveOut Date': '2024-08-15',
        NamaAgensi: 'Agensi H',
        BilAkaun: 1,
        JumlahTunggakan: 3300,
    },
    {
        CustomerGroup: 'Group 9',
        Sector: 'Sector Z',
        'SMER SEGMENT': 'Segment 3',
        'Business Area': 'Area 6',
        'Customer Account': '456789',
        'Customer Account Name': 'Company Iota',
        ADID: 'SL',
        'Acc CLass': 'LPCG',
        'Acc Status': 'Active',
        'Status Pukal': 'PUKAL',
        'No of Month Outstanding': 4,
        'Cur MTh Unpaid': 1300,
        'TTL o/S AMT': 5200,
        'Total Unpaid': 5000,
        'MoveOut Date': '2024-09-20',
        NamaAgensi: 'Agensi I',
        BilAkaun: 2,
        JumlahTunggakan: 5200,
    },
    {
        CustomerGroup: 'Group 10',
        Sector: 'Sector X',
        'SMER SEGMENT': 'Segment 1',
        'Business Area': 'Area 7',
        'Customer Account': '567891',
        'Customer Account Name': 'Company Kappa',
        ADID: 'IN',
        'Acc CLass': 'OPCG',
        'Acc Status': 'Inactive',
        'Status Pukal': 'PUKAL',
        'No of Month Outstanding': 5,
        'Cur MTh Unpaid': 1600,
        'TTL o/S AMT': 8000,
        'Total Unpaid': 7800,
        'MoveOut Date': '2024-10-25',
        NamaAgensi: 'Agensi J',
        BilAkaun: 1,
        JumlahTunggakan: 8000,
    },
];

const accClassOptions = ['All', 'LPCG', 'OPCG'];
const statusPukalOptions = ['All', 'PUKAL', 'TIDAK PUKAL'];
const adidOptions = ['All', 'CM', 'AG', 'DM', 'SL', 'IN'];

export default function GSorterDashboard() {
    const [filter, setFilter] = useState('Active');
    const [accClass, setAccClass] = useState('All');
    const [statusPukal, setStatusPukal] = useState('All');
    const [adid, setAdid] = useState('All');

    // Filter summary table by Acc Status (Active/Inactive/All)
    const filteredSummaryData = summaryData.filter(row => {
        // Find if there is at least one detailed row for this agency with the selected status
        if (filter === 'All') return true;
        return detailedData.some(
            d =>
                d.NamaAgensi === row.namaAgensi &&
                d['Acc Status'] === filter
        );
    });

    // Detailed table is filtered only by dropdowns below the table
    const filteredDetailedData = detailedData.filter(row => {
        return (
            (accClass === 'All' || row['Acc CLass'] === accClass) &&
            (statusPukal === 'All' || row['Status Pukal'] === statusPukal) &&
            (adid === 'All' || row['ADID'] === adid)
        );
    });

    // Donut Chart Data: TTL o/S AMT vs Total Unpaid (sum for all filteredDetailedData)
    const donutData = (() => {
        const ttlOsAmt = filteredDetailedData.reduce((sum, row) => sum + (row['TTL o/S AMT'] || 0), 0);
        const totalUnpaid = filteredDetailedData.reduce((sum, row) => sum + (row['Total Unpaid'] || 0), 0);
        return {
            labels: ['TTL o/S AMT', 'Total Unpaid'],
            datasets: [
                {
                    data: [ttlOsAmt, totalUnpaid],
                    backgroundColor: ['#3b82f6', '#22c55e'],
                    hoverBackgroundColor: ['#2563eb', '#16a34a'],
                },
            ],
        };
    })();

    // Bar Chart Data: TTL o/S AMT by Business Area (sum for each Business Area)
    const barData = (() => {
        const areaMap = {};
        filteredDetailedData.forEach(row => {
            const area = row['Business Area'];
            areaMap[area] = (areaMap[area] || 0) + (row['TTL o/S AMT'] || 0);
        });
        const labels = Object.keys(areaMap);
        const data = labels.map(area => areaMap[area]);
        return {
            labels,
            datasets: [
                {
                    label: 'TTL o/S AMT',
                    data,
                    backgroundColor: '#3b82f6',
                },
            ],
        };
    })();

    return (
        <>
            <Navbar />
            <main className="container mx-auto px-4 py-6">
                {/* Top controls */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <button
                        className="mb-4 md:mb-0 inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Generate Report
                    </button>
                    <div>
                        <label className="mr-2 font-medium text-gray-700">Filter:</label>
                        <select
                            value={filter}
                            onChange={e => setFilter(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                </div>

                <h1 className="text-2xl font-bold mb-1 text-blue-800">GSorter - Dashboard</h1>
                <p className="text-gray-600 mb-6">View and analyze data for the GSorter system.</p>

                {/* Summary Table */}
                <div className="bg-white border border-blue-200 rounded-lg mb-6 overflow-x-auto shadow">
                    <table className="min-w-full divide-y divide-blue-100">
                        <thead className="bg-blue-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                                    Nama Agensi
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                                    Bil Akaun
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                                    Jumlah Tunggakan
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-blue-100">
                            {filteredSummaryData.map((row, idx) => (
                                <tr key={idx}>
                                    <td className="px-6 py-4 whitespace-nowrap">{row.namaAgensi}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{row.bilAkaun}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">RM {row.jumlahTunggakan.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Detailed Table */}
                <div className="bg-white border border-blue-200 rounded-lg mb-6 overflow-x-auto shadow">
                    <table className="min-w-full divide-y divide-blue-100">
                        <thead className="bg-blue-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Customer Group</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Sector</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">SMER SEGMENT</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Business Area</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Customer Account</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Customer Account Name</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">ADID</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Acc CLass</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Acc Status</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Status Pukal</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">No of Month Outstanding</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Cur MTh Unpaid</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">TTL o/S AMT</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Total Unpaid</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">MoveOut Date</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-blue-100">
                            {filteredDetailedData.map((row, idx) => (
                                <tr key={idx}>
                                    <td className="px-4 py-2 whitespace-nowrap">{row.CustomerGroup}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">{row.Sector}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">{row['SMER SEGMENT']}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">{row['Business Area']}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">{row['Customer Account']}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">{row['Customer Account Name']}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">{row.ADID}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">{row['Acc CLass']}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">{row['Acc Status']}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">{row['Status Pukal']}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">{row['No of Month Outstanding']}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">RM {row['Cur MTh Unpaid'].toLocaleString()}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">RM {row['TTL o/S AMT'].toLocaleString()}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">RM {row['Total Unpaid'].toLocaleString()}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">{row['MoveOut Date']}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Filter dropdowns below detailed table */}
                <div className="flex flex-wrap gap-4 mb-8">
                    <div>
                        <label className="mr-2 font-medium text-blue-700">Acc Class:</label>
                        <select
                            value={accClass}
                            onChange={e => setAccClass(e.target.value)}
                            className="border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {accClassOptions.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="mr-2 font-medium text-blue-700">Status Pukal:</label>
                        <select
                            value={statusPukal}
                            onChange={e => setStatusPukal(e.target.value)}
                            className="border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {statusPukalOptions.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="mr-2 font-medium text-blue-700">ADID:</label>
                        <select
                            value={adid}
                            onChange={e => setAdid(e.target.value)}
                            className="border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {adidOptions.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* Donut Chart */}
                    <div className="bg-white border border-blue-200 rounded-lg shadow flex flex-col items-center justify-center py-8">
                        <div className="w-40 h-40 flex items-center justify-center">
                            <Doughnut data={donutData} />
                        </div>
                        <div className="mt-4 text-blue-700 font-medium">TTL O/S AMT vs TOTAL UNPAID</div>
                    </div>
                    {/* Bar Chart */}
                    <div className="bg-white border border-blue-200 rounded-lg shadow flex flex-col items-center justify-center py-8">
                        <div className="w-full h-40 flex items-center justify-center">
                            <Bar
                                data={barData}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: { display: false },
                                        title: { display: false },
                                    },
                                    scales: {
                                        x: { title: { display: true, text: 'Business Area' } },
                                        y: { title: { display: true, text: 'TTL o/S AMT' }, beginAtZero: true },
                                    },
                                }}
                            />
                        </div>
                        <div className="mt-4 text-blue-700 font-medium">TTL O/S AMT by Business Area</div>
                    </div>
                </div>
            </main>
        </>
    );
}
