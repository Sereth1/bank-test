'use client';
import TransactionsList from '@/components/common/TransactionsList';
import WelcomeHero from '@/components/common/WelcomeHero';
import Options from '@/components/dashboard/Options';
import TransactionForm from '@/components/forms/TransactionForm';
import { useLoggedIn } from '@/context/LoggedInProvider';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
    const [method, setMethod] = useState<'' | 'Deposit' | 'Withdrawal' | 'Transfer'>('');
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const { user } = useLoggedIn()
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/')
        }



    }, [])
    console.log(`we have a ${user?.username}`);

    return (
        <div className=''>
            {user && <div> <WelcomeHero />
                <Options setMethod={setMethod} setIsOpen={setIsOpen} method={method} isOpen={isOpen} />
                {method !== '' && <TransactionForm transactionType={method} setMethod={setMethod} />}
                {<div className={`${isOpen ? '' : 'hidden'}`}>
                    <TransactionsList />

                </div>}</div>}

        </div>
    );
}
