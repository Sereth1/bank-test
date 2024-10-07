'use client';
import React, { useState } from 'react';
import useTransaction from '@/hooks/useTransaction';
import { AiOutlineClose } from 'react-icons/ai';
import { FaMoneyBillWave, FaArrowRight, FaWallet } from 'react-icons/fa';

interface TransactionFormProps {
    transactionType: 'Deposit' | 'Withdrawal' | 'Transfer';
    setMethod: React.Dispatch<React.SetStateAction<'Deposit' | 'Withdrawal' | 'Transfer' | ''>>;
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
        <div className="flex items-center justify-center py-20 px-4 ">
            <div className="p-8 border rounded-lg shadow-lg max-w-lg w-full bg-white">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        {transactionType === 'Deposit' && <FaMoneyBillWave className="inline mr-2" />}
                        {transactionType === 'Withdrawal' && <FaWallet className="inline mr-2" />}
                        {transactionType === 'Transfer' && <FaArrowRight className="inline mr-2" />}
                        {transactionType}
                    </h2>
                    <button onClick={() => setMethod('')} className="text-gray-500 hover:text-red-500 transition duration-300">
                        <AiOutlineClose size={24} />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col bg-gray-100 p-4 rounded-md shadow-sm">
                        <label className="mb-2 text-gray-700 font-medium">Amount</label>
                        <input
                            type="number"
                            name="amount"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            placeholder="Enter amount"
                            required
                        />
                        <small className="text-gray-500 mt-2">Minimum amount: 1</small>
                    </div>

                    {transactionType === 'Transfer' && (
                        <div className="flex flex-col bg-gray-100 p-4 rounded-md shadow-sm">
                            <label className="mb-2 text-gray-700 font-medium">Target IBAN</label>
                            <input
                                type="text"
                                name="targetIban"
                                value={targetIban}
                                onChange={(e) => setTargetIban(e.target.value)}
                                className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                placeholder="Enter target IBAN"
                                required
                            />
                            <small className="text-gray-500 mt-2">Ensure the IBAN is correctly formatted.</small>
                        </div>
                    )}

                    <div className="flex flex-col bg-gray-100 p-4 rounded-md shadow-sm">
                        <label className="mb-2 text-gray-700 font-medium">Description</label>
                        <input
                            type="text"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            placeholder="Optional description"
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-3 rounded-lg text-white transition duration-300 ${transactionType === 'Deposit' ? 'bg-blue-500 hover:bg-blue-600' :
                            transactionType === 'Withdrawal' ? 'bg-green-500 hover:bg-green-600' :
                                'bg-purple-500 hover:bg-blue-600'
                            }`}
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : `Confirm ${transactionType}`}
                    </button>

                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
                </form>
            </div>
        </div>
    );
};

export default TransactionForm;
