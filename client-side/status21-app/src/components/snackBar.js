'use client';

import { useEffect } from 'react';

export default function Snackbar({ message, type, onClose }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Auto-close after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className={`px-6 py-4 rounded shadow-lg text-white text-center ${
          type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}
      >
        <p className="text-lg font-semibold">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-white text-gray-800 rounded hover:bg-gray-100"
        >
          Close
        </button>
      </div>
    </div>
  );
}