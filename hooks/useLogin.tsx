/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import axios from 'axios';
import { useLoggedIn } from '@/context/LoggedInProvider';

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { logIn } = useLoggedIn();

    const login = async (email: string, password: string, id: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('/api/auth', { email, password, id });

            if (response.status === 200) {
                const { username, email, id } = response.data;
                logIn({ username, email, id });

                return { success: true };
            }

            console.log('Login successful:', response.data);
        } catch (err: any) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data.message || 'Login failed');
            } else {
                setError('An unexpected error occurred');
            }

            return { success: false, error: err.response?.data.message || 'Login failed' };
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error };
};

export default useLogin;
