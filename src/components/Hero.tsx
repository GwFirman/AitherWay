"use client";

import { motion } from "framer-motion";
import { Inter } from "next/font/google";
import { FaArrowRightLong } from "react-icons/fa6";

import BeachHero from "@/images/BeachHero.jpg";
import ElementArrow from "@/images/element/Arrow.png";
import PolaroidPhotoLombok from "@/images/PantaiPinkLombok.jpg";

interface HeroProps {
  backgroundImage?: string;
}

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const Hero: React.FC<HeroProps> = ({ backgroundImage }) => {
  const backGround = backgroundImage || BeachHero.src;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.95 },
  };

  const infoBarVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.8,
        ease: "easeOut",
      },
    },
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
          backgroundPosition: "center",
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
        <div
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${inter.className}`}
        >
          <motion.div
            className="max-w-4xl text-center text-white"
            variants={itemVariants}
          >
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-4"
              variants={itemVariants}
            >
              Let{" "}
              <span className="bg-gradient-to-r from-rose-400 to-orange-400 bg-clip-text text-transparent">
                AI
              </span>{" "}
              Guide You to Indonesia's{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-pink-400 bg-clip-text text-transparent">
                Hidden Gems
              </span>{" "}
              of{" "}
              <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                Travel
              </span>
            </motion.h1>
            <motion.p
              className="text-lg mb-8 opacity-90"
              variants={itemVariants}
            >
              Plan your perfect getaway through smart prompts, live maps, and
              peaceful escapes.
            </motion.p>
          </motion.div>
        </div>

        {/* Search Bar */}
        <motion.div
          className="relative bg-white rounded-full shadow-sm p-2 top-8 max-w-2xl mx-auto w-full"
          variants={infoBarVariants}
        >
          <div className="flex flex-wrap items-center gap-2">
            {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1">
                            <div className="flex items-center gap-4 px-4 border-r border-gray-200">
                                <GrMapLocation className="text-3xl text-pink-600" />
                                <div className={`flex flex-col ${inter.className}`}>
                                    <p className="text-gray-500 text-sm">Location</p>
                                    <p className="font-semibold">Where to go next?</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 px-4 border-r border-gray-200">
                                <IoCalendarOutline className="text-3xl text-pink-600" />
                                <div className={`flex flex-col ${inter.className}`}>
                                    <p className="text-gray-500 text-sm">Travel Insight</p>
                                    <p className="font-semibold">Best time to visit?</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 px-4 border-r border-gray-200">
                                <BiWallet className="text-3xl text-pink-600" />
                                <div className={`flex flex-col ${inter.className}`}>
                                    <p className="text-gray-500 text-sm">Budget</p>
                                    <p className="font-semibold">Set your travel range</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 px-4">
                                <LuUsers className="text-3xl text-pink-600" />
                                <div className={`flex flex-col ${inter.className}`}>
                                    <p className="text-gray-500 text-sm">Guests</p>
                                    <p className="font-semibold">How many travelers?</p>
                                </div>
                            </div>
                        </div> */}
            <div className="flex-1">
              <input
                type="text"
                id="search"
                name="search"
                autoComplete="off"
                placeholder="Ask AI your next destination…"
                className={`w-full px-6 py-3 rounded-full text-base text-gray-700 placeholder-gray-40 outline-none ${inter.className}`}
              />
            </div>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className={`bg-pink-600 text-white px-5 py-2.5 rounded-full font-medium cursor-pointer flex items-center gap-2 ${inter.className}`}
              onClick={() => (window.location.href = "")}
            >
              Try Now <FaArrowRightLong />
            </motion.button>
          </div>
        </motion.div>

        {/* Floating Polaroid */}
        <motion.div
          className="absolute z-50 right-20 bottom-32 flex justify-start"
          initial={{ opacity: 0, y: 60, rotate: -24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, rotate: -12, scale: 0.95 }}
          transition={{ delay: 1.4, duration: 0.7, ease: "easeOut" }}
        >
          <div className="w-[200px] h-[280px]">
            <div className="bg-white p-2 shadow-xl rounded-md w-full h-full flex items-center justify-center">
              <img
                src={PolaroidPhotoLombok.src}
                alt="Polaroid"
                className="w-full h-full object-cover rounded"
              />
            </div>
          </div>
        </motion.div>

        {/* Floating Arrow */}
        <motion.div
          className="absolute left-60 top-90 max-w-44"
          initial={{ opacity: 0, y: 40, rotate: -80, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, rotate: -58, scale: 0.95 }}
          transition={{ delay: 0.8, duration: 0.7, ease: "easeOut" }}
        >
          <img
            src={ElementArrow.src}
            className="w-full h-auto -rotate-0"
            alt="Arrow"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
