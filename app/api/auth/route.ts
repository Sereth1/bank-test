import { NextResponse } from 'next/server';
import pool from '@/utils/database';
import crypto from 'crypto';
import { RowDataPacket } from 'mysql2';

interface User extends RowDataPacket {
    id: string;
    password_hash: string;
}

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { message: 'Email and password are required' },
                { status: 400 }
            );
        }

        const user = await new Promise<User | null>((resolve, reject) => {
            pool.query(
                'SELECT id, password_hash FROM users WHERE email = ?',
                [email],
                (error, results) => {
                    if (error) {
                        console.error('Database error:', error);
                        reject(error);
                    } else {
                        const users = results as User[];
                        resolve(users.length > 0 ? users[0] : null);
                    }
                }
            );
        });

        if (!user) {
            return NextResponse.json(
                { message: 'Invalid email or password' },
                { status: 401 }
            );
        }

        const passwordHash = hashPassword(password);
        if (user.password_hash !== passwordHash) {
            return NextResponse.json(
                { message: 'Invalid email or password' },
                { status: 401 }
            );
        }

        return NextResponse.json(
            { message: 'Login successful', userId: user.id },
            { status: 200 }
        );
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}

function hashPassword(password: string): string {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
}
