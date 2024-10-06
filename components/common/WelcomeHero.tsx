'use client'
import useFetchAccount from '@/hooks/useFetchAccount'
import React from 'react'

export default function WelcomeHero() {
    const { accountData } = useFetchAccount()
    return (
        <div className='text-xl pt-48 w-full px-4'>
            <div className='flex flex-col gap-4 items-center md:flex-row md:justify-around md:gap-10'>
                <h1>Welcome {accountData?.username}</h1>
                <div className='flex'>
                    <p>Balance:</p>   <h1 className='blur cursor-pointer hover:blur-0'> {accountData?.balance}$</h1>

                </div>
                <h1>IBAN: {accountData?.iban}</h1>
            </div>
        </div>
    )
}
