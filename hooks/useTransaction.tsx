/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import axios from 'axios';
import useFetchAccount from './useFetchAccount';

interface TransactionProps {
    amount: number;
    description?: string;
    targetIban?: string; // Updated for transfers
}

const useTransaction = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const { accountData } = useFetchAccount();

    const deposit = async ({ amount, description }: TransactionProps) => {
        if (!accountData?.id) {
            setError('Account ID is required.');
            return;
        }
        return await handleTransaction({ accountId: accountData.id, amount, description, transactionType: 'Deposit' });
    };

    const withdraw = async ({ amount, description }: TransactionProps) => {
        if (!accountData?.id) {
            setError('Account ID is required.');
            return;
        }
        return await handleTransaction({ accountId: accountData.id, amount, description, transactionType: 'Withdrawal' });
    };

    const transfer = async ({ amount, targetIban, description }: TransactionProps) => {
        if (!accountData?.id) {
            setError('Account ID is required.');
            return;
        }
        if (!targetIban) {
            setError('Target IBAN is required for transfers.');
            return;
        }
        return await handleTransaction({ accountId: accountData.id, amount, description, transactionType: 'Transfer', targetIban });
    };

    const handleTransaction = async ({ accountId, amount, description, transactionType, targetIban }:
        TransactionProps & { accountId: string; transactionType: 'Deposit' | 'Withdrawal' | 'Transfer'; }) => {
        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            const response = await axios.post('/api/transaction', {
                accountId,
                transactionType,
                amount,
                description,
                targetIban,
            });
            setSuccessMessage(response.data.message);
            return response.data;
        } catch (err: any) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data.message || 'Transaction failed');
            } else {
                setError('An unexpected error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    return {
        deposit,
        withdraw,
        transfer,
        loading,
        error,
        successMessage,
    };
};

export default useTransaction;
