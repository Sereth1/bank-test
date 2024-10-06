'use client';
import useFetchTransactions from '@/hooks/useFetchTransactions';
import { useState } from 'react';

const TransactionsList = () => {
    const { transactions, loading, error } = useFetchTransactions();
    const [sortCriteria, setSortCriteria] = useState<string>('created_at');
    const [sortOrder, setSortOrder] = useState<string>('asc');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10); // Default to 10 items per page

    // Display loading or error messages
    if (loading) return <p>Loading transactions...</p>;
    if (error) return <p>Error: {error}</p>;

    // If data has finished loading and there is no error, render the component
    if (!transactions || transactions.length === 0) return <p>No transactions found.</p>;

    // Sort transactions
    const sortedTransactions = [...transactions].sort((a, b) => {
        if (sortCriteria === 'amount') {
            return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
        } else if (sortCriteria === 'created_at') {
            return sortOrder === 'asc'
                ? new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
                : new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        } else if (sortCriteria === 'description') {
            return sortOrder === 'asc'
                ? a.description.localeCompare(b.description)
                : b.description.localeCompare(a.description);
        }
        return 0;
    });

    // Calculate total pages
    const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);

    // Get current page transactions
    const currentTransactions = sortedTransactions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Handle page selection
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    // Handle items per page change
    const handleItemsPerPageChange = (value: number) => {
        setItemsPerPage(value);
        setCurrentPage(1); // Reset to the first page
    };

    return (
        <div>
            <h2 className="text-xl mb-4">Your Transactions</h2>

            {/* Sorting Options */}
            <div className="mb-4 flex gap-4">
                <div>
                    <label className="block mb-1">Sort By</label>
                    <select
                        value={sortCriteria}
                        onChange={(e) => setSortCriteria(e.target.value)}
                        className="border rounded p-2"
                    >
                        <option value="created_at">Date</option>
                        <option value="amount">Amount</option>
                        <option value="description">Description</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-1">Order</label>
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="border rounded p-2"
                    >
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-1">Elements Per Page</label>
                    <select
                        value={itemsPerPage}
                        onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                        className="border rounded p-2"
                    >
                        {Array.from({ length: 10 }, (_, i) => (i + 1) * 5).map((i) => (
                            <option key={i} value={i}>{i}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Transactions List */}
            <ul>
                {currentTransactions.map((transaction) => (
                    <li key={transaction.id} className="border p-2 mb-2">
                        <p>Type: {transaction.transaction_type}</p>
                        <p>Amount: {transaction.amount}</p>
                        <p>Description: {transaction.description}</p>
                        <p>Date: {transaction.created_at.slice(0, -5).replace('T', '  ')}</p>
                    </li>
                ))}
            </ul>

            {/* Pagination Controls */}
            <div className="mt-4 flex justify-center items-center gap-2">
                {/* Previous Button */}
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                    Previous
                </button>

                {/* Page Number Buttons */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                    <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`px-3 py-1 rounded ${currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        {pageNumber}
                    </button>
                ))}

                {/* Next Button */}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            {/* Current Page Info */}
            <p className="text-center mt-2">
                Page {currentPage} of {totalPages}
            </p>
        </div>
    );
};

export default TransactionsList;
