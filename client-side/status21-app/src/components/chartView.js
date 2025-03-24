'use client';

import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Import the plugin

export default function ChartView({ filter }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Data from the table
  const data = [
    { label: 'TNB IPOH', values: [129, 57, 74, 407, 18, 0] },
    { label: 'TNB KAMPAR', values: [3, 3, 8, 31, 33, 18] },
    { label: 'TNB BIDOR', values: [1, 0, 16, 28, 22, 15] },
    { label: 'TNB TANJONG MALIM', values: [1, 0, 5, 64, 22, 13] },
    { label: 'TNB SERI ISKANDAR', values: [0, 19, 1, 39, 4, 17] },
    { label: 'TNB ULU KINTA', values: [64, 20, 24, 63, 37, 36] },
    { label: 'TNB TAIPING', values: [8, 29, 47, 118, 112, 51] },
    { label: 'TNB BATU GAJAH', values: [0, 0, 2, 15, 15, 4] },
    { label: 'TNB KUALA KANGSAR', values: [4, 3, 3, 18, 2, 22] },
    { label: 'TNB GERIK', values: [0, 0, 12, 55, 41, 33] },
    { label: 'TNB BAGAN SERAI', values: [1, 5, 8, 35, 41, 33] },
    { label: 'TNB SG. SIPUT', values: [6, 20, 67, 187, 24, 0] },
    { label: 'TNB SRI MANJUNG', values: [0, 5, 36, 79, 92, 70] },
    { label: 'TNB TELUK INTAN', values: [15, 56, 32, 124, 64, 20] },
    { label: 'TNB HUTAN MELINTANG', values: [9, 40, 11, 22, 12, 18] },
  ];

  // Filter the data based on the selected filter
  const filteredData = filter === 'Keseluruhan' ? data : data.filter((row) => {
    if (filter === 'Revisit') return row.values[3] > 50; // Example condition: > 6 months > 50
    if (filter === 'Belum Revisit') return row.values[3] <= 50; // Example condition: > 6 months <= 50
    return true;
  });

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Destroy the existing chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Fixed colors for time frames
    const colors = [
      '#FF6384', // > 2 Years
      '#36A2EB', // < 2 Years
      '#FFCE56', // < 12 Months
      '#4BC0C0', // < 6 Months
      '#9966FF', // < 3 Months
      '#FF9F40', // 0-1 Month
    ];

    // Prepare datasets grouped by time categories
    const categories = ['> 2 Years', '< 2 Years', '< 12 Months', '< 6 Months', '< 3 Months', '0-1 Month'];
    const datasets = categories.map((category, index) => ({
      label: category,
      data: filteredData.map((row) => row.values[index]), // Extract values for the category
      backgroundColor: colors[index], // Use fixed colors
    }));

    // Create a new chart instance
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: filteredData.map((row) => row.label), // Area names
        datasets: datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Allow resizing
        plugins: {
          legend: {
            position: 'top', // Position the legend at the top
          },
          title: {
            display: true,
            text: 'Stacked Bar Chart of TNB Data by Time Category',
          },
          datalabels: {
            anchor: 'center', // Position labels in the center of bars
            align: 'center',
            color: '#000', // Label color
            font: {
              size: 10, // Font size for labels
            },
            formatter: (value) => (value > 0 ? value : ''), // Only show labels for non-zero values
          },
        },
        scales: {
          x: {
            stacked: true, // Stacked bar chart
            title: {
              display: true,
              text: 'Nama Kawasan',
            },
            ticks: {
              maxRotation: 45, // Rotate labels for better readability
              minRotation: 45,
            },
          },
          y: {
            stacked: true,
            beginAtZero: true,
            title: {
              display: true,
              text: 'Count',
            },
          },
        },
      },
      plugins: [ChartDataLabels], // Add the datalabels plugin
    });

    // Cleanup on component unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [filter]); // Re-run the effect when the filter changes

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6" style={{ height: '600px', width: '100%' }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
}