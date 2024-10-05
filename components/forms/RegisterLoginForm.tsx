'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useModal } from '@/context/ModalProvider';
import { gsap } from 'gsap';
import useRegister from '@/hooks/useRegister'; // Import the hook

const RegisterLoginForm = () => {
    const { isModalOpen, activeTab, openModal, closeModal, setActiveTab } = useModal();
    const modalRef = useRef<HTMLDivElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);

    // Form data state for register form
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        name: '',
        surname: '',
        accountType: ''
    });

    // Using the custom hook for registration
    const { register, loading, error } = useRegister();

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (activeTab === 'register') {
            // Call the register function from the hook
            register(formData);
        }
        // Add logic for login if needed
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
            {/* Trigger buttons */}
            <button onClick={() => openModal('login')} className="bg-black text-white px-4 py-2 rounded mr-2">
                Open Login
            </button>
            <button onClick={() => openModal('register')} className="bg-black text-white px-4 py-2 rounded">
                Open Register
            </button>

            {/* Modal */}
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

                            {/* Tabs for Login and Register */}
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

                            {/* Register Form */}
                            {activeTab === 'register' && (
                                <form className="space-y-4" onSubmit={handleSubmit}>
                                    <div>
                                        <label className="block mb-1 text-gray-700">Username</label>
                                        <input
                                            type="text"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            className="w-full border rounded p-2 focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
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
                                    <div>
                                        <label className="block mb-1 text-gray-700">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full border rounded p-2 focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 text-gray-700">Surname</label>
                                        <input
                                            type="text"
                                            name="surname"
                                            value={formData.surname}
                                            onChange={handleChange}
                                            className="w-full border rounded p-2 focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 text-gray-700">Account Type</label>
                                        <input
                                            type="text"
                                            name="accountType"
                                            value={formData.accountType}
                                            onChange={handleChange}
                                            className="w-full border rounded p-2 focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
                                        disabled={loading}
                                    >
                                        {loading ? 'Registering...' : 'Register'}
                                    </button>
                                    {error && <p className="text-red-500">{error}</p>}
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
