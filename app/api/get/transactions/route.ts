import { NextResponse } from 'next/server';
import pool from '@/utils/database';
import { RowDataPacket } from 'mysql2';
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    const connection = await pool.promise().getConnection();
    try {
        const userId = request.url.split('?userId=')[1];

        if (!userId) {
            return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
        }

        const [accounts] = await connection.query<RowDataPacket[]>(
            'SELECT id FROM accounts WHERE id = ?',
            [userId]
        );

        if (accounts.length === 0) {
            return NextResponse.json({ message: 'No accounts found for this user' }, { status: 404 });
        }

        const accountId = accounts[0].id;

        const [transactions] = await connection.query<RowDataPacket[]>(
            'SELECT * FROM transactions WHERE account_id = ?',
            [accountId]
        );

        return NextResponse.json({ transactions }, { status: 200 });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    } finally {
        connection.release();
    }
}
