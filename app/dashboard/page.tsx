'use client'
import TransactionsList from '@/components/common/TransactionsList';
import Options from '@/components/dashboard/Options';
import TransactionForm from '@/components/forms/TransactionForm';
import { useState } from 'react';

export default function Page() {
    const [method, setMethod] = useState<'Deposit' | 'Withdrawal' | 'Transfer' | null>(null); // Change initial state to `null`

    console.log(method);

    return (
        <div>
            <Options setMethod={setMethod} />
            {method && <TransactionForm transactionType={method} setMethod={setMethod} />}
            <TransactionsList />
        </div>
    );
}
