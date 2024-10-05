import { NextResponse } from 'next/server';
import pool from '@/utils/database';
import crypto from 'crypto';

export async function POST(request: Request) {
    const connection = await pool.promise().getConnection(); // Use promise-based connection
    try {
        // Parse request body
        const { username, email, password, name, surname, accountType } = await request.json();

        const validationError = validateInput({ username, email, password, name, surname, accountType });
        if (validationError) {
            return NextResponse.json(
                { message: validationError },
                { status: 400 }
            );
        }

        await connection.beginTransaction();

        const [existingAccounts] = await connection.query(
            'SELECT id FROM accounts WHERE username = ? OR email = ?',
            [username, email]
        );

        if (!existingAccounts) {
            await connection.rollback();
            connection.release();
            return NextResponse.json(
                { message: 'Username or email already exists' },
                { status: 400 }
            );
        }

        // Generate unique ID for the account
        const accountId = crypto.randomUUID().replace(/-/g, '').slice(0, 36); // Create a 36-char UUID for the account

        // Hash the password
        const passwordHash = hashPassword(password);

        // Ensure accountType is not null or provide a default value
        const finalAccountType = accountType || 'Default';

        // Insert the new account with generated IBAN
        await connection.query(
            `INSERT INTO accounts 
            (id, username, email, password_hash, name, surname, account_number, iban, account_type, balance) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                accountId, username, email, passwordHash, name, surname,
                generateAccountNumber(), generateIban(), finalAccountType, 0.00
            ]
        );

        // Commit the transaction
        await connection.commit();
        connection.release();

        return NextResponse.json(
            { message: 'Account created successfully' },
            { status: 201 }
        );
    } catch (error) {
        console.error('Registration error:', error);
        // Roll back the transaction in case of an error
        await connection.rollback();
        connection.release();
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}

// Helper function to hash passwords
function hashPassword(password: string): string {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
}

// Helper function to generate an IBAN
function generateIban(): string {
    const countryCode = "DE"; // Example: Germany
    const bankCode = "12345678"; // Mock bank identifier
    const checkDigits = Math.floor(10 + Math.random() * 90).toString(); // 2-digit check digits
    const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString(); // Unique 10-digit account number
    return `${countryCode}${checkDigits}${bankCode}${accountNumber}`;
}

// Helper function to generate an account number
function generateAccountNumber(): string {
    return `ACC-${Math.floor(1000000000 + Math.random() * 9000000000)}`;
}

// Custom input validation function
function validateInput(data: {
    username: string;
    email: string;
    password: string;
    name: string;
    surname: string;
    accountType?: string;
}): string | null {
    if (!data.username || data.username.length > 50) {
        return 'Username is required and must be at most 50 characters';
    }
    if (!data.email || data.email.length > 100 || !validateEmail(data.email)) {
        return 'A valid email is required and must be at most 100 characters';
    }
    if (!data.password || data.password.length < 8 || data.password.length > 255) {
        return 'Password is required and must be between 8 and 255 characters';
    }
    if (!data.name || data.name.length > 100) {
        return 'Name is required and must be at most 100 characters';
    }
    if (!data.surname || data.surname.length > 100) {
        return 'Surname is required and must be at most 100 characters';
    }
    if (!data.accountType || data.accountType.length > 50) {
        return 'Account type is required and must be at most 50 characters';
    }
    return null;
}


// Simple email validation function
function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
