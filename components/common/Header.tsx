'use client';
import { MenuIcon, XIcon } from 'lucide-react';
import { useState } from 'react';
import { useModal } from '@/context/ModalProvider';
import Button from './Button';

const Header = () => {
    const [navOpen, setNavOpen] = useState(false);
    const { openModal } = useModal();

    const toggleNav = () => setNavOpen(!navOpen);

    return (
        <header className="fixed top-0 w-full z-50 bg-gradient-to-r pt-10 pl-56">
            <div className="flex items-center justify-between px-4 md:px-8">
                <div className="text-3xl font-semibold text-gray-200">
                    StarBank
                </div>

                <nav className="hidden md:flex items-center space-x-6 text-gray-300 text-lg ml-10">
                    <a
                        href="#personal"
                        className="relative px-4 py-2 rounded-full border border-transparent hover:text-white hover:bg-slate-400 hover:border-slate-400 transition duration-300"
                    >
                        Personal
                    </a>
                    <a
                        href="#business"
                        className="relative px-4 py-2 rounded-full border border-transparent hover:text-white hover:bg-slate-400 hover:border-slate-400 transition duration-300"
                    >
                        Business
                    </a>
                    <a
                        href="#under18"
                        className="relative px-4 py-2 rounded-full border border-transparent hover:text-white hover:bg-slate-400 hover:border-slate-400 transition duration-300"
                    >
                        StarBank &lt;18
                    </a>
                    <a
                        href="#company"
                        className="relative px-4 py-2 rounded-full border border-transparent hover:text-white hover:bg-slate-400 hover:border-slate-400 transition duration-300"
                    >
                        Company
                    </a>
                </nav>

                <div className="hidden md:flex items-center space-x-4 ml-auto pl-10 mr-72">
                    <Button label="Log in" variant="secondary" onClick={() => openModal('login')} />
                    <Button label="Sign up" variant="primary" onClick={() => openModal('register')} />
                </div>

                <div className="md:hidden">
                    <button
                        onClick={toggleNav}
                        className="text-gray-200 focus:outline-none"
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

            {navOpen && (
                <nav className="md:hidden bg-blue-800 text-gray-200 text-lg text-center">
                    <div className="flex flex-col space-y-4 px-4 py-4">
                        <a href="#personal" className="hover:text-white" onClick={toggleNav}>Personal</a>
                        <a href="#business" className="hover:text-white" onClick={toggleNav}>Business</a>
                        <a href="#under18" className="hover:text-white" onClick={toggleNav}>StarBank &lt;18</a>
                        <a href="#company" className="hover:text-white" onClick={toggleNav}>Company</a>
                        <div className="flex flex-col items-center mt-4 gap-2">
                            <Button label="Log in" variant="secondary" onClick={() => openModal('login')} />
                            <Button label="Sign up" variant="primary" onClick={() => openModal('register')} />
                        </div>
                    </div>
                </nav>
            )}
        </header>
    );
};

export default Header;
