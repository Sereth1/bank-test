const Footer = () => {
    return (
        <footer className="bg-black text-white py-6 mt-10">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">

                <div className="mb-4 md:mb-0">
                    <h2 className="text-lg font-semibold mb-2">Quick Links</h2>

                </div>

                {/* Middle section: Social Media Icons */}
                <div className="mb-4 md:mb-0">
                    <h2 className="text-lg font-semibold mb-2">Follow Us</h2>
                    <div className="flex space-x-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                            <i className="fab fa-facebook-f"></i> {/* FontAwesome Icon */}
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>
                </div>

                {/* Right section: Copyright */}
                <div>
                    <p>&copy; {new Date().getFullYear()} Bank Transactions App. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
