export default function TableView({ filter }) {
  const data = [
    { kod: 6210, kawasan: "TNB IPOH", bil: 685, gt2Years: 129, lt2Years: 57, lt12Months: 74, lt6Months: 407, lt3Months: 18, lt1Month: 0 },
    { kod: 6211, kawasan: "TNB KAMPAR", bil: 96, gt2Years: 3, lt2Years: 3, lt12Months: 8, lt6Months: 31, lt3Months: 33, lt1Month: 18 },
    { kod: 6212, kawasan: "TNB BIDOR", bil: 82, gt2Years: 1, lt2Years: 0, lt12Months: 16, lt6Months: 28, lt3Months: 22, lt1Month: 15 },
    { kod: 6213, kawasan: "TNB TANJONG MALIM", bil: 105, gt2Years: 1, lt2Years: 0, lt12Months: 5, lt6Months: 64, lt3Months: 22, lt1Month: 13 },
    { kod: 6218, kawasan: "TNB SERI ISKANDAR", bil: 80, gt2Years: 0, lt2Years: 19, lt12Months: 1, lt6Months: 39, lt3Months: 4, lt1Month: 17 },
    { kod: 6219, kawasan: "TNB ULU KINTA", bil: 244, gt2Years: 64, lt2Years: 20, lt12Months: 24, lt6Months: 63, lt3Months: 37, lt1Month: 36 },
    { kod: 6220, kawasan: "TNB TAIPING", bil: 365, gt2Years: 8, lt2Years: 29, lt12Months: 47, lt6Months: 118, lt3Months: 112, lt1Month: 51 },
    { kod: 6221, kawasan: "TNB BATU GAJAH", bil: 36, gt2Years: 0, lt2Years: 0, lt12Months: 2, lt6Months: 15, lt3Months: 15, lt1Month: 4 },
    { kod: 6222, kawasan: "TNB KUALA KANGSAR", bil: 52, gt2Years: 4, lt2Years: 3, lt12Months: 3, lt6Months: 18, lt3Months: 2, lt1Month: 22 },
    { kod: 6223, kawasan: "TNB GERIK", bil: 141, gt2Years: 0, lt2Years: 0, lt12Months: 12, lt6Months: 55, lt3Months: 41, lt1Month: 33 },
    { kod: 6224, kawasan: "TNB BAGAN SERAI", bil: 123, gt2Years: 1, lt2Years: 5, lt12Months: 8, lt6Months: 35, lt3Months: 41, lt1Month: 33 },
    { kod: 6225, kawasan: "TNB SG. SIPUT", bil: 304, gt2Years: 6, lt2Years: 20, lt12Months: 67, lt6Months: 187, lt3Months: 24, lt1Month: 0 },
    { kod: 6227, kawasan: "TNB SRI MANJUNG", bil: 282, gt2Years: 0, lt2Years: 5, lt12Months: 36, lt6Months: 79, lt3Months: 92, lt1Month: 70 },
    { kod: 6250, kawasan: "TNB TELUK INTAN", bil: 311, gt2Years: 15, lt2Years: 56, lt12Months: 32, lt6Months: 124, lt3Months: 64, lt1Month: 20 },
    { kod: 6252, kawasan: "TNB HUTAN MELINTANG", bil: 112, gt2Years: 9, lt2Years: 40, lt12Months: 11, lt6Months: 22, lt3Months: 12, lt1Month: 18 },
];

const totals = {
    bil: 3018,
    gt2Years: 241,
    lt2Years: 257,
    lt12Months: 346,
    lt6Months: 1285,
    lt3Months: 539,
    lt1Month: 350,
};

  const filteredData = filter === 'Keseluruhan' ? data : data.filter((row) => {
      if (filter === 'Revisit') return row.lt6Months > 50; // Example condition
      if (filter === 'Belum Revisit') return row.lt6Months <= 50; // Example condition
      return true;
  });

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
                {data.map((row, index) => (
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
                ))}
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
            </tbody>
        </table>
    </div>
</div>
  );
}

