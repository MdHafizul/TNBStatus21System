'use client';

import { useState } from 'react';
import Navbar from '@/components/navbar';

export default function Upload() {
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    // Handle file upload logic here
    const files = e.dataTransfer.files;
    console.log('Files dropped:', files);
  };
  
  const handleFileChange = (e) => {
    const files = e.target.files;
    console.log('Files selected:', files);
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
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <p className="mt-4 text-sm text-gray-600">Click to upload or drag and drop</p>
            <p className="text-xs text-gray-500 mt-1">Excel files only (.xlsx)</p>
            
            <input 
              type="file" 
              className="hidden" 
              id="file-upload" 
              accept=".xlsx"
              onChange={handleFileChange}
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
    </>
  );
}