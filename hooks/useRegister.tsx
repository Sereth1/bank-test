import { useState } from 'react';
import axios from 'axios';

const useRegister = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const register = async (formData: { username: string; email: string; password: string; name: string; surname: string; accountType: string }) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('/api/post/create/register', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('User registered successfully:', response.data);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data.message || 'Registration failed');
            } else {
                setError('An unexpected error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    return { register, loading, error };
};

export default useRegister;
