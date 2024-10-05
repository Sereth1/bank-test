import React from 'react';

interface ButtonProps {
    label: string;
    variant: 'primary' | 'secondary';
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, variant, onClick, }) => {
    return (
        <button
            onClick={onClick}
            className={`px-6 py-2 rounded-full text-sm font-medium transition ${variant === 'primary'
                ? `bg-blue-500 text-white hover:bg-blue-600`
                : 'border border-white text-white hover:bg-white hover:text-blue-500 '
                }`}
        >
            {label}
        </button>
    );
};

export default Button;
