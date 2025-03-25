import { useState, useEffect } from "react";

export default function ChartView() {
  const [isLoading, setIsLoading] = useState(false);

  const fetchFileData = async () => {
    setIsLoading(true); // Set loading to true when the request starts

    try {
      const response = await fetch('http://localhost:3000/api/process-file', {
        method: 'GET',
        headers: {
          'x-data-type': 'disconnected',
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log('File data fetched:', result);
      }
    } catch (error) {
      console.error('Error fetching file data:', error);
    } finally {
      setTimeout(() => {

        setIsLoading(false); // Set loading to false when the request completes
      }, 6000);
    }
  };

  useEffect(() => {
    fetchFileData();
  }, []);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <h2 className="text-lg font-bold mb-4">Chart View</h2>
      {isLoading ? (
        <div className="flex justify-center items-center h-64 border border-gray-300 rounded-lg">
          <p className="text-gray-400">Loading...</p>
        </div>
      ) : (
        <div className="flex justify-center items-center h-64 border border-gray-300 rounded-lg">
          <p className="text-gray-400">Chart will be displayed here</p>
        </div>
      )}
    </div>
  );
}