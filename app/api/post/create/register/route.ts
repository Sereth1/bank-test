import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { initializeDataSource } from '@/utils/databas';
import { AppDataSource } from '@/config/typeorm.config';
import { User } from '@/entities/User';
import bcrypt from 'bcrypt';
import * as yup from 'yup';

const userRegistrationSchema = yup.object().shape({
    id: yup.string().required(),
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    name: yup.string().required(),
    surname: yup.string().required(),
});

const SALT_ROUNDS = 10;

export async function POST(req: NextRequest) {
    try {
        const { id, username, email, password, name, surname } = await req.json();

        await userRegistrationSchema.validate({ id, username, email, password, name, surname });

        await initializeDataSource();

        const userRepository = AppDataSource.getRepository(User);

        const existingUser = await userRepository.findOne({
            where: [{ username }, { email }],
        });

        if (existingUser) {
            return NextResponse.json(
                { success: false, message: 'Username or email already exists' },
                { status: 400 }
            );
        }

        const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
        const newUser = new User();
        newUser.id = id;
        newUser.username = username;
        newUser.email = email;
        newUser.passwordHash = passwordHash;
        newUser.name = name;
        newUser.surname = surname;
        await userRepository.save(newUser);
        return NextResponse.json(
            { success: true, message: 'User registered successfully' },
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            return NextResponse.json(
                { success: false, message: error.errors[0] },
                { status: 400 }
            );
        }

        console.error('Registration error:', error);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((error as any).code === 'ER_DUP_ENTRY') {
            return NextResponse.json(
                { success: false, message: 'Username or email already exists' },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}
