'use client';
import useFetchAccount from '@/hooks/useFetchAccount';
import React from 'react';

export default function WelcomeHero() {
    const { accountData } = useFetchAccount();

    return (
        <div className="pt-20 w-full px-4 bg-white shadow-md rounded-lg">
            <div className="flex flex-col gap-4 items-center md:flex-row md:justify-around md:gap-10 py-8">
                <h1 className="text-2xl font-semibold text-gray-700">
                    Welcome, <span className="text-blue-600">{accountData?.username}</span>
                </h1>

                <div className="flex items-center gap-2">
                    <p className="text-lg text-gray-600">Balance:</p>
                    <h1 className="text-xl font-medium text-gray-800 blur cursor-pointer hover:blur-0 transition duration-300">
                        {accountData?.balance}$
                    </h1>
                </div>

                <div className="flex items-center gap-2">
                    <p className="text-lg text-gray-600">IBAN:</p>
                    <h1 className="text-xl font-medium text-gray-800">{accountData?.iban}</h1>
                </div>
            </div>
        </div>
    );
}
