'use client';
import React, { useState } from 'react';
import TransactionForm from '@/components/forms/TransactionForm';
import Options from '@/components/dashboard/Options';
import TransactionsList from '@/components/common/TransactionsList';
import WelcomeHero from '@/components/common/WelcomeHero';

export default function Page() {
    const [method, setMethod] = useState<'' | 'Deposit' | 'Withdrawal' | 'Transfer'>('');
    const [isOpen, setIsOpen] = useState<boolean>(false)
    return (
        <div>
            <WelcomeHero />
            <Options setMethod={setMethod} setIsOpen={setIsOpen} method={method} isOpen={isOpen} />
            {method !== '' && <TransactionForm transactionType={method} setMethod={setMethod} />}
            {<div className={`${isOpen ? '' : 'hidden'}`}>
                <TransactionsList />

            </div>}

        </div>
    );
}
