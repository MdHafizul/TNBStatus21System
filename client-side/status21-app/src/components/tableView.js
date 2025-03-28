import { useState, useEffect } from "react";

export default function TableView({ filter }) {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [totals, setTotals] = useState({
        bil: 0,
        gt2Years: 0,
        lt2Years: 0,
        lt12Months: 0,
        lt6Months: 0,
        lt3Months: 0,
        lt1Month: 0,
    });

    const fetchFileData = async () => {
        setIsLoading(true);

        try {
            // Map filter to x-data-type header
            const typeMap = {
                Keseluruhan: 'disconnected',
                Revisit: 'revisit',
                'Belum Revisit': 'belumrevisit',
            };

            const response = await fetch('http://localhost:3000/api/process-file', {
                method: 'GET',
                headers: {
                    'x-data-type': typeMap[filter],
                },
            });

            if (response.ok) {
                const result = await response.json();
                const transformedData = Object.entries(result.BACount).map(([kod, values]) => ({
                    kod,
                    kawasan: values["Business Area Name"],
                    bil: values.total,
                    gt2Years: values[">2Years"],
                    lt2Years: values["<2Years"],
                    lt12Months: values["<12Months"],
                    lt6Months: values["<6Months"],
                    lt3Months: values["<3Months"],
                    lt1Month: values["0-1Months"],
                }));

                // Calculate totals
                const totalValues = transformedData.reduce(
                    (acc, row) => {
                        acc.bil += row.bil;
                        acc.gt2Years += row.gt2Years;
                        acc.lt2Years += row.lt2Years;
                        acc.lt12Months += row.lt12Months;
                        acc.lt6Months += row.lt6Months;
                        acc.lt3Months += row.lt3Months;
                        acc.lt1Month += row.lt1Month;
                        return acc;
                    },
                    { bil: 0, gt2Years: 0, lt2Years: 0, lt12Months: 0, lt6Months: 0, lt3Months: 0, lt1Month: 0 }
                );

                setData(transformedData);
                setTotals(totalValues);
            }
        } catch (error) {
            console.error('Error fetching file data:', error);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, ); // Simulate loading delay
        }
    };

    useEffect(() => {
        fetchFileData();
    }, [filter]); // Refetch data when the filter changes

    return (
        <div className="bg-white border border-gray-200 rounded-lg mb-6">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kod Kwsn</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Kawasan</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BIL CA</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">&gt; 2 years</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">&lt; 2 Years</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">&lt; 12 month</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">&lt; 6 month</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">&lt; 3 months</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">0-1 month</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {isLoading ? (
                            <tr>
                                <td colSpan="9" className="text-center py-4 text-gray-500">
                                    Loading...
                                </td>
                            </tr>
                        ) : (
                            data.map((row, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.kod}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.kawasan}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.bil}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.gt2Years}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.lt2Years}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.lt12Months}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.lt6Months}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.lt3Months}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.lt1Month}</td>
                                </tr>
                            ))
                        )}
                        {!isLoading && (
                            <tr className="bg-gray-100 font-bold">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Grand Total</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{totals.bil}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{totals.gt2Years}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{totals.lt2Years}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{totals.lt12Months}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{totals.lt6Months}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{totals.lt3Months}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{totals.lt1Month}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}