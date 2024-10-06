'use client'
import Options from '@/components/dashboard/Options';
import TransactionForm from '@/components/forms/TransactionForm';
import { useState } from 'react';

export default function Page() {
    const [method, setMethod] = useState<string>('');
    console.log(method);

    return (
        <div>

            <Options setMethod={setMethod} />

            {method !== '' && < TransactionForm transactionType={method} setMethod={setMethod} />}
        </div>
    );
}
