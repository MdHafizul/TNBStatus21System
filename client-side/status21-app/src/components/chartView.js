import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

// Register Chart.js components and the datalabels plugin
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

export default function ChartView({ filter }) {
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false); // State to manage full-screen mode

  // Fetch file data from the API
  const fetchFileData = async () => {
    setIsLoading(true);
    try {
      const typeMap = {
        Keseluruhan: "disconnected",
        Revisit: "revisit",
        "Belum Revisit": "belumrevisit",
      };

      const response = await fetch(`http://localhost:3000/api/process-file`, {
        method: "GET",
        headers: {
          "x-data-type": typeMap[filter],
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch file data");
      }

      const result = await response.json();
      transformDataForChart(result.BACount);
    } catch (error) {
      console.error("Error fetching file data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Transform API data into Chart.js format
  const transformDataForChart = (BACount) => {
    const labels = Object.keys(BACount).map(
      (key) => BACount[key]["Business Area Name"]
    );
    const categories = [
      "0-1Months",
      "<3Months",
      "<6Months",
      "<12Months",
      "<2Years",
      ">2Years",
    ];

    const datasets = categories.map((category) => ({
      label: category,
      data: Object.keys(BACount).map((key) => BACount[key][category] || 0),
      backgroundColor: getCategoryColor(category),
    }));

    setChartData({
      labels,
      datasets,
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      "0-1Months": "#4caf50", // Green
      "<3Months": "#2196f3", // Blue
      "<6Months": "#ff9800", // Orange
      "<12Months": "#f44336", // Red
      "<2Years": "#9c27b0", // Purple
      ">2Years": "#607d8b", // Gray
    };
    return colors[category] || "#000000";
  };

  useEffect(() => {
    fetchFileData();
  }, [filter]);

  // Chart options with datalabels configured to display inside the bars.
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Ensures the chart does not maintain a fixed aspect ratio
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Disconnected Accounts by Business Area",
      },
      datalabels: {
        anchor: "center",
        align: "center",
        color: "#000000",
        font: {
          weight: "bold",
          size: 12,
        },
        formatter: (value) => (value !== 0 ? value : ""),
      },
    },
    scales: {
      x: {
        stacked: false, // Ensure bars are not stacked
      },
      y: {
        stacked: false, // Ensure bars are not stacked
        beginAtZero: true,
      },
    },
    elements: {
      bar: {
        minBarLength: 20, // Ensures each bar has a minimum length of 20 pixels
      },
    },
  };

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 p-6 mb-6 ${
        isFullScreen ? "fixed inset-0 z-50 bg-white" : ""
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Chart View</h2>
        <button
          onClick={() => setIsFullScreen(!isFullScreen)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          {isFullScreen ? "Exit Full Screen" : "Full Screen"}
        </button>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-64 border border-gray-300 rounded-lg">
          <p className="text-gray-400">Loading...</p>
        </div>
      ) : chartData ? (
        <div style={{ width: "100%", height: isFullScreen ? "90vh" : "400px" }}>
          <Bar data={chartData} options={chartOptions} />
        </div>
      ) : (
        <div className="flex justify-center items-center h-64 border border-gray-300 rounded-lg">
          <p className="text-gray-400">No data available</p>
        </div>
      )}
    </div>
  );
}