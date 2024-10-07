import IBANInput from '@/components/common/IBANInput'
import React from 'react'

export default function page() {
    return (
        <div className='max-h-full min-w-full pt-64'>
            <div className='text-black'><h1>
                I created this IBAN input with a verification function because I’m implementing logic in the backend that requires valid IBANs for testing. This ensures only correct IBANs are processed, reducing errors</h1></div>


            <IBANInput /></div>
    )
}
