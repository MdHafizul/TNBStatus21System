'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import Navbar from '@/components/navbar';
import Snackbar from '@/components/snackBar';

export default function Upload() {
  const [isDragging, setIsDragging] = useState(false);
  const [snackbar, setSnackbar] = useState({ message: '', type: '' });
  const router = useRouter(); // Initialize useRouter

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      setSnackbar({ message: 'No file selected', type: 'error' });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error?.message || 'Failed to upload file');
      }

      const result = await response.json();
      console.log('File uploaded successfully:', result);
      setSnackbar({ message: 'File uploaded and processed successfully!', type: 'success' });
    } catch (error) {
      console.error('Error uploading file:', error);
      setSnackbar({ message: error.message, type: 'error' });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ message: '', type: '' });
  };

  const handleSnackbarClick = () => {
    if (snackbar.type === 'success') {
      router.push('/dashboard'); // Navigate to the dashboard page
    }
  };

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-1">Upload Data</h1>
        <p className="text-gray-600 mb-6">Upload Excel files containing disconnected accounts or debts data.</p>

        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div
            className={`border-2 border-dashed rounded-lg p-12 text-center ${
              isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              handleFileUpload(e);
            }}
          >
            <p className="mt-4 text-sm text-gray-600">Click to upload or drag and drop</p>
            <p className="text-xs text-gray-500 mt-1">Excel files only (.xlsx)</p>
            <input
              type="file"
              className="hidden"
              id="file-upload"
              accept=".xlsx"
              onChange={handleFileUpload}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="file-upload">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                onClick={() => document.getElementById('file-upload').click()}
              >
                Upload File
              </button>
            </label>
          </div>
        </div>
      </main>

      {/* Snackbar */}
      <Snackbar
        message={snackbar.message}
        type={snackbar.type}
        onClose={handleCloseSnackbar}
        onClick={handleSnackbarClick} // Add onClick handler
      />
    </>
  );
}