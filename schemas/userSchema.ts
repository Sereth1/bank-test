// schemas/userSchema.ts

import * as yup from 'yup';

export const userRegistrationSchema = yup.object({
    id: yup
        .string()
        .length(34)
        .required('ID is required'),
    username: yup
        .string()
        .max(50)
        .required('Username is required'),
    email: yup
        .string()
        .email('Invalid email format')
        .max(100)
        .required('Email is required'),
    password: yup
        .string()
        .min(8, 'Password must be at least 8 characters')
        .max(255)
        .required('Password is required'),
    name: yup
        .string()
        .max(100)
        .required('Name is required'),
    surname: yup
        .string()
        .max(100)
        .required('Surname is required'),
});
