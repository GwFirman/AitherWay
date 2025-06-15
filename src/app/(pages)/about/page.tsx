"use client";

import { Inter, Playwrite_DE_LA } from "next/font/google";
import { motion } from "framer-motion";
import { Github, Instagram } from "lucide-react";

import firman from "@/assets/images/pic/Firman.jpg";
import fauzan from "@/assets/images/pic/Fauzan.jpg";
import iyan from "@/assets/images/pic/Iyan.jpg";

const inter = Inter({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
    display: "swap",
});

const playwrite = Playwrite_DE_LA({
    display: "swap",
});

const TeamList = [
    {
        name: "Firman Zamzami",
        role: "Machine Learning Developer",
        image: firman,
        social: {
            github: "https://github.com/GwFirman",
            instagram: "https://www.instagram.com/gw_firman/?hl=id",
        },
    },
    {
        name: "Akhmad Fauzan",
        role: "Backend Developer",
        image: fauzan,
        social: {
            github: "https://github.com/ozan-fn",
            instagram: "https://www.instagram.com/ozan.fn/?hl=id",
        },
    },
    {
        name: "Agus Priyanto",
        role: "Frontend Developer",
        image: iyan,
        social: {
            github: "https://github.com/Astha4Study",
            instagram: "https://www.instagram.com/rheiyn._/?hl=id",
        },
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3,
        },
    },
};

const fadeUpVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const socialIconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 20,
        },
    },
    hover: {
        scale: 1.2,
        y: -3,
        transition: {
            type: "spring",
            stiffness: 150,
            damping: 10,
        },
    },
};

export default function TeamPage() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="container max-w-7xl mx-auto py-16 px-4 pt-28 sm:px-6 lg:px-8"
        >
            {/* New Travel Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-center mb-12"
            >
                <span
                    className={`inline-block text-base sm:text-lg font-medium text-rose-500 mb-2 ${playwrite.className}`}
                >
                    Meet Our Team
                </span>
                <h2
                    className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 ${inter.className}`}
                >
                    Faces Behind the Code
                </h2>
            </motion.div>

            <motion.section
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="container max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-rose-50 to-purple-50 rounded-lg shadow-md"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Content */}
                    <motion.div variants={fadeUpVariants}>
                        <h2
                            className={`text-2xl sm:text-3xl font-bold text-gray-800 mb-4 ${playwrite.className}`}
                        >
                            A New Vision for Travel
                        </h2>
                        <p
                            className={`text-base text-gray-600 leading-relaxed ${inter.className}`}
                        >
                            Our platform empowers travelers with AI-driven recommendations,
                            personalized itineraries, and seamless booking experiences. Explore
                            destinations like never before and make every journey unforgettable.
                        </p>
                    </motion.div>

                    {/* Right Content */}
                    <motion.div
                        variants={fadeUpVariants}
                        className="bg-white rounded-lg p-6 shadow-md"
                    >
                        <blockquote className="text-gray-800 text-base leading-relaxed">
                            <span className="text-2xl text-blue-500 font-bold">“</span>
                            We aim to revolutionize travel planning globally with our
                            cutting-edge AI solutions, making it accessible, affordable, and
                            tailored for everyone.
                            <span className="text-2xl text-blue-500 font-bold">”</span>
                        </blockquote>
                    </motion.div>
                </div>
            </motion.section>

            {/* Team Section */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center justify-center pt-12 pb-6"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full max-w-6xl">
                    {TeamList.map((team, index) => (
                        <motion.div
                            key={team.name}
                            variants={fadeUpVariants}
                            className="flex flex-col items-center text-center"
                        >
                            <img
                                src={team.image.src}
                                alt={team.name}
                                className="w-32 h-32 object-cover rounded-full mb-4"
                            />
                            <h3
                                className={`text-xl font-bold mb-2 text-gray-800 ${inter.className}`}
                            >
                                {team.name}
                            </h3>
                            <p
                                className={`text-sm text-gray-500 mb-2 ${inter.className}`}
                            >
                                {team.role}
                            </p>
                            <motion.div
                                className="flex space-x-4 mt-4"
                                initial="hidden"
                                animate="visible"
                                variants={containerVariants}
                            >
                                {team.social.github && (
                                    <motion.a
                                        href={team.social.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        variants={socialIconVariants}
                                        whileHover="hover"
                                        className="text-gray-600 hover:text-gray-900 transition-colors duration-300"
                                    >
                                        <Github size={24} />
                                    </motion.a>
                                )}
                                {team.social.instagram && (
                                    <motion.a
                                        href={team.social.instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        variants={socialIconVariants}
                                        whileHover="hover"
                                        className="text-pink-500 hover:text-pink-700 transition-colors duration-300"
                                    >
                                        <Instagram size={24} />
                                    </motion.a>
                                )}
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </motion.section>
    );
}