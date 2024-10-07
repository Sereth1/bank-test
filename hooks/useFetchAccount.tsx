import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLoggedIn } from '@/context/LoggedInProvider';

interface Account {
    iban: string;
    id: string;
    username: string;
    email: string;
    account_type: string;
    balance: number;
    created_at: string;
    updated_at: string;
}

const useFetchAccount = () => {
    const [accountData, setAccountData] = useState<Account | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { user } = useLoggedIn();

    useEffect(() => {
        const fetchAccount = async () => {
            if (!user) return;

            setLoading(true);
            setError(null);

            try {
                const response = await axios.get('/api/get/account', {
                    params: {
                        email: user.email,
                        username: user.username,
                    },
                });

                if (response.status === 200) {
                    setAccountData(response.data);
                }
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (err) {
                setError('Failed to fetch account data');
            } finally {
                setLoading(false);
            }
        };

        fetchAccount();
    }, [user]);

    return { accountData, loading, error };
};

export default useFetchAccount;
