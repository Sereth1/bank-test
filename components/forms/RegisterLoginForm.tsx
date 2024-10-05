'use client';
import React, { useEffect, useRef } from 'react';
import { useModal } from '@/context/ModalProvider';
import { gsap } from 'gsap';

const RegisterLoginForm = () => {
    const { isModalOpen, activeTab, openModal, closeModal, setActiveTab } = useModal();
    const modalRef = useRef<HTMLDivElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);
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
        <section
            className="relative h-screen bg-cover bg-center bg-no-repeat overflow-hidden flex items-center justify-center"
            style={{ backgroundImage: 'url(/backgrounds/introImage.jpg)' }}
        >
            <button
                className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-700 transition duration-300"
                onClick={() => openModal('login')}
            >
                Open Modal
            </button>

            {isModalOpen && (
                <>
                    <div
                        ref={backdropRef}
                        className="fixed inset-0 bg-black z-40"
                        onClick={closeModal}
                    ></div>

                    <div
                        ref={modalRef}
                        className="fixed inset-0 flex items-center justify-center z-50"
                    >
                        <div className="bg-white w-96 rounded-lg p-6 relative shadow-lg">
                            <button
                                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                                onClick={closeModal}
                            >
                                ✕
                            </button>

                            {/* Tabs */}
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

                            {activeTab === 'login' && (
                                <form className="space-y-4">
                                    <div>
                                        <label className="block mb-1 text-gray-700">Email</label>
                                        <input
                                            type="email"
                                            className="w-full border rounded p-2 focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 text-gray-700">Password</label>
                                        <input
                                            type="password"
                                            className="w-full border rounded p-2 focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
                                    >
                                        Login
                                    </button>
                                </form>
                            )}

                            {activeTab === 'register' && (
                                <form className="space-y-4">
                                    <div>
                                        <label className="block mb-1 text-gray-700">Username</label>
                                        <input
                                            type="text"
                                            className="w-full border rounded p-2 focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 text-gray-700">Email</label>
                                        <input
                                            type="email"
                                            className="w-full border rounded p-2 focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 text-gray-700">Password</label>
                                        <input
                                            type="password"
                                            className="w-full border rounded p-2 focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
                                    >
                                        Register
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </>
            )}
        </section>
    );
};

export default RegisterLoginForm;
