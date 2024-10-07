'use client';
import useFetchTransactions from '@/hooks/useFetchTransactions';
import { useState, useEffect } from 'react';

const TransactionsList = () => {
    const { transactions, loading, error } = useFetchTransactions();
    const [sortCriteria, setSortCriteria] = useState<string>('created_at');
    const [sortOrder, setSortOrder] = useState<string>('desc');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    const [transactionType, setTransactionType] = useState<string>('all');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');


    useEffect(() => {
        setCurrentPage(1);
        setSortCriteria('created_at');
        setSortOrder('desc');
    }, [transactionType, startDate, endDate, transactions]);

    if (loading) return <p>Loading transactions...</p>;
    if (error) return <p>Error: {error}</p>;

    if (!transactions || transactions.length === 0) return <p>No transactions found.</p>;

    const filteredTransactions = transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.created_at).getTime();
        const start = startDate ? new Date(startDate).getTime() : null;
        const end = endDate ? new Date(endDate).getTime() : null;

        return (
            (transactionType === 'all' || transaction.transaction_type === transactionType) &&
            (!start || transactionDate >= start) &&
            (!end || transactionDate <= end)
        );
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

    const handleResetFilters = () => {
        setTransactionType('all');
        setStartDate('');
        setEndDate('');
        setItemsPerPage(10);
        setCurrentPage(1);
    };

    return (
        <div className="max-w-7xl mx-auto p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-center text-black">Your Transactions</h2>

            <div className="mb-6 flex flex-wrap gap-4 justify-between items-center">
                <div>
                    <label className="block mb-1 text-black">Sort By</label>
                    <select
                        value={sortCriteria}
                        onChange={(e) => setSortCriteria(e.target.value)}
                        className="border rounded-lg p-2 focus:outline-none focus:border-blue-500 text-black"
                    >
                        <option value="created_at" className="text-black">Date</option>
                        <option value="amount" className="text-black">Amount</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-1 text-black">Order</label>
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="border rounded-lg p-2 focus:outline-none focus:border-blue-500 text-black"
                    >
                        <option value="asc" className="text-black">Ascending</option>
                        <option value="desc" className="text-black">Descending</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-1 text-black">Transaction Type</label>
                    <select
                        value={transactionType}
                        onChange={(e) => setTransactionType(e.target.value)}
                        className="border rounded-lg p-2 focus:outline-none focus:border-blue-500 text-black"
                    >
                        <option value="all" className="text-black">All</option>
                        <option value="Deposit" className="text-black">Deposit</option>
                        <option value="Withdrawal" className="text-black">Withdraw</option>
                        <option value="Transfer" className="text-black">Transfer</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-1 text-black">Start Date</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border rounded-lg p-2 focus:outline-none focus:border-blue-500 text-black"
                    />
                </div>
                <div>
                    <label className="block mb-1 text-black">End Date</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="border rounded-lg p-2 focus:outline-none focus:border-blue-500 text-black"
                    />
                </div>
                <div>
                    <label className="block mb-1 text-black">Elements Per Page</label>
                    <select
                        value={itemsPerPage}
                        onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                        className="border rounded-lg p-2 focus:outline-none focus:border-blue-500 text-black"
                    >
                        {Array.from({ length: 10 }, (_, i) => (i + 1) * 5).map((i) => (
                            <option key={i} value={i} className="text-black">{i}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <button
                        onClick={handleResetFilters}
                        className="px-4 py-2 bg-red-500 text-black rounded-lg hover:bg-red-600 transition duration-300"
                    >
                        Reset Filters
                    </button>
                </div>
            </div>

            <ul className="space-y-4">
                {currentTransactions.map((transaction) => (
                    <li key={transaction.id} className="border p-4 rounded-lg shadow-sm hover:shadow-md transition duration-300">
                        <p className="text-black font-semibold">Type: {transaction.transaction_type}</p>
                        <p className="text-black">Amount:
                            <span className="font-medium">
                                ${!isNaN(Number(transaction.amount)) ? Number(transaction.amount).toFixed(2) : 'N/A'}
                            </span>
                        </p>
                        <p className="text-black">Description: {transaction.description}</p>
                        <p className="text-black">Date: {new Date(transaction.created_at).toLocaleString()}</p>
                    </li>
                ))}
            </ul>

            <div className="mt-6 flex justify-center items-center gap-2">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-blue-500 text-black rounded-lg hover:bg-blue-600 transition duration-300 disabled:opacity-50"
                >
                    Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                    <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`px-3 py-1 rounded-lg ${currentPage === pageNumber ? 'bg-blue-500 text-black' : 'bg-gray-200 text-black hover:bg-blue-200'} transition duration-300`}
                    >
                        {pageNumber}
                    </button>
                ))}

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-blue-500 text-black rounded-lg hover:bg-blue-600 transition duration-300 disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            <p className="text-center mt-4 text-black">
                Page {currentPage} of {totalPages}
            </p>
        </div>
    );

};

export default TransactionsList;
