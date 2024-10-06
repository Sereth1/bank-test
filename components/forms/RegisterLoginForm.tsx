'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useModal } from '@/context/ModalProvider';
import { gsap } from 'gsap';
import useRegister from '@/hooks/useRegister';
import useLogin from '@/hooks/useLogin';
import { useRouter } from 'next/navigation';


const RegisterLoginForm = () => {
    const { isModalOpen, activeTab, closeModal, setActiveTab } = useModal();
    const modalRef = useRef<HTMLDivElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);
    const router = useRouter()
    // Form data state
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        name: '',
        surname: '',
        accountType: ''
    });

    const { register, loading: registerLoading, error: registerError } = useRegister();
    const { login, loading: loginLoading, error: loginError } = useLogin();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (activeTab === 'register') {
            register(formData);
        } else if (activeTab === 'login') {
            await login(formData.email, formData.password, '');
            router.push('/dashboard');
            closeModal();
        }
    };

    useEffect(() => {
        if (isModalOpen) {
            gsap.fromTo(
                modalRef.current,
                { y: -100, opacity: 0, scale: 0.8 },
                { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' }
            );

            gsap.fromTo(
                backdropRef.current,
                { opacity: 0 },
                { opacity: 0.5, duration: 0.5, ease: 'power3.out' }
            );
        } else {
            gsap.to(modalRef.current, {
                y: -100,
                opacity: 0,
                scale: 0.8,
                duration: 0.5,
                ease: 'power3.in',
            });

            gsap.to(backdropRef.current, {
                opacity: 0,
                duration: 0.5,
                ease: 'power3.in',
            });
        }
    }, [isModalOpen]);

    return (
        <div>

            {isModalOpen && (
                <>
                    <div
                        ref={backdropRef}
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                        onClick={closeModal}
                    ></div>

                    <div
                        ref={modalRef}
                        className="fixed inset-0 flex items-center justify-center z-50"
                    >
                        <div className="bg-white w-full max-w-md p-6 rounded shadow-lg relative">
                            <button
                                className="absolute top-2 right-2 text-gray-500"
                                onClick={closeModal}
                            >
                                ✕
                            </button>

                            <div className="flex justify-center mb-6">
                                <button
                                    className={`px-4 py-2 mx-2 ${activeTab === 'login' ? 'border-b-2 border-blue-500' : 'text-gray-500'}`}
                                    onClick={() => setActiveTab('login')}
                                >
                                    Login
                                </button>
                                <button
                                    className={`px-4 py-2 mx-2 ${activeTab === 'register' ? 'border-b-2 border-blue-500' : 'text-gray-500'}`}
                                    onClick={() => setActiveTab('register')}
                                >
                                    Register
                                </button>
                            </div>

                            {/* Login Form */}
                            {activeTab === 'login' && (
                                <form className="space-y-4" onSubmit={handleSubmit}>
                                    <div>
                                        <label className="block mb-1 text-gray-700">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full border rounded p-2 focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 text-gray-700">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="w-full border rounded p-2 focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
                                        disabled={loginLoading}
                                    >
                                        {loginLoading ? 'Logging in...' : 'Login'}
                                    </button>
                                    {loginError && <p className="text-red-500">{loginError}</p>}
                                </form>
                            )}
                            {/* Register Form */}
                            {activeTab === 'register' && (
                                <form className="space-y-4" onSubmit={handleSubmit}>
                                    <div>
                                        <label className="block mb-1 text-black">Username</label>
                                        <input
                                            type="text"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            className="w-full border rounded p-2 focus:outline-none text-black focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 text-black">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full border rounded p-2 focus:outline-none text-black focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 text-black">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="w-full border rounded p-2 focus:outline-none text-black focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 text-black">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full border rounded p-2 focus:outline-none text-black text-black focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 text-black">Surname</label>
                                        <input
                                            type="text"
                                            name="surname"
                                            value={formData.surname}
                                            onChange={handleChange}
                                            className="w-full border rounded p-2 focus:outline-none text-black focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 text-black">Account Type</label>
                                        <select
                                            onChange={handleChange}
                                            name="accountType"
                                            value={formData.accountType}
                                            className="w-full border rounded p-2 focus:outline-none text-black focus:border-blue-500"
                                        >
                                            <option value=""></option>

                                            <option value="Investment">Investment</option>
                                            <option value="Business">Business</option>
                                            <option value="Savings">Savings</option>
                                            <option value="Checking">Checking</option>
                                        </select>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
                                        disabled={registerLoading}
                                    >
                                        {registerLoading ? 'Registering...' : 'Register'}
                                    </button>
                                    {registerError && <p className="text-red-500">{registerError}</p>}
                                </form>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default RegisterLoginForm;
