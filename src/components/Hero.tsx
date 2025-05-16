'use client';

import BeachHero from "@/images/BeachHero.jpg";
import { motion } from "framer-motion";

import { FaRegPaperPlane } from "react-icons/fa6";
import { GrInfo } from "react-icons/gr";
import { GrMapLocation } from "react-icons/gr";
import { IoCalendarOutline } from "react-icons/io5";
import { BiWallet } from "react-icons/bi";
import { LuUsers } from "react-icons/lu";

interface HeroProps {
    backgroundImage?: string;
}

const Hero: React.FC<HeroProps> = ({ backgroundImage }) => {
    const backGround = backgroundImage || BeachHero.src;

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                duration: 0.5,
                staggerChildren: 0.3 
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    const buttonVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: { 
            scale: 1, 
            opacity: 1,
            transition: { duration: 0.3, ease: "easeOut" }
        },
        hover: { 
            scale: 1.05,
            transition: { duration: 0.2 }
        },
        tap: { scale: 0.95 }
    };

    const infoBarVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: { 
                duration: 0.5,
                delay: 0.8,
                ease: "easeOut"
            }
        }
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            <motion.div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                style={{
                    backgroundImage: `url(${backGround})`,
                    backgroundPosition: 'center'
                }}
            >
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="absolute inset-0 bg-gradient-to-t from-teal-800/50 to-transparent"
                ></motion.div>
            </motion.div>

            {/* Hero Content */}
            <motion.div 
                className="relative z-10 min-h-screen flex flex-col justify-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        className="max-w-4xl text-center text-white"
                        variants={itemVariants}
                    >
                        <motion.h1 
                            className="text-4xl md:text-5xl font-bold mb-4"
                            variants={itemVariants}
                        >
                            Let AI Guide You to the Indonesian's Best-Kept Travel Secrets
                        </motion.h1>
                        <motion.p 
                            className="text-lg mb-8 opacity-90"
                            variants={itemVariants}
                        >
                            Plan your perfect getaway through smart prompts, live maps, and peaceful escapes.
                        </motion.p>
                    </motion.div>
                </div>

                {/* Buttons */}
                <motion.div 
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                    variants={itemVariants}
                >
                    <div className="flex flex-wrap gap-4 justify-center">
                        <motion.button 
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            className="bg-white text-slate-900 px-4 py-2 rounded-full font-medium cursor-pointer flex items-center gap-2"
                            onClick={() => window.location.href = ""}
                        >
                            Find Yours <FaRegPaperPlane className="text-lg" />
                        </motion.button>
                        <motion.button 
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            className="bg-white text-slate-900 px-4 py-2 rounded-full font-medium cursor-pointer flex items-center gap-2"
                            onClick={() => window.location.href = ""}
                        >
                            Know About Us <GrInfo className="text-lg" />
                        </motion.button>
                    </div>
                </motion.div>

                {/* Info Bar */}
                <motion.div 
                    className="relative bg-white rounded-full shadow-sm p-4 top-28 max-w-7xl mx-auto w-full"
                    variants={infoBarVariants}
                >
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1">
                            <div className="flex items-center gap-4 px-4 border-r border-gray-200">
                                <GrMapLocation className="text-3xl text-pink-600" />
                                <div className="flex flex-col">
                                    <p className="text-gray-500 text-sm">Location</p>
                                    <p className="font-semibold">Where to go next?</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 px-4 border-r border-gray-200">
                                <IoCalendarOutline className="text-3xl text-pink-600" />
                                <div className="flex flex-col">
                                    <p className="text-gray-500 text-sm">Travel Insight</p>
                                    <p className="font-semibold">Best time to visit?</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 px-4 border-r border-gray-200">
                                <BiWallet className="text-3xl text-pink-600" />
                                <div className="flex flex-col">
                                    <p className="text-gray-500 text-sm">Budget</p>
                                    <p className="font-semibold">Set your travel range</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 px-4">
                                <LuUsers className="text-3xl text-pink-600" />
                                <div className="flex flex-col">
                                    <p className="text-gray-500 text-sm">Guests</p>
                                    <p className="font-semibold">Who's coming with you?</p>
                                </div>
                            </div>
                        </div>
                        <motion.button 
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            className="bg-pink-600 text-white px-6 py-3 rounded-full font-medium cursor-pointer flex items-center gap-2"
                            onClick={() => window.location.href = ""}
                        >
                            Try Now <FaRegPaperPlane /> 
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Hero;