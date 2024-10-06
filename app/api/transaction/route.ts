export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server';
import pool from '@/utils/database';
import { RowDataPacket } from 'mysql2';

interface Account extends RowDataPacket {
    id: string;
    balance: number;
    iban: string;
}

export async function POST(request: Request) {
    const connection = await pool.promise().getConnection();
    try {
        const { accountId, transactionType, amount, description, targetIban } = await request.json();

        if (!accountId || !transactionType || !amount || !['Deposit', 'Withdrawal', 'Transfer'].includes(transactionType)) {
            return NextResponse.json(
                { message: 'Invalid input' },
                { status: 400 }
            );
        }

        const formattedAmount = parseFloat(amount).toFixed(2);

        // Start a transaction
        await connection.beginTransaction();

        // Fetch the sender's account
        const [senderAccounts] = await connection.query(
            'SELECT id, balance FROM accounts WHERE id = ?',
            [accountId]
        );

        if (!Array.isArray(senderAccounts) || senderAccounts.length === 0) {
            await connection.rollback();
            connection.release();
            return NextResponse.json(
                { message: 'Sender account not found' },
                { status: 404 }
            );
        }

        const senderAccount = senderAccounts[0] as Account;
        let newSenderBalance = parseFloat(senderAccount.balance.toString());

        // Handling Transfer
        if (transactionType === 'Transfer') {
            if (!targetIban) {
                await connection.rollback();
                connection.release();
                return NextResponse.json(
                    { message: 'Target IBAN is required for transfer' },
                    { status: 400 }
                );
            }

            const [recipientAccounts] = await connection.query(
                'SELECT id, balance FROM accounts WHERE iban = ?',
                [targetIban]
            );

            if (!Array.isArray(recipientAccounts) || recipientAccounts.length === 0) {
                await connection.rollback();
                connection.release();
                return NextResponse.json(
                    { message: 'Recipient account not found' },
                    { status: 404 }
                );
            }

            const recipientAccount = recipientAccounts[0] as Account;
            let newRecipientBalance = parseFloat(recipientAccount.balance.toString());

            // Check if the sender has enough balance
            if (parseFloat(formattedAmount) > newSenderBalance) {
                await connection.rollback();
                connection.release();
                return NextResponse.json(
                    { message: 'Insufficient balance' },
                    { status: 400 }
                );
            }

            // Deduct from sender's balance
            newSenderBalance -= parseFloat(formattedAmount);

            // Add to recipient's balance
            newRecipientBalance += parseFloat(formattedAmount);

            // Update the sender's balance
            await connection.query(
                'UPDATE accounts SET balance = ? WHERE id = ?',
                [newSenderBalance.toFixed(2), accountId]
            );

            // Update the recipient's balance
            await connection.query(
                'UPDATE accounts SET balance = ? WHERE id = ?',
                [newRecipientBalance.toFixed(2), recipientAccount.id]
            );

            // Insert the transfer transaction
            await connection.query(
                'INSERT INTO transactions (account_id, transaction_type, amount, counterparty_account_id, description) VALUES (?, ?, ?, ?, ?)',
                [accountId, transactionType, formattedAmount, recipientAccount.id, description || '']
            );

        } else {
            // Handle Deposit or Withdrawal as in the previous example
        }

        await connection.commit();
        connection.release();

        return NextResponse.json(
            { message: 'Transaction successful', newBalance: newSenderBalance.toFixed(2) },
            { status: 200 }
        );
    } catch (error) {
        console.error('Transaction error:', error);
        await connection.rollback();
        connection.release();
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
