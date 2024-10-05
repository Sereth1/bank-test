// entities/Account.ts

import {
    Entity,
    PrimaryColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from './User';

@Entity('accounts')
export class Account {
    @PrimaryColumn({ type: 'varchar', length: 36 })
    id!: string;

    @ManyToOne(() => User, (user) => user.accounts)
    user!: User;

    @Column({ name: 'account_number', unique: true, length: 34 })
    accountNumber!: string;

    @Column({ name: 'account_type', length: 50 })
    accountType!: string;

    @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
    balance!: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
}
