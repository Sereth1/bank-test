'use client'
import React from 'react';
import useFetchAccount from '@/hooks/useFetchAccount';

const AccountInfo = () => {
    const { accountData, loading, error } = useFetchAccount();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!accountData) return <p>No account data found.</p>;

    return (
        <div>
            <h2>Account Information</h2>
            <p>Username: {accountData.username}</p>
            <p>Email: {accountData.email}</p>
            <p>Account Type: {accountData.account_type}</p>
            <p>Balance: {accountData.balance}</p>
            <p>iban:{accountData.iban}</p>
            <p>{accountData.id}</p>
        </div>
    );
};

export default AccountInfo;
