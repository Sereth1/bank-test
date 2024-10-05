import { useState } from 'react';
import axios from 'axios';

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('/api/login', { email, password });
            console.log('Login successful:', response.data);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data.message || 'Login failed');
            } else {
                setError('An unexpected error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error };
};

export default useLogin;
