interface OptionsProps {
    setMethod: React.Dispatch<React.SetStateAction<'Deposit' | 'Withdrawal' | 'Transfer' | ''>>;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isOpen: boolean;
}

const Options: React.FC<OptionsProps> = ({ setMethod, setIsOpen, isOpen }) => {
    return (
        <div className='flex justify-evenly p-2 m-10 mt-56 border rounded-xl'>
            <button onClick={() => setMethod('Deposit')}>Deposit</button>
            <button onClick={() => setMethod('Withdrawal')}>Withdraw</button>
            <button onClick={() => setMethod('Transfer')}>Transfer</button>
            <button onClick={() => setIsOpen(!isOpen)}>TransactionList</button>
        </div>
    );
};

export default Options;
