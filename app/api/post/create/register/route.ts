import { NextApiRequest, NextApiResponse } from 'next';
import { initializeDataSource } from '@/utils/databas';
import { AppDataSource } from '@/config/typeorm.config';
import { User } from '@/entities/User';
import bcrypt from 'bcryptjs';

import * as yup from 'yup';

// Define the schema for validation
const userRegistrationSchema = yup.object().shape({
    id: yup.string().required(),
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    name: yup.string().required(),
    surname: yup.string().required(),
});

const SALT_ROUNDS = 10;

export default async function registerHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { id, username, email, password, name, surname } = req.body;

        await userRegistrationSchema.validate(req.body);

        // Initialize the data source
        await initializeDataSource();

        // Get the user repository
        const userRepository = AppDataSource.getRepository(User);

        // Check if username or email already exists
        const existingUser = await userRepository.findOne({
            where: [{ username }, { email }],
        });

        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        // Hash the password
        const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

        // Create new user instance
        const newUser = new User();
        newUser.id = id;
        newUser.username = username;
        newUser.email = email;
        newUser.passwordHash = passwordHash;
        newUser.name = name;
        newUser.surname = surname;

        // Save the user to the database
        await userRepository.save(newUser);

        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            return res.status(400).json({ message: error.errors[0] });
        }

        console.error('Registration error:', error);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((error as any).code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        return res.status(500).json({ message: 'Internal server error' });
    }
}
