import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Search } from 'lucide-react';
import { Inter } from "next/font/google";
import Link from 'next/link';

const inter = Inter({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
    display: "swap",
});

const SearchBar = () => {
    const [show, setShow] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const containerVariants = {
        initial: { scale: 1 },
        hover: {
            scale: 1.005,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        }
    };

    const gradientVariants = {
        initial: {
            clipPath: "inset(0 100% 0 0)",
            opacity: 0
        },
        animate: {
            clipPath: "inset(0 0% 0 0)",
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: [0.4, 0, 0.2, 1]
            }
        }
    };

    const buttonVariants = {
        initial: {
            scale: 1,
            backgroundColor: "#db2777"
        },
        hover: {
            scale: 1.008,
            backgroundColor: "#be185d",
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        },
        tap: {
            scale: 0.995,
            transition: {
                duration: 0.15,
                ease: "easeOut"
            }
        }
    };

    const inputVariants = {
        initial: {
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
        },
        focus: {
            boxShadow: "0 0 0 1px rgba(219, 39, 119, 0.08)",
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        }
    };

    const sparkleVariants = {
        initial: {
            scale: 0,
            opacity: 0
        },
        animate: {
            scale: 1,
            opacity: 0.8,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const floatingParticles = Array.from({ length: 4 }, (_, i) => (
        <motion.div
            key={i}
            className="absolute w-1 h-1 bg-pink-400 rounded-full"
            style={{
                left: `${25 + (i * 15)}%`,
                top: `${35 + (i % 2) * 30}%`,
            }}
            animate={{
                y: [-2, 2, -2],
                opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
                duration: 2 + (i * 0.15),
                repeat: Infinity,
                ease: "easeOut",
                delay: i * 0.3,
            }}
        />
    ));

    return (
        <motion.div
            className="relative p-1 max-w-2xl rounded-full mx-auto w-full"
            variants={containerVariants}
            initial="initial"
            whileHover="hover"
            onHoverStart={() => setShow(true)}
            onHoverEnd={() => setShow(false)}
        >
            <AnimatePresence>
                {show && (
                    <motion.div
                        className="rounded-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 absolute inset-0"
                        variants={gradientVariants}
                        initial="initial"
                        animate="animate"
                        exit="initial"
                    />
                )}
            </AnimatePresence>

            {/* Particles */}
            {show && floatingParticles}

            {/* Content */}
            <motion.div
                className="relative bg-white rounded-full shadow-lg p-2 backdrop-blur-sm"
                variants={inputVariants}
                animate={isFocused ? "focus" : "initial"}
            >
                <div className="flex items-center gap-2">
                    <motion.div
                        className="pl-4 text-gray-400"
                        animate={{
                            scale: show ? 1.02 : 1
                        }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                        <Search size={20} />
                    </motion.div>

                    <div className="flex-1 relative">
                        <motion.input
                            type="text"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            placeholder="Ask AI your next destination…"
                            className={`w-full px-4 py-3 rounded-full text-base text-gray-700 placeholder-gray-400 outline-none bg-transparent font-medium ${inter.className}`}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                        />

                        <AnimatePresence>
                            {(show || isFocused) && (
                                <motion.div
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-pink-400"
                                    variants={sparkleVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="initial"
                                >
                                    <Sparkles size={16} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <motion.div
                        variants={buttonVariants}
                        initial="initial"
                        whileHover="hover"
                        whileTap="tap"
                        className="bg-pink-600 text-white px-4 py-3 rounded-full font-medium cursor-pointer"
                    >
                        <Link href="/chat" className={`flex items-center gap-2 ${inter.className}`}>
                            <span>Try Now</span>
                            <motion.div
                                animate={{ x: show ? 2 : 0 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                            >
                                <ArrowRight size={16} />
                            </motion.div>
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default SearchBar;