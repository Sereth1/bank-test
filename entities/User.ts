// entities/User.ts

import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import { Account } from './Account';

@Entity('users')
export class User {
    @PrimaryColumn({ type: 'varchar', length: 34 })
    id!: string;

    @Column({ unique: true, length: 50 })
    username!: string;

    @Column({ unique: true, length: 100 })
    email!: string;

    @Column({ name: 'password_hash', length: 255 })
    passwordHash!: string;

    @Column({ length: 100 })
    name!: string;

    @Column({ length: 100 })
    surname!: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;

    @OneToMany(() => Account, (account) => account.user)
    accounts!: Account[];
}
