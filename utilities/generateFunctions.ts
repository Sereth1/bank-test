import crypto from 'crypto';

function generateIban(): string {
    const countryCode = "DE";
    const bankCode = "12345678";
    const checkDigits = Math.floor(10 + Math.random() * 90).toString();
    const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    return `${countryCode}${checkDigits}${bankCode}${accountNumber}`;
}


function generateAccountNumber(): string {
    return `ACC-${Math.floor(1000000000 + Math.random() * 9000000000)}`;
}

function hashPassword(password: string): string {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
}





export { generateIban, generateAccountNumber, hashPassword }