'use client';
import Link from 'next/link';
import { useLoggedIn } from '@/context/LoggedInProvider';
import { useModal } from '@/context/ModalProvider';
import { MenuIcon, XIcon } from 'lucide-react';
import { useState } from 'react';
import Button from './Button';

const Header = () => {
    const [navOpen, setNavOpen] = useState(false);
    const { openModal } = useModal();
    const { user, logOut } = useLoggedIn();

    const toggleNav = () => setNavOpen(!navOpen);
    const closeNav = () => setNavOpen(false);

    return (
        <header className="fixed top-0 w-full z-50 bg-gradient-to-r from-black to-gray-900 pt-10 px-4 md:px-56">
            <div className="flex items-center justify-between px-4 md:px-8 bg-opacity-80 pb-5 rounded-lg">
                <Link href='/' className="text-3xl font-semibold text-white">
                    StarBank
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-6 text-white text-lg ml-10">
                    <Link
                        href="/dashboard"
                        className="relative px-4 py-2 rounded-full border border-transparent hover:text-white hover:bg-slate-600 hover:border-slate-600 transition duration-300"
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="/ibanFunction"
                        className="relative px-4 py-2 rounded-full border border-transparent hover:text-white hover:bg-slate-600 hover:border-slate-600 transition duration-300"
                    >
                        IBAN-Function
                    </Link>
                </nav>

                <div className="hidden md:flex items-center space-x-4 ml-auto pl-10">
                    {!user && <Button label="Log in" variant="secondary" onClick={() => openModal('login')} />}
                    {user !== null && <Button label="Logout" variant="secondary" onClick={() => logOut()} />}
                    <Button label="Sign up" variant="primary" onClick={() => openModal('register')} />
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button
                        onClick={toggleNav}
                        className="text-white focus:outline-none"
                        aria-label="Toggle navigation menu"
                    >
                        {navOpen ? (
                            <XIcon className="h-6 w-6" />
                        ) : (
                            <MenuIcon className="h-6 w-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {navOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-30"
                        onClick={closeNav}
                    ></div>

                    <nav className="md:hidden bg-black text-white text-lg text-center fixed top-0 left-0 w-full  z-40">
                        <div className="flex flex-col space-y-4 px-4 py-4">
                            <button
                                className="text-white absolute top-4 right-4"
                                onClick={closeNav}
                                aria-label="Close navigation menu"
                            >
                                <XIcon className="h-6 w-6" />
                            </button>
                            <Link href="/dashboard" className="hover:text-blue-500" onClick={closeNav}>Dashboard</Link>
                            <Link href="/ibanFunction" className="hover:text-blue-500" onClick={closeNav}>IbanFunction</Link>
                            <div className="flex flex-col items-center mt-4 gap-4">
                                {!user && <Button label="Log in" variant="secondary" onClick={() => { openModal('login'); closeNav(); }} />}
                                <Button label="Sign up" variant="primary" onClick={() => { openModal('register'); closeNav(); }} />
                                {user !== null && <button className='border rounded p-2' onClick={() => { logOut(); closeNav(); }}>Log Out</button>}
                            </div>
                        </div>
                    </nav>
                </>
            )}
        </header>
    );
};

export default Header;
