import { useState, useEffect } from 'react';

export default function SummaryCards() {
  const [isLoading, setIsLoading] = useState(false);
  const [totals, setTotals] = useState({
    totalAccounts: 0,
    revisited: 0,
    notRevisited: 0,
  });

  const fetchFileData = async () => {
    setIsLoading(true);

    try {
      // Define the types to fetch
      const types = ['disconnected', 'revisit', 'belumrevisit'];
      const results = {};

      // Fetch data for each type sequentially
      for (const type of types) {
        const response = await fetch('http://localhost:3000/api/process-file', {
          method: 'GET',
          headers: {
            'x-data-type': type, // Use the current type
          },
        });

        if (response.ok) {
          const result = await response.json();
          results[type] = result; // Store the result for the current type
        } else {
          console.error(`Error fetching data for type: ${type}`);
        }
      }

      // Calculate totals
      const totalAccounts = Object.values(results.disconnected?.BACount || {}).reduce(
        (sum, area) => sum + area.total,
        0
      );
      const revisited = Object.values(results.revisit?.BACount || {}).reduce(
        (sum, area) => sum + area.total,
        0
      );
      const notRevisited = Object.values(results.belumrevisit?.BACount || {}).reduce(
        (sum, area) => sum + area.total,
        0
      );

      // Update state with the calculated totals
      setTotals({
        totalAccounts,
        revisited,
        notRevisited,
      });
    } catch (error) {
      console.error('Error fetching file data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFileData();
  }, []); // Fetch data once when the component mounts

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-sm font-medium text-gray-600 mb-2">Total Accounts</h2>
        <p className="text-3xl font-bold">{isLoading ? 'Loading...' : totals.totalAccounts}</p>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-sm font-medium text-gray-600 mb-2">Revisited</h2>
        <p className="text-3xl font-bold">{isLoading ? 'Loading...' : totals.revisited}</p>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-sm font-medium text-gray-600 mb-2">Not Revisited</h2>
        <p className="text-3xl font-bold">{isLoading ? 'Loading...' : totals.notRevisited}</p>
      </div>
    </div>
  );
}