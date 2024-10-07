'use client'
import React, { useState } from 'react';

const IBANInput = () => {
    const [iban, setIban] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const letters = iban.slice(0, 2);
        const numbers = iban.slice(2);

        if (letters.length === 2 && /^[A-Z]{2}$/.test(letters) && /^[0-9]+$/.test(numbers)) {
            setError('');
            alert('IBAN is valid!');
        } else {
            setError('Invalid IBAN format. It should start with two letters followed by numbers.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    type="text"
                    value={iban}
                    onChange={(e) => setIban(e.target.value.toUpperCase())}
                    placeholder="Enter IBAN"
                    maxLength={34}
                    className="border p-2 rounded"
                />
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
            <button
                type="submit"
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
            >
                Submit
            </button>
        </form>
    );
};

export default IBANInput;
