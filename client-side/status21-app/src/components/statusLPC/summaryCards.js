'use client';

import { useState, useEffect } from 'react';
import Snackbar from '../snackBar';

export default function SummaryCards() {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        bilAkaun: 0,
        totalUnpaid: 0,
        totalPayment: 0,
        balanceToCollect: 0
    });
    const [snackbar, setSnackbar] = useState({ message: '', type: '' });

    useEffect(() => {
        async function fetchSummaryData() {
            setIsLoading(true);
            try {
                const response = await fetch('http://localhost:3000/api/v2/statusLPC/summaryCards');
                if (!response.ok) {
                    throw new Error(`Failed to fetch summary data: ${response.statusText}`);
                }
                const result = await response.json();
                setData(result.data || {
                    bilAkaun: 0,
                    totalUnpaid: 0,
                    totalPayment: 0,
                    balanceToCollect: 0
                });
            } catch (error) {
                console.error('Error fetching summary data:', error);
                setSnackbar({ message: 'Error fetching summary data', type: 'error' });
            } finally {
                setIsLoading(false);
            }
        }
        
        fetchSummaryData();
    }, []);

    return (
        <>
            {snackbar.message && (
                <Snackbar
                    message={snackbar.message}
                    type={snackbar.type}
                    onClose={() => setSnackbar({ message: '', type: '' })}
                />
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-lg border border-purple-200 p-6 shadow-sm">
                    <h2 className="text-sm font-medium text-purple-600 mb-2">Bil Akaun</h2>
                    <p className="text-3xl font-bold">
                        {isLoading ? '...' : data.bilAkaun ? data.bilAkaun.toLocaleString() : 0}
                    </p>
                </div>
                <div className="bg-white rounded-lg border border-purple-200 p-6 shadow-sm">
                    <h2 className="text-sm font-medium text-purple-600 mb-2">Total Unpaid</h2>
                    <p className="text-3xl font-bold">
                        {isLoading ? '...' : `RM ${data.totalUnpaid ? data.totalUnpaid.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}`}
                    </p>
                </div>
                <div className="bg-white rounded-lg border border-purple-200 p-6 shadow-sm">
                    <h2 className="text-sm font-medium text-purple-600 mb-2">Total Payment</h2>
                    <p className="text-3xl font-bold">
                        {isLoading ? '...' : `RM ${data.totalPayment ? data.totalPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}`}
                    </p>
                </div>
                <div className="bg-white rounded-lg border border-purple-200 p-6 shadow-sm">
                    <h2 className="text-sm font-medium text-purple-600 mb-2">Balance to Collect</h2>
                    <p className="text-3xl font-bold">
                        {isLoading ? '...' : `RM ${data.balanceToCollect ? data.balanceToCollect.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}`}
                    </p>
                </div>
            </div>
        </>
    );
}