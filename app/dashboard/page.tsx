'use client';
import React, { useState } from 'react';
import TransactionForm from '@/components/forms/TransactionForm';
import Options from '@/components/dashboard/Options';

export default function Page() {
    // Make sure this type matches everywhere
    const [method, setMethod] = useState<'' | 'Deposit' | 'Withdrawal' | 'Transfer'>('');

    return (
        <div>
            <Options setMethod={setMethod} />
            {method !== '' && <TransactionForm transactionType={method} setMethod={setMethod} />}
        </div>
    );
}
