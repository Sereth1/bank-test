export const dynamic = "force-dynamic";
import pool from '@/utils/database';
import { NextResponse } from 'next/server';
import { RowDataPacket } from 'mysql2';

interface Account extends RowDataPacket {
    id: string;
    username: string;
    email: string;
    account_type: string;
    balance: number;
    created_at: string;
    updated_at: string;
}


export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');
        const username = searchParams.get('username');

        if (!email && !username) {
            return NextResponse.json({ message: 'Email or username must be provided' }, { status: 400 });
        }

        let query = 'SELECT * FROM accounts WHERE ';
        const queryParams: string[] = [];

        if (email) {
            query += 'email = ?';
            queryParams.push(email);
        }

        if (username) {
            query += email ? ' OR username = ?' : 'username = ?';
            queryParams.push(username);
        }

        const db = await pool.promise().getConnection();
        const [rows] = await db.query<Account[]>(query, queryParams);
        db.release();

        if (rows.length === 0) {
            return NextResponse.json({ message: 'Account not found' }, { status: 404 });
        }

        return NextResponse.json(rows[0], { status: 200 });

    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
