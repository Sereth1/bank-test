'use client';
import React, { useState } from 'react';
import useTransaction from '@/hooks/useTransaction';

interface TransactionFormProps {
    transactionType: 'Deposit' | 'Withdrawal' | 'Transfer';
    setMethod: (method: '' | 'Deposit' | 'Withdrawal' | 'Transfer') => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ transactionType, setMethod }) => {
    const [amount, setAmount] = useState<number>(0);
    const [description, setDescription] = useState<string>('');
    const [targetIban, setTargetIban] = useState<string>('');
    const { deposit, withdraw, transfer, loading, error, successMessage } = useTransaction();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (amount <= 0) {
            alert('Please enter a valid amount.');
            return;
        }

        try {
            if (transactionType === 'Deposit') {
                await deposit({ amount, description });
            } else if (transactionType === 'Withdrawal') {
                await withdraw({ amount, description });
            } else if (transactionType === 'Transfer') {
                if (!targetIban) {
                    alert('Please enter a valid target IBAN for transfer.');
                    return;
                }
                await transfer({ amount, description, targetIban });
            }
        } catch (error) {
            console.error('Transaction error:', error);
        }
    };

    return (
        <div className="flex items-center justify-center pt-20">
            <div className="p-10 border rounded-lg shadow-lg max-w-md w-full">
                <div className="flex justify-between">
                    <h2 className="text-xl mb-4 text-center">{transactionType}</h2>
                    <button onClick={() => setMethod('')} className="text-red-500">X</button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-gray-700">Amount</label>
                        <input
                            type="number"
                            name="amount"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className="w-full border rounded p-2 focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    {transactionType === 'Transfer' && (
                        <div>
                            <label className="block mb-1 text-gray-700">Target IBAN</label>
                            <input
                                type="text"
                                name="targetIban"
                                value={targetIban}
                                onChange={(e) => setTargetIban(e.target.value)}
                                className="w-full border rounded p-2 focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                    )}

                    <div>
                        <label className="block mb-1 text-gray-700">Description</label>
                        <input
                            type="text"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full border rounded p-2 focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : transactionType}
                    </button>

                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
                </form>
            </div>
        </div>
    );
};

export default TransactionForm;
