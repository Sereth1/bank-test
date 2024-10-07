'use client';
import { useModal } from '@/context/ModalProvider';
import useLogin from '@/hooks/useLogin';
import useRegister from '@/hooks/useRegister';
import { animateModal } from '@/gsap/modalAnimation';
import { sendEmail } from '@/utilities/sendEmail';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const RegisterLoginForm = () => {
    const { isModalOpen, activeTab, closeModal, setActiveTab } = useModal();
    const modalRef = useRef<HTMLDivElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const notify = () => toast.success('Registration Completed');
    const failedLogin = (error: string) => toast.error(error);
    const errorNotify = (error: string) => toast.error(error);

    const initialFormData = {
        username: '',
        email: '',
        password: '',
        name: '',
        surname: '',
        accountType: ''
    };

    const [formData, setFormData] = useState(initialFormData);
    const { register, loading: registerLoading, error: registerError } = useRegister();
    const { login, loading: loginLoading, error: loginError } = useLogin();


    useEffect(() => {
        if (registerError)
            errorNotify(registerError);

    }, [registerError]);

    const resetFormData = () => {
        setFormData(initialFormData);
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (activeTab === 'register') {
            const registrationResponse = await register(formData);

            if (registrationResponse.success) {
                const emailResponse = await sendEmail(formData.email, formData.username);
                resetFormData();
                closeModal();
                notify();
                if (!emailResponse.success) {
                    console.error('Failed to send welcome email:', emailResponse.error);
                }
            }
        } else if (activeTab === 'login') {
            await login(formData.email, formData.password, '');

            if (!loginError) {
                resetFormData();
                router.push('/dashboard');
                closeModal();
            } else {
                failedLogin(loginError || 'Login failed');
            }
        }
    };

    useEffect(() => {
        animateModal(isModalOpen, modalRef, backdropRef);
    }, [isModalOpen]);



    return (
        <div>
            <Toaster position="bottom-right" reverseOrder={false} />
            {isModalOpen && (
                <>
                    <div
                        ref={backdropRef}
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                        onClick={closeModal}
                    ></div>

                    <div
                        ref={modalRef}
                        className="fixed inset-0 flex items-center justify-center z-50 px-4"
                    >
                        <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg relative">
                            <button
                                className="absolute top-3 right-3 text-black hover:text-gray-800"
                                onClick={closeModal}
                            >
                                ✕
                            </button>

                            <div className="flex justify-center mb-6">
                                <button
                                    className={`px-4 py-2 mx-2 rounded-t-lg ${activeTab === 'login' ? 'border-b-2 border-blue-500 text-black' : 'text-black hover:text-blue-500'
                                        }`}
                                    onClick={() => setActiveTab('login')}
                                >
                                    Login
                                </button>
                                <button
                                    className={`px-4 py-2 mx-2 rounded-t-lg ${activeTab === 'register' ? 'border-b-2 border-blue-500 text-black' : 'text-black hover:text-blue-500'
                                        }`}
                                    onClick={() => setActiveTab('register')}
                                >
                                    Register
                                </button>
                            </div>

                            {/* Login */}
                            {activeTab === 'login' && (
                                <form className="space-y-4" onSubmit={handleSubmit}>
                                    <div>
                                        <label className="block mb-1 text-black">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full border rounded-lg p-3 focus:outline-none focus:border-blue-500 text-black shadow-sm"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 text-black">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="w-full border rounded-lg p-3 focus:outline-none focus:border-blue-500 text-black shadow-sm"
                                            placeholder="Enter your password"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300 shadow-md"
                                        disabled={loginLoading}
                                    >
                                        {loginLoading ? 'Logging in...' : 'Login'}
                                    </button>
                                </form>
                            )}

                            {/* Register */}
                            {activeTab === 'register' && (
                                <form className="space-y-4" onSubmit={handleSubmit}>
                                    <div>
                                        <label className="block mb-1 text-black">Username</label>
                                        <input
                                            type="text"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            className="w-full border rounded-lg p-3 focus:outline-none focus:border-blue-500 text-black shadow-sm"
                                            placeholder="Choose a username"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 text-black">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full border rounded-lg p-3 focus:outline-none focus:border-blue-500 text-black shadow-sm"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 text-black">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="w-full border rounded-lg p-3 focus:outline-none focus:border-blue-500 text-black shadow-sm"
                                            placeholder="Enter a password"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 text-black">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full border rounded-lg p-3 focus:outline-none focus:border-blue-500 text-black shadow-sm"
                                            placeholder="Enter your name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 text-black">Surname</label>
                                        <input
                                            type="text"
                                            name="surname"
                                            value={formData.surname}
                                            onChange={handleChange}
                                            className="w-full border rounded-lg p-3 focus:outline-none focus:border-blue-500 text-black shadow-sm"
                                            placeholder="Enter your surname"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 text-black">Account Type</label>
                                        <select
                                            onChange={handleChange}
                                            name="accountType"
                                            value={formData.accountType}
                                            className="w-full border rounded-lg p-3 focus:outline-none focus:border-blue-500 text-black shadow-sm"
                                        >
                                            <option value="" disabled>
                                                Select account type
                                            </option>
                                            <option value="Investment">Investment</option>
                                            <option value="Business">Business</option>
                                            <option value="Savings">Savings</option>
                                            <option value="Checking">Checking</option>
                                        </select>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300 shadow-md"
                                        disabled={registerLoading}
                                    >
                                        {registerLoading ? 'Registering...' : 'Register'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default RegisterLoginForm