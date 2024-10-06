'use client';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface User {
    username: string;
    email: string;
    id: string
}

interface LoggedInContextType {
    user: User | null;
    isLoggedIn: boolean;
    logIn: (userData: User) => void;
    logOut: () => void;
}

const LoggedInContext = createContext<LoggedInContextType | undefined>(undefined);

interface LoggedInProviderProps {
    children: ReactNode;
}

export const LoggedInProvider: React.FC<LoggedInProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setIsLoggedIn(true);
        }
    }, []);

    const logIn = (userData: User) => {
        setUser(userData);
        setIsLoggedIn(true);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logOut = () => {
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem('user');
    };

    return (
        <LoggedInContext.Provider value={{ user, isLoggedIn, logIn, logOut }}>
            {children}
        </LoggedInContext.Provider>
    );
};

export const useLoggedIn = (): LoggedInContextType => {
    const context = useContext(LoggedInContext);
    if (!context) {
        throw new Error('useLoggedIn must be used within a LoggedInProvider');
    }
    return context;
};
