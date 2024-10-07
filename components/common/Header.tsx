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

    return (
        <header className="fixed top-0 w-full z-50 bg-gradient-to-r pt-10 pl-4 pr-4 md:pl-56 md:pr-56">

            <div className="flex items-center justify-between px-4 md:px-8">
                <Link href='/' className="text-3xl font-semibold text-gray-200">
                    StarBank
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-6 text-gray-300 text-lg ml-10">
                    <Link
                        href="/dashboard"
                        className="relative px-4 py-2 rounded-full border border-transparent hover:text-white hover:bg-slate-400 hover:border-slate-400 transition duration-300"
                    >
                        Dashboard                    </Link>
                    <Link
                        href="#business"
                        className="relative px-4 py-2 rounded-full border border-transparent hover:text-white hover:bg-slate-400 hover:border-slate-400 transition duration-300"
                    >
                        Business
                    </Link>
                    <Link
                        href="#under18"
                        className="relative px-4 py-2 rounded-full border border-transparent hover:text-white hover:bg-slate-400 hover:border-slate-400 transition duration-300"
                    >
                        StarBank &lt;18
                    </Link>
                    <Link
                        href="#company"
                        className="relative px-4 py-2 rounded-full border border-transparent hover:text-white hover:bg-slate-400 hover:border-slate-400 transition duration-300"
                    >
                        Company
                    </Link>
                </nav>


                <div className="hidden md:flex items-center space-x-4 ml-auto pl-10">
                    <Button label="Log in" variant="secondary" onClick={() => openModal('login')} />
                    <Button label="Sign up" variant="primary" onClick={() => openModal('register')} />
                    {user !== null && <button className='border p-2 rounded-full' onClick={() => logOut()}>Log Out</button>}
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

            {/* Mobile  */}
            {navOpen && (
                <nav className="md:hidden bg-blue-800 text-gray-200 text-lg text-center">
                    <div className="flex flex-col space-y-4 px-6 py-6">
                        <Link href="#personal" className="hover:text-white" onClick={toggleNav}>Personal</Link>
                        <Link href="#business" className="hover:text-white" onClick={toggleNav}>Business</Link>
                        <Link href="#under18" className="hover:text-white" onClick={toggleNav}>StarBank &lt;18</Link>
                        <Link href="#company" className="hover:text-white" onClick={toggleNav}>Company</Link>
                        <div className="flex flex-col items-center mt-4 gap-4">
                            <Button label="Log in" variant="secondary" onClick={() => openModal('login')} />
                            <Button label="Sign up" variant="primary" onClick={() => openModal('register')} />
                            {user !== null && <button className='border rounded p-2' onClick={() => logOut()}>Log Out</button>}
                        </div>
                    </div>
                </nav>
            )}
        </header>
    );
};

export default Header;
