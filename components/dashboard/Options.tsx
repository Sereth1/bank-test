import React from 'react'
interface OptionsProps {
    setMethod: React.Dispatch<React.SetStateAction<string>>;
}


export default function Options({ setMethod }: OptionsProps) {

    return (
        <div className='flex justify-evenly p-2 m-10 mt-56 border rounded-xl'>


            <button onClick={() => setMethod('Deposit')}>Deposit</button>
            <button onClick={() => setMethod('Withdrawal')}>Withdraw</button>
            <button onClick={() => setMethod('Transfer')}>Transfer</button>
            <button onClick={() => setMethod('transactions')}>Transactions</button>


        </div >

    )
} 
