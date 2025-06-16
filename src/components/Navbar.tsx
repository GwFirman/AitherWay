"use client";

import { motion, AnimatePresence } from "framer-motion";

import { Inter } from "next/font/google";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logoText from "@/assets/logo/logo-white.svg"


const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});


const Navbar: React.FC = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logo = logoText;

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Pricing", href: "/pricing" },
    { label: "Recomendation by Ai", href: "/recomendation" },
  ];

  const navVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, 0.6, 0.6, 0.6],
      },
    },
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const logoVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: { scale: 0.95 },
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.nav
      className={`absolute top-0 left-0 w-full z-20 p-6 text-white ${inter.className}`}
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <motion.div
            className="flex-shrink-0 flex items-center"
            variants={logoVariants}
          >
            <a href="/"><Image src={logo} alt="Logo" width={160} height={60} /></a>
          </motion.div>

          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex space-x-4">
              {menuItems.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 0.98 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Link
                    href={item.href}
                    className="px-5 py-2 border rounded-full text-sm font-medium hover:bg-white/10 transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className="hidden md:flex items-center"
            variants={itemVariants}
          >
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="text-white px-5 py-3 bg-pink-600 rounded-full text-sm font-medium cursor-pointer"
              onClick={() => (window.location.href = "/login")}
            >
              Plan Your Trip
            </motion.button>
          </motion.div>

          {/* Mobile menu button with smoother animation */}
          <motion.div
            className="flex md:hidden items-center"
            variants={itemVariants}
          >
            <motion.button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white/10 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="sr-only">Open main menu</span>
              <motion.svg
                animate={isMenuOpen ? { rotate: 180 } : { rotate: 0 }}
                transition={{ duration: 0.3 }}
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </motion.svg>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Mobile menu with improved animation */}
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white/10 backdrop-blur-sm rounded-lg mt-2"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="text-white hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: menuItems.length * 0.1 }}
              >
                <Link
                  href={"/login"}
                  className="text-white hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                >
                  Plan Your Trip
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
