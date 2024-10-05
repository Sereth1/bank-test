import { NextResponse } from 'next/server';
import pool from '@/utils/database';
import crypto from 'crypto';

export async function POST(request: Request) {
    const connection = await pool.promise().getConnection(); // Use promise-based connection
    try {
        // Parse request body
        const { username, email, password, name, surname, accountType } = await request.json();

        // Perform input validation
        const validationError = validateInput({ username, email, password, name, surname, accountType });
        if (validationError) {
            return NextResponse.json(
                { message: validationError },
                { status: 400 }
            );
        }

        // Start a transaction
        await connection.beginTransaction();

        // Check if user already exists
        const [existingUsers] = await connection.query(
            'SELECT id FROM users WHERE username = ? OR email = ?',
            [username, email]
        );

        if (existingUsers.length > 0) {
            await connection.rollback();
            connection.release();
            return NextResponse.json(
                { message: 'Username or email already exists' },
                { status: 400 }
            );
        }

        // Generate unique IDs
        const userId = crypto.randomUUID().replace(/-/g, '').slice(0, 34); // Create a 34-char UUID
        const accountId = crypto.randomUUID().replace(/-/g, '').slice(0, 36); // Create a 36-char UUID for the account

        // Hash the password
        const passwordHash = hashPassword(password);

        // Insert the new user
        await connection.query(
            'INSERT INTO users (id, username, email, password_hash, name, surname) VALUES (?, ?, ?, ?, ?, ?)',
            [userId, username, email, passwordHash, name, surname]
        );

        // Ensure accountType is not null or provide a default value
        const finalAccountType = accountType || 'Default';

        // Insert the new account
        await connection.query(
            'INSERT INTO accounts (id, user_id, account_number, account_type, balance) VALUES (?, ?, ?, ?, ?)',
            [accountId, userId, generateAccountNumber(), finalAccountType, 0.00]
        );

        // Commit the transaction
        await connection.commit();
        connection.release();

        return NextResponse.json(
            { message: 'User and account created successfully' },
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

// Helper function to generate a dummy account number
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
