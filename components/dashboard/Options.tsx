'use client';
import React, { useEffect } from 'react';

interface OptionsProps {
    setMethod: React.Dispatch<React.SetStateAction<'Deposit' | 'Withdrawal' | 'Transfer' | ''>>;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isOpen: boolean;
    method: 'Deposit' | 'Withdrawal' | 'Transfer' | '';
}

const Options: React.FC<OptionsProps> = ({ setMethod, setIsOpen, isOpen, method }) => {
    useEffect(() => {
        if (method !== '') {
            setIsOpen(false);
        }
    }, [method, setIsOpen]);

    const handleTran = () => {
        setIsOpen(!isOpen);
        setMethod('');
    };

    return (
        <div className='flex justify-evenly p-4 m-10 border rounded-xl bg-white shadow-md'>
            <button
                onClick={() => setMethod('Deposit')}
                className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300'
            >
                Deposit
            </button>
            <button
                onClick={() => setMethod('Withdrawal')}
                className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300'
            >
                Withdraw
            </button>
            <button
                onClick={() => setMethod('Transfer')}
                className='px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition duration-300'
            >
                Transfer
            </button>
            <button
                onClick={handleTran}
                className='px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-300'
            >
                Transaction List
            </button>
        </div>
    );
};

export default Options;
