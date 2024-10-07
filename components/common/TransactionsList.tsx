'use client';
import useFetchTransactions from '@/hooks/useFetchTransactions';
import { useState, useEffect } from 'react';

const TransactionsList = () => {
    const { transactions, loading, error } = useFetchTransactions();
    const [sortCriteria, setSortCriteria] = useState<string>('created_at');
    const [sortOrder, setSortOrder] = useState<string>('asc');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    const [transactionType, setTransactionType] = useState<string>('all');

    useEffect(() => {
        setCurrentPage(1);
    }, [transactionType]);

    if (loading) return <p>Loading transactions...</p>;
    if (error) return <p>Error: {error}</p>;

    if (!transactions || transactions.length === 0) return <p>No transactions found.</p>;

    const filteredTransactions = transactions.filter((transaction) => {
        return transactionType === 'all' || transaction.transaction_type === transactionType;
    });

    const sortedTransactions = [...filteredTransactions].sort((a, b) => {
        if (sortCriteria === 'amount') {
            return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
        } else if (sortCriteria === 'created_at') {
            return sortOrder === 'asc'
                ? new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
                : new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        }
        return 0;
    });

    const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);

    const currentTransactions = sortedTransactions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleItemsPerPageChange = (value: number) => {
        setItemsPerPage(value);
        setCurrentPage(1);
    };

    return (
        <div className="max-w-7xl mx-auto p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-center">Your Transactions</h2>

            <div className="mb-6 flex flex-wrap gap-4 justify-between items-center">
                <div>
                    <label className="block mb-1 text-gray-700">Sort By</label>
                    <select
                        value={sortCriteria}
                        onChange={(e) => setSortCriteria(e.target.value)}
                        className="border rounded-lg p-2 focus:outline-none focus:border-blue-500"
                    >
                        <option value="created_at">Date</option>
                        <option value="amount">Amount</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-1 text-gray-700">Order</label>
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="border rounded-lg p-2 focus:outline-none focus:border-blue-500"
                    >
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-1 text-gray-700">Transaction Type</label>
                    <select
                        value={transactionType}
                        onChange={(e) => setTransactionType(e.target.value)}
                        className="border rounded-lg p-2 focus:outline-none focus:border-blue-500"
                    >
                        <option value="all">All</option>
                        <option value="Deposit">Deposit</option>
                        <option value="Withdrawal">Withdraw</option>
                        <option value="Transfer">Transfer</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-1 text-gray-700">Elements Per Page</label>
                    <select
                        value={itemsPerPage}
                        onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                        className="border rounded-lg p-2 focus:outline-none focus:border-blue-500"
                    >
                        {Array.from({ length: 10 }, (_, i) => (i + 1) * 5).map((i) => (
                            <option key={i} value={i}>{i}</option>
                        ))}
                    </select>
                </div>
            </div>


            <ul className="space-y-4">
                {currentTransactions.map((transaction) => (
                    <li key={transaction.id} className="border p-4 rounded-lg shadow-sm hover:shadow-md transition duration-300">
                        <p className="text-gray-800 font-semibold">Type: {transaction.transaction_type}</p>
                        <p className="text-gray-800">Amount:
                            <span className="font-medium">
                                ${!isNaN(Number(transaction.amount)) ? Number(transaction.amount).toFixed(2) : 'N/A'}
                            </span>
                        </p>
                        <p className="text-gray-800">Description: {transaction.description}</p>
                        <p className="text-gray-600">Date: {transaction.created_at.slice(0, -5).replace('T', ' ')}</p>
                    </li>
                ))}
            </ul>

            <div className="mt-6 flex justify-center items-center gap-2">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 disabled:opacity-50"
                >
                    Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                    <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`px-3 py-1 rounded-lg ${currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-blue-200'} transition duration-300`}
                    >
                        {pageNumber}
                    </button>
                ))}

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            <p className="text-center mt-4 text-gray-700">
                Page {currentPage} of {totalPages}
            </p>
        </div>
    );
};

export default TransactionsList;
