interface OptionsProps {
    setMethod: React.Dispatch<React.SetStateAction<'Deposit' | 'Withdrawal' | 'Transfer' | ''>>;
}

const Options: React.FC<OptionsProps> = ({ setMethod }) => {
    return (
        <div>
            <button onClick={() => setMethod('Deposit')}>Deposit</button>
            <button onClick={() => setMethod('Withdrawal')}>Withdraw</button>
            <button onClick={() => setMethod('Transfer')}>Transfer</button>
            <button onClick={() => setMethod('')}>Reset</button>
        </div>
    );
};


export default Options