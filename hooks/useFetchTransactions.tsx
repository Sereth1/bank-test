/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { useEffect, useState } from 'react';
import useFetchAccount from './useFetchAccount';

interface Transaction {
    id: string;
    account_id: string;
    transaction_type: 'Deposit' | 'Withdrawal' | 'Transfer';
    amount: number;
    description: string;
    created_at: string;
    counterparty_account_id?: string;
}

const useFetchTransactions = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { accountData } = useFetchAccount();

    useEffect(() => {
        console.log('User object:', accountData?.id);
    }, [accountData?.id]);

    useEffect(() => {
        const fetchTransactions = async () => {
            if (!accountData?.id || !accountData?.id) {
                setError('User is not logged in or ID is missing.');
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(`/api/get/transactions`, {
                    params: { userId: accountData?.id }
                });

                setTransactions(response.data.transactions);
            } catch (err: any) {
                if (axios.isAxiosError(err)) {
                    setError(err.response?.data.message || 'Failed to fetch transactions.');
                } else {
                    setError('An unexpected error occurred.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [accountData?.id]);

    return {
        transactions,
        loading,
        error,
    };
};

export default useFetchTransactions;
