'use client';

import { motion, AnimatePresence } from "framer-motion";
import { useState } from 'react';
import Link from 'next/link';

interface NavbarProps {
    logoText: string;
    menuItems: {
        label: string;
        href: string;
    }[];
}

const Navbar: React.FC<NavbarProps> = ({ logoText = "Aither Way", menuItems }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <motion.nav
            className="absolute top-0 left-0 w-full z-10  p-6 text-white"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">

                    <div className="flex-shrink-0 flex items-center">
                        <span className="text-xl font-bold">
                            {logoText}
                        </span>
                    </div>

                    <div className="hidden md:flex items-center justify-center flex-1">
                        <div className="flex space-x-4">
                            {menuItems.map((item, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 0.98 }}
                                    whileTap={{ scale: 0.96 }}
                                >
                                    <Link
                                        href={item.href}
                                        className="px-5 py-2 border rounded-full text-sm font-medium"
                                    >
                                        {item.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="hidden md:flex items-center">
                        <motion.button
                            whileTap={{ scale: 1.06 }}
                            whileHover={{ scale: 1.02 }}
                            className="text-white px-5 py-3 bg-pink-600 hover:bg-pink-500 rounded-4xl text-sm font-medium"
                            onClick={() => window.location.href = "/login"}
                        >
                            Plan Your Trip
                        </motion.button>
                    </div>

                    {/* Mobile menus */}
                    <div className="flex md:hidden items-center">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {/* Hamburger icon */}
                            <svg
                                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                            {/* X icon */}
                            <svg
                                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu panel */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        key="mobile-menu"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {menuItems.map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                        <div className="pt-4 pb-3 border-t border-gray-200">
                            <div className="px-2 space-y-1">
                                <Link
                                    href="/login"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                >
                                    Plan Your Trip
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;