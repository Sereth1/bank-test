'use client';
import React, { useState } from 'react';
import TransactionForm from '@/components/forms/TransactionForm';
import Options from '@/components/dashboard/Options';
import TransactionsList from '@/components/common/TransactionsList';

export default function Page() {
    // Make sure this type matches everywhere
    const [method, setMethod] = useState<'' | 'Deposit' | 'Withdrawal' | 'Transfer'>('');
    const [isOpen, setIsOpen] = useState<boolean>(false)
    return (
        <div>
            <Options setMethod={setMethod} setIsOpen={setIsOpen} isOpen={isOpen} />
            {method !== '' && <TransactionForm transactionType={method} setMethod={setMethod} />}
            {isOpen && <TransactionsList />}
        </div>
    );
}
