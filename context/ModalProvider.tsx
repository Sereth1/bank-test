'use client';
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ModalContextType {
    isModalOpen: boolean;
    activeTab: 'login' | 'register';
    openModal: (tab: 'login' | 'register') => void;
    closeModal: () => void;
    setActiveTab: (tab: 'login' | 'register') => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProviderProps {
    children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

    const openModal = (tab: 'login' | 'register') => {
        setActiveTab(tab);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <ModalContext.Provider value={{ isModalOpen, activeTab, openModal, closeModal, setActiveTab }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = (): ModalContextType => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};
